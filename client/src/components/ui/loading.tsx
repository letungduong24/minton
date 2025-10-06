import React from "react";

export default function Loading() {
  return (
    <div className="flex space-x-2 justify-center items-center bg-white absolute inset-0 z-50 flex-1 dark:invert">
      <div className="h-8 w-8 bg-black rounded-full animate-bounce [animation-delay:-0.3s]" />
      <div className="h-8 w-8 bg-black rounded-full animate-bounce [animation-delay:-0.15s]" />
      <div className="h-8 w-8 bg-black rounded-full animate-bounce" />
    </div>
  );
}
