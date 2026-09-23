import {
  ArrowLeft,
  RefreshCw,
  RotateCcw,
  Users,
  Wallet,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useCustomerSummary } from "../../hooks/useCustomerSummary";

const formatAmount = (amount: number) => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 2,
  }).format(amount);
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

  if (!name) return "C";

  return name
    .split(" ")
    .map((part) => part.charAt(0))
    .join("")
    .slice(0, 2)
    .toUpperCase();
};

function CustomerSummary() {
  const navigate = useNavigate();

  const {
    data,
    isLoading,
    isError,
    refetch,
    isFetching,
  } = useCustomerSummary();

  const customerData = data?.data;

  const netAmount = customerData
    ? customerData.totalCustomerPayments -
    customerData.totalCustomerRefunds
    : 0;

  return (
    <div className="min-h-screen bg-slate-50">
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
              Customer Summary
            </h1>

            <p className="mt-1 text-sm text-slate-800">
              Overview of customer payments and refunds.
            </p>
          </div>
        </div>
      </div>

      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        {isLoading && (
          <div className="space-y-6">
            <div className="grid gap-4 sm:grid-cols-3">
              {Array.from({ length: 3 }).map((_, index) => (
                <div
                  key={index}
                  className="h-32 animate-pulse rounded-2xl bg-slate-200"
                />
              ))}
            </div>

            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
              <div className="h-14 animate-pulse bg-slate-100" />

              {Array.from({ length: 5 }).map((_, index) => (
                <div
                  key={index}
                  className="h-20 animate-pulse border-t border-slate-100"
                />
              ))}
            </div>
          </div>
        )}

        {isError && !isLoading && (
          <div className="rounded-2xl border border-red-200 bg-red-50 p-8 text-center">
            <p className="font-semibold text-red-700">
              Failed to load customer summary
            </p>

            <p className="mt-1 text-sm text-red-500">
              Something went wrong while fetching the customer
              data.
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

        {!isLoading && !isError && customerData && (
          <div className="space-y-6">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-medium text-white-400">
                      Total Customer Payments
                    </p>

                    <p className="mt-2 text-3xl font-bold">
                      {formatAmount(
                        customerData.totalCustomerPayments
                      )}
                    </p>

                    <p className="mt-2 text-sm text-white-400">
                      Total amount received from customers
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-500">
                      Total Customer Refunds
                    </p>

                    <p className="mt-2 text-3xl font-bold text-slate-900">
                      {formatAmount(
                        customerData.totalCustomerRefunds
                      )}
                    </p>

                    <p className="mt-2 text-sm text-slate-800">
                      Total amount refunded to customers
                    </p>
                  </div>

                  <div className="flex h-11 w-11 items-center justify-center rounded-xl text-slate-700">
                    <RotateCcw size={21} color="blue" />
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-500">
                      Net Customer Amount
                    </p>

                    <p className="mt-2 text-3xl font-bold text-slate-900">
                      {formatAmount(netAmount)}
                    </p>

                    <p className="mt-2 text-sm text-slate-800">
                      Payments after customer refunds
                    </p>
                  </div>

                  <div className="flex h-11 w-11 items-center justify-center rounded-xl text-slate-700">
                    <Wallet size={21} color="blue" />
                  </div>
                </div>
              </div>
            </div>

            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
              <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
                <div>
                  <h2 className="font-semibold text-slate-900">
                    Customer Breakdown
                  </h2>

                  <p className="mt-1 text-xs text-slate-800">
                    Payment and refund summary by customer
                  </p>
                </div>

                <button
                  onClick={() => refetch()}
                  disabled={isFetching}
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition hover:bg-slate-50 hover:text-slate-900 disabled:opacity-50"
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

              {customerData.customers.length === 0 ? (
                <div className="px-6 py-16 text-center">
                  <Users
                    size={32}
                    className="mx-auto text-slate-300"
                  />

                  <p className="mt-3 font-medium text-slate-700">
                    No customer data found
                  </p>

                  <p className="mt-1 text-sm text-slate-400">
                    Customer payment information will appear
                    here once transactions are recorded.
                  </p>
                </div>
              ) : (
                <>
                  <div className="hidden overflow-x-auto md:block">
                    <table className="w-full">
                      <thead>
                        <tr className="bg-slate-50 text-left text-xs font-semibold uppercase tracking-wider text-slate-800">
                          <th className="px-5 py-4">
                            Customer
                          </th>

                          <th className="px-5 py-4 text-center">
                            Payments
                          </th>

                          <th className="px-5 py-4 text-center">
                            Refunds
                          </th>

                          <th className="px-5 py-4 text-right">
                            Total Paid
                          </th>

                          <th className="px-5 py-4 text-right">
                            Refunded
                          </th>

                          <th className="px-5 py-4 text-right">
                            Net Amount
                          </th>
                        </tr>
                      </thead>

                      <tbody>
                        {customerData.customers.map(
                          (customer) => {
                            const customerName =
                              getCustomerName(
                                customer.firstName,
                                customer.lastName
                              );

                            return (
                              <tr
                                key={customer.customerId}
                                onClick={() =>
                                  navigate(
                                    `/customer-summary/${customer.customerId}/payments`,
                                    {
                                      state: {
                                        customer,
                                      },
                                    }
                                  )
                                }
                                onKeyDown={(event) => {
                                  if (event.key === "Enter" || event.key === " ") {
                                    navigate(
                                      `/customer-summary/${customer.customerId}/payments`,
                                      {
                                        state: {
                                          customer,
                                        },
                                      }
                                    );
                                  }
                                }}
                                tabIndex={0}
                                role="button"
                                className="cursor-pointer border-t border-slate-100 transition hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
                              >
                                <td className="px-5 py-4">
                                  <div className="flex items-center gap-3">
                                    {customer.profilePic ? (
                                      <img
                                        src={customer.profilePic}
                                        alt={customerName}
                                        className="h-10 w-10 rounded-full object-cover"
                                        onError={(event) => {
                                          event.currentTarget.style.display = "none";

                                          event.currentTarget.nextElementSibling?.classList.remove(
                                            "hidden"
                                          );
                                        }}
                                      />
                                    ) : null}

                                    <div
                                      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-slate-100 text-sm font-semibold text-slate-600 ${customer.profilePic ? "hidden" : ""
                                        }`}
                                    >
                                      {getInitials(
                                        customer.firstName,
                                        customer.lastName
                                      )}
                                    </div>

                                    <div className="min-w-0">
                                      <p className="font-medium text-slate-900">
                                        {customerName}
                                      </p>

                                      <p className="truncate text-xs text-slate-800">
                                        {customer.email || customer.customerId}
                                      </p>
                                    </div>
                                  </div>
                                </td>

                                <td className="px-5 py-4 text-center">
                                  <span className="font-semibold text-blue-600">
                                    {customer.paymentCount}
                                  </span>
                                </td>

                                <td className="px-5 py-4 text-center">
                                  <span className="font-semibold text-red-500">
                                    {customer.refundCount}
                                  </span>
                                </td>

                                <td className="px-5 py-4 text-right">
                                  <span className="font-semibold text-slate-900">
                                    {formatAmount(customer.totalPaid)}
                                  </span>
                                </td>

                                <td className="px-5 py-4 text-right">
                                  <span className="font-medium text-slate-800">
                                    {formatAmount(customer.totalRefunded)}
                                  </span>
                                </td>

                                <td className="px-5 py-4 text-right">
                                  <span className="font-bold text-slate-900">
                                    {formatAmount(customer.netAmount)}
                                  </span>
                                </td>
                              </tr>
                            );
                          }
                        )}
                      </tbody>
                    </table>
                  </div>

                  <div className="divide-y divide-slate-100 md:hidden">
                    {customerData.customers.map(
                      (customer) => {
                        const customerName =
                          getCustomerName(
                            customer.firstName,
                            customer.lastName
                          );

                        return (
                          <div
                            key={customer.customerId}
                            onClick={() =>
                              navigate(
                                `/customer-summary/${customer.customerId}/payments`,
                                {
                                  state: {
                                    customer,
                                  },
                                }
                              )
                            }
                            onKeyDown={(event) => {
                              if (event.key === "Enter" || event.key === " ") {
                                navigate(
                                  `/customer-summary/${customer.customerId}/payments`,
                                  {
                                    state: {
                                      customer,
                                    },
                                  }
                                );
                              }
                            }}
                            tabIndex={0}
                            role="button"
                            className="cursor-pointer p-5 transition hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
                          >
                            <div className="flex min-w-0 items-start justify-between gap-4">
                              <div className="flex min-w-0 items-center gap-3">
                                {customer.profilePic ? (
                                  <img
                                    src={customer.profilePic}
                                    alt={customerName}
                                    className="h-11 w-11 shrink-0 rounded-full object-cover"
                                    onError={(event) => {
                                      event.currentTarget.style.display = "none";

                                      event.currentTarget.nextElementSibling?.classList.remove(
                                        "hidden"
                                      );
                                    }}
                                  />
                                ) : null}

                                <div
                                  className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-slate-100 text-sm font-semibold text-slate-600 ${customer.profilePic ? "hidden" : ""
                                    }`}
                                >
                                  {getInitials(
                                    customer.firstName,
                                    customer.lastName
                                  )}
                                </div>

                                <div className="min-w-0">
                                  <p className="truncate font-semibold text-slate-900">
                                    {customerName}
                                  </p>

                                  <p className="mt-0.5 truncate text-xs text-slate-400">
                                    {customer.email || "No email available"}
                                  </p>
                                </div>
                              </div>

                              <div className="shrink-0 text-right">
                                <p className="text-xs text-slate-400">
                                  Net Amount
                                </p>

                                <p className="mt-1 font-bold text-slate-900">
                                  {formatAmount(customer.netAmount)}
                                </p>
                              </div>
                            </div>

                            <div className="mt-4 grid grid-cols-2 gap-3">
                              <div className="rounded-lg bg-slate-50 p-3">
                                <p className="text-xs text-slate-400">
                                  Total Paid
                                </p>

                                <p className="mt-1 text-sm font-semibold text-slate-700">
                                  {formatAmount(customer.totalPaid)}
                                </p>
                              </div>

                              <div className="rounded-lg bg-slate-50 p-3">
                                <p className="text-xs text-slate-400">
                                  Refunded
                                </p>

                                <p className="mt-1 text-sm font-semibold text-slate-700">
                                  {formatAmount(customer.totalRefunded)}
                                </p>
                              </div>
                            </div>

                            <div className="mt-3 flex items-center justify-between rounded-lg bg-slate-50 px-3 py-2">
                              <span className="text-xs text-slate-500">
                                Payments / Refunds
                              </span>

                              <span className="text-sm font-semibold text-slate-700">
                                {customer.paymentCount} / {customer.refundCount}
                              </span>
                            </div>
                          </div>
                        );
                      }
                    )}
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

export default CustomerSummary;