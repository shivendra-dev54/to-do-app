import { Link } from "react-router";

export const Homepage = () => {
  return (
    <main className="px-4 py-12 text-center bg-[rgb(var(--bg))] text-[rgb(var(--text))]">
      {/* Header */}
      <h1 className="mb-3 text-4xl sm:text-5xl font-semibold tracking-tight text-[rgb(var(--primary))]">
        TaskFlow
      </h1>

      <p className="mb-2 text-base sm:text-lg text-[rgb(var(--text-muted))]">
        Task management app
      </p>

      {/* Description */}
      <p className="max-w-2xl mx-auto mb-10 text-base sm:text-lg leading-relaxed text-[rgb(var(--text-muted))]">
        TaskFlow is a minimal todo application focused on predictable behavior,
        clear data ownership, and a maintainable codebase. It is designed to be
        fast, type-safe, and easy to extend.
      </p>

      {/* CTA */}
      <div className="mb-14">
        <Link
          to="/signin"
          className="inline-flex items-center justify-center px-6 py-3 text-base sm:text-lg font-medium text-white rounded-lg bg-[rgb(var(--primary))] hover:opacity-90 transition"
        >
          Sign In
        </Link>
      </div>

      {/* Features */}
      <div className="grid max-w-4xl gap-5 mx-auto mb-16 sm:grid-cols-2">
        <Feature title="Performance" desc="Bun backend, strict typing" />
        <Feature title="Authentication" desc="JWT with refresh tokens" />
      </div>

      {/* Tech Stack */}
      <section className="max-w-4xl mx-auto text-left">
        <h2 className="mb-6 text-xl sm:text-2xl font-semibold tracking-tight text-[rgb(var(--primary))]">
          Tech Stack
        </h2>

        <div className="grid gap-5 sm:grid-cols-2">
          <StackCard title="Backend" items={["Bun", "MySQL", "Drizzle", "JWT"]} />
          <StackCard
            title="Frontend"
            items={["React", "Tailwind", "React Router", "React Hot Toast"]}
          />
        </div>
      </section>

      <p className="mt-20 text-sm sm:text-base text-[rgb(var(--text-muted))]">
        Created by{" "}
        <span className="font-medium text-[rgb(var(--primary))]">
          Shivendra Devadhe
        </span>
      </p>
      <p
      className="text-xl text-yellow-300 font-extrabold">^_^</p>
    </main>
  );
};

const Feature = ({ title, desc }: { title: string; desc: string }) => (
  <div className="p-5 border rounded-xl bg-[rgb(var(--bg-secondary))] border-[rgb(var(--border))]">
    <h3 className="mb-2 text-sm sm:text-base font-semibold uppercase tracking-wide text-[rgb(var(--primary))]">
      {title}
    </h3>
    <p className="text-sm sm:text-base text-[rgb(var(--text-muted))]">
      {desc}
    </p>
  </div>
);

const StackCard = ({
  title,
  items,
}: {
  title: string;
  items: string[];
}) => (
  <div className="p-5 border rounded-xl bg-[rgb(var(--bg-secondary))] border-[rgb(var(--border))]">
    <h3 className="mb-3 text-base sm:text-lg font-semibold text-[rgb(var(--primary))]">
      {title}
    </h3>
    <ul className="space-y-1 text-sm sm:text-base text-[rgb(var(--text-muted))]">
      {items.map((item) => (
        <li key={item}>• {item}</li>
      ))}
    </ul>
  </div>
);
