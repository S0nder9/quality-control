"use client";

import { useEffect, useMemo, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";

import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

interface AnnotatedPDFPreviewProps {
  annotatedFiles: string[] | undefined;
  apiUrl: string;
  fileName?: string;
  filesCount?: number;
  fileIndex?: number;
}

export function AnnotatedPDFPreview({
  annotatedFiles,
  apiUrl,
  fileName,
  filesCount,
  fileIndex,
}: AnnotatedPDFPreviewProps) {
  const [numPages, setNumPages] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);

  const pdfUrl = useMemo(() => {
    if (!annotatedFiles || annotatedFiles.length === 0) return null;
    return `${apiUrl}${annotatedFiles[0]}`;
  }, [annotatedFiles, apiUrl]);

  useEffect(() => {
    setNumPages(0);
    setError(null);
  }, [pdfUrl]);

  if (!pdfUrl) {
    return (
      <div className="h-full flex flex-col items-center justify-center gap-3 text-center py-12">
        <div className="w-16 h-16 rounded-full bg-[var(--secondary)] flex items-center justify-center">
          <svg
            className="w-8 h-8 text-[var(--muted-foreground)]"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
            />
          </svg>
        </div>
        <p className="text-sm text-[var(--muted-foreground)]">
          Запустите анализ, чтобы увидеть аннотированный PDF
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2 pb-2 border-b border-[var(--border)]">
        <svg
          className="w-4 h-4 text-green-400 shrink-0"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6zm-1 1.5L18.5 9H13V3.5zM6 20V4h5v7h7v9H6z" />
        </svg>
        <span className="text-sm font-medium text-[var(--foreground)] truncate">
          {fileName || "Аннотированный PDF"}
        </span>
        <div className="ml-auto flex items-center gap-2 shrink-0">
          {filesCount && fileIndex && filesCount > 1 && (
            <span className="text-xs text-[var(--muted-foreground)]">
              {fileIndex} / {filesCount}
            </span>
          )}
          {numPages > 0 && (
            <span className="text-xs text-[var(--muted-foreground)]">
              {numPages} стр.
            </span>
          )}
        </div>
      </div>

      {error ? (
        <div className="text-red-400 text-sm py-4 text-center">{error}</div>
      ) : (
        <div className="overflow-auto max-h-[70vh] rounded-lg space-y-3">
          <Document
            file={pdfUrl}
            onLoadSuccess={({ numPages }) => setNumPages(numPages)}
            onLoadError={() => setError("Не удалось загрузить аннотированный PDF")}
            loading={
              <div className="text-sm text-[var(--muted-foreground)] py-8 text-center">
                Загрузка PDF...
              </div>
            }
          >
            {Array.from(new Array(numPages), (_, i) => (
              <Page
                key={i}
                pageNumber={i + 1}
                width={600}
                height={600}
                className="rounded-md overflow-hidden shadow-sm"
                renderTextLayer={true}
                renderAnnotationLayer={true}
              />
            ))}
          </Document>
        </div>
      )}
    </div>
  );
}
