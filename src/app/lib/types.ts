export type ArtType = "mandala" | "lippon" | "dot-mandala";

export interface Product {
  id: string;
  title: string;
  type: ArtType;
  price: number;
  description: string;
  dimensions: string;
  medium: string;
  imageUrl?: string;
  createdAt: string;
}

export interface Order {
  id: string;
  customerName: string;
  email: string;
  phone?: string;
  items: { productId: string; title: string; quantity: number; price: number }[];
  total: number;
  status: "pending" | "confirmed" | "shipped" | "delivered";
  createdAt: string;
}

export interface Quotation {
  id: string;
  customerName: string;
  email: string;
  phone?: string;
  items: { description: string; quantity: number; unitPrice: number; amount: number }[];
  total: number;
  validUntil: string;
  createdAt: string;
}

export interface Invoice {
  id: string;
  orderId?: string;
  customerName: string;
  email: string;
  address?: string;
  items: { description: string; quantity: number; unitPrice: number; amount: number }[];
  total: number;
  status: "draft" | "sent" | "paid";
  createdAt: string;
}
