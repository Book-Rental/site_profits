import { useQuery } from "@tanstack/react-query";
import { getOrders } from "../services/orderService";

export const useOrders = (
  page: number,
  limit: number = 10
) => {
  return useQuery({
    queryKey: ["orders", page, limit],
    queryFn: () => getOrders(page, limit),
    placeholderData: (previousData) => previousData,
  });
};