"use client";

import { useMemo, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import type { UploadedFile } from "@/types";

import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

interface PDFPreviewProps {
  files: UploadedFile[];
  selectedFileId: string | null;
}

export function PDFPreview({ files, selectedFileId }: PDFPreviewProps) {
  const [numPages, setNumPages] = useState<number>(0);

  const selectedFile = useMemo(
    () => files.find((f) => f.id === selectedFileId) ?? null,
    [files, selectedFileId],
  );

  const fileUrl = useMemo(() => {
    if (!selectedFile?.file) return null;
    return URL.createObjectURL(selectedFile.file);
  }, [selectedFile]);

  if (!selectedFile) {
    return <div className="text-zinc-400">Выбери файл</div>;
  }

  return (
    <div className="space-y-4">
      <div className="text-white">{selectedFile.name}</div>

      <Document
        file={fileUrl}
        onLoadSuccess={({ numPages }) => setNumPages(numPages)}
      >
        {Array.from(new Array(numPages), (_, i) => (
          <Page key={i} pageNumber={i + 1} width={500} />
        ))}
      </Document>
    </div>
  );
}