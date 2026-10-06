"use client";

import { useState } from "react";
import IntroAnimation from "./IntroAnimation";

export default function AppShell({ children }) {
  const [introComplete, setIntroComplete] = useState(false);

  return (
    <>
      {!introComplete && (
        <IntroAnimation onComplete={() => setIntroComplete(true)} />
      )}
      <div
        style={{
          opacity: introComplete ? 1 : 0,
          transition: "opacity 0.6s ease",
          pointerEvents: introComplete ? "auto" : "none",
        }}
      >
        {children}
      </div>
    </>
  );
}
