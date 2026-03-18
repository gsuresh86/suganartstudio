import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
  query,
  orderBy,
  serverTimestamp,
  type DocumentData,
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { getFirebaseDb, getFirebaseStorage } from "./firebase";
import type { Product, Order, Quotation, Invoice } from "./types";

const COLLECTIONS = {
  products: "products",
  orders: "orders",
  quotations: "quotations",
  invoices: "invoices",
  contactSubmissions: "contactSubmissions",
} as const;

function toProduct(d: DocumentData, id: string): Product {
  return {
    id,
    title: d.title ?? "",
    type: d.type ?? "mandala",
    price: Number(d.price) ?? 0,
    description: d.description ?? "",
    dimensions: d.dimensions ?? "",
    medium: d.medium ?? "",
    imageUrl: d.imageUrl,
    createdAt: d.createdAt?.toDate?.()?.toISOString() ?? d.createdAt ?? new Date().toISOString(),
  };
}

function toOrder(d: DocumentData, id: string): Order {
  return {
    id,
    customerName: d.customerName ?? "",
    email: d.email ?? "",
    phone: d.phone,
    items: Array.isArray(d.items) ? d.items : [],
    total: Number(d.total) ?? 0,
    status: d.status ?? "pending",
    createdAt: d.createdAt?.toDate?.()?.toISOString() ?? d.createdAt ?? new Date().toISOString(),
  };
}

function toQuotation(d: DocumentData, id: string): Quotation {
  return {
    id,
    customerName: d.customerName ?? "",
    email: d.email ?? "",
    phone: d.phone,
    items: Array.isArray(d.items) ? d.items : [],
    total: Number(d.total) ?? 0,
    validUntil: d.validUntil ?? "",
    createdAt: d.createdAt?.toDate?.()?.toISOString() ?? d.createdAt ?? new Date().toISOString(),
  };
}

function toInvoice(d: DocumentData, id: string): Invoice {
  return {
    id,
    orderId: d.orderId,
    customerName: d.customerName ?? "",
    email: d.email ?? "",
    address: d.address,
    items: Array.isArray(d.items) ? d.items : [],
    total: Number(d.total) ?? 0,
    status: d.status ?? "draft",
    createdAt: d.createdAt?.toDate?.()?.toISOString() ?? d.createdAt ?? new Date().toISOString(),
  };
}

// ——— Products ———
export async function getAllProducts(): Promise<Product[]> {
  const db = getFirebaseDb();
  const snap = await getDocs(
    query(collection(db, COLLECTIONS.products), orderBy("createdAt", "desc"))
  );
  return snap.docs.map((d) => toProduct(d.data(), d.id));
}

export async function addProduct(
  p: Omit<Product, "id" | "createdAt">
): Promise<Product> {
  const db = getFirebaseDb();
  const data = {
    ...p,
    createdAt: serverTimestamp(),
  };
  const ref = await addDoc(collection(db, COLLECTIONS.products), data);
  return {
    ...p,
    id: ref.id,
    createdAt: new Date().toISOString(),
  };
}

export async function updateProduct(
  id: string,
  updates: Partial<Product>
): Promise<Product | null> {
  const db = getFirebaseDb();
  const { id: _id, createdAt: _c, ...rest } = updates as Partial<Product> & { id?: string; createdAt?: string };
  const clean: Record<string, unknown> = Object.fromEntries(
    Object.entries(rest).filter(([, v]) => v !== undefined)
  );
  if (Object.keys(clean).length > 0) {
    await updateDoc(doc(db, COLLECTIONS.products, id), clean as DocumentData);
  }
  const list = await getAllProducts();
  return list.find((x) => x.id === id) ?? null;
}

export async function deleteProduct(id: string): Promise<boolean> {
  const db = getFirebaseDb();
  await deleteDoc(doc(db, COLLECTIONS.products, id));
  return true;
}

// ——— Orders ———
export async function getAllOrders(): Promise<Order[]> {
  const db = getFirebaseDb();
  const snap = await getDocs(
    query(collection(db, COLLECTIONS.orders), orderBy("createdAt", "desc"))
  );
  return snap.docs.map((d) => toOrder(d.data(), d.id));
}

export async function addOrder(
  o: Omit<Order, "id" | "createdAt">
): Promise<Order> {
  const db = getFirebaseDb();
  const data = {
    ...o,
    createdAt: serverTimestamp(),
  };
  const docRef = await addDoc(collection(db, COLLECTIONS.orders), data);
  return {
    ...o,
    id: docRef.id,
    createdAt: new Date().toISOString(),
  };
}

export async function updateOrderStatus(
  id: string,
  status: Order["status"]
): Promise<Order | null> {
  const db = getFirebaseDb();
  await updateDoc(doc(db, COLLECTIONS.orders, id), { status });
  const list = await getAllOrders();
  return list.find((x) => x.id === id) ?? null;
}

// ——— Quotations ———
export async function getAllQuotations(): Promise<Quotation[]> {
  const db = getFirebaseDb();
  const snap = await getDocs(
    query(collection(db, COLLECTIONS.quotations), orderBy("createdAt", "desc"))
  );
  return snap.docs.map((d) => toQuotation(d.data(), d.id));
}

export async function addQuotation(
  q: Omit<Quotation, "id" | "createdAt">
): Promise<Quotation> {
  const db = getFirebaseDb();
  const data = {
    ...q,
    createdAt: serverTimestamp(),
  };
  const docRef = await addDoc(collection(db, COLLECTIONS.quotations), data);
  return {
    ...q,
    id: docRef.id,
    createdAt: new Date().toISOString(),
  };
}

// ——— Invoices ———
export async function getAllInvoices(): Promise<Invoice[]> {
  const db = getFirebaseDb();
  const snap = await getDocs(
    query(collection(db, COLLECTIONS.invoices), orderBy("createdAt", "desc"))
  );
  return snap.docs.map((d) => toInvoice(d.data(), d.id));
}

export async function addInvoice(
  inv: Omit<Invoice, "id" | "createdAt">
): Promise<Invoice> {
  const db = getFirebaseDb();
  const data = {
    ...inv,
    createdAt: serverTimestamp(),
  };
  const docRef = await addDoc(collection(db, COLLECTIONS.invoices), data);
  return {
    ...inv,
    id: docRef.id,
    createdAt: new Date().toISOString(),
  };
}

export async function updateInvoiceStatus(
  id: string,
  status: Invoice["status"]
): Promise<Invoice | null> {
  const db = getFirebaseDb();
  await updateDoc(doc(db, COLLECTIONS.invoices, id), { status });
  const list = await getAllInvoices();
  return list.find((x) => x.id === id) ?? null;
}

// ——— Contact form submissions ———
export interface ContactSubmission {
  name: string;
  email: string;
  subject?: string;
  message: string;
  createdAt: string;
}

export async function submitContactForm(data: {
  name: string;
  email: string;
  subject?: string;
  message: string;
}): Promise<void> {
  const db = getFirebaseDb();
  await addDoc(collection(db, COLLECTIONS.contactSubmissions), {
    ...data,
    createdAt: serverTimestamp(),
  });
}

// ——— Upload product image to Firebase Storage ———
export async function uploadProductImage(
  file: File,
  productId: string
): Promise<string> {
  const storage = getFirebaseStorage();
  const ext = file.name.split(".").pop() || "jpg";
  const path = `products/${productId}.${ext}`;
  const storageRef = ref(storage, path);
  await uploadBytes(storageRef, file);
  return getDownloadURL(storageRef);
}
