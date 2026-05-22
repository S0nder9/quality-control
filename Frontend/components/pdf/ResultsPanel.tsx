"use client";

import { UploadedFile } from "@/types";

interface Props {
  file: UploadedFile | null;
  apiUrl?: string;
}

const severityColor = {
  high: "text-red-500",
  medium: "text-orange-400",
  low: "text-yellow-400",
};

const handleDownload = async (file: UploadedFile, apiUrl: string) => {
  if (!file.annotatedFiles || file.annotatedFiles.length === 0) {
    alert("Исправленный файл недоступен");
    return;
  }

  try {
    const downloadUrl = `${apiUrl}${file.annotatedFiles[0]}`;
    const response = await fetch(downloadUrl);
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = file.annotatedFiles[0].split("/").pop() || "annotated.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error("Ошибка при скачивании файла:", error);
    alert("Ошибка при скачивании файла");
  }
};

export const ResultsPanel = ({ file, apiUrl = "http://localhost:5079" }: Props) => {
  if (!file)
    return (
      <div className="text-zinc-500">
        Выберите PDF для просмотра результатов
      </div>
    );

  if (!file.result?.length)
    return (
      <div className="text-zinc-500">
        Нет результатов анализа
      </div>
    );

  const result = file.result[0];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold">Результаты анализа</h2>
          <p className="text-sm text-zinc-400 mt-1">{file.name}</p>
        </div>
        {file.annotatedFiles && file.annotatedFiles.length > 0 && (
          <button
            onClick={() => handleDownload(file, apiUrl)}
            className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-sm rounded-lg transition-colors flex items-center gap-2 shrink-0"
          >
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
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
              />
            </svg>
            Скачать
          </button>
        )}
      </div>

      <div className="p-4 rounded-xl bg-zinc-900 border border-zinc-700">
        <h3 className="font-medium mb-3">Сводка</h3>

        <div className="grid grid-cols-2 gap-3 text-sm">
          <div>Всего ошибок: {result.summary.total_errors}</div>
          <div>Пересечения: {result.summary.intersection_errors}</div>
          <div>Штриховка: {result.summary.hatching_errors}</div>
          <div>Текст: {result.summary.text_errors}</div>
        </div>
      </div>

      <div className="space-y-3">
        <h3 className="font-medium">Ошибки</h3>

        {result.errors.map((error) => (
          <div
            key={error.id}
            className="p-4 rounded-xl border border-zinc-700 bg-zinc-900"
          >
            <div className="flex justify-between">
              <span className="font-medium">{error.id}</span>

              <span className={severityColor[error.severity]}>
                {error.severity}
              </span>
            </div>

            <p className="text-sm mt-2">{error.message}</p>

            <div className="text-xs text-zinc-400 mt-2">
              Тип: {error.type}
            </div>

            <div className="text-xs text-zinc-400">
              bbox: x={error.bbox.x}, y={error.bbox.y}
            </div>

            {error.metadata && (
              <pre className="mt-3 text-xs bg-black/30 p-2 rounded overflow-auto">
                {JSON.stringify(error.metadata, null, 2)}
              </pre>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};