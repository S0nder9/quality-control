"use client";

import { statusConfig } from "@/constants";

type SystemStatus = "ready" | "processing" | "error";

interface HeaderProps {
  status: SystemStatus;
}

export function HeaderBlock({ status }: HeaderProps) {
  const config = statusConfig[status];

  return (
    <header className="flex items-center justify-between px-6 py-4 border-b border-[var(--border)] bg-[var(--card)]">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 bg-[var(--primary)] rounded-lg flex items-center justify-center">
          <svg
            className="w-5 h-5 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <h1 className="text-xl font-semibold text-[var(--foreground)]">
          QC Checker
        </h1>
      </div>

      <div className="flex items-center gap-2">
        <span
          className={`w-2.5 h-2.5 rounded-full ${config.color} animate-pulse`}
        />
        <span className="text-sm text-[var(--muted-foreground)]">
          {config.label}
        </span>
      </div>
    </header>
  );
}
