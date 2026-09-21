export interface ProfitSummary {
    totalOrders: number;
    totalCreditedAmount: number;
    totalCustomerPayments : number;
    totalSellerPayout: number;
    totalRefund: number;
    totalDebitedAmount: number;
    remainingAmount: number;
}

export interface ProfitResponse {
    status: string;
    message: string;
    data: ProfitSummary;
}