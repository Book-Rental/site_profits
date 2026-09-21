import type { Order } from "../types/order";
import OrderCard from "./OrderCard";

interface OrdersListProps {
    orders: Order[];
    onOrderClick: (orderId: string) => void;
}

const OrdersList = ({
    orders,
    onOrderClick,
}: OrdersListProps) => {
    if (orders.length === 0) {
        return (
            <div className="rounded-xl border border-dashed border-slate-300 py-16 text-center">
                <p className="text-sm font-medium text-slate-700">
                    No orders found
                </p>

                <p className="mt-1 text-xs text-slate-400">
                    There are no orders available for this page.
                </p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
            {orders.map((order) => (
                <OrderCard
                    key={order.orderId}
                    order={order}
                    onClick={onOrderClick}
                />
            ))}
        </div>
    );
}

export default OrdersList;