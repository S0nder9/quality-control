"use client";

import { useState } from "react";
import { usePDF } from "@/hooks/usePDF";
import { UploadZone } from "./pdf/UploadZone";
import { FileList } from "./pdf/FileList";
import { PDFPreview } from "./pdf/PDFPreview";
import { useFileFuncs } from "@/hooks/useFileFuncs";
import { DefButton } from "./buttons/defButton";

export default function PdfsBlock() {
  const { uploadPDFs } = usePDF();

  const {
    files,
    isProcessing,
    handleFilesSelected,
    handleRemoveFile,
    handleUpload,
    uploadedFilesCount,
  } = useFileFuncs(uploadPDFs);

  const [selectedFileId, setSelectedFileId] = useState<string | null>(null);

  const selectedFile =
    files.find((f) => f.id === selectedFileId) ?? files[0] ?? null;

  return (
    <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* LEFT */}
      <div className="p-4 border rounded-xl">
        <UploadZone onFilesSelected={handleFilesSelected} />

        <FileList
          files={files}
          selectedFileId={selectedFile?.id ?? null}
          onSelectFile={setSelectedFileId}
          onRemoveFile={handleRemoveFile}
        />

        <DefButton
          onClick={handleUpload}
          disabled={uploadedFilesCount === 0 || isProcessing}
        >
          {isProcessing ? "Анализ..." : "Начать анализ"}
        </DefButton>
      </div>

      {/* RIGHT */}
      <div className="p-4 border rounded-xl">
        <PDFPreview
          files={files}
          selectedFileId={selectedFile?.id ?? null}
        />
      </div>
    </section>
  );
}