import { useQuery } from "@tanstack/react-query";

import {
  getSellerPayoutDetails,
} from "../services/sellerPayoutService";

export const useSellerPayoutDetails = (
  sellerId: string
) => {
  return useQuery({
    queryKey: ["seller-payout-details", sellerId],
    queryFn: () =>
      getSellerPayoutDetails(sellerId),
    enabled: Boolean(sellerId),
  });
};