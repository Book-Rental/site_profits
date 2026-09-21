import { useQuery } from "@tanstack/react-query";
import { getSellerPayouts } from "../services/sellerPayoutService";

export const useSellerPayouts = () => {
  return useQuery({
    queryKey: ["seller-payouts"],
    queryFn: getSellerPayouts,
  });
};