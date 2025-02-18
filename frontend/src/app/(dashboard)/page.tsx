import Image from "next/image";

export default function Home() {
  return (
    <div className="grid grid-rows-[auto_1fr_auto] min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <header className="w-full text-center">
        <h1 className="text-4xl font-bold text-primary">
          Welcome to the Industry-Ready Tech Engineers Platform
        </h1>
        <p className="text-sm text-muted-foreground mt-2">
          Enhance your skills, collaborate, and grow in the tech industry.
        </p>
      </header>

      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start w-full">
        <section className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-card shadow-md rounded-2xl p-6">
            <h2 className="text-lg font-semibold mb-2">Community</h2>
            <p className="text-sm text-muted-foreground">
              Connect with other developers and grow together.
            </p>
          </div>

          <div className="bg-card shadow-md rounded-2xl p-6">
            <h2 className="text-lg font-semibold mb-2">Jobs</h2>
            <p className="text-sm text-muted-foreground">
              Discover opportunities tailored for tech enthusiasts.
            </p>
          </div>

          <div className="bg-card shadow-md rounded-2xl p-6">
            <h2 className="text-lg font-semibold mb-2">Mentorship</h2>
            <p className="text-sm text-muted-foreground">
              Get guidance from experienced mentors and grow faster.
            </p>
          </div>

          <div className="bg-card shadow-md rounded-2xl p-6">
            <h2 className="text-lg font-semibold mb-2">Workspace</h2>
            <p className="text-sm text-muted-foreground">
              Collaborate and complete tasks efficiently.
            </p>
          </div>

          <div className="bg-card shadow-md rounded-2xl p-6">
            <h2 className="text-lg font-semibold mb-2">Resources</h2>
            <p className="text-sm text-muted-foreground">
              Access curated learning materials and grow your knowledge.
            </p>
          </div>

          <div className="bg-card shadow-md rounded-2xl p-6">
            <h2 className="text-lg font-semibold mb-2">Task History</h2>
            <p className="text-sm text-muted-foreground">
              Track your completed tasks and review your progress.
            </p>
          </div>
        </section>

        <section className="w-full mt-10">
          <h2 className="text-2xl font-bold mb-4">Getting Started</h2>
          <ol className="list-inside list-decimal text-sm text-muted-foreground">
            <li className="mb-2">
              Explore different sections like <strong>Community</strong>, <strong>Jobs</strong>, <strong>Mentorship</strong>, and more.
            </li>
            <li className="mb-2">Customize your profile and settings.</li>
            <li>Start your learning and collaboration journey today!</li>
          </ol>
        </section>
      </main>

      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center text-sm text-muted-foreground">
        <a
          className="hover:text-primary"
          href="https://nextjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by Next.js
        </a>
        <a
          className="hover:text-primary"
          href="https://vercel.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          Hosted on Vercel
        </a>
      </footer>
    </div>
  );
}
