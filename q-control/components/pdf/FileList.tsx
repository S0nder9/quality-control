"use client";

import { statusConfigList } from "@/constants";
import { FileListProps, FileStatus } from "@/types";


export function FileList({ files, onRemove }: FileListProps) {
  if (files.length === 0) return null;

  return (
    <div className="space-y-3">
      <h3 className="text-sm font-medium text-[var(--foreground)]">
        Файлы ({files.length})
      </h3>

      <div className="space-y-2">
        {files.map((file) => {
          const config = statusConfigList[file.status] || statusConfigList.uploaded;

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
