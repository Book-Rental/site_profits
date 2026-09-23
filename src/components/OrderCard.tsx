import { ArrowRight, BookOpen, CalendarDays, IndianRupee, } from "lucide-react";
import type { Order } from "../types/order";

interface OrderCardProps {
    order: Order;
    onClick: (orderId: string) => void;
}

const formatDate = (date: string) => {
    return new Intl.DateTimeFormat("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
    }).format(new Date(date));
};

const OrderCard = ({
    order,
    onClick,
}: OrderCardProps) => {
    return (
        <button
            type="button"
            onClick={() => onClick(order.orderId)}
            className="group w-full rounded-xl border border-slate-200 bg-white p-5 text-left transition duration-200 hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md"
        >
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">

                <div className="min-w-0">
                    <div className="flex min-w-0 items-center gap-2">
                        <span className="min-w-0 truncate text-sm font-semibold text-slate-900">
                            {order.orderNumber}
                        </span>

                        <span className="shrink-0 rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-slate-500">
                            Order
                        </span>
                    </div>

                    <div className="mt-2 flex items-center gap-1.5 text-xs text-slate-800">
                        <CalendarDays size={13} />
                        {formatDate(order.orderDate)}
                    </div>
                </div>

                <div className="flex shrink-0 items-center gap-1 whitespace-nowrap text-base font-bold text-slate-900">
                    <IndianRupee size={16} />
                    {order.totalAmount.toLocaleString("en-IN", {
                        minimumFractionDigits: 2,
                    })}
                </div>
            </div>

            <div className="mt-5 flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-blue-50 px-2.5 py-1 text-xs font-medium text-blue-700">
                    {order.orderStatus}
                </span>

                <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-700">
                    Payment: {order.paymentStatus}
                </span>
            </div>

            <div className="mt-4 flex min-w-0 items-start gap-2">
                <BookOpen
                    size={15}
                    className="mt-0.5 shrink-0 text-slate-800"
                />

                <div className="flex min-w-0 flex-1 flex-wrap gap-1.5">
                    {order.items.map((item) => (
                        <span
                            key={item.bookId}
                            className="max-w-full break-words rounded-md bg-slate-50 px-2 py-1 text-xs text-slate-800"
                        >
                            {item.bookName}
                        </span>
                    ))}
                </div>
            </div>

            <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4">
                <span className="text-xs text-slate-800">
                    {order.items.length}{" "}
                    {order.items.length === 1 ? "book" : "books"}
                </span>

                <span className="flex items-center gap-1 text-xs font-semibold text-blue-600 transition group-hover:gap-2">
                    View transactions
                    <ArrowRight size={14} />
                </span>
            </div>
        </button>
    );
}

export default OrderCard;