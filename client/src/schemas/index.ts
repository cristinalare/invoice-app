import { z } from "zod";

export const userSchema = z.object({
  id: z.string(),
  email: z.email(),
  name: z.string().min(1, "Name is required"),
});

export const loginSchema = z.object({
  email: z.email("Please enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const authResponseSchema = z.object({
  access_token: z.string(),
});

export const invoiceSchema = z.object({
  id: z.string(),
  vendorName: z.string().min(1, "Vendor name is required"),
  amount: z.number().positive("Amount must be positive"),
  dueDate: z.string(),
  date: z.string(),
  paid: z.boolean(),
});

export const invoiceDetailSchema = invoiceSchema.extend({
  description: z.string(),
});

export const invoicesResponseSchema = z.object({
  invoices: z.array(invoiceSchema),
  page: z.number(),
  total: z.number(),
});

export const invoiceDetailResponseSchema = invoiceDetailSchema;

export const apiErrorSchema = z.object({
  message: z.string(),
  status: z.number().optional(),
  errors: z.array(z.string()).optional(),
});

export type User = z.infer<typeof userSchema>;
export type LoginCredentials = z.infer<typeof loginSchema>;
export type AuthResponse = z.infer<typeof authResponseSchema>;
export type Invoice = z.infer<typeof invoiceSchema>;
export type InvoiceDetail = z.infer<typeof invoiceDetailSchema>;
export type InvoicesResponse = z.infer<typeof invoicesResponseSchema>;
export type InvoiceDetailResponse = z.infer<typeof invoiceDetailResponseSchema>;
export type ApiError = z.infer<typeof apiErrorSchema>;
