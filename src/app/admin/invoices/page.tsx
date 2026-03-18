"use client";

import { useEffect, useState } from "react";
import type { Invoice } from "../../lib/types";
import { getAllInvoices, addInvoice, updateInvoiceStatus } from "../../lib/store";

export default function AdminInvoicesPage() {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    customerName: "",
    email: "",
    address: "",
    items: [{ description: "", quantity: 1, unitPrice: 0, amount: 0 }],
    status: "draft" as Invoice["status"],
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const load = async () => {
    setLoading(true);
    try {
      const list = await getAllInvoices();
      setInvoices(list);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    load();
  }, []);

  const addLine = () => {
    setForm((f) => ({
      ...f,
      items: [...f.items, { description: "", quantity: 1, unitPrice: 0, amount: 0 }],
    }));
  };

  const updateLine = (index: number, field: keyof Invoice["items"][0], value: number | string) => {
    setForm((f) => {
      const next = [...f.items];
      (next[index] as Record<string, unknown>)[field] = value;
      if (field === "quantity" || field === "unitPrice") {
        const q = field === "quantity" ? (value as number) : next[index].quantity;
        const u = field === "unitPrice" ? (value as number) : next[index].unitPrice;
        next[index].amount = q * u;
      }
      return { ...f, items: next };
    });
  };

  const total = form.items.reduce((s, i) => s + i.amount, 0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await addInvoice({
        customerName: form.customerName,
        email: form.email,
        address: form.address || undefined,
        items: form.items.map((i) => ({ ...i, amount: i.quantity * i.unitPrice })),
        total,
        status: form.status,
      });
      setForm({
        customerName: "",
        email: "",
        address: "",
        items: [{ description: "", quantity: 1, unitPrice: 0, amount: 0 }],
        status: "draft",
      });
      setShowForm(false);
      await load();
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Invoices</h1>
        <button
          type="button"
          onClick={() => setShowForm(!showForm)}
          className="bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-700"
        >
          {showForm ? "Cancel" : "Generate Invoice"}
        </button>
      </div>

      {showForm && (
        <div className="bg-white rounded-lg shadow p-6 mb-6 max-w-2xl">
          <h2 className="text-lg font-semibold mb-4">Create invoice</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Customer Name *</label>
                <input
                  type="text"
                  required
                  value={form.customerName}
                  onChange={(e) => setForm((f) => ({ ...f, customerName: e.target.value }))}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
              <textarea
                value={form.address}
                onChange={(e) => setForm((f) => ({ ...f, address: e.target.value }))}
                rows={2}
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
              />
            </div>
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-sm font-medium text-gray-700">Line items</label>
                <button type="button" onClick={addLine} className="text-sm text-gray-600 hover:text-gray-900">
                  + Add line
                </button>
              </div>
              <div className="space-y-2">
                {form.items.map((item, i) => (
                  <div key={i} className="flex gap-2 flex-wrap items-center">
                    <input
                      type="text"
                      placeholder="Description"
                      value={item.description}
                      onChange={(e) => updateLine(i, "description", e.target.value)}
                      className="flex-1 min-w-[120px] border border-gray-300 rounded px-2 py-1 text-sm"
                    />
                    <input
                      type="number"
                      min={1}
                      placeholder="Qty"
                      value={item.quantity}
                      onChange={(e) => updateLine(i, "quantity", Number(e.target.value) || 0)}
                      className="w-16 border border-gray-300 rounded px-2 py-1 text-sm"
                    />
                    <input
                      type="number"
                      min={0}
                      placeholder="Unit price"
                      value={item.unitPrice || ""}
                      onChange={(e) => updateLine(i, "unitPrice", Number(e.target.value) || 0)}
                      className="w-24 border border-gray-300 rounded px-2 py-1 text-sm"
                    />
                    <span className="text-sm text-gray-600 w-16">₹{item.amount}</span>
                  </div>
                ))}
              </div>
              <p className="mt-2 font-semibold">Total: ₹{total}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
              <select
                value={form.status}
                onChange={(e) => setForm((f) => ({ ...f, status: e.target.value as Invoice["status"] }))}
                className="border border-gray-300 rounded-lg px-3 py-2"
              >
                <option value="draft">Draft</option>
                <option value="sent">Sent</option>
                <option value="paid">Paid</option>
              </select>
            </div>
            <button type="submit" disabled={saving} className="bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-700 disabled:opacity-50">
              {saving ? "Generating…" : "Generate Invoice"}
            </button>
          </form>
        </div>
      )}

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Customer</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Total</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {loading ? (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-gray-500">
                  Loading…
                </td>
              </tr>
            ) : invoices.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-gray-500">
                  No invoices yet.
                </td>
              </tr>
            ) : (
              invoices.map((inv) => (
                <tr key={inv.id} className="hover:bg-gray-50">
                  <td className="px-4 py-2 font-mono text-sm">{inv.id}</td>
                  <td className="px-4 py-2">
                    <p className="font-medium text-gray-900">{inv.customerName}</p>
                    <p className="text-sm text-gray-500">{inv.email}</p>
                  </td>
                  <td className="px-4 py-2 font-medium">₹{inv.total}</td>
                  <td className="px-4 py-2">
                    <select
                      value={inv.status}
                      onChange={async (e) => {
                        await updateInvoiceStatus(inv.id, e.target.value as Invoice["status"]);
                        load();
                      }}
                      className="border border-gray-300 rounded px-2 py-1 text-sm"
                    >
                      <option value="draft">Draft</option>
                      <option value="sent">Sent</option>
                      <option value="paid">Paid</option>
                    </select>
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-600">{new Date(inv.createdAt).toLocaleDateString()}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
