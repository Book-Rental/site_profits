import {
  ArrowLeft,
  RefreshCw,
  Users,
  Wallet,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useSellerPayouts } from "../../hooks/useSellerPayouts";

const formatAmount = (amount: number) => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 2,
  }).format(amount);
};

const getSellerName = (
  firstName?: string,
  lastName?: string
) => {
  const name = [firstName, lastName]
    .filter(Boolean)
    .join(" ")
    .trim();

  return name || "Seller information unavailable";
};

const getInitials = (
  firstName?: string,
  lastName?: string
) => {
  const name = [firstName, lastName]
    .filter(Boolean)
    .join(" ")
    .trim();

  if (!name) return "S";

  return name
    .split(" ")
    .map((part) => part.charAt(0))
    .join("")
    .slice(0, 2)
    .toUpperCase();
};

function SellerPayouts() {
  const navigate = useNavigate();

  const {
    data,
    isLoading,
    isError,
    refetch,
    isFetching,
  } = useSellerPayouts();

  const payoutData = data?.data;

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-5 sm:px-6 lg:px-8">
          <button
            onClick={() => navigate("/profit")}
            className="mb-4 flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-slate-900"
          >
            <ArrowLeft size={16} />
            Back to Overview
          </button>

          <div>
            <h1 className="text-2xl font-bold text-slate-900">
              Seller Payouts
            </h1>

            <p className="mt-1 text-sm text-slate-800">
              Overview of payments made to sellers.
            </p>
          </div>
        </div>
      </div>

      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        {/* Loading */}
        {isLoading && (
          <div className="space-y-6">
            <div className="h-32 animate-pulse rounded-2xl bg-slate-200" />

            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
              <div className="h-14 animate-pulse bg-slate-100" />

              {Array.from({ length: 5 }).map((_, index) => (
                <div
                  key={index}
                  className="h-20 animate-pulse border-t border-slate-100 bg-white"
                />
              ))}
            </div>
          </div>
        )}

        {/* Error */}
        {isError && !isLoading && (
          <div className="rounded-2xl border border-red-200 bg-red-50 p-8 text-center">
            <p className="font-semibold text-red-700">
              Failed to load seller payouts
            </p>

            <p className="mt-1 text-sm text-red-500">
              Something went wrong while fetching the payout data.
            </p>

            <button
              onClick={() => refetch()}
              className="mt-4 inline-flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-700"
            >
              <RefreshCw size={15} />
              Try Again
            </button>
          </div>
        )}

        {/* Data */}
        {!isLoading && !isError && payoutData && (
          <div className="space-y-6">
            {/* Summary */}
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="flex min-w-0 items-start justify-between gap-4">
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-slate-900">
                      Total Seller Payouts
                    </p>

                    <p className="mt-2 whitespace-nowrap text-2xl font-bold text-slate-900 sm:text-3xl">
                      {formatAmount(payoutData.totalSellerPayout)}
                    </p>

                    <p className="mt-2 text-sm text-slate-800">
                      Total amount paid to sellers
                    </p>
                  </div>

                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                    <Wallet size={21} />
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-800">
                      Active Sellers
                    </p>

                    <p className="mt-2 text-3xl font-bold text-slate-900">
                      {payoutData.sellers.length}
                    </p>

                    <p className="mt-2 text-sm text-slate-800">
                      Sellers who received payouts
                    </p>
                  </div>

                  <div className="flex h-11 w-11 items-center justify-center rounded-xl text-slate-700">
                    <Users size={21} color="blue" />
                  </div>
                </div>
              </div>
            </div>

            {/* Seller table */}
            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
              <div className="flex items-start justify-between gap-4 border-b border-slate-200 px-5 py-4">
                <div className="min-w-0">
                  <h2 className="font-semibold text-slate-900">
                    Seller Breakdown
                  </h2>

                  <p className="mt-1 text-xs text-slate-800">
                    Payout summary by seller
                  </p>
                </div>

                <button
                  onClick={() => refetch()}
                  disabled={isFetching}
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition hover:bg-slate-50 hover:text-slate-900 disabled:opacity-50"
                  title="Refresh"
                >
                  <RefreshCw
                    size={16}
                    className={
                      isFetching ? "animate-spin" : ""
                    }
                  />
                </button>
              </div>

              {payoutData.sellers.length === 0 ? (
                <div className="px-6 py-16 text-center">
                  <Wallet
                    size={32}
                    className="mx-auto text-slate-300"
                  />

                  <p className="mt-3 font-medium text-slate-700">
                    No seller payouts found
                  </p>

                  <p className="mt-1 text-sm text-slate-400">
                    Seller payout information will appear here
                    once payouts are recorded.
                  </p>
                </div>
              ) : (
                <>
                  {/* Desktop */}
                  <div className="hidden overflow-x-auto md:block">
                    <table className="w-full min-w-[760px]">
                      <thead>
                        <tr className="bg-slate-50 text-left text-xs font-semibold uppercase tracking-wider text-slate-800">
                          <th className="px-5 py-4">
                            Seller
                          </th>

                          <th className="px-5 py-4">
                            Email
                          </th>

                          <th className="px-5 py-4 text-center">
                            Payouts
                          </th>

                          <th className="px-5 py-4 text-right">
                            Total Paid
                          </th>
                        </tr>
                      </thead>

                      <tbody>
                        {payoutData.sellers.map((seller) => {
                          const sellerName = getSellerName(
                            seller.firstName,
                            seller.lastName
                          );

                          return (
                            <tr
                              key={seller.sellerId}
                              className="border-t border-slate-100 transition hover:bg-slate-50"
                            >
                              <td className="px-5 py-4">
                                <div className="flex items-center gap-3">
                                  {seller.profilePic ? (
                                    <img
                                      src={seller.profilePic}
                                      alt={sellerName}
                                      className="h-10 w-10 rounded-full object-cover"
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
                                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-slate-100 text-sm font-semibold text-slate-600 ${seller.profilePic
                                      ? "hidden"
                                      : ""
                                      }`}
                                  >
                                    {getInitials(
                                      seller.firstName,
                                      seller.lastName
                                    )}
                                  </div>

                                  <div className="min-w-0">
                                    <p className="truncate font-medium text-slate-900">
                                      {sellerName}
                                    </p>

                                    <p className="truncate text-xs text-slate-800">
                                      {seller.sellerId}
                                    </p>
                                  </div>
                                </div>
                              </td>

                              <td className="max-w-[240px] px-5 py-4 text-sm text-slate-800">
                                <span className="block truncate">
                                  {seller.email || "—"}
                                </span>
                              </td>

                              <td className="px-5 py-4 text-center">
                                <span className="inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold text-slate-800">
                                  <button
                                    type="button"
                                    onClick={() =>
                                      navigate(`/seller-payouts/${seller.sellerId}`)
                                    }
                                    className="font-semibold text-blue-600 hover:text-blue-700 hover:underline"
                                  >
                                    {seller.payoutCount}
                                  </button>
                                </span>
                              </td>

                              <td className="whitespace-nowrap px-5 py-4 text-right">
                                <span className="font-semibold text-slate-900">
                                  {formatAmount(seller.totalPayout)}
                                </span>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>

                  {/* Mobile */}
                  <div className="divide-y divide-slate-100 md:hidden">
                    {payoutData.sellers.map((seller) => {
                      const sellerName = getSellerName(
                        seller.firstName,
                        seller.lastName
                      );

                      return (
                        <div
                          key={seller.sellerId}
                          className="p-5"
                        >
                          <div className="flex min-w-0 items-start justify-between gap-3">
                            <div className="flex items-center gap-3">
                              {seller.profilePic ? (
                                <img
                                  src={seller.profilePic}
                                  alt={sellerName}
                                  className="h-11 w-11 rounded-full object-cover"
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
                                className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-slate-100 text-sm font-semibold text-slate-600 ${seller.profilePic
                                  ? "hidden"
                                  : ""
                                  }`}
                              >
                                {getInitials(
                                  seller.firstName,
                                  seller.lastName
                                )}
                              </div>

                              <div className="min-w-0">
                                <p className="truncate font-semibold text-slate-900">
                                  {sellerName}
                                </p>

                                <p className="mt-0.5 truncate text-xs text-slate-400">
                                  {seller.email || "No email available"}
                                </p>
                              </div>
                            </div>

                            <div className="shrink-0 text-right">
                              <p className="text-xs text-slate-400">
                                Total Paid
                              </p>

                              <p className="mt-1 whitespace-nowrap font-bold text-slate-900">
                                {formatAmount(seller.totalPayout)}
                              </p>
                            </div>
                          </div>

                          <div className="mt-4 flex items-center justify-between rounded-lg bg-slate-50 px-3 py-2">
                            <span className="text-xs text-slate-500">
                              Number of payouts
                            </span>

                            <button
                              type="button"
                              onClick={() =>
                                navigate(`/seller-payouts/${seller.sellerId}`)
                              }
                              className="text-sm font-semibold text-blue-600 hover:text-blue-700 hover:underline"
                            >
                              {seller.payoutCount}
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default SellerPayouts;