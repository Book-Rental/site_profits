import { ArrowDownRight, ArrowUpRight, CalendarDays, CreditCard, X, } from "lucide-react";
import { useTransactionDetails } from "../hooks/useTransactionDetails";

interface TransactionDetailsProps {
    orderId: string;
    onClose: () => void;
}

const formatAmount = (amount: number) => {
    return new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        maximumFractionDigits: 2,
    }).format(amount);
};

const formatDate = (date: string) => {
    return new Intl.DateTimeFormat("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    }).format(new Date(date));
};

const TransactionDetails = ({
    orderId,
    onClose,
}: TransactionDetailsProps) => {
    const {
        data,
        isLoading,
        isError,
        error,
    } = useTransactionDetails(orderId);

    return (
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="flex items-center justify-between border-b border-slate-100 px-5 py-5 sm:px-6">
                <div>
                    <h1 className="text-lg font-semibold text-slate-900">
                        Transaction Details
                    </h1>

                    <p className="mt-1 max-w-xl break-all text-xs text-slate-400">
                        Order ID: {orderId}
                    </p>
                </div>

                <button
                    type="button"
                    onClick={onClose}
                    className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
                >
                    <X size={18} />
                </button>
            </div>

            {isLoading && (
                <div className="space-y-4 p-6">
                    <div className="h-24 animate-pulse rounded-xl bg-slate-100" />
                    <div className="h-16 animate-pulse rounded-xl bg-slate-100" />
                    <div className="h-16 animate-pulse rounded-xl bg-slate-100" />
                </div>
            )}

            {isError && (
                <div className="p-8 text-center">
                    <p className="font-medium text-red-600">
                        Unable to load transactions
                    </p>

                    <p className="mt-1 text-sm text-slate-500">
                        {error instanceof Error
                            ? error.message
                            : "Something went wrong."}
                    </p>
                </div>
            )}

            {data?.data && (
                <div>
                    <div className="grid grid-cols-1 gap-3 border-b border-slate-100 p-5 sm:grid-cols-3 sm:p-6">

                        <div className="rounded-xl bg-emerald-50 p-4">
                            <div className="flex items-center gap-2 text-xs font-medium text-emerald-700">
                                <ArrowUpRight size={15} />
                                Total Payment
                            </div>

                            <p className="mt-3 text-xl font-bold text-emerald-700">
                                {formatAmount(
                                    data.data.summary.totalCreditedAmount
                                )}
                            </p>
                        </div>

                        <div className="rounded-xl bg-red-50 p-4">
                            <div className="flex items-center gap-2 text-xs font-medium text-red-700">
                                <ArrowDownRight size={15} />
                                Total Debited
                            </div>

                            <p className="mt-3 text-xl font-bold text-red-700">
                                {formatAmount(
                                    data.data.summary.totalDebitedAmount
                                )}
                            </p>
                        </div>

                        <div className="rounded-xl bg-blue-600 p-4">
                            <div className="text-xs font-medium text-slate-300">
                                Remaining
                            </div>

                            <p className="mt-3 text-xl font-bold text-white">
                                {formatAmount(
                                    data.data.summary.remainingAmount
                                )}
                            </p>
                        </div>
                    </div>

                    <div className="p-5 sm:p-6">
                        <div className="mb-4">
                            <h2 className="text-base font-semibold text-slate-900">
                                Transactions
                            </h2>

                            <p className="mt-1 text-xs text-slate-400">
                                All transactions associated with this order
                            </p>
                        </div>

                        <div className="space-y-3">
                            {data.data.transactions.map(
                                (transaction) => {
                                    const isCredit =
                                        transaction.direction === "CREDIT";

                                    return (
                                        <div
                                            key={transaction._id}
                                            className="rounded-xl border border-slate-200 p-4 transition hover:border-slate-300"
                                        >
                                            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

                                                <div className="flex min-w-0 items-start gap-3">

                                                    <div
                                                        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${isCredit
                                                                ? "bg-emerald-50 text-emerald-600"
                                                                : "bg-red-50 text-red-600"
                                                            }`}
                                                    >
                                                        {isCredit ? (
                                                            <ArrowUpRight size={18} />
                                                        ) : (
                                                            <ArrowDownRight size={18} />
                                                        )}
                                                    </div>

                                                    <div className="min-w-0">
                                                        <p className="break-words text-sm font-semibold capitalize text-slate-900">
                                                            {transaction.transactionType
                                                                .replace(/_/g, " ")
                                                                .toLowerCase()}
                                                        </p>

                                                        <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-slate-400">
                                                            <span className="flex items-center gap-1">
                                                                <CalendarDays size={12} />
                                                                {formatDate(transaction.createdAt)}
                                                            </span>

                                                            {transaction.paymentMethod && (
                                                                <span className="flex items-center gap-1 break-words">
                                                                    <CreditCard size={12} />
                                                                    {transaction.paymentMethod}
                                                                </span>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="shrink-0 sm:text-right">
                                                    <p
                                                        className={`whitespace-nowrap text-base font-bold ${isCredit
                                                                ? "text-emerald-600"
                                                                : "text-red-600"
                                                            }`}
                                                    >
                                                        {isCredit ? "+" : "-"}
                                                        {formatAmount(transaction.totalAmount)}
                                                    </p>

                                                    <span
                                                        className={`mt-1 inline-block rounded-full px-2 py-0.5 text-[10px] font-semibold ${transaction.paymentStatus === "SUCCESS"
                                                                ? "bg-emerald-50 text-emerald-700"
                                                                : "bg-slate-100 text-slate-500"
                                                            }`}
                                                    >
                                                        {transaction.paymentStatus}
                                                    </span>
                                                </div>

                                            </div>
                                        </div>
                                    );
                                }
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default TransactionDetails;