import { ListHomeServiceResponse } from "@/Interfaces/HomeService";
import { ServiceDetailResponse } from "@/Interfaces/ServiceDetail";
import axiosInstance from "@/service/axios";
import { AxiosError } from "axios";

const BASE = "/home/services-section";
const BASE1 = "/service/security-services";

// LIST
export const listSecurityServicesApi = async (data: {
  search?: string;
  page?: number;
  limit?: number;
}) => {
  const { search, page, limit } = data;

  try {
    const params = new URLSearchParams();

    if (search) params.append("search", search);
    if (page) params.append("page", page.toString());
    if (limit) params.append("limit", limit.toString());

    const response = await axiosInstance.get<ListHomeServiceResponse[]>(
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

      const normalizedError = new Error(errorMessage);

      (normalizedError as any).statusCode =
        apiError?.statusCode || error.response?.status;

      (normalizedError as any).raw = apiError;

      throw normalizedError;
    }

    throw error;
  }
}

export const listSeviceSecurityServicesApi = async (data: {
  search?: string;
  page?: number;
  limit?: number;
}) => {
  const { search, page, limit } = data;

  try {
    const params = new URLSearchParams();

    if (search) params.append("search", search);
    if (page) params.append("page", page.toString());
    if (limit) params.append("limit", limit.toString());

    const response = await axiosInstance.get<ListHomeServiceResponse[]>(
      `${BASE1}?${params.toString()}`
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

      const normalizedError = new Error(errorMessage);

      (normalizedError as any).statusCode =
        apiError?.statusCode || error.response?.status;

      (normalizedError as any).raw = apiError;

      throw normalizedError;
    }

    throw error;
  }
};

// GET BY ID — fetch the detail page data for a single service
export const getServiceDetailById = async (id: string): Promise<ServiceDetailResponse> => {
  try {
    const response = await axiosInstance.get<ServiceDetailResponse>(
      `${BASE}/service/${id}`
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

      const normalizedError = new Error(errorMessage);

      (normalizedError as any).statusCode =
        apiError?.statusCode || error.response?.status;

      (normalizedError as any).raw = apiError;

      throw normalizedError;
    }

    throw error;
  }
};