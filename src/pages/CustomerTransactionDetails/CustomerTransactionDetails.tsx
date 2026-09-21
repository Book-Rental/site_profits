import {
    ArrowLeft,
    CalendarDays,
    CreditCard,
    IndianRupee,
    RotateCcw,
} from "lucide-react";

import type { ReactNode } from "react";

import {
    useNavigate,
    useParams,
} from "react-router-dom";

import { useCustomerTransactionDetails } from "../../hooks/useCustomerTransactionDetails";

interface CustomerTransaction {
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

const formatAmount = (amount: number) => {
    return new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        maximumFractionDigits: 2,
    }).format(amount);
};

const formatDate = (date: string) => {
    return new Date(date).toLocaleString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    });
};

function CustomerTransactionDetails() {
    const navigate = useNavigate();

    const { customerId, type } = useParams<{
        customerId: string;
        type: string;
    }>();

    const {
        data,
        isLoading,
        isError,
        refetch,
    } = useCustomerTransactionDetails(
        customerId || ""
    );

    const customerData = data?.data;

    /*
     * type comes from the URL:
     *
     * /customer-summary/:customerId/payments
     * /customer-summary/:customerId/refunds
     */
    const isPaymentPage = type === "payments";

    /*
     * Only show the transactions related to
     * the page the user selected.
     */
    const transactions: CustomerTransaction[] =
        isPaymentPage
            ? customerData?.payments || []
            : customerData?.refunds || [];

    if (isLoading) {
        return (
            <div className="min-h-screen bg-slate-50 p-6">
                <div className="mx-auto max-w-7xl">

                    <div className="mb-6 h-8 w-56 animate-pulse rounded bg-slate-200" />

                    <div className="mb-6 grid gap-4 sm:grid-cols-2">
                        {[1, 2].map((item) => (
                            <div
                                key={item}
                                className="h-32 animate-pulse rounded-2xl bg-white shadow-sm"
                            />
                        ))}
                    </div>

                    <div className="h-96 animate-pulse rounded-2xl bg-white shadow-sm" />
                </div>
            </div>
        );
    }

    if (isError) {
        return (
            <div className="min-h-screen bg-slate-50 p-6">
                <div className="mx-auto max-w-7xl">

                    <button
                        type="button"
                        onClick={() =>
                            navigate("/customer-summary")
                        }
                        className="mb-6 flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-slate-900"
                    >
                        <ArrowLeft size={17} />
                        Back to Customer Summary
                    </button>

                    <div className="rounded-2xl border border-red-100 bg-white p-10 text-center">
                        <p className="font-semibold text-slate-900">
                            Failed to load customer transactions
                        </p>

                        <p className="mt-1 text-sm text-slate-500">
                            Please try again.
                        </p>

                        <button
                            type="button"
                            onClick={() => refetch()}
                            className="mt-4 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
                        >
                            Retry
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    if (!customerData) {
        return null;
    }

    return (
        <div className="min-h-screen bg-slate-50 p-6">
            <div className="mx-auto max-w-7xl">

                {/* Back */}
                <button
                    type="button"
                    onClick={() =>
                        navigate("/customer-summary")
                    }
                    className="mb-6 flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-slate-900"
                >
                    <ArrowLeft size={17} />
                    Back to Customer Summary
                </button>

                {/* Header */}
                <div className="mb-6">
                    <h1 className="text-2xl font-bold text-slate-900">
                        {isPaymentPage
                            ? "Customer Payment History"
                            : "Customer Refund History"}
                    </h1>

                    <p className="mt-1 text-sm text-slate-500">
                        {isPaymentPage
                            ? "View all successful payments made by this customer."
                            : "View all successful refunds received by this customer."}
                    </p>
                </div>

                {/* Summary */}
                <div className="mb-6 grid gap-4 sm:grid-cols-2">

                    {/* Payment Summary */}
                    {isPaymentPage && (
                        <>
                            {/* Total Payments */}
                            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                                <div className="flex items-start justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-slate-500">
                                            Total Payments
                                        </p>

                                        <p className="mt-2 text-2xl font-bold text-slate-900">
                                            {customerData.paymentCount}
                                        </p>

                                        <p className="mt-1 text-xs text-slate-400">
                                            Successful payments
                                        </p>
                                    </div>

                                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                                        <CreditCard size={19} />
                                    </div>
                                </div>
                            </div>

                            {/* Total Paid */}
                            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                                <div className="flex items-start justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-slate-500">
                                            Total Paid
                                        </p>

                                        <p className="mt-2 text-2xl font-bold text-slate-900">
                                            {formatAmount(
                                                customerData.totalPaid
                                            )}
                                        </p>

                                        <p className="mt-1 text-xs text-slate-400">
                                            Total successful payment amount
                                        </p>
                                    </div>

                                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                                        <IndianRupee size={19} />
                                    </div>
                                </div>
                            </div>
                        </>
                    )}

                    {/* Refund Summary */}
                    {!isPaymentPage && (
                        <>
                            {/* Total Refunds */}
                            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                                <div className="flex items-start justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-slate-500">
                                            Total Refunds
                                        </p>

                                        <p className="mt-2 text-2xl font-bold text-slate-900">
                                            {customerData.refundCount}
                                        </p>

                                        <p className="mt-1 text-xs text-slate-400">
                                            Successful refunds
                                        </p>
                                    </div>

                                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-50 text-red-600">
                                        <RotateCcw size={19} />
                                    </div>
                                </div>
                            </div>

                            {/* Total Refunded */}
                            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                                <div className="flex items-start justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-slate-500">
                                            Total Refunded
                                        </p>

                                        <p className="mt-2 text-2xl font-bold text-slate-900">
                                            {formatAmount(
                                                customerData.totalRefunded
                                            )}
                                        </p>

                                        <p className="mt-1 text-xs text-slate-400">
                                            Total successful refund amount
                                        </p>
                                    </div>

                                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-50 text-red-600">
                                        <RotateCcw size={19} />
                                    </div>
                                </div>
                            </div>
                        </>
                    )}
                </div>

                {/* Transaction History */}
                <TransactionSection
                    title={
                        isPaymentPage
                            ? "Payment History"
                            : "Refund History"
                    }
                    icon={
                        isPaymentPage
                            ? <CreditCard size={19} />
                            : <RotateCcw size={19} />
                    }
                    transactions={transactions}
                    type={
                        isPaymentPage
                            ? "payment"
                            : "refund"
                    }
                />

            </div>
        </div>
    );
}

interface TransactionSectionProps {
    title: string;
    icon: ReactNode;
    transactions: CustomerTransaction[];
    type: "payment" | "refund";
}

function TransactionSection({
    title,
    icon,
    transactions,
    type,
}: TransactionSectionProps) {
    return (
        <div className="mb-6 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

            {/* Section Header */}
            <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5">
                <div className="flex items-center gap-3">

                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-50 text-slate-600">
                        {icon}
                    </div>

                    <div>
                        <h2 className="font-semibold text-slate-900">
                            {title}
                        </h2>

                        <p className="mt-1 text-xs text-slate-400">
                            {transactions.length}{" "}
                            {type === "payment"
                                ? transactions.length === 1
                                    ? "successful payment"
                                    : "successful payments"
                                : transactions.length === 1
                                    ? "successful refund"
                                    : "successful refunds"}
                        </p>
                    </div>

                </div>
            </div>

            {/* Empty State */}
            {transactions.length === 0 ? (
                <div className="px-6 py-12 text-center">

                    <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-slate-50 text-slate-400">
                        {type === "payment" ? (
                            <CreditCard size={21} />
                        ) : (
                            <RotateCcw size={21} />
                        )}
                    </div>

                    <p className="text-sm font-medium text-slate-700">
                        {type === "payment"
                            ? "No payments found"
                            : "No refunds found"}
                    </p>

                    <p className="mt-1 text-sm text-slate-400">
                        {type === "payment"
                            ? "This customer has no successful payments."
                            : "This customer has no successful refunds."}
                    </p>

                </div>
            ) : (
                <>
                    {/* =========================
                        DESKTOP TABLE
                    ========================== */}
                    <div className="hidden overflow-x-auto md:block">
                        <table className="w-full">

                            <thead className="bg-slate-50">
                                <tr className="text-left text-xs font-semibold uppercase tracking-wide text-slate-500">

                                    <th className="px-6 py-4">
                                        Date
                                    </th>

                                    <th className="px-6 py-4">
                                        Transaction ID
                                    </th>

                                    <th className="px-6 py-4">
                                        Order ID
                                    </th>

                                    <th className="px-6 py-4">
                                        Payment Method
                                    </th>

                                    <th className="px-6 py-4 text-right">
                                        Amount
                                    </th>

                                </tr>
                            </thead>

                            <tbody className="divide-y divide-slate-100">
                                {transactions.map(
                                    (transaction) => (
                                        <tr
                                            key={transaction._id}
                                            className="transition hover:bg-slate-50"
                                        >

                                            {/* Date */}
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-2 text-sm text-slate-700">
                                                    <CalendarDays
                                                        size={15}
                                                        className="text-slate-400"
                                                    />

                                                    {formatDate(
                                                        transaction.createdAt
                                                    )}
                                                </div>
                                            </td>

                                            {/* Transaction ID */}
                                            <td className="px-6 py-4">
                                                <span className="font-mono text-sm text-slate-700">
                                                    {transaction.transactionId}
                                                </span>
                                            </td>

                                            {/* Order ID */}
                                            <td className="px-6 py-4">
                                                <span className="font-mono text-sm text-slate-600">
                                                    {transaction.orderId}
                                                </span>
                                            </td>

                                            {/* Payment Method */}
                                            <td className="px-6 py-4">
                                                <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
                                                    {transaction.paymentMethod}
                                                </span>
                                            </td>

                                            {/* Amount */}
                                            <td className="px-6 py-4 text-right">
                                                <span
                                                    className={`text-sm font-semibold ${
                                                        type === "payment"
                                                            ? "text-emerald-600"
                                                            : "text-red-500"
                                                    }`}
                                                >
                                                    {type === "payment"
                                                        ? "+"
                                                        : "-"}
                                                    {formatAmount(
                                                        transaction.totalAmount
                                                    )}
                                                </span>
                                            </td>

                                        </tr>
                                    )
                                )}
                            </tbody>

                        </table>
                    </div>

                    {/* =========================
                        MOBILE CARDS
                    ========================== */}
                    <div className="divide-y divide-slate-100 md:hidden">

                        {transactions.map(
                            (transaction) => (
                                <div
                                    key={transaction._id}
                                    className="p-5"
                                >

                                    <div className="flex items-start justify-between gap-4">

                                        <div>
                                            <p className="font-mono text-sm font-medium text-slate-700">
                                                {transaction.transactionId}
                                            </p>

                                            <p className="mt-1 text-xs text-slate-400">
                                                Order:{" "}
                                                {transaction.orderId}
                                            </p>
                                        </div>

                                        <p
                                            className={`text-sm font-bold ${
                                                type === "payment"
                                                    ? "text-emerald-600"
                                                    : "text-red-500"
                                            }`}
                                        >
                                            {type === "payment"
                                                ? "+"
                                                : "-"}
                                            {formatAmount(
                                                transaction.totalAmount
                                            )}
                                        </p>

                                    </div>

                                    <div className="mt-3 flex items-center gap-2 text-xs text-slate-500">
                                        <CalendarDays size={14} />

                                        {formatDate(
                                            transaction.createdAt
                                        )}
                                    </div>

                                    <div className="mt-2 text-xs text-slate-500">
                                        Payment method:{" "}
                                        <span className="font-medium">
                                            {transaction.paymentMethod}
                                        </span>
                                    </div>

                                </div>
                            )
                        )}

                    </div>
                </>
            )}
        </div>
    );
}

export default CustomerTransactionDetails;