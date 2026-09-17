"use client";

export default function Error({ reset }: { reset: () => void }) {
  return (
    <main style={{ padding: "2rem", textAlign: "center" }}>
      <h1>Something went wrong!</h1>
      <button onClick={() => reset()}>Try again</button>
    </main>
  );
}
