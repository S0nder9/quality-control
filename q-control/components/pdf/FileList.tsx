"use client";

import { FileListProps, FileStatus } from "@/types";

const statusConfig: Record<
  FileStatus,
  { icon: React.ReactNode; label: string; color: string }
> = {
  uploaded: {
    icon: (
      <svg
        className="w-4 h-4"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
    label: "Загружен",
    color: "text-[var(--muted-foreground)]",
  },
  processing: {
    icon: (
      <svg
        className="w-4 h-4 animate-spin"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
        />
      </svg>
    ),
    label: "Обработка...",
    color: "text-[#eab308]",
  },
  done: {
    icon: (
      <svg
        className="w-4 h-4"
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
    ),
    label: "Готово",
    color: "text-[#22c55e]",
  },
  error: {
    icon: (
      <svg
        className="w-4 h-4"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
    label: "Ошибка",
    color: "text-[#dc2626]",
  },
};

export function FileList({ files, onRemove }: FileListProps) {
  if (files.length === 0) return null;

  return (
    <div className="space-y-3">
      <h3 className="text-sm font-medium text-[var(--foreground)]">
        Файлы ({files.length})
      </h3>

      <div className="space-y-2">
        {files.map((file) => {
          const config = statusConfig[file.status] || statusConfig.uploaded;

          return (
            <div
              key={file.id}
              className="rounded-lg border border-[var(--border)] bg-[var(--card)] overflow-hidden"
            >
              <div className="flex items-center justify-between p-3 border-b border-[var(--border)]">
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <svg
                    className="w-5 h-5 text-[var(--muted-foreground)] flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                    />
                  </svg>
                  <span
                    className="text-sm text-[var(--foreground)] truncate"
                    title={file.name}
                  >
                    {file.name}
                  </span>
                </div>

                <div className="flex items-center gap-3 flex-shrink-0">
                  <div className={`flex items-center gap-1.5 ${config.color}`}>
                    {config.icon}
                    <span className="text-xs hidden sm:inline">
                      {config.label}
                    </span>
                  </div>

                  {onRemove && file.status !== "processing" && (
                    <button
                      onClick={() => onRemove(file.id)}
                      className="p-1 rounded hover:bg-[var(--border)] transition-colors"
                      aria-label="Удалить файл"
                    >
                      <svg
                        className="w-4 h-4 text-[var(--muted-foreground)]"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
