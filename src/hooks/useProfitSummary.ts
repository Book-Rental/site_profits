import { useQuery } from "@tanstack/react-query";
import { getProfitSummary } from "../services/profitService";

export const useProfitSummary = () => {
    return useQuery({
        queryKey: ["profit-summary"],
        queryFn: getProfitSummary,
    });
};