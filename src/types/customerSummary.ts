export interface CustomerSummary {
  customerId: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  profilePic?: string;
  paymentCount: number;
  refundCount: number;
  totalPaid: number;
  totalRefunded: number;
  netAmount: number;
}

export interface CustomerSummaryData {
  totalCustomerPayments: number;
  totalCustomerRefunds: number;
  customers: CustomerSummary[];
}

export interface CustomerSummaryResponse {
  status: string;
  message: string;
  data: CustomerSummaryData;
}

export interface CustomerTransaction {
  _id: string;
  transactionId: string;
  orderId: string;
  userId: string;

  transactionType: "PAYMENT" | "REFUND";

  totalAmount: number;

  paymentMethod: string;

  direction: "CREDIT" | "DEBIT";

  paymentStatus: string;

  gatewayTransactionId?: string | null;

  createdAt: string;
  updatedAt: string;
}

export interface CustomerTransactionDetailsData {
  customerId: string;

  paymentCount: number;
  refundCount: number;

  totalPaid: number;
  totalRefunded: number;
  netAmount: number;

  payments: CustomerTransaction[];
  refunds: CustomerTransaction[];
}

export interface CustomerTransactionDetailsResponse {
  status: string;
  message: string;
  data: CustomerTransactionDetailsData;
}