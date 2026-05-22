interface ParamsButton {
  handleUpload: () => void;
  isProcessing: boolean;
  uploadedFilesCount: number;
}

export const DefButton = ({
  handleUpload,
  isProcessing,
  uploadedFilesCount,
}: ParamsButton) => {
  const noFiles = uploadedFilesCount === 0;

  const fileWord =
    uploadedFilesCount === 1
      ? "файл"
      : uploadedFilesCount >= 2 && uploadedFilesCount <= 4
      ? "файла"
      : "файлов";

  return (
    <button
      onClick={handleUpload}
      disabled={isProcessing || noFiles}
      className="mt-4 w-full py-3 rounded-lg font-medium text-sm bg-[var(--primary)] text-[var(--primary-foreground)] hover:bg-[var(--primary)]/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {isProcessing
        ? "Обработка..."
        : noFiles
        ? "Загрузите файлы"
        : `Начать анализ (${uploadedFilesCount} ${fileWord})`}
    </button>
  );
};