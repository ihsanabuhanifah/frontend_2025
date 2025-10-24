"use client";
import { ReactNode, useContext } from "react";
import { AppContext } from "./AppContext";
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface ThemeProps {
  title: string;
  children: ReactNode;
}

const AppTheme: React.FC<ThemeProps> = ({ title, children }) => {
  const appContext = useContext(AppContext);
  const pathname = usePathname();

  const { theme, identity } = appContext;

  const navItems = [
    { label: "Dashboard", href: "/admin/dashboard" },
    { label: "Data", href: "/admin/data" },
    { label: "Users", href: "/admin/users" },
    { label: "Settings", href: "/admin/settings" },
  ];

  return (
    <div
      className={clsx("min-h-screen flex flex-col", {
        "bg-gray-50 text-gray-900": theme === "light",
        "bg-gray-900 text-gray-100": theme === "dark",
      })}
    >
      {/* Header */}
      <header
        className={clsx(
          `w-full h-[80px] flex justify-between items-center px-8 border-b-4 shadow-md sticky top-0 z-50`,
          {
            "bg-red-500 text-white border-red-700": theme === "light",
            "bg-blue-700 text-white border-blue-900": theme === "dark",
          }
        )}
      >
        <h1 className="text-2xl font-bold uppercase tracking-wide">{title}</h1>

        <div className="flex flex-col items-end">
          <p className="text-lg font-semibold capitalize">
            {identity?.name || "User"}
          </p>
          <p
            className={clsx("text-sm font-light italic", {
              "text-red-200": theme === "light",
              "text-blue-200": theme === "dark",
            })}
          >
            @{identity?.username || "no_username"}
          </p>
        </div>
      </header>

      {/* Layout Container */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <aside
          className={clsx(
            "w-64 flex flex-col border-r min-h-screen p-5 space-y-3",
            {
              "bg-gray-100 border-gray-200 text-gray-800": theme === "light",
              "bg-gray-800 border-gray-700 text-gray-100": theme === "dark",
            }
          )}
        >
          <h2 className="text-lg font-semibold mb-4 border-b pb-2">
            Navigation
          </h2>
          <nav className="flex flex-col space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={clsx(
                  "px-4 py-2 rounded-md font-medium transition-all duration-200",
                  pathname === item.href
                    ? theme === "light"
                      ? "bg-red-500 text-white shadow"
                      : "bg-blue-600 text-white shadow"
                    : theme === "light"
                    ? "hover:bg-gray-200"
                    : "hover:bg-gray-700"
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="mt-auto border-t pt-4 text-center text-sm opacity-70">
            © 2025 Admin Panel
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8 overflow-y-auto">
          <h1 className="text-3xl font-bold mb-6">
            Selamat Datang{" "}
            <span className="uppercase text-primary">
              {identity?.name || "User"}
            </span>
          </h1>
          {children}
        </main>
      </div>
    </div>
  );
};

export default AppTheme;
