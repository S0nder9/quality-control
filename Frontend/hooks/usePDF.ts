import { api } from "@/config";
import type { PageResult } from "@/types";

export const usePDF = () => {
  const uploadPDFs = async (formData: FormData): Promise<{
    analysis: PageResult[];
    annotatedFiles: string[];
  }> => {
    try {
      const response = await api.post<{
        analysis: PageResult[];
        annotatedFiles: string[];
      }>("/pdf/upload", formData);
      return {
        analysis: response.data.analysis,
        annotatedFiles: response.data.annotatedFiles,
      };
    } catch (error) {
      console.error("Ошибка при загрузке PDF:", error);
      throw error;
    }
  };

  return { uploadPDFs };
};