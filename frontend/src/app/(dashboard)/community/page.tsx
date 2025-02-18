"use client";

import { useState } from "react";
import styles from "@/components/styles/community.module.css";

const CommunityPage = () => {
  const [posts, setPosts] = useState([
    { id: 1, user: "Alice", content: "Looking for a mentor in React!" },
    { id: 2, user: "Bob", content: "Check out the latest AI job postings." },
  ]);

  const [newPost, setNewPost] = useState("");

  const handlePostSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!newPost.trim()) return;
    setPosts([...posts, { id: posts.length + 1, user: "You", content: newPost }]);
    setNewPost("");
  };

  return (
    <div className={styles.mainContainer}>
      <div className={styles.container}>
        <h1 className={styles.title}>👥 Community Forum</h1>
        <form onSubmit={handlePostSubmit} className={styles.form}>
          <textarea
            className={styles.textarea}
            value={newPost}
            onChange={(e) => setNewPost(e.target.value)}
            placeholder="Share something with the community..."
          />
          <button type="submit" className={styles.button}>Post</button>
        </form>

        <div className={styles.posts}>
          {posts.length > 0 ? (
            posts.map((post) => (
              <div key={post.id} className={styles.post}>
                <div className={styles.postHeader}>
                  <strong className={styles.user}>{post.user}</strong>
                  <span className={styles.timestamp}>{new Date().toISOString().split("T")[0]}</span>
                </div>
                <p className={styles.postContent}>{post.content}</p>
              </div>
            ))
          ) : (
            <p className={styles.noPosts}>No posts yet. Be the first to share something!</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CommunityPage;
