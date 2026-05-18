import { ListCtaSectionResponse } from "@/Interfaces/CtaSection";
import axiosInstance from "@/service/axios";
import { AxiosError } from "axios";

const BASE = "home/cta-section";

// ─────────────────────────────────────
// LIST
// ─────────────────────────────────────

export const listContactCTAApi = async (data: {
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

        const res = await axiosInstance.get<ListCtaSectionResponse[]>(
            `${BASE}?${params.toString()}`
        );

        return res.data;
    } catch (error) {
        if (error instanceof AxiosError) {
            const apiError = error.response?.data;

            const message =
                apiError?.error ||
                apiError?.message ||
                error.message ||
                "Unexpected error";

            const normalized = new Error(message);

            (normalized as any).statusCode =
                apiError?.statusCode || error.response?.status;

            throw normalized;
        }

        throw error;
    }
};