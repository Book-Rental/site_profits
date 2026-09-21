import axios from "axios";
import { SellerPayoutDetailsResponse, SellerPayoutsResponse } from "../types/sellerPayout";

const API_URL = import.meta.env.VITE_API_URL;

export const getSellerPayouts =
  async (): Promise<SellerPayoutsResponse> => {
    const response = await axios.get<SellerPayoutsResponse>(
      `${API_URL}/api/transaction/seller-payouts`,
      {
        withCredentials: true,
      }
    );

    return response.data;
  };

  export const getSellerPayoutDetails = async (
  sellerId: string
): Promise<SellerPayoutDetailsResponse> => {
  const response =
    await axios.get<SellerPayoutDetailsResponse>(
      `${API_URL}/api/transaction/seller-payouts/${sellerId}`,
      {
        withCredentials: true,
      }
    );

  return response.data;
};