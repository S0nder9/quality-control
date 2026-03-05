import { api } from "@/config";

export const usePDF = () => {
    const sentPDFs = async (metaData: any) => {
        try {
            console.log("Отправка данных...", metaData);
            const response = await api.post("/upload", metaData);
            return response.data;
        } catch (error) {
            console.error("Ошибка при отправке PDF:", error);
            throw error;
        }
    };

    return { sentPDFs };
};
