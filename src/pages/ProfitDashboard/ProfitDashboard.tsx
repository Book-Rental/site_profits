import { ArrowDownRight, ArrowUpRight, BookOpen, RotateCcw, TrendingUp, } from "lucide-react";
import type { WidgetOptions } from "../../index.widget";
import { useProfitSummary } from "../../hooks/useProfitSummary";
import { useNavigate } from "react-router-dom";

interface ProfitDashboardProps {
    options: WidgetOptions;
}

const formatAmount = (amount: number) => {
    return new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        maximumFractionDigits: 2,
    }).format(amount);
};

const ProfitDashboard = ({
    options,
}: ProfitDashboardProps) => {
    void options;
    const navigate = useNavigate();
    const {
        data,
        isLoading,
        isError,
        error,
        refetch,
    } = useProfitSummary();

    if (isLoading) {
        return (
            <div className="min-h-screen bg-slate-50 p-4 sm:p-6 lg:p-8">
                <div className="mx-auto max-w-7xl">
                    <div className="mb-8">
                        <div className="h-8 w-48 animate-pulse rounded-lg bg-slate-200" />
                        <div className="mt-3 h-4 w-80 animate-pulse rounded bg-slate-200" />
                    </div>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                        {[1, 2, 3, 4, 5].map((item) => (
                            <div
                                key={item}
                                className="rounded-2xl border border-slate-200 bg-white p-5"
                            >
                                <div className="h-4 w-24 animate-pulse rounded bg-slate-200" />
                                <div className="mt-5 h-8 w-32 animate-pulse rounded bg-slate-200" />
                                <div className="mt-3 h-3 w-28 animate-pulse rounded bg-slate-100" />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    if (isError) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-slate-50 p-6">
                <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-50 text-red-600">
                        !
                    </div>

                    <h2 className="mt-4 text-lg font-semibold text-slate-900">
                        Unable to load profit summary
                    </h2>

                    <p className="mt-2 text-sm text-slate-500">
                        {error instanceof Error
                            ? error.message
                            : "Something went wrong."}
                    </p>

                    <button
                        type="button"
                        onClick={() => refetch()}
                        className="mt-6 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-slate-800"
                    >
                        Try Again
                    </button>
                </div>
            </div>
        );
    }

    const profit = data?.data;

    if (!profit) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-slate-50">
                <p className="text-sm text-slate-500">
                    No profit data available.
                </p>
            </div>
        );
    }

    return (
        <div className="bg-slate-50">
            <main className="p-4 sm:p-6 lg:p-8">
                <div className="mx-auto max-w-7xl">
                    <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
                        <div>
                            <div className="flex items-center gap-3">
                                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600 text-white shadow-sm">
                                    <TrendingUp size={22} />
                                </div>

                                <div>
                                    <h1 className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
                                        Site Profit
                                    </h1>

                                    <p className="mt-1 text-sm text-slate-800">
                                        Overview of site's financial performance
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mb-6 rounded-2xl border border-slate-200 bg-white px-6 py-5 shadow-sm sm:px-7">
                        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                            <div className="flex min-w-0 items-start gap-3 sm:items-center sm:gap-4">
                                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                                    <TrendingUp size={21} />
                                </div>

                                <div>
                                    <div className="flex items-center gap-2">
                                        <p className="text-sm font-medium text-slate-900">
                                            Current Site Earnings
                                        </p>
                                    </div>

                                    <p className="mt-1 text-xs text-slate-800">
                                        Payments minus seller payouts and refunds
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center justify-between gap-3 sm:justify-end sm:gap-4">
                                <div className="text-right">
                                    <p className="whitespace-nowrap text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
                                        {formatAmount(profit.remainingAmount)}
                                    </p>

                                    <p className="mt-1 text-xs font-medium text-emerald-600">
                                        Net site earnings
                                    </p>
                                </div>

                                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                                    <ArrowUpRight size={19} />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                            <div className="flex items-start justify-between">
                                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                                    <BookOpen size={19} />
                                </div>

                                <span className="text-xs font-medium text-slate-400">
                                    Orders
                                </span>
                            </div>

                            <p className="mt-5 text-sm font-medium text-slate-900">
                                Total Orders
                            </p>

                            <p className="mt-1 text-xl font-bold sm:text-2xl text-slate-900">
                                {profit.totalOrders.toLocaleString("en-IN")}
                            </p>

                            <p className="mt-2 text-xs text-slate-800">
                                All orders placed on the site
                            </p>
                        </div>

                        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                            <div className="flex items-start justify-between">
                                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                                    <ArrowUpRight size={19} />
                                </div>

                                <span className="text-xs font-medium text-slate-400">
                                    Credit
                                </span>
                            </div>

                            <p className="mt-5 text-sm font-medium text-slate-900">
                                Total Payments
                            </p>

                            <p className="mt-1 text-xl font-bold sm:text-2xl text-slate-900">
                                {formatAmount(profit.totalCustomerPayments)}
                            </p>

                            <p className="mt-2 text-xs text-emerald-600">
                                Total amount received
                            </p>
                        </div>

                        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                            <div className="flex items-start justify-between">
                                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-50 text-orange-600">
                                    <ArrowDownRight size={19} />
                                </div>

                                <span className="text-xs font-medium text-slate-400">
                                    Debit
                                </span>
                            </div>

                            <p className="mt-5 text-sm font-medium text-slate-900">
                                Seller Payouts
                            </p>

                            <p className="mt-1 text-xl font-bold sm:text-2xl text-slate-900">
                                {formatAmount(profit.totalSellerPayout)}
                            </p>

                            <p className="mt-2 text-xs text-orange-600">
                                Paid to sellers
                            </p>
                        </div>

                        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                            <div className="flex items-start justify-between">
                                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-50 text-red-600">
                                    <RotateCcw size={19} />
                                </div>

                                <span className="text-xs font-medium text-slate-400">
                                    Debit
                                </span>
                            </div>

                            <p className="mt-5 text-sm font-medium text-slate-900">
                                Customer Refunds
                            </p>

                            <p className="mt-1 text-xl font-bold sm:text-2xl text-slate-900">
                                {formatAmount(profit.totalRefund)}
                            </p>

                            <p className="mt-2 text-xs text-red-600">
                                Returned to customers
                            </p>
                        </div>
                    </div>

                    <div className="mt-6 rounded-2xl border border-slate-200 bg-white shadow-sm">
                        <div className="border-b border-slate-100 px-6 py-5">
                            <h2 className="text-base font-semibold text-slate-900">
                                Financial Breakdown
                            </h2>

                            <p className="mt-1 text-sm text-slate-800">
                                Summary of money flowing through the site
                            </p>
                        </div>

                        <div className="divide-y divide-slate-100">
                            <button
                                type="button"
                                onClick={() => navigate("/orders")}
                                className="flex w-full flex-col gap-3 px-5 py-4 text-left transition hover:bg-slate-50 sm:flex-row sm:items-center sm:justify-between sm:px-6"
                            >
                                <div>
                                    <p className="text-sm font-medium text-slate-900">
                                        Total Payments
                                    </p>

                                    <p className="mt-1 text-xs text-slate-800">
                                        Money received from customers
                                    </p>
                                </div>

                                <span className="whitespace-nowrap self-start font-semibold text-emerald-600 sm:self-auto">
                                    +{formatAmount(profit.totalCustomerPayments)}
                                </span>
                            </button>

                            <button
                                type="button"
                                onClick={() => navigate("/seller-payouts")}
                                className="flex w-full flex-col gap-3 px-5 py-4 text-left transition hover:bg-slate-50 sm:flex-row sm:items-center sm:justify-between sm:px-6"
                            >
                                <div>
                                    <p className="text-sm font-medium text-slate-900">
                                        Seller Payouts
                                    </p>

                                    <p className="mt-1 text-xs text-slate-800">
                                        Money paid to sellers
                                    </p>
                                </div>

                                <span className="whitespace-nowrap font-semibold text-red-500">
                                    -{formatAmount(profit.totalSellerPayout)}
                                </span>
                            </button>

                            <button
                                type="button"
                                onClick={() => navigate("/customer-summary")}
                                className="flex w-full flex-col gap-3 px-5 py-4 text-left transition hover:bg-slate-50 sm:flex-row sm:items-center sm:justify-between sm:px-6"
                            >
                                <div>
                                    <p className="text-sm font-medium text-slate-900">
                                        Customer Refunds
                                    </p>

                                    <p className="mt-1 text-xs text-slate-800">
                                        Money returned to customers
                                    </p>
                                </div>

                                <span className="whitespace-nowrap font-semibold text-red-500">
                                    -{formatAmount(profit.totalRefund)}
                                </span>
                            </button>

                            <div className="flex flex-col gap-3 bg-slate-50 px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
                                <div>
                                    <p className="text-sm font-semibold text-slate-900">
                                        Site Earnings
                                    </p>

                                    <p className="mt-1 text-xs text-slate-800">
                                        Payments minus payouts and refunds
                                    </p>
                                </div>

                                <span className="whitespace-nowrap self-start font-semibold text-emerald-600 sm:self-auto">
                                    {formatAmount(profit.remainingAmount)}
                                </span>
                            </div>
                        </div>
                    </div>

                </div>
            </main >
        </div >
    );
}

export default ProfitDashboard;