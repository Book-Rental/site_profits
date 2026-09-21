import axios from "axios";
import type { TransactionResponse } from "../types/transaction";

const API_URL = import.meta.env.VITE_API_URL;

export const getTransactionsByOrderId = async (
    orderId: string
): Promise<TransactionResponse> => {
    const response = await axios.get<TransactionResponse>(
        `${API_URL}/api/transaction/order/${orderId}`,
        {
            withCredentials: true,
        }
    );

    return response.data;
};