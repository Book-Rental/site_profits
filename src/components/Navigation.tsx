import { NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useState } from "react";

const Navigation = () => {
    const [mobileOpen, setMobileOpen] = useState(false);

    const navItems = [
        {
            to: "/profit",
            label: "Overview",
            icon: "📈",
        },
        {
            to: "/orders",
            label: "Orders",
            icon: "📚",
        },
    ];

    return (
        <>
            {/* Desktop Sidebar */}
            <aside className="hidden min-h-screen w-64 shrink-0 flex-col border-r border-slate-200 bg-white lg:flex">
                {/* Logo / Brand */}
                <div className="border-b border-slate-200 px-6 py-5">
                    <h1 className="font-semibold text-slate-900">
                        Site Profit
                    </h1>

                    <p className="text-xs text-slate-500">
                        Admin Dashboard
                    </p>
                </div>

                {/* Navigation */}
                <nav className="flex-1 px-4 py-6">
                    {navItems.map((item) => (
                        <NavLink
                            key={item.to}
                            to={item.to}
                            className={({ isActive }) =>
                                `flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-colors ${
                                    isActive
                                        ? "bg-slate-100 text-slate-900"
                                        : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                                }`
                            }
                        >
                            <span>{item.icon}</span>
                            <span>{item.label}</span>
                        </NavLink>
                    ))}
                </nav>
            </aside>

            {/* Mobile / Tablet Navigation */}
            <div className="border-b border-slate-200 bg-white lg:hidden">
                {/* Mobile Header */}
                <div className="flex items-center justify-between px-4 py-3">
                    <div>
                        <h1 className="font-semibold text-slate-900">
                            Site Profit
                        </h1>

                        <p className="text-xs text-slate-500">
                            Admin Dashboard
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={() =>
                            setMobileOpen((prev) => !prev)
                        }
                        className="rounded-lg border border-slate-200 p-2 text-slate-600 hover:bg-slate-50"
                        aria-label="Toggle navigation"
                    >
                        {mobileOpen ? (
                            <X size={20} />
                        ) : (
                            <Menu size={20} />
                        )}
                    </button>
                </div>

                {/* Mobile Menu */}
                {mobileOpen && (
                    <nav className="border-t border-slate-100 px-4 py-3">
                        <div className="flex flex-col gap-1">
                            {navItems.map((item) => (
                                <NavLink
                                    key={item.to}
                                    to={item.to}
                                    onClick={() =>
                                        setMobileOpen(false)
                                    }
                                    className={({ isActive }) =>
                                        `flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium ${
                                            isActive
                                                ? "bg-slate-100 text-slate-900"
                                                : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                                        }`
                                    }
                                >
                                    <span>{item.icon}</span>
                                    <span>{item.label}</span>
                                </NavLink>
                            ))}
                        </div>
                    </nav>
                )}
            </div>
        </>
    );
};

export default Navigation;