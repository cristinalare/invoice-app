import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { Provider } from "react-redux";
import { store } from "./app/store.ts";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { BrowserRouter, Route, Routes } from "react-router";
import LoginPage from "./pages/LoginPage.tsx";
import InvoicesPage from "./pages/InvoicesPage.tsx";
import { Header } from "./components/Header.tsx";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <BrowserRouter>
          <Header />
          <Routes>
            <Route index element={<App />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="invoices" element={<InvoicesPage />} />
          </Routes>
          <ReactQueryDevtools />
        </BrowserRouter>
      </Provider>
    </QueryClientProvider>
  </StrictMode>
);
