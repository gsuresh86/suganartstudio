// Re-export Firestore-backed store (async API)
export {
  getAllProducts,
  addProduct,
  updateProduct,
  deleteProduct,
  getAllOrders,
  addOrder,
  updateOrderStatus,
  getAllQuotations,
  addQuotation,
  getAllInvoices,
  addInvoice,
  updateInvoiceStatus,
  submitContactForm,
  uploadProductImage,
} from "./firestore-store";
export type { ContactSubmission } from "./firestore-store";
