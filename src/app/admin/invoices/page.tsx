"use client";

import { useEffect, useState } from "react";
import { jsPDF } from "jspdf";
import type { Invoice } from "../../lib/types";
import { invoiceLineAmount, normalizeDiscountPercent } from "../../lib/invoice-line";
import {
  fetchInvoiceLogoDataUrl,
  fillInvoicePdfPageBackground,
  registerPoppinsFonts,
  setPdfFont,
} from "../../lib/invoice-pdf-assets";
import { getAllInvoices, addInvoice, updateInvoice, updateInvoiceStatus } from "../../lib/store";
import { STUDIO_CONTACT } from "../../lib/studio-contact";

async function downloadInvoicePdf(inv: Invoice) {
  const doc = new jsPDF();
  fillInvoicePdfPageBackground(doc);
  const pageW = doc.internal.pageSize.getWidth();
  const usePoppins = await registerPoppinsFonts(doc);
  const logoData = await fetchInvoiceLogoDataUrl();

  const headerTop = 8;
  const logoSize = 34;
  if (logoData) {
    try {
      doc.addImage(logoData, "PNG", 14, headerTop, logoSize, logoSize);
    } catch {
      /* logo optional */
    }
  }
  const textX = logoData ? 14 + logoSize + 6 : 14;
  doc.setFontSize(14);
  setPdfFont(doc, usePoppins, "bold");
  doc.text("Invoice", textX, headerTop + logoSize / 2 + 2);
  setPdfFont(doc, usePoppins, "normal");

  const rightX = pageW - 14;
  let contactY = headerTop + 4;
  doc.setFontSize(8);
  setPdfFont(doc, usePoppins, "bold");
  doc.text(STUDIO_CONTACT.displayName, rightX, contactY, { align: "right" });
  contactY += 5;
  setPdfFont(doc, usePoppins, "normal");
  doc.text(STUDIO_CONTACT.email, rightX, contactY, { align: "right" });
  contactY += 4;
  doc.text(STUDIO_CONTACT.phone, rightX, contactY, { align: "right" });
  contactY += 4;
  doc.text(`Instagram: ${STUDIO_CONTACT.instagramHandle}`, rightX, contactY, { align: "right" });
  doc.setFontSize(10);

  let y = headerTop + logoSize + 10;
  doc.setFontSize(10);
  doc.text(`Date: ${new Date(inv.createdAt).toLocaleDateString()}`, 14, y);
  y += 12;

  setPdfFont(doc, usePoppins, "bold");
  doc.text("Bill to", 14, y);
  setPdfFont(doc, usePoppins, "normal");
  y += 6;
  doc.text(inv.customerName, 14, y);
  y += 5;
  doc.text(inv.email, 14, y);
  if (inv.address) {
    const lines = doc.splitTextToSize(inv.address, pageW - 28);
    for (const line of lines) {
      y += 5;
      doc.text(line, 14, y);
    }
  }
  y += 10;

  const margin = 14;
  const amountRight = pageW - margin;
  const colDiscRight = amountRight - 32;
  const colPriceRight = colDiscRight - 28;
  const colQtyRight = colPriceRight - 26;
  const colDesc = margin;
  /** Horizontal gap between description text block and quantity column */
  const descGapBeforeQty = 10;
  const descMaxW = Math.max(42, colQtyRight - colDesc - descGapBeforeQty);

  setPdfFont(doc, usePoppins, "bold");
  doc.text("Description", colDesc, y);
  doc.text("Qty", colQtyRight, y, { align: "right" });
  doc.text("Price", colPriceRight, y, { align: "right" });
  doc.text("Disc. %", colDiscRight, y, { align: "right" });
  doc.text("Amount", amountRight, y, { align: "right" });
  setPdfFont(doc, usePoppins, "normal");
  y += 7;

  doc.setDrawColor(200);
  doc.line(colDesc, y - 3, amountRight, y - 3);
  y += 2;

  for (const item of inv.items) {
    const descLines = doc.splitTextToSize(item.description, descMaxW);
    const rowHeight = Math.max(descLines.length * 5 + 1, 7);
    if (y + rowHeight > 260) {
      doc.addPage();
      fillInvoicePdfPageBackground(doc);
      y = 20;
    }
    const pct = item.discountPercent ?? 0;
    let lineY = y;
    for (const dl of descLines) {
      doc.text(dl, colDesc, lineY);
      lineY += 5;
    }
    const numY = y;
    doc.text(String(item.quantity), colQtyRight, numY, { align: "right" });
    doc.text(`₹${item.unitPrice}`, colPriceRight, numY, { align: "right" });
    doc.text(pct > 0 ? `${pct}%` : "—", colDiscRight, numY, { align: "right" });
    doc.text(`₹${item.amount}`, amountRight, numY, { align: "right" });
    y += rowHeight;
  }

  y += 4;
  doc.setDrawColor(200);
  doc.line(colDesc, y, amountRight, y);
  y += 7;
  setPdfFont(doc, usePoppins, "bold");
  const totalVal = `₹${inv.total}`;
  const totalValW = doc.getTextWidth(totalVal);
  doc.text(totalVal, amountRight, y, { align: "right" });
  doc.text("Total:", amountRight - totalValW - 3, y, { align: "right" });
  setPdfFont(doc, usePoppins, "normal");

  const pageCount = doc.getNumberOfPages();
  for (let p = 1; p <= pageCount; p++) {
    doc.setPage(p);
    const w = doc.internal.pageSize.getWidth();
    const h = doc.internal.pageSize.getHeight();
    doc.setFontSize(7);
    doc.setTextColor(100, 98, 90);
    setPdfFont(doc, usePoppins, "normal");
    const footerLine = `${STUDIO_CONTACT.displayName} · ${STUDIO_CONTACT.email} · ${STUDIO_CONTACT.phone} · Instagram ${STUDIO_CONTACT.instagramHandle}`;
    doc.text(footerLine, w / 2, h - 8, { align: "center", maxWidth: w - 28 });
    doc.setTextColor(0, 0, 0);
  }

  doc.save(`invoice-${inv.id}.pdf`);
}

const emptyLine = (): Invoice["items"][0] => ({
  description: "",
  quantity: 1,
  unitPrice: 0,
  discountPercent: 0,
  amount: 0,
});

const emptyFormState = () => ({
  customerName: "",
  email: "",
  address: "",
  items: [emptyLine()],
  status: "draft" as Invoice["status"],
});

function invoiceToForm(inv: Invoice) {
  return {
    customerName: inv.customerName,
    email: inv.email,
    address: inv.address ?? "",
    items: inv.items.map((i) => ({
      ...i,
      discountPercent: normalizeDiscountPercent(i.discountPercent),
      amount: invoiceLineAmount(
        i.quantity,
        i.unitPrice,
        normalizeDiscountPercent(i.discountPercent)
      ),
    })),
    status: inv.status,
  };
}

export default function AdminInvoicesPage() {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyFormState);

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
      items: [...f.items, { description: "", quantity: 1, unitPrice: 0, discountPercent: 0, amount: 0 }],
    }));
  };

  const updateLine = (index: number, field: keyof Invoice["items"][0], value: number | string) => {
    setForm((f) => {
      const next = [...f.items];
      (next[index] as Record<string, unknown>)[field] = value;
      if (field === "quantity" || field === "unitPrice" || field === "discountPercent") {
        const row = next[index];
        const q = field === "quantity" ? (value as number) : row.quantity;
        const u = field === "unitPrice" ? (value as number) : row.unitPrice;
        const pct =
          field === "discountPercent"
            ? normalizeDiscountPercent(value as number)
            : normalizeDiscountPercent(row.discountPercent);
        next[index].amount = invoiceLineAmount(q, u, pct);
        if (field === "discountPercent") next[index].discountPercent = pct;
      }
      return { ...f, items: next };
    });
  };

  const total = form.items.reduce((s, i) => s + i.amount, 0);

  const resetForm = () => {
    setEditingId(null);
    setForm(emptyFormState());
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const normalizedItems = form.items.map((i) => {
        const discountPercent = normalizeDiscountPercent(i.discountPercent);
        return {
          ...i,
          discountPercent,
          amount: invoiceLineAmount(i.quantity, i.unitPrice, discountPercent),
        };
      });
      const computedTotal = normalizedItems.reduce((s, i) => s + i.amount, 0);

      if (editingId) {
        await updateInvoice(editingId, {
          customerName: form.customerName,
          email: form.email,
          address: form.address || undefined,
          items: normalizedItems,
          total: computedTotal,
          status: form.status,
        });
      } else {
        await addInvoice({
          customerName: form.customerName,
          email: form.email,
          address: form.address || undefined,
          items: normalizedItems,
          total: computedTotal,
          status: form.status,
        });
      }
      resetForm();
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
          onClick={() => {
            if (showForm) {
              resetForm();
              setShowForm(false);
            } else {
              resetForm();
              setShowForm(true);
            }
          }}
          className="bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-700"
        >
          {showForm ? "Cancel" : "Generate Invoice"}
        </button>
      </div>

      {showForm && (
        <div className="bg-white rounded-lg shadow p-6 mb-6 max-w-2xl">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            {editingId ? "Edit invoice" : "Create invoice"}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Customer Name *</label>
                <input
                  type="text"
                  required
                  value={form.customerName}
                  onChange={(e) => setForm((f) => ({ ...f, customerName: e.target.value }))}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-white text-gray-900 placeholder:text-gray-400"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-white text-gray-900 placeholder:text-gray-400"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
              <textarea
                value={form.address}
                onChange={(e) => setForm((f) => ({ ...f, address: e.target.value }))}
                rows={2}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-white text-gray-900 placeholder:text-gray-400"
              />
            </div>
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-sm font-medium text-gray-700">Line items</label>
                <button type="button" onClick={addLine} className="text-sm text-gray-600 hover:text-gray-900">
                  + Add line
                </button>
              </div>
              <div className="hidden sm:flex gap-2 text-xs font-medium text-gray-500 uppercase tracking-wide mb-1 pl-0.5">
                <span className="flex-1 min-w-[120px]">Description</span>
                <span className="w-16 shrink-0">Qty</span>
                <span className="w-24 shrink-0">Price</span>
                <span className="w-20 shrink-0">Disc. %</span>
                <span className="w-16 shrink-0 text-right">Amount</span>
              </div>
              <div className="space-y-2">
                {form.items.map((item, i) => (
                  <div key={i} className="flex gap-2 flex-wrap items-center">
                    <input
                      type="text"
                      placeholder="Description"
                      value={item.description}
                      onChange={(e) => updateLine(i, "description", e.target.value)}
                      className="flex-1 min-w-[120px] border border-gray-300 rounded px-2 py-1 text-sm bg-white text-gray-900 placeholder:text-gray-400"
                    />
                    <input
                      type="number"
                      min={1}
                      placeholder="Qty"
                      value={item.quantity}
                      onChange={(e) => updateLine(i, "quantity", Number(e.target.value) || 0)}
                      className="w-16 border border-gray-300 rounded px-2 py-1 text-sm bg-white text-gray-900 placeholder:text-gray-400"
                    />
                    <input
                      type="number"
                      min={0}
                      placeholder="Unit price"
                      value={item.unitPrice || ""}
                      onChange={(e) => updateLine(i, "unitPrice", Number(e.target.value) || 0)}
                      className="w-24 border border-gray-300 rounded px-2 py-1 text-sm bg-white text-gray-900 placeholder:text-gray-400"
                    />
                    <input
                      type="number"
                      min={0}
                      max={100}
                      step={0.5}
                      placeholder="%"
                      value={item.discountPercent || ""}
                      onChange={(e) =>
                        updateLine(i, "discountPercent", Number(e.target.value) || 0)
                      }
                      className="w-20 border border-gray-300 rounded px-2 py-1 text-sm bg-white text-gray-900 placeholder:text-gray-400"
                    />
                    <span className="text-sm text-gray-900 w-16 tabular-nums">₹{item.amount}</span>
                  </div>
                ))}
              </div>
              <p className="mt-2 font-semibold text-gray-900">Total: ₹{total}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
              <select
                value={form.status}
                onChange={(e) => setForm((f) => ({ ...f, status: e.target.value as Invoice["status"] }))}
                className="border border-gray-300 rounded-lg px-3 py-2 bg-white text-gray-900"
              >
                <option value="draft">Draft</option>
                <option value="sent">Sent</option>
                <option value="paid">Paid</option>
              </select>
            </div>
            <button type="submit" disabled={saving} className="bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-700 disabled:opacity-50">
              {saving ? (editingId ? "Saving…" : "Generating…") : editingId ? "Save changes" : "Generate Invoice"}
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
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {loading ? (
              <tr>
                <td colSpan={7} className="px-4 py-8 text-center text-gray-500">
                  Loading…
                </td>
              </tr>
            ) : invoices.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-4 py-8 text-center text-gray-500">
                  No invoices yet.
                </td>
              </tr>
            ) : (
              invoices.map((inv) => (
                <tr key={inv.id} className="hover:bg-gray-50">
                  <td className="px-4 py-2 font-mono text-sm text-gray-900">{inv.id}</td>
                  <td className="px-4 py-2">
                    <p className="font-medium text-gray-900">{inv.customerName}</p>
                    <p className="text-sm text-gray-500">{inv.email}</p>
                  </td>
                  <td className="px-4 py-2 font-medium text-gray-900">₹{inv.total}</td>
                  <td className="px-4 py-2">
                    <select
                      value={inv.status}
                      onChange={async (e) => {
                        await updateInvoiceStatus(inv.id, e.target.value as Invoice["status"]);
                        load();
                      }}
                      className="border border-gray-300 rounded px-2 py-1 text-sm bg-white text-gray-900"
                    >
                      <option value="draft">Draft</option>
                      <option value="sent">Sent</option>
                      <option value="paid">Paid</option>
                    </select>
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-600">{new Date(inv.createdAt).toLocaleDateString()}</td>
                  <td className="px-4 py-2">
                    <div className="flex flex-wrap gap-3">
                      <button
                        type="button"
                        onClick={() => {
                          setForm(invoiceToForm(inv));
                          setEditingId(inv.id);
                          setShowForm(true);
                        }}
                        className="text-sm text-gray-700 underline hover:text-gray-900"
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        onClick={() => void downloadInvoicePdf(inv)}
                        className="text-sm text-gray-700 underline hover:text-gray-900"
                      >
                        PDF
                      </button>
                    </div>
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
