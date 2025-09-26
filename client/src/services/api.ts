import axios from "axios";
import Cookies from "js-cookie";
import {
  authResponseSchema,
  invoicesResponseSchema,
  invoiceDetailResponseSchema,
  apiErrorSchema,
  type LoginCredentials,
  type AuthResponse,
  type InvoicesResponse,
  type InvoiceDetail,
  type ApiError,
} from "../schemas";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:3000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = Cookies.get("auth_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      Cookies.remove("auth_token");
    }
    return Promise.reject(error);
  }
);

export const apiService = {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const response = await api.post("/auth/login", credentials);
    const authData = authResponseSchema.parse(response.data);

    Cookies.set("auth_token", authData.access_token, {
      expires: 7, // 7 days
      secure: window.location.protocol === "https:",
      sameSite: "strict",
    });

    return authData;
  },

  async logout(): Promise<void> {
    Cookies.remove("auth_token");
  },

  async getInvoices(
    page: number = 1,
    size: number = 10
  ): Promise<InvoicesResponse> {
    const params = new URLSearchParams({
      page: page.toString(),
      size: size.toString(),
    });
    const response = await api.get(`/invoices?${params}`);
    return invoicesResponseSchema.parse(response.data);
  },

  async getInvoiceById(id: string): Promise<InvoiceDetail> {
    const response = await api.get(`/invoices/${id}`);
    return invoiceDetailResponseSchema.parse(response.data);
  },
};

export const handleApiError = (error: unknown): ApiError => {
  if (axios.isAxiosError(error) && error.response?.data) {
    try {
      return apiErrorSchema.parse(error.response.data);
    } catch {
      return {
        message: error.response.data.message || "An error occurred",
        status: error.response.status,
      };
    }
  }

  return {
    message:
      error instanceof Error ? error.message : "An unexpected error occurred",
  };
};
