"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { usePDF } from "@/hooks/usePDF";
import { UploadZone } from "./pdf/UploadZone";
import { FileList } from "./pdf/FileList";
import { useFileFuncs } from "@/hooks/useFileFuncs";
import { DefButton } from "./buttons/defButton";
import { HeaderBlock } from "./blocks/HeaderBlock";
import { ResultsPanel } from "./pdf/ResultsPanel";
import { Footer } from "./blocks/Footer";

const PDFPreview = dynamic(
  () => import("./pdf/PDFPreview").then((m) => m.PDFPreview),
  {
    ssr: false,
    loading: () => (
      <div className="text-zinc-400 text-sm">Загрузка просмотра...</div>
    ),
  }
);

const AnnotatedPDFPreview = dynamic(
  () => import("./pdf/AnnotatedPDFPreview").then((m) => m.AnnotatedPDFPreview),
  {
    ssr: false,
    loading: () => (
      <div className="text-zinc-400 text-sm">Загрузка аннотированного PDF...</div>
    ),
  }
);

export default function PdfsBlock() {
  const { uploadPDFs } = usePDF();

  const API_URL = "http://localhost:5079";

  const {
    files,
    isProcessing,
    handleFilesSelected,
    handleRemoveFile,
    handleUpload,
    uploadedFilesCount,
  } = useFileFuncs(uploadPDFs);

  const [selectedFileId, setSelectedFileId] = useState<string | null>(null);

  // ----------------------------
  // выбранный файл
  // ----------------------------
  const selectedFile =
    files.find((f) => f.id === selectedFileId) ?? files[0] ?? null;

  return (
    <div className="flex flex-col flex-1">
      <HeaderBlock status={isProcessing ? "processing" : "ready"} />

      <section className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-6 px-6 py-6">
        {/* LEFT PANEL */}
        <div className="p-4 border border-[var(--border)] rounded-xl bg-[var(--card)]">
          <UploadZone
            onFilesSelected={handleFilesSelected}
            disabled={isProcessing}
          />

          <FileList
            files={files}
            selectedFileId={selectedFile?.id ?? null}
            onSelectFile={setSelectedFileId}
            onRemoveFile={handleRemoveFile}
          />

          <DefButton
            handleUpload={handleUpload}
            isProcessing={isProcessing}
            uploadedFilesCount={uploadedFilesCount}
          />
        </div>

        {/* ORIGINAL PDF */}
        <div className="p-4 border border-[var(--border)] rounded-xl bg-[var(--card)]">
          <PDFPreview
            files={files}
            selectedFileId={selectedFile?.id ?? null}
            filesCount={files.length}
          />
        </div>

        {/* RESULTS */}
        <div className="p-4 border border-[var(--border)] rounded-xl bg-[var(--card)]">
          <ResultsPanel file={selectedFile} apiUrl={API_URL} />
        </div>

        {/* ANNOTATED PDF */}
        <div className="p-4 border border-[var(--border)] rounded-xl bg-[var(--card)]">
          <AnnotatedPDFPreview
            annotatedFiles={selectedFile?.annotatedFiles}
            apiUrl={API_URL}
            fileName={selectedFile?.name}
            filesCount={files.length}
            fileIndex={
              selectedFile
                ? files.findIndex((f) => f.id === selectedFile.id) + 1
                : 0
            }
          />
        </div>
      </section>

      <Footer />
    </div>
  );
}