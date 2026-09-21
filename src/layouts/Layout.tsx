import { Outlet } from "react-router-dom";
import Navigation from "../components/Navigation";

const Layout = () => {
  return (
    <div className="min-h-screen bg-slate-50">
      <Navigation />

      <main className="ml-64 min-h-screen">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;