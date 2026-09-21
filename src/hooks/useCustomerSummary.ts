import { useQuery } from "@tanstack/react-query";
import { getCustomerSummary } from "../services/customerSummaryService";

export const useCustomerSummary = () => {
  return useQuery({
    queryKey: ["customer-summary"],
    queryFn: getCustomerSummary,
  });
};