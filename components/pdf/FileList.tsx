"use client";

import type { UploadedFile } from "@/types";

interface Props {
  files: UploadedFile[];
  selectedFileId: string | null;
  onSelectFile: (id: string) => void;
  onRemoveFile: (id: string) => void;
}

export function FileList({
  files,
  selectedFileId,
  onSelectFile,
  onRemoveFile,
}: Props) {
  if (files.length === 0) {
    return (
      <div className="text-sm text-zinc-400 mt-4">
        Нет загруженных файлов
      </div>
    );
  }

  return (
    <div className="mt-4 space-y-2">
      {files.map((file) => (
        <div
          key={file.id}
          onClick={() => onSelectFile(file.id)}
          className={`flex items-center justify-between p-3 rounded-lg cursor-pointer border ${
            file.id === selectedFileId
              ? "bg-zinc-800 border-zinc-600"
              : "bg-zinc-900 border-zinc-800"
          }`}
        >
          <div className="flex flex-col">
            <span className="text-white text-sm">{file.name}</span>
            <span className="text-xs text-zinc-400">
              Статус: {file.status}
            </span>
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onRemoveFile(file.id);
            }}
            className="text-red-400 text-sm hover:text-red-300"
          >
            удалить
          </button>
        </div>
      ))}
    </div>
  );
}