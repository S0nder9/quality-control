"use client";

import { usePDF } from "@/hooks/usePDF";
import { useCallback, useState } from "react";
import { UploadZone } from "./pdf/UploadZone";
import { FileStatus, PageResult, UploadedFile } from "@/types";
import { FileList } from "./pdf/FileList";

export const PdfsBlock = () => {
  const { uploadPDFs } = usePDF();

  const [isProcessing, setIsProcessing] = useState(false);
  const [files, setFiles] = useState<UploadedFile[]>([]);

  const handleFilesSelected = useCallback((newFiles: File[]) => {
    const uploadedFiles: UploadedFile[] = newFiles.map((file) => ({
      id: crypto.randomUUID(),
      name: file.name,
      status: "uploaded" as FileStatus,
      file: file,
    }));
    setFiles((prev) => [...prev, ...uploadedFiles]);
  }, []);

  const handleRemoveFile = useCallback((id: string) => {
    setFiles((prev) => prev.filter((f) => f.id !== id));
  }, []);

  const handleUpload = useCallback(async () => {
    const filesToUpload = files.filter((f) => f.status === "uploaded");
    if (filesToUpload.length === 0) return;

    setIsProcessing(true);

    setFiles((prev) =>
      prev.map((f) =>
        filesToUpload.find((toUp) => toUp.id === f.id)
          ? { ...f, status: "processing" as FileStatus }
          : f,
      ),
    );

    try {
      const formData = new FormData();
      filesToUpload.forEach((fileItem) => {
        formData.append("files", fileItem.file as File);
      });

      formData.append(
        "metadata",
        JSON.stringify({
          uploadedAt: new Date().toISOString(),
          filesCount: filesToUpload.length,
        }),
      );

      const results: PageResult[] = await uploadPDFs(formData);
      console.log(`Ответ от сервера: ${JSON.stringify(results)}`);

      setFiles((prev) =>
        prev.map((file) => {
          const wasUploaded = filesToUpload.find((f) => f.id === file.id);
          if (wasUploaded) {
            return {
              ...file,
              status: "completed" as FileStatus,
              result: results,
            };
          }
          return file;
        }),
      );
    } catch (error) {
      console.error("Загрузка не удалась", error);
      setFiles((prev) =>
        prev.map((file) => {
          const wasUploaded = filesToUpload.find((f) => f.id === file.id);
          if (wasUploaded) {
            return { ...file, status: "error" as FileStatus };
          }
          return file;
        }),
      );
    } finally {
      setIsProcessing(false);
    }
  }, [files, uploadPDFs]);

  const uploadedFilesCount = files.filter(
    (f) => f.status === "uploaded",
  ).length;

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
                    <button
                      onClick={handleUpload}
                      disabled={isProcessing}
                      className="mt-4 w-full py-3 rounded-lg font-medium text-sm bg-[var(--primary)] text-[var(--primary-foreground)] hover:bg-[var(--primary)]/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isProcessing
                        ? "Обработка..."
                        : `Начать анализ (${uploadedFilesCount} файл${uploadedFilesCount > 1 ? (uploadedFilesCount < 5 ? "а" : "ов") : ""})`}
                    </button>
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
