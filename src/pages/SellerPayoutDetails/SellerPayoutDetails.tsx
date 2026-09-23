import {
  ArrowLeft,
  CalendarDays,
  CreditCard,
  IndianRupee,
  Receipt,
} from "lucide-react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import { useSellerPayoutDetails } from "../../hooks/useSellerPayoutDetails";

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

function SellerPayoutDetails() {
  const { sellerId } = useParams<{ sellerId: string }>();
  const navigate = useNavigate();
  const location = useLocation();

  const seller = location.state?.seller;

  const {
    data,
    isLoading,
    isError,
    refetch,
  } = useSellerPayoutDetails(sellerId || "");

  const payoutData = data?.data;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 p-4 sm:p-6 lg:p-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-6 h-8 w-48 animate-pulse rounded bg-slate-200" />

          <div className="mb-6 grid gap-4 sm:grid-cols-2">
            <div className="h-32 animate-pulse rounded-2xl bg-white shadow-sm" />
            <div className="h-32 animate-pulse rounded-2xl bg-white shadow-sm" />
          </div>

          <div className="h-96 animate-pulse rounded-2xl bg-white shadow-sm" />
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen bg-slate-50 p-4 sm:p-6 lg:p-8">
        <div className="mx-auto max-w-7xl">
          <button
            onClick={() => navigate("/seller-payouts")}
            className="mb-6 flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-slate-900"
          >
            <ArrowLeft size={17} />
            Back to Seller Payouts
          </button>

          <div className="rounded-2xl border border-red-100 bg-white p-10 text-center">
            <p className="font-medium text-slate-900">
              Failed to load payout details
            </p>

            <p className="mt-1 text-sm text-slate-500">
              Please try again.
            </p>

            <button
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

  return (
    <div className="min-h-screen bg-slate-50 p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl">

        <button
          onClick={() => navigate("/seller-payouts")}
          className="mb-6 flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-slate-900"
        >
          <ArrowLeft size={17} />
          Back to Seller Payouts
        </button>
        <div className="mb-6">
          <h1 className="text-xl font-bold text-slate-900 sm:text-2xl">
            Seller Payout History
          </h1>

          <p className="mt-1 text-sm text-slate-800">
            Detailed history of payouts made to this seller
          </p>
        </div>

        <div className="mb-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <div className="flex min-w-0 flex-col gap-4 sm:flex-row sm:items-center">
            <div className="shrink-0">
              {seller?.profilePic ? (
                <img
                  src={seller.profilePic}
                  alt="Seller"
                  className="h-14 w-14 rounded-full object-cover"
                  onError={(event) => {
                    event.currentTarget.style.display = "none";
                    event.currentTarget.nextElementSibling?.classList.remove(
                      "hidden"
                    );
                  }}
                />
              ) : null}

              <div
                className={`flex h-14 w-14 items-center justify-center rounded-full bg-blue-50 text-lg font-semibold text-blue-600 ${seller?.profilePic ? "hidden" : ""
                  }`}
              >
                {seller?.firstName?.charAt(0)?.toUpperCase() || "S"}
              </div>
            </div>

            <div className="min-w-0">
              <h2 className="truncate text-lg font-semibold text-slate-900">
                {[seller?.firstName, seller?.lastName]
                  .filter(Boolean)
                  .join(" ") || "Seller information unavailable"}
              </h2>

              <p className="mt-1 truncate text-sm text-slate-600">
                {seller?.email || "No email available"}
              </p>

              <p className="mt-1 break-all text-xs text-slate-400">
                Seller ID: {seller?.sellerId || sellerId}
              </p>
            </div>
          </div>
        </div>

        <div className="mb-6 grid gap-4 sm:grid-cols-2">

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-slate-900">
                  Total Payout
                </p>

                <p className="mt-2 text-2xl font-bold text-slate-900">
                  {formatAmount(payoutData?.totalPayout || 0)}
                </p>

                <p className="mt-1 text-xs text-slate-800">
                  Total amount paid to seller
                </p>
              </div>

              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-50 text-orange-600">
                <IndianRupee size={19} />
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-slate-900">
                  Total Payouts
                </p>

                <p className="mt-2 text-2xl font-bold text-slate-900">
                  {payoutData?.payoutCount || 0}
                </p>

                <p className="mt-1 text-xs text-slate-800">
                  Successful payout transactions
                </p>
              </div>

              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                <CreditCard size={19} />
              </div>
            </div>
          </div>
        </div>

        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-200 px-6 py-5">
            <h2 className="text-lg font-semibold text-slate-900">
              Payout Transactions
            </h2>

            <p className="mt-1 text-sm text-slate-800">
              Complete payout history
            </p>
          </div>

          {payoutData?.payouts?.length ? (
            <>
              <div className="hidden overflow-x-auto md:block">
                <table className="w-full min-w-max">
                  <thead className="bg-slate-50">
                    <tr className="text-left text-xs font-semibold uppercase tracking-wide text-slate-900">
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
                    {payoutData.payouts.map((payout) => (
                      <tr
                        key={payout.transactionId}
                        className="transition hover:bg-slate-50"
                      >
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2 text-sm text-slate-800">
                            <CalendarDays
                              size={15}
                              className="text-slate-400"
                            />

                            {formatDate(payout.payoutDate)}
                          </div>
                        </td>

                        <td className="px-6 py-4">
                          <span className="whitespace-nowrap font-mono text-sm text-slate-800">
                            {payout.transactionId}
                          </span>
                        </td>

                        <td className="px-6 py-4">
                          <span className="whitespace-nowrap font-mono text-sm text-slate-800">
                            {payout.orderId}
                          </span>
                        </td>

                        <td className="px-6 py-4">
                          <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-800">
                            {payout.paymentMethod}
                          </span>
                        </td>

                        <td className="px-6 py-4 text-right">
                          <span className="text-sm font-semibold text-slate-900">
                            {formatAmount(payout.amount)}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="divide-y divide-slate-100 md:hidden">
                {payoutData.payouts.map((payout) => (
                  <div
                    key={payout.transactionId}
                    className="p-5"
                  >
                    <div className="mb-3 flex min-w-0 items-start justify-between gap-3">
                      <div className="min-w-0">
                        <p className="text-xs text-slate-400">
                          Transaction
                        </p>

                        <p className="mt-1 break-all font-mono text-sm font-medium text-slate-700">
                          {payout.transactionId}
                        </p>
                      </div>

                      <p className="shrink-0 whitespace-nowrap text-sm font-bold text-slate-900">
                        {formatAmount(payout.amount)}
                      </p>
                    </div>

                    <div className="space-y-2 text-sm">
                      <div className="flex min-w-0 items-start gap-2 text-slate-500">
                        <CalendarDays size={15} />
                        {formatDate(payout.payoutDate)}
                      </div>

                      <div>
                        <span className="text-slate-400">
                          Order:
                        </span>{" "}
                        <span className="break-all font-mono text-slate-600">
                          {payout.orderId}
                        </span>
                      </div>

                      <div>
                        <span className="text-slate-400">
                          Payment:
                        </span>{" "}
                        <span className="text-slate-600">
                          {payout.paymentMethod}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="px-6 py-16 text-center">
              <Receipt
                size={32}
                className="mx-auto text-slate-300"
              />

              <p className="mt-3 font-medium text-slate-700">
                No payout transactions found
              </p>

              <p className="mt-1 text-sm text-slate-400">
                This seller has no successful payouts.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default SellerPayoutDetails;