import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import type { WidgetOptions } from "./index.widget";

import ProfitDashboard from "./pages/ProfitDashboard/ProfitDashboard";
import Orders from "./pages/Orders/Orders";
import TransactionDetailsPage from "./pages/TransactionDetails/TransactionDetailsPage";
import Layout from "./layouts/Layout";
import SellerPayouts from "./pages/SellerPayouts/SellerPayouts";
import CustomerSummary from "./pages/CustomerSummary/CustomerSummary";
import SellerPayoutDetails from "./pages/SellerPayoutDetails/SellerPayoutDetails";
import CustomerTransactionDetails from "./pages/CustomerTransactionDetails/CustomerTransactionDetails";

interface AppProps {
  options: WidgetOptions;
}

const App = ({ options }: AppProps) => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route
            path="/"
            element={<ProfitDashboard options={options} />}
          />

          <Route
            path="/profit"
            element={<ProfitDashboard options={options} />}
          />

          <Route
            path="/orders"
            element={<Orders options={options} />}
          />

          <Route
            path="/orders/:orderId/transactions"
            element={
              <TransactionDetailsPage options={options} />
            }
          />

          <Route
            path="*"
            element={<Navigate to="/profit" replace />}
          />

          <Route
            path="/seller-payouts"
            element={<SellerPayouts />}
          />

          <Route
            path="/seller-payouts/:sellerId"
            element={<SellerPayoutDetails />}
          />
          <Route
            path="/customer-summary"
            element={<CustomerSummary />}
          />

          <Route
            path="/customer-summary/:customerId/:type"
            element={<CustomerTransactionDetails />}
          />
  
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;