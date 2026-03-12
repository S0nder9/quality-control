"use client";

import { usePDF } from "@/hooks/usePDF";
import { UploadZone } from "./pdf/UploadZone";
import { FileList } from "./pdf/FileList";
import { useFileFuncs } from "@/hooks/useFileFuncs";
import { DefButton } from "./buttons/defButton";

export const PdfsBlock = () => {
  const { uploadPDFs } = usePDF();
  const { files, isProcessing, handleFilesSelected, handleRemoveFile, handleUpload, uploadedFilesCount } = useFileFuncs(uploadPDFs)


  return (
    <main className="flex-1 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-6">
            <div className="bg-[var(--card)] rounded-lg border border-[var(--border)] p-6">
              <h2 className="text-lg font-semibold text-[var(--foreground)] mb-4">
                Загрузка файлов
              </h2>
              <UploadZone
                onFilesSelected={handleFilesSelected}
                disabled={isProcessing}
              />

              {files.length > 0 && (
                <div className="mt-6">
                  <FileList files={files} onRemove={handleRemoveFile} />

                  {uploadedFilesCount > 0 && !isProcessing && (
                    <DefButton handleUpload={handleUpload} isProcessing={isProcessing} uploadedFilesCount={uploadedFilesCount} />
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
