import { api } from "@/config";

export const usePDF = () => {
  const uploadPDFs = async (formData: FormData) => {
    try {
      const response = await api.post("/pdf/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    } catch (error) {
      console.error("Ошибка при загрузке PDF:", error);
      throw error;
    }
  };

  return { uploadPDFs };
};