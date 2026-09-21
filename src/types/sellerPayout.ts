export interface SellerPayout {
  sellerId: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  profilePic?: string;
  totalPayout: number;
  payoutCount: number;
}

export interface SellerPayoutsData {
  totalSellerPayout: number;
  sellers: SellerPayout[];
}

export interface SellerPayoutsResponse {
  status: string;
  message: string;
  data: SellerPayoutsData;
}

export interface SellerPayoutDetail {
  transactionId: string;
  orderId: string;
  userId: string;

  amount: number;

  orderItemId: string;
  bookId: string;

  rentalAmount: number;
  securityDeposit: number;
  deliveryFee?: number;
  discount?: number;
  tax?: number;

  paymentMethod: string;
  paymentStatus: string;
  gatewayTransactionId?: string | null;

  payoutDate: string;
}

export interface SellerPayoutDetailsData {
  sellerId: string;
  payoutCount: number;
  totalPayout: number;
  payouts: SellerPayoutDetail[];
}

export interface SellerPayoutDetailsResponse {
  status: string;
  message: string;
  data: SellerPayoutDetailsData;
}