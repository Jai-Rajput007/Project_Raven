from flask import Flask, request, session, jsonify
from flask_bcrypt import Bcrypt
from flask_session import Session
from flask_cors import CORS
from pymongo import MongoClient, ASCENDING
import os
import re
import subprocess
from datetime import datetime
from transformers import pipeline # type: ignore

# Initialize Flask
app = Flask(__name__)
CORS(app, supports_credentials=True,origins=["http://localhost:3000"])  # Enable CORS for frontend integration

# Secure session management
app.config["SESSION_PERMANENT"] = False
app.config["SESSION_TYPE"] = "filesystem"
app.config["SESSION_COOKIE_HTTPONLY"] = True
app.config["SESSION_COOKIE_SECURE"] = False  # Set to True for HTTPS
app.config["SESSION_COOKIE_SAMESITE"] = "Lax"
Session(app)

app.secret_key = os.urandom(32)  # Secure random session key

# Database connection
MONGO_URI = "mongodb+srv://admin:admin@cluster0.eln0f.mongodb.net/?retryWrites=true&w=majority"
db_client = MongoClient(MONGO_URI)

# Databases
user_db = db_client["user_database"]
job_db = db_client["Job_data"]
user_collection = user_db["users"]
job_collection = job_db["jobs"]

bcrypt = Bcrypt(app)

# AI-powered task delegation model
task_delegation_model = pipeline("summarization", model="facebook/bart-large")

# Create MongoDB Indexes for better query performance
job_collection.create_index([("job_status", ASCENDING), ("created_at", ASCENDING)])

# ------------------------ Utility Functions ------------------------

def sanitize_input(data):
    """Sanitize user input to prevent NoSQL injection & XSS."""
    if isinstance(data, str):
        return re.sub(r"[^\w\s@.,]", "", data)
    elif isinstance(data, list):
        return [sanitize_input(item) for item in data]
    return data

def detect_language(filename):
    """Detect programming language from filename."""
    ext = filename.split(".")[-1]
    lang_map = {
        "py": "python",
        "js": "javascript",
        "c": "c",
        "cpp": "cpp",
        "java": "java",
        "go": "go",
        "rs": "rust",
        "php": "php",
        "sql": "sql"
    }
    return lang_map.get(ext, None)

def run_linter(code, lang):
    """Run linter based on detected language."""
    try:
        if lang == "python":
            result = subprocess.run(["pylint", "--from-stdin"], input=code, text=True, capture_output=True)
        elif lang == "javascript":
            result = subprocess.run(["eslint", "--stdin"], input=code, text=True, capture_output=True)
        elif lang == "sql":
            result = subprocess.run(["sqlfluff", "lint", "--dialect", "mysql", "-"], input=code, text=True, capture_output=True)
        else:
            return "Unsupported language"

        return result.stdout or result.stderr
    except Exception as e:
        return str(e)

# ------------------------ Authentication Routes ------------------------

@app.route("/api/signup", methods=["POST"])
def signup():
    """User signup route."""
    data = request.get_json()
    email = sanitize_input(data.get("email"))
    password = sanitize_input(data.get("password"))
    user_type = sanitize_input(data.get("user_type", "Junior"))

    if not email or not password:
        return jsonify({"error": "Missing credentials"}), 400

    existing_user = user_collection.find_one({"email": email})
    if existing_user:
        return jsonify({"error": "User already exists"}), 409

    hashed_password = bcrypt.generate_password_hash(password).decode("utf-8")

    user_entry = {
        "email": email,
        "password": hashed_password,
        "user_type": user_type,
        "created_at": datetime.utcnow(),
    }

    user_collection.insert_one(user_entry)
    session["user"] = {"email": email, "role": user_type}

    return jsonify({"message": "Signup successful", "user": session["user"]}), 201

@app.route("/api/login", methods=["POST"])
def authenticate():
    """User login route."""
    data = request.get_json()
    email = sanitize_input(data.get("email"))
    password = sanitize_input(data.get("password"))

    if not email or not password:
        return jsonify({"error": "Missing credentials"}), 400

    user = user_collection.find_one({"email": email})

    if user and bcrypt.check_password_hash(user["password"], password):
        session["user"] = {"email": email, "role": user.get("user_type", "Junior")}
        return jsonify({"message": "Login successful", "user": session["user"]}), 200

    return jsonify({"error": "Invalid email or password"}), 401

@app.route("/api/logout", methods=["POST"])
def logout():
    """User logout route."""
    session.pop("user", None)
    return jsonify({"message": "Logged out successfully"}), 200

# ------------------------ Workspace Routes ------------------------

@app.route("/api/workspace", methods=["GET"])
def workspace():
    """API to fetch workspace data."""
    return jsonify({"message": "Workspace route is working!"}), 200

@app.route("/api/ai-task-delegation", methods=["POST"])
def delegate_task():
    """AI-powered task delegation."""
    data = request.get_json()
    project_description = data.get("description", "")

    if not project_description:
        return jsonify({"error": "Project description is required"}), 400

    summary = task_delegation_model(project_description, max_length=150, min_length=50, do_sample=False)

    raw_subtasks = summary[0]["summary_text"].split(". ")
    subtasks = [{"id": idx + 1, "task": task.strip()} for idx, task in enumerate(raw_subtasks) if task]

    return jsonify({"subtasks": subtasks}), 200

# ------------------------ Job Management Routes ------------------------

@app.route("/api/job", methods=["POST"])
def create_job():
    """Create a new job posting."""
    if "user" not in session:
        return jsonify({"error": "Unauthorized"}), 403

    job_data = request.get_json()
    title = sanitize_input(job_data.get("title"))
    description = sanitize_input(job_data.get("description"))
    company = sanitize_input(job_data.get("company"))
    location = sanitize_input(job_data.get("location"))
    required_languages = sanitize_input(job_data.get("required_languages", []))
    required_technologies = sanitize_input(job_data.get("required_technologies", []))

    if not title or not description or not company:
        return jsonify({"error": "Job details missing"}), 400

    job_entry = {
        "title": title,
        "description": description,
        "company": company,
        "location": location,
        "required_languages": required_languages,
        "required_technologies": required_technologies,
        "posted_by": session["user"]["email"],
        "job_status": "open",
        "created_at": datetime.utcnow(),
        "updated_at": datetime.utcnow(),
        "is_deleted": False
    }

    new_job_id = job_collection.insert_one(job_entry).inserted_id
    return jsonify({"message": "Job posted successfully", "job_id": str(new_job_id)}), 201

@app.route("/api/jobs", methods=["GET"])
def get_jobs():
    """Retrieve all open jobs."""
    jobs = list(job_collection.find({"job_status": "open", "is_deleted": False}, {"_id": 1, "title": 1, "company": 1, "location": 1}))
    
    for job in jobs:
        job["_id"] = str(job["_id"])

    return jsonify(jobs), 200

# ------------------------ Run Flask Server ------------------------

if __name__ == "__main__":
    app.run(debug=True, port=5000)
