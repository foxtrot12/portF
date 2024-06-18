"use client";
import { useEffect } from "react";
import Landing from "./pages/landing";

export default function Home() {
  useEffect(() => {
    document.body.classList.toggle("dark", true);
  }, []);
  return (
    <main className="h-screen w-screen light:text-POP_BLACK-300 dark:text-POP_WHITE-400 flex">
      <Landing />
    </main>
  );
}
