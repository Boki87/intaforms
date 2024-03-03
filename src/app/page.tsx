import Link from "next/link";

export default function Home() {
  return (
    <div>
      Landing page - Hello there{" "}
      <Link href="/dashboard">
        <button>Go to dashboard</button>
      </Link>
    </div>
  );
}
