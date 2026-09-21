import axios from "axios";
import type { ProfitResponse } from "../types/profit";

const API_URL = import.meta.env.VITE_API_URL;

export const getProfitSummary = async (): Promise<ProfitResponse> => {
    const response = await axios.get<ProfitResponse>(
        `${API_URL}/api/transaction/profit`,
        {
            withCredentials: true,
        }
    );

    return response.data;
};