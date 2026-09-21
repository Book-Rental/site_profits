import { ArrowLeft } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import type { WidgetOptions } from "../../index.widget";
import TransactionDetails from "../../components/TransactionDetails";

interface TransactionDetailsPageProps {
    options: WidgetOptions;
}

const TransactionDetailsPage = ({
    options,
}: TransactionDetailsPageProps) => {
    void options;

    const { orderId } = useParams();
    const navigate = useNavigate();

    if (!orderId) {
        return (
            <div className="min-h-screen bg-slate-50 p-6">
                <div className="mx-auto max-w-4xl">
                    <p className="text-sm text-red-600">
                        Order ID is missing.
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50">
            <main className="p-4 sm:p-6 lg:p-8">
                <div className="mx-auto max-w-4xl">

                    <button
                        type="button"
                        onClick={() => navigate("/orders")}
                        className="mb-5 flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-slate-900"
                    >
                        <ArrowLeft size={17} />
                        Back to Orders
                    </button>

                    <TransactionDetails
                        orderId={orderId}
                        onClose={() => navigate("/orders")}
                    />

                </div>
            </main>
        </div>
    );
}

export default TransactionDetailsPage;