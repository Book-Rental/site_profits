import {
    ArrowLeft,
    CalendarDays,
    CreditCard,
    IndianRupee,
    RotateCcw,
} from "lucide-react";

import type { ReactNode } from "react";

import {
    useLocation,
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

interface CustomerInfo {
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

const getCustomerName = (
    firstName?: string,
    lastName?: string
) => {
    const name = [firstName, lastName]
        .filter(Boolean)
        .join(" ")
        .trim();

    return name || "Customer information unavailable";
};

const getInitials = (
    firstName?: string,
    lastName?: string
) => {
    const name = [firstName, lastName]
        .filter(Boolean)
        .join(" ")
        .trim();

    if (!name) {
        return "C";
    }

    return name
        .split(" ")
        .map((part) => part.charAt(0))
        .join("")
        .slice(0, 2)
        .toUpperCase();
};

function CustomerTransactionDetails() {
    const navigate = useNavigate();
    const location = useLocation();

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

    const customer = location.state?.customer as
        | CustomerInfo
        | undefined;


    const isPaymentPage = type !== "refunds";

    const transactions: CustomerTransaction[] =
        isPaymentPage
            ? customerData?.payments || []
            : customerData?.refunds || [];

    const handleTabChange = (
        selectedType: "payments" | "refunds"
    ) => {
        navigate(
            `/customer-summary/${customerId}/${selectedType}`,
            {
                state: {
                    customer,
                },
            }
        );
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-slate-50 p-4 sm:p-6">
                <div className="mx-auto max-w-7xl">

                    <div className="mb-6 h-5 w-40 animate-pulse rounded bg-slate-200" />

                    <div className="mb-6 h-8 w-64 animate-pulse rounded bg-slate-200" />

                    <div className="mb-6 h-24 animate-pulse rounded-2xl bg-white shadow-sm" />

                    <div className="mb-6 h-14 animate-pulse rounded-2xl bg-white shadow-sm" />

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
            <div className="min-h-screen bg-slate-50 p-4 sm:p-6">
                <div className="mx-auto max-w-7xl">

                    <button
                        type="button"
                        onClick={() =>
                            navigate("/customer-summary")
                        }
                        className="mb-6 flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-slate-900"
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
                            className="mt-4 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
                        >
                            Retry
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    if (!customerData) {
        return (
            <div className="min-h-screen bg-slate-50 p-4 sm:p-6">
                <div className="mx-auto max-w-7xl">

                    <button
                        type="button"
                        onClick={() =>
                            navigate("/customer-summary")
                        }
                        className="mb-6 flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-slate-900"
                    >
                        <ArrowLeft size={17} />
                        Back to Customer Summary
                    </button>

                    <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center">
                        <p className="font-medium text-slate-700">
                            Customer information not found.
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    const customerName = getCustomerName(
        customer?.firstName,
        customer?.lastName
    );

    return (
        <div className="min-h-screen bg-slate-50 p-4 sm:p-6">
            <div className="mx-auto max-w-7xl">

                <button
                    type="button"
                    onClick={() =>
                        navigate("/customer-summary")
                    }
                    className="mb-6 flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-slate-900"
                >
                    <ArrowLeft size={17} />
                    Back to Customer Summary
                </button>

                <div className="mb-6">
                    <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">
                        Customer Transaction Details
                    </h1>

                    <p className="mt-1 text-sm text-slate-500">
                        View all payments and refunds for this customer.
                    </p>
                </div>

                <div className="mb-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
                    <div className="flex min-w-0 flex-col gap-4 sm:flex-row sm:items-center">

                        <div className="shrink-0">
                            {customer?.profilePic ? (
                                <img
                                    src={customer.profilePic}
                                    alt={customerName}
                                    className="h-14 w-14 rounded-full object-cover"
                                    onError={(event) => {
                                        event.currentTarget.style.display =
                                            "none";

                                        event.currentTarget.nextElementSibling?.classList.remove(
                                            "hidden"
                                        );
                                    }}
                                />
                            ) : null}

                            <div
                                className={`flex h-14 w-14 items-center justify-center rounded-full bg-blue-50 text-lg font-semibold text-blue-600 ${customer?.profilePic
                                    ? "hidden"
                                    : ""
                                    }`}
                            >
                                {getInitials(
                                    customer?.firstName,
                                    customer?.lastName
                                )}
                            </div>
                        </div>

                        <div className="min-w-0 flex-1">
                            <h2 className="truncate text-lg font-semibold text-slate-900">
                                {customerName}
                            </h2>

                            <p className="mt-1 truncate text-sm text-slate-600">
                                {customer?.email ||
                                    "No email available"}
                            </p>

                            <p className="mt-1 break-all text-xs text-slate-400">
                                Customer ID:{" "}
                                {customer?.customerId ||
                                    customerId}
                            </p>
                        </div>

                        <div className="shrink-0 sm:text-right">
                            <p className="text-xs text-slate-400">
                                Net Amount
                            </p>

                            <p className="mt-1 text-xl font-bold text-slate-900">
                                {formatAmount(
                                    customerData.totalPaid -
                                    customerData.totalRefunded
                                )}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="mb-6 rounded-2xl border border-slate-200 bg-white p-1 shadow-sm">
                    <div className="grid grid-cols-2 gap-1">

                        <button
                            type="button"
                            onClick={() =>
                                handleTabChange("payments")
                            }
                            className={`flex min-w-0 items-center justify-center gap-2 rounded-xl px-3 py-3 text-sm font-semibold transition sm:px-4 ${isPaymentPage
                                ? "bg-blue-100 text-blue-600"
                                : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                                }`}
                        >
                            <CreditCard
                                size={17}
                                className="shrink-0"
                            />

                            <span>
                                Payments
                            </span>

                            <span
                                className={`rounded-full px-2 py-0.5 text-xs ${isPaymentPage
                                    ? "bg-blue-100 text-blue-700"
                                    : "bg-slate-100 text-slate-500"
                                    }`}
                            >
                                {customerData.paymentCount}
                            </span>
                        </button>

                        <button
                            type="button"
                            onClick={() =>
                                handleTabChange("refunds")
                            }
                            className={`flex min-w-0 items-center justify-center gap-2 rounded-xl px-3 py-3 text-sm font-semibold transition sm:px-4 ${!isPaymentPage
                                ? "bg-red-50 text-red-600"
                                : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                                }`}
                        >
                            <RotateCcw
                                size={17}
                                className="shrink-0"
                            />

                            <span>
                                Refunds
                            </span>

                            <span
                                className={`rounded-full px-2 py-0.5 text-xs ${!isPaymentPage
                                    ? "bg-red-100 text-red-600"
                                    : "bg-slate-100 text-slate-500"
                                    }`}
                            >
                                {customerData.refundCount}
                            </span>
                        </button>
                    </div>
                </div>

                <div className="mb-6 grid gap-4 sm:grid-cols-2">

                    {isPaymentPage ? (
                        <>
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
                    ) : (
                        <>
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

                <TransactionSection
                    title={
                        isPaymentPage
                            ? "Payment History"
                            : "Refund History"
                    }
                    icon={
                        isPaymentPage ? (
                            <CreditCard size={19} />
                        ) : (
                            <RotateCcw size={19} />
                        )
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

            <div className="flex min-w-0 items-center justify-between border-b border-slate-200 px-5 py-5 sm:px-6">
                <div className="flex min-w-0 items-center gap-3">

                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-50 text-slate-600">
                        {icon}
                    </div>

                    <div className="min-w-0">
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
                    <div className="hidden overflow-x-auto md:block">
                        <table className="w-full min-w-max">

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
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-2 whitespace-nowrap text-sm text-slate-700">
                                                    <CalendarDays
                                                        size={15}
                                                        className="shrink-0 text-slate-400"
                                                    />

                                                    {formatDate(
                                                        transaction.createdAt
                                                    )}
                                                </div>
                                            </td>

                                            <td className="px-6 py-4">
                                                <span className="whitespace-nowrap font-mono text-sm text-slate-700">
                                                    {transaction.transactionId}
                                                </span>
                                            </td>

                                            <td className="px-6 py-4">
                                                <span className="whitespace-nowrap font-mono text-sm text-slate-600">
                                                    {transaction.orderId}
                                                </span>
                                            </td>

                                            <td className="px-6 py-4">
                                                <span className="whitespace-nowrap rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
                                                    {transaction.paymentMethod}
                                                </span>
                                            </td>

                                            <td className="px-6 py-4 text-right">
                                                <span
                                                    className={`whitespace-nowrap text-sm font-semibold ${type === "payment"
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

                    <div className="divide-y divide-slate-100 md:hidden">

                        {transactions.map(
                            (transaction) => (
                                <div
                                    key={transaction._id}
                                    className="p-5"
                                >

                                    <div className="flex min-w-0 items-start justify-between gap-3">

                                        <div className="min-w-0 flex-1">
                                            <p className="break-all font-mono text-sm font-medium text-slate-700">
                                                {transaction.transactionId}
                                            </p>

                                            <p className="mt-1 break-all text-xs text-slate-400">
                                                Order:{" "}
                                                {transaction.orderId}
                                            </p>
                                        </div>

                                        <p
                                            className={`shrink-0 whitespace-nowrap text-sm font-bold ${type === "payment"
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