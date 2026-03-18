"use client";

import { useEffect, useState } from "react";
import { jsPDF } from "jspdf";
import type { Quotation } from "../../lib/types";
import { getAllQuotations, addQuotation } from "../../lib/store";

function downloadQuotationPdf(q: Quotation) {
  const doc = new jsPDF();
  const pageW = (doc as unknown as { internal: { pageSize: { getWidth: () => number } } }).internal.pageSize.getWidth();
  let y = 20;

  doc.setFontSize(18);
  doc.text("Quotation", 14, y);
  y += 10;

  doc.setFontSize(10);
  doc.text(`ID: ${q.id}`, 14, y);
  y += 6;
  doc.text(`Date: ${new Date(q.createdAt).toLocaleDateString()}`, 14, y);
  y += 6;
  doc.text(`Valid until: ${new Date(q.validUntil).toLocaleDateString()}`, 14, y);
  y += 12;

  doc.setFont("helvetica", "bold");
  doc.text("Bill to", 14, y);
  doc.setFont("helvetica", "normal");
  y += 6;
  doc.text(q.customerName, 14, y);
  y += 5;
  doc.text(q.email, 14, y);
  if (q.phone) {
    y += 5;
    doc.text(q.phone, 14, y);
  }
  y += 10;

  const colDesc = 14;
  const colQty = 100;
  const colPrice = 120;
  const colAmount = 160;

  doc.setFont("helvetica", "bold");
  doc.text("Description", colDesc, y);
  doc.text("Qty", colQty, y);
  doc.text("Unit price", colPrice, y);
  doc.text("Amount", colAmount, y);
  doc.setFont("helvetica", "normal");
  y += 7;

  doc.setDrawColor(200);
  doc.line(colDesc, y - 3, pageW - 14, y - 3);
  y += 2;

  for (const item of q.items) {
    if (y > 260) {
      doc.addPage();
      y = 20;
    }
    doc.text(item.description.slice(0, 40), colDesc, y);
    doc.text(String(item.quantity), colQty, y);
    doc.text(`₹${item.unitPrice}`, colPrice, y);
    doc.text(`₹${item.amount}`, colAmount, y);
    y += 6;
  }

  y += 4;
  doc.setDrawColor(200);
  doc.line(colPrice, y, pageW - 14, y);
  y += 7;
  doc.setFont("helvetica", "bold");
  doc.text(`Total: ₹${q.total}`, colAmount, y);
  doc.setFont("helvetica", "normal");

  doc.save(`quotation-${q.id}.pdf`);
}

export default function AdminQuotationsPage() {
  const [quotations, setQuotations] = useState<Quotation[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    customerName: "",
    email: "",
    phone: "",
    items: [{ description: "", quantity: 1, unitPrice: 0, amount: 0 }],
    validUntil: "",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const load = async () => {
    setLoading(true);
    try {
      const list = await getAllQuotations();
      setQuotations(list);
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

  const updateLine = (index: number, field: keyof Quotation["items"][0], value: number | string) => {
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
      const validUntil = form.validUntil || new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10);
      await addQuotation({
        customerName: form.customerName,
        email: form.email,
        phone: form.phone || undefined,
        items: form.items.map((i) => ({ ...i, amount: i.quantity * i.unitPrice })),
        total,
        validUntil,
      });
      setForm({
        customerName: "",
        email: "",
        phone: "",
        items: [{ description: "", quantity: 1, unitPrice: 0, amount: 0 }],
        validUntil: "",
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
        <h1 className="text-2xl font-bold text-gray-900">Quotations</h1>
        <button
          type="button"
          onClick={() => setShowForm(!showForm)}
          className="bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-700"
        >
          {showForm ? "Cancel" : "Generate Quotation"}
        </button>
      </div>

      {showForm && (
        <div className="bg-white rounded-lg shadow p-6 mb-6 max-w-2xl">
          <h2 className="text-lg font-semibold mb-4">Create quotation</h2>
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
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                <input
                  type="tel"
                  value={form.phone}
                  onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Valid until</label>
                <input
                  type="date"
                  value={form.validUntil}
                  onChange={(e) => setForm((f) => ({ ...f, validUntil: e.target.value }))}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                />
              </div>
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
            <button type="submit" disabled={saving} className="bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-700 disabled:opacity-50">
              {saving ? "Generating…" : "Generate Quotation"}
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
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Valid until</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {loading ? (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-gray-500">
                  Loading…
                </td>
              </tr>
            ) : quotations.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-gray-500">
                  No quotations yet.
                </td>
              </tr>
            ) : (
              quotations.map((q) => (
                <tr key={q.id} className="hover:bg-gray-50">
                  <td className="px-4 py-2 font-mono text-sm">{q.id}</td>
                  <td className="px-4 py-2">
                    <p className="font-medium text-gray-900">{q.customerName}</p>
                    <p className="text-sm text-gray-500">{q.email}</p>
                  </td>
                  <td className="px-4 py-2 font-medium">₹{q.total}</td>
                  <td className="px-4 py-2 text-sm text-gray-600">{new Date(q.validUntil).toLocaleDateString()}</td>
                  <td className="px-4 py-2">
                    <button
                      type="button"
                      onClick={() => downloadQuotationPdf(q)}
                      className="text-sm text-gray-700 bg-gray-100 hover:bg-gray-200 px-3 py-1.5 rounded border border-gray-300"
                    >
                      Download PDF
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
