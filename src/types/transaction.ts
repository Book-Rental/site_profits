export interface TransactionBreakup {
    orderItemId?: string;
    bookId?: string;
    sellerId?: string;
    rentalAmount?: number;
    securityDeposit?: number;
    deliveryFee?: number;
    discount?: number;
    tax?: number;
    totalAmount: number;
}

export interface Transaction {
    _id: string;
    transactionId: string;
    orderId: string;
    userId: string;
    transactionType: string;
    totalAmount: number;
    paymentMethod?: string;
    direction: string;
    paymentStatus: string;
    gatewayTransactionId?: string;
    breakup: TransactionBreakup[];
    createdAt: string;
    updatedAt: string;
    creditedAmount: number;
    debitedAmount: number;
    remainingAmount: number;
}

export interface TransactionSummary {
    totalCreditedAmount: number;
    totalDebitedAmount: number;
    remainingAmount: number;
}

export interface TransactionData {
    transactions: Transaction[];
    summary: TransactionSummary;
}

export interface TransactionResponse {
    status: string;
    message: string;
    data: TransactionData;
}