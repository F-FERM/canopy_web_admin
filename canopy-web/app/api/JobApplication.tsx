import axiosInstance from "@/service/axios";
import { AxiosError } from "axios";
export interface JobApplicationData {
  name: string;
  email: string;
  cvUrl: string;
  jobId: string;
}

export const SubmitJobApplicationApi = async (data: JobApplicationData) => {
  try {
    const response = await axiosInstance.post("/job-applications", data);
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      const apiError = error.response?.data;
      const errorMessage = apiError?.error || apiError?.message || error.message || "Application submission failed";
      const normalizedError = new Error(errorMessage);
      (normalizedError as any).statusCode = apiError?.statusCode || error.response?.status;
      throw normalizedError;
    }
    throw error;
  }
};