import type { jsPDF } from "jspdf";

/** RGB sampled from `invoice-logo.png` edge (cream paper tone). */
export const INVOICE_PDF_PAGE_BG_RGB = [244, 240, 226] as const;

/** Fills the current page with the invoice cream background. Call after each `addPage()`. */
export function fillInvoicePdfPageBackground(doc: jsPDF): void {
  const pageW = doc.internal.pageSize.getWidth();
  const pageH = doc.internal.pageSize.getHeight();
  const [r, g, b] = INVOICE_PDF_PAGE_BG_RGB;
  doc.setFillColor(r, g, b);
  doc.rect(0, 0, pageW, pageH, "F");
}

function arrayBufferToBinaryString(buffer: ArrayBuffer): string {
  const bytes = new Uint8Array(buffer);
  const chunk = 0x8000;
  let result = "";
  for (let i = 0; i < bytes.length; i += chunk) {
    result += String.fromCharCode.apply(null, bytes.subarray(i, i + chunk) as unknown as number[]);
  }
  return result;
}

let cachedPoppins: { normal: string; bold: string } | null = null;
let poppinsLoadFailed = false;

/** Registers Poppins on this jsPDF instance. Returns false if fonts could not be loaded. */
export async function registerPoppinsFonts(doc: jsPDF): Promise<boolean> {
  if (typeof window === "undefined" || poppinsLoadFailed) return false;
  try {
    if (!cachedPoppins) {
      const base = window.location.origin;
      const [regRes, boldRes] = await Promise.all([
        fetch(`${base}/fonts/Poppins-Regular.ttf`),
        fetch(`${base}/fonts/Poppins-Bold.ttf`),
      ]);
      if (!regRes.ok || !boldRes.ok) throw new Error("font fetch failed");
      const [regBuf, boldBuf] = await Promise.all([regRes.arrayBuffer(), boldRes.arrayBuffer()]);
      cachedPoppins = {
        normal: arrayBufferToBinaryString(regBuf),
        bold: arrayBufferToBinaryString(boldBuf),
      };
    }
    doc.addFileToVFS("Poppins-Regular.ttf", cachedPoppins.normal);
    doc.addFont("Poppins-Regular.ttf", "Poppins", "normal");
    doc.addFileToVFS("Poppins-Bold.ttf", cachedPoppins.bold);
    doc.addFont("Poppins-Bold.ttf", "Poppins", "bold");
    return true;
  } catch {
    if (!cachedPoppins) poppinsLoadFailed = true;
    return false;
  }
}

export function setPdfFont(doc: jsPDF, usePoppins: boolean, style: "normal" | "bold"): void {
  if (usePoppins) {
    doc.setFont("Poppins", style === "bold" ? "bold" : "normal");
  } else {
    doc.setFont("helvetica", style);
  }
}

export async function fetchInvoiceLogoDataUrl(): Promise<string | null> {
  if (typeof window === "undefined") return null;
  try {
    const res = await fetch(`${window.location.origin}/invoice-logo.png`);
    if (!res.ok) return null;
    const blob = await res.blob();
    return await new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.onerror = () => reject(reader.error);
      reader.readAsDataURL(blob);
    });
  } catch {
    return null;
  }
}
