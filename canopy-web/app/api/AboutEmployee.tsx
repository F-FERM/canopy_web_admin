import { ListAboutEmployee } from "@/Interfaces/AboutEmployee";
import axiosInstance from "@/service/axios";
import { AxiosError } from "axios";

const BASE = "/about/employee-recognition";

// ─────────────────────────────────────────────
// LIST
// ─────────────────────────────────────────────

export const listEmployeeServiceApi = async (data: {
  search?: string;
  page?: number;
  limit?: number;
}) => {
  const { search, page, limit } = data;

  try {
    const params = new URLSearchParams();

    if (search)
      params.append("search", search);

    if (page)
      params.append("page", page.toString());

    if (limit)
      params.append("limit", limit.toString());

    const response =
      await axiosInstance.get<ListAboutEmployee[]>(
        `${BASE}?${params.toString()}`
      );

    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      const apiError = error.response?.data;

      const errorMessage =
        apiError?.error ||
        apiError?.message ||
        error.message ||
        "An unexpected error occurred";

      const normalizedError =
        new Error(errorMessage);

      (normalizedError as any).statusCode =
        apiError?.statusCode ||
        error.response?.status;

      (normalizedError as any).raw =
        apiError;

      throw normalizedError;
    }

    throw error;
  }
};