"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getAllProducts, getAllOrders, getAllQuotations, getAllInvoices } from "../lib/store";
import { FiPackage, FiShoppingCart, FiFileText, FiDollarSign } from "react-icons/fi";

export default function AdminDashboard() {
  const [counts, setCounts] = useState({ products: 0, orders: 0, quotations: 0, invoices: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const [products, orders, quotations, invoices] = await Promise.all([
          getAllProducts(),
          getAllOrders(),
          getAllQuotations(),
          getAllInvoices(),
        ]);
        setCounts({
          products: products.length,
          orders: orders.length,
          quotations: quotations.length,
          invoices: invoices.length,
        });
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const cards = [
    { label: "Products", count: counts.products, href: "/admin/products", icon: FiPackage },
    { label: "Orders", count: counts.orders, href: "/admin/orders", icon: FiShoppingCart },
    { label: "Quotations", count: counts.quotations, href: "/admin/quotations", icon: FiFileText },
    { label: "Invoices", count: counts.invoices, href: "/admin/invoices", icon: FiDollarSign },
  ];

  if (loading) {
    return (
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Admin Dashboard</h1>
        <p className="text-gray-600">Loading…</p>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Admin Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map(({ label, count, href, icon: Icon }) => (
          <Link key={href} href={href} className="bg-white rounded-lg shadow p-6 hover:shadow-md transition">
            <Icon className="text-gray-600 mb-2" size={24} />
            <p className="text-gray-600 text-sm">{label}</p>
            <p className="text-2xl font-bold text-gray-900">{count}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
