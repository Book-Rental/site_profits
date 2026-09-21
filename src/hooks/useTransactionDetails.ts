import { useQuery } from "@tanstack/react-query";
import { getTransactionsByOrderId } from "../services/transactionService";

export const useTransactionDetails = (
    orderId: string | null
) => {
    return useQuery({
        queryKey: ["transactions", orderId],
        queryFn: () => getTransactionsByOrderId(orderId!),
        enabled: !!orderId,
    });
};