import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navigation from "../components/Navigation";

const Layout = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "auto",
    });
  }, [pathname]);

  return (
    <div className="flex min-h-screen min-w-0 flex-col bg-slate-50 lg:flex-row">
      <Navigation />

      <main className="min-w-0 flex-1">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;