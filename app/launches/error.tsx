"use client";

export default function Error({ reset }: { error: Error; reset: () => void }) {
  return (
    <div className="p-16">
      <h2 className="text-2xl">Network Error</h2>
      <button onClick={() => reset()}>Try again</button>
    </div>
  );
}
