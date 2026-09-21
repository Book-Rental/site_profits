import axios from "axios";
import { CustomerSummaryResponse, CustomerTransactionDetailsResponse } from "../types/customerSummary";

const API_URL = import.meta.env.VITE_API_URL;

export const getCustomerSummary =
  async (): Promise<CustomerSummaryResponse> => {
    const response = await axios.get<CustomerSummaryResponse>(
      `${API_URL}/api/transaction/customer-summary`,
      {
        withCredentials: true,
      }
    );

    return response.data;
  };

export const getCustomerTransactionDetails =
  async (
    customerId: string
  ): Promise<CustomerTransactionDetailsResponse> => {
    const response =
      await axios.get<CustomerTransactionDetailsResponse>(
        `${API_URL}/api/transaction/customer-summary/${customerId}`,
        {
          withCredentials: true,
        }
      );

    return response.data;
  };