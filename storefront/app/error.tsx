"use client";

export default function Error({ reset }: { reset: () => void }) {
  return (
    <div>
      <h2>Error</h2>
      <button onClick={() => reset()}>Try Again</button>
    </div>
  );
}
