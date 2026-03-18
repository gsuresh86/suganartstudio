"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FiPackage, FiShoppingCart, FiFileText, FiDollarSign, FiHome, FiLogOut } from "react-icons/fi";
import { onAuthChange, signOut } from "../lib/auth";

const nav = [
  { href: "/admin", label: "Dashboard", icon: FiHome },
  { href: "/admin/products", label: "Products", icon: FiPackage },
  { href: "/admin/orders", label: "Orders", icon: FiShoppingCart },
  { href: "/admin/quotations", label: "Quotations", icon: FiFileText },
  { href: "/admin/invoices", label: "Invoices", icon: FiDollarSign },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [authReady, setAuthReady] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);

  const isLoginPage = pathname === "/admin/login";

  useEffect(() => {
    const unsub = onAuthChange((user) => {
      setAuthReady(true);
      setUserEmail(user?.email ?? null);
    });
    return () => unsub();
  }, []);

  useEffect(() => {
    if (!authReady || isLoginPage) return;
    if (userEmail === null) {
      router.replace("/admin/login?redirect=" + encodeURIComponent(pathname));
    }
  }, [authReady, isLoginPage, pathname, router, userEmail]);

  const handleLogout = async () => {
    await signOut();
    router.push("/admin/login");
    router.refresh();
  };

  if (isLoginPage) {
    return <>{children}</>;
  }

  if (!authReady) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <p className="text-gray-600">Loading…</p>
      </div>
    );
  }

  if (!isLoginPage && userEmail === null) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <p className="text-gray-600">Redirecting to login…</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex">
      <aside className="w-56 bg-gray-800 text-white flex-shrink-0 flex flex-col">
        <div className="p-4 border-b border-gray-700">
          <Link href="/" className="font-bold text-lg">Suganartstudio Admin</Link>
        </div>
        <nav className="p-2 flex-1">
          {nav.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg mb-1 transition ${
                pathname === href ? "bg-gray-700 text-white" : "text-gray-300 hover:bg-gray-700/50"
              }`}
            >
              <Icon size={18} />
              {label}
            </Link>
          ))}
        </nav>
        <div className="p-4 border-t border-gray-700 space-y-2">
          <button
            type="button"
            onClick={handleLogout}
            className="flex items-center gap-2 w-full text-left text-gray-400 hover:text-white text-sm"
          >
            <FiLogOut size={16} />
            Log out
          </button>
          <Link href="/" className="block text-gray-400 hover:text-white text-sm">
            ← Back to site
          </Link>
        </div>
      </aside>
      <main className="flex-1 p-6 overflow-auto">{children}</main>
    </div>
  );
}
