export interface ProfitSummary {
    totalOrders: number;
    totalCustomerPayments: number;
    totalSellerPayout: number;
    totalRefund: number;
    totalLogisticsPayout: number;
    totalDebitedAmount: number;
    remainingAmount: number;
}

export interface ProfitResponse {
    status: string;
    message: string;
    data: ProfitSummary;
}