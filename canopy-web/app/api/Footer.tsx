import { ListFooterResponse } from "@/Interfaces/Footer";
import axiosInstance from "@/service/axios";
import { AxiosError } from "axios";

const BASE = "footer-section";

// ─────────────────────────────────────
// LIST
// ─────────────────────────────────────

export const listFooterApi = async (data: {
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
            params.append(
                "page",
                page.toString()
            );

        if (limit)
            params.append(
                "limit",
                limit.toString()
            );

        const response =
            await axiosInstance.get<
                ListFooterResponse[]
            >(`${BASE}?${params.toString()}`);

        return response.data;
    } catch (error) {
        if (error instanceof AxiosError) {
            const apiError =
                error.response?.data;

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