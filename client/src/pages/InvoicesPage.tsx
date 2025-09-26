import { useState } from "react";
import { useInvoices, useInvoice } from "../hooks/useInvoices";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../components/ui/dialog";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../components/ui/pagination";
import type { Invoice } from "../schemas";

export default function InvoicesPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;
  const { invoices, total, isLoading, error } = useInvoices(
    currentPage,
    pageSize
  );
  const [selectedInvoiceId, setSelectedInvoiceId] = useState<string | null>(
    null
  );
  const { invoice: selectedInvoice, isLoading: isLoadingInvoice } = useInvoice(
    selectedInvoiceId || ""
  );

  const totalPages = Math.ceil(total / pageSize);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  const getStatus = (invoice: Invoice) => {
    if (invoice.paid) return "Paid";

    const dueDate = new Date(invoice.dueDate);
    const today = new Date();

    if (dueDate < today) return "Overdue";
    return "Open";
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Paid":
        return "text-green-600";
      case "Overdue":
        return "text-red-600";
      case "Open":
        return "text-yellow-600";
      default:
        return "text-gray-600";
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto py-8 px-4">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-lg">Loading invoices...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto py-8 px-4">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-lg text-red-600">Error loading invoices</div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <h2 className="text-3xl font-bold mb-6">Invoices</h2>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Payee</TableHead>
              <TableHead>Due Date</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {invoices.map((invoice) => {
              const status = getStatus(invoice);
              return (
                <TableRow
                  key={invoice.id}
                  className="cursor-pointer hover:bg-gray-50"
                  onClick={() => setSelectedInvoiceId(invoice.id)}
                >
                  <TableCell>{formatDate(invoice.date)}</TableCell>
                  <TableCell className="font-medium">
                    {invoice.vendorName}
                  </TableCell>
                  <TableCell>{formatDate(invoice.dueDate)}</TableCell>
                  <TableCell>{formatCurrency(invoice.amount)}</TableCell>
                  <TableCell className={getStatusColor(status)}>
                    {status}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>

      <div className="mt-6">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                className={
                  currentPage === 1
                    ? "pointer-events-none opacity-50"
                    : "cursor-pointer"
                }
              />
            </PaginationItem>

            {[...Array(totalPages)].map((_, i) => (
              <PaginationItem key={i + 1}>
                <PaginationLink
                  onClick={() => setCurrentPage(i + 1)}
                  isActive={currentPage === i + 1}
                  className="cursor-pointer"
                >
                  {i + 1}
                </PaginationLink>
              </PaginationItem>
            ))}

            <PaginationItem>
              <PaginationNext
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                className={
                  currentPage === totalPages
                    ? "pointer-events-none opacity-50"
                    : "cursor-pointer"
                }
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>

      {/* Invoice modal */}
      <Dialog
        open={!!selectedInvoiceId}
        onOpenChange={() => setSelectedInvoiceId(null)}
      >
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Invoice Details</DialogTitle>
            <DialogDescription>
              Invoice #{selectedInvoice?.id}
            </DialogDescription>
          </DialogHeader>

          {isLoadingInvoice ? (
            <div className="text-center py-4">Loading invoice details...</div>
          ) : selectedInvoice ? (
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-500">
                  Date
                </label>
                <p className="text-sm">{formatDate(selectedInvoice.date)}</p>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-500">
                  Payee
                </label>
                <p className="text-sm">{selectedInvoice.vendorName}</p>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-500">
                  Amount
                </label>
                <p className="text-sm font-semibold">
                  {formatCurrency(selectedInvoice.amount)}
                </p>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-500">
                  Due Date
                </label>
                <p className="text-sm">{formatDate(selectedInvoice.dueDate)}</p>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-500">
                  Status
                </label>
                <p
                  className={`text-sm font-medium ${getStatusColor(
                    getStatus(selectedInvoice)
                  )}`}
                >
                  {getStatus(selectedInvoice)}
                </p>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-500">
                  Description
                </label>
                <p className="text-sm">{selectedInvoice.description}</p>
              </div>
            </div>
          ) : null}
        </DialogContent>
      </Dialog>
    </div>
  );
}
