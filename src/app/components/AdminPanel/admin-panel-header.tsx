"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import { useAuthContext } from "@/contexts/auth";

export default function AdminPanelHeader() {
  const pathname = usePathname();
  const { authState, setAuthState } = useAuthContext();

  function logout() {
    setAuthState({ loggedIn: false, user: null });
    localStorage.removeItem("token");
  }

  return (
    <div className="border-b border-slate-600">
      <div className="py-6 px-4 sm:px-6 flex justify-between items-center">
        <span className="text-2xl font-bold">Admin Panel</span>

        <nav>
          <ul className="flex items-center space-x-4">
            {authState.loggedIn && (
              <li>
                <Link
                  href="/admin/blog-analytics"
                  className={cn(
                    "p-2 text-sm tracking-wide font-medium rounded-md cursor-pointer transition-colors duration-500 ease-in-out",
                    pathname === "/admin/blog-analytics"
                      ? "text-dracula-dark-50 bg-dracula-darker-800 underline"
                      : "text-dracula-darker-100 hover:text-dracula-dark-50 hover:underline hover:bg-dracula-darker-800"
                  )}
                >
                  Blog Analytics
                </Link>
              </li>
            )}
            <li>
              {authState.loggedIn ? (
                <button
                  className="p-2  text-sm tracking-wide font-medium rounded-md cursor-pointer transition-colors duration-500 ease-in-out text-dracula-darker-100 hover:text-dracula-dark-50 hover:underline hover:bg-dracula-darker-800"
                  onClick={logout}
                >
                  Logout
                </button>
              ) : (
                <Link
                  href="/admin/login"
                  className={cn(
                    "p-2 text-sm tracking-wide font-medium rounded-md cursor-pointer transition-colors duration-500 ease-in-out",
                    pathname === "/admin/blog-analytics"
                      ? "text-dracula-dark-50 bg-dracula-darker-800 underline"
                      : "text-dracula-darker-100 hover:text-dracula-dark-50 hover:underline hover:bg-dracula-darker-800"
                  )}
                >
                  Login
                </Link>
              )}
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}
