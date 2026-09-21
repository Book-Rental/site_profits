import { ChevronLeft, ChevronRight, Package } from "lucide-react";
import { useNavigate } from "react-router-dom";
import type { WidgetOptions } from "../../index.widget";
import { useState } from "react";
import { useOrders } from "../../hooks/useOrders";
import OrdersList from "../../components/OrdersList";


interface OrdersProps {
    options: WidgetOptions;
}

const Orders = ({ options }: OrdersProps) => {
    void options;

    const [page, setPage] = useState(1);
    const navigate = useNavigate();

    const {
        data,
        isLoading,
        isError,
        error,
    } = useOrders(page, 10);

    const orders = data?.data.orders || [];
    const meta = data?.data.meta;

    const totalPages = meta?.totalPages || 1;

    const getPageNumbers = () => {
        const pages: (number | string)[] = [];

        if (totalPages <= 7) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }

            return pages;
        }

        pages.push(1);

        if (page > 4) {
            pages.push("...");
        }

        const start = Math.max(2, page - 2);
        const end = Math.min(totalPages - 1, page + 2);

        for (let i = start; i <= end; i++) {
            pages.push(i);
        }

        if (page < totalPages - 3) {
            pages.push("...");
        }

        pages.push(totalPages);

        return pages;
    };

    return (
        <div className="min-h-screen bg-slate-50">
            <main className="p-4 sm:p-6 lg:p-8">
                <div className="mx-auto max-w-7xl">
                    <div className="mx-auto max-w-7xl">

                        <div className="mb-7">
                            <div className="flex items-center gap-3">
                                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600 text-white">
                                    <Package size={21} />
                                </div>

                                <div>
                                    <h1 className="text-2xl font-bold tracking-tight text-slate-900">
                                        Orders
                                    </h1>

                                    <p className="mt-1 text-sm text-slate-800">
                                        View orders and their transaction details
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">

                            <div className="flex flex-col justify-between gap-3 border-b border-slate-100 px-6 py-5 sm:flex-row sm:items-center">
                                <div>
                                    <h2 className="text-base font-semibold text-slate-900">
                                        All Orders
                                    </h2>

                                    {meta && (
                                        <p className="mt-1 text-xs text-slate-800">
                                            {meta.totalRecords.toLocaleString("en-IN")} total orders
                                        </p>
                                    )}
                                </div>
                            </div>

                            {isLoading && (
                                <div className="space-y-3 p-6">
                                    {[1, 2, 3, 4, 5].map((item) => (
                                        <div
                                            key={item}
                                            className="h-28 animate-pulse rounded-xl bg-slate-100"
                                        />
                                    ))}
                                </div>
                            )}

                            {isError && (
                                <div className="p-10 text-center">
                                    <p className="font-medium text-red-600">
                                        Failed to load orders
                                    </p>

                                    <p className="mt-1 text-sm text-slate-500">
                                        {error instanceof Error
                                            ? error.message
                                            : "Something went wrong."}
                                    </p>
                                </div>
                            )}

                            {!isLoading && !isError && (
                                <div className="p-4 sm:p-6">
                                    <OrdersList
                                        orders={orders}
                                        onOrderClick={(orderId) =>
                                            navigate(
                                                `/orders/${orderId}/transactions`
                                            )
                                        }
                                    />
                                </div>
                            )}

                            {meta && !isLoading && !isError && (
                                <div className="flex flex-col items-center justify-between gap-4 border-t border-slate-100 px-6 py-4 sm:flex-row">

                                    <p className="text-sm text-slate-800">
                                        Page{" "}
                                        <span className="font-semibold text-slate-700">
                                            {page}
                                        </span>{" "}
                                        of{" "}
                                        <span className="font-semibold text-slate-700">
                                            {totalPages}
                                        </span>
                                    </p>

                                    <div className="flex items-center gap-1">
                                        <button
                                            type="button"
                                            disabled={page === 1}
                                            onClick={() =>
                                                setPage((previous) => previous - 1)
                                            }
                                            className="flex h-9 items-center gap-1 rounded-lg border border-slate-200 px-3 text-sm font-medium text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
                                        >
                                            <ChevronLeft size={16} />

                                            <span className="hidden sm:inline">
                                                Previous
                                            </span>
                                        </button>

                                        <div className="flex items-center gap-1">
                                            {getPageNumbers().map(
                                                (pageNumber, index) => {
                                                    if (pageNumber === "...") {
                                                        return (
                                                            <span
                                                                key={`ellipsis-${index}`}
                                                                className="flex h-9 w-9 items-center justify-center text-sm text-slate-400"
                                                            >
                                                                ...
                                                            </span>
                                                        );
                                                    }

                                                    return (
                                                        <button
                                                            key={pageNumber}
                                                            type="button"
                                                            onClick={() =>
                                                                setPage(pageNumber as number)
                                                            }
                                                            className={`flex h-9 min-w-9 items-center justify-center rounded-lg px-2 text-sm font-medium transition ${page === pageNumber
                                                                ? "bg-blue-600 text-white shadow-sm"
                                                                : "text-slate-600 hover:bg-slate-100"
                                                                }`}
                                                        >
                                                            {pageNumber}
                                                        </button>
                                                    );
                                                }
                                            )}
                                        </div>

                                        <button
                                            type="button"
                                            disabled={!meta.hasMore}
                                            onClick={() =>
                                                setPage((previous) => previous + 1)
                                            }
                                            className="flex h-9 items-center gap-1 rounded-lg bg-blue-600 px-3 text-sm font-medium text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-40"
                                        >
                                            <span className="hidden sm:inline">
                                                Next
                                            </span>

                                            <ChevronRight size={16} />
                                        </button>

                                    </div>
                                </div>
                            )}

                        </div>

                    </div>
                </div>
            </main>
        </div>
    );
}

export default Orders;