import { NavLink } from "react-router-dom";

const Navigation = () => {
    return (
        <aside className="fixed left-0 top-0 z-50 flex h-screen w-64 flex-col border-r border-slate-200 bg-white">
            {/* Logo / Brand */}
            <div className="border-b border-slate-200 px-6 py-5">
                <div className="flex items-center gap-3">
                    <div>
                        <h1 className="font-semibold text-black-900">
                            Site Profit
                        </h1>

                        <p className="text-xs text-slate-800">
                            Admin Dashboard
                        </p>
                    </div>
                </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-4 py-6">
                {/* Overview */}
                <NavLink
                    to="/profit"
                    className={({ isActive }) =>
                        `flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium ${isActive
                            ? "bg-slate-100 text-slate-900"
                            : "text-slate-500 hover:bg-slate-50"
                        }`
                    }
                >
                    📈
                    <span>Overview</span>
                </NavLink>

                <NavLink
                    to="/orders"
                    className={({ isActive }) =>
                        `mt-2 flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium ${isActive
                            ? "bg-slate-100 text-slate-900"
                            : "text-slate-500 hover:bg-slate-50"
                        }`
                    }
                >
                    📚
                    <span>Orders</span>
                </NavLink>
            </nav>
        </aside>
    );
};

export default Navigation;