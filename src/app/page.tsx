'use client';
import { useEffect } from "react";
import Landing from "./components/landing";
import { LocalizationProvider } from "./common/localization";

export default function Home() {
  useEffect(() => {
    // document.body.classList.toggle("dark", true);
  }, []);
  return (
      <LocalizationProvider>
        <main className="h-screen w-screen light:text-popBlack-300 dark:text-popWhite-400 flex overflow-hidden">
            <Landing />
        </main>
      </LocalizationProvider>
  );
}
