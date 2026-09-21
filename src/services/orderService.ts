import axios from "axios";
import type { OrdersResponse } from "../types/order";

const API_URL = import.meta.env.VITE_API_URL;

export const getOrders = async (
  page = 1,
  limit = 10
): Promise<OrdersResponse> => {
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const userId = user?._id;

  const response = await axios.get<OrdersResponse>(
    `${API_URL}/api/order`,
    {
      params: {
        page,
        limit,
        ...(userId ? { userId } : {}),
      },
      withCredentials: true,
    }
  );

  return response.data;
};