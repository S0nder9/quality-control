import { FileStatus, PageResult, UploadedFile } from "@/types";
import { useCallback, useState } from "react";

type UploadPDFsFn = (data: FormData) => Promise<PageResult[]>;

interface UseFileFuncsReturn {
    files: UploadedFile[];
    isProcessing: boolean;
    handleFilesSelected: (newFiles: File[]) => void;
    handleRemoveFile: (id: string) => void;
    handleUpload: () => Promise<void>;
    uploadedFilesCount: number
}

export const useFileFuncs = (uploadPDFs: UploadPDFsFn): UseFileFuncsReturn => {
    const [files, setFiles] = useState<UploadedFile[]>([]);
    const [isProcessing, setIsProcessing] = useState(false);

    const handleFilesSelected = useCallback((newFiles: File[]) => {
        const uploadedFiles: UploadedFile[] = newFiles.map((file) => ({
            id: crypto.randomUUID(),
            name: file.name,
            status: "uploaded" as FileStatus,
            file: file,
            result: [],
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
                if (fileItem.file) {
                    formData.append("files", fileItem.file);
                }
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

    return {
        files,
        isProcessing,
        handleFilesSelected,
        handleRemoveFile,
        handleUpload,
        uploadedFilesCount
    };
};
