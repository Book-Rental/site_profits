import { useQuery } from "@tanstack/react-query";

import {
  getCustomerTransactionDetails,
} from "../services/customerSummaryService";

export const useCustomerTransactionDetails = (
  customerId: string
) => {
  return useQuery({
    queryKey: [
      "customer-transaction-details",
      customerId,
    ],

    queryFn: () =>
      getCustomerTransactionDetails(customerId),

    enabled: Boolean(customerId),
  });
};