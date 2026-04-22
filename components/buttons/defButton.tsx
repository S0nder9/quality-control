interface ParamsButton {
    handleUpload: () => void;
    isProcessing: boolean;
    uploadedFilesCount: number;
}

export const DefButton = ({ handleUpload, isProcessing, uploadedFilesCount }: ParamsButton) => {
    return (
        <>
            <button
                onClick={handleUpload}
                disabled={isProcessing}
                className="mt-4 w-full py-3 rounded-lg font-medium text-sm bg-[var(--primary)] text-[var(--primary-foreground)] hover:bg-[var(--primary)]/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
                {isProcessing
                    ? "Обработка..."
                    : `Начать анализ (${uploadedFilesCount} файл${uploadedFilesCount > 1 ? (uploadedFilesCount < 5 ? "а" : "ов") : ""})`}
            </button>
        </>
    )
}