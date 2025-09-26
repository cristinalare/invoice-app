import { useQuery } from '@tanstack/react-query'
import { apiService } from '../services/api'

export const useInvoices = (page: number = 1, size: number = 10) => {
  const invoicesQuery = useQuery({
    queryKey: ['invoices', page, size],
    queryFn: () => apiService.getInvoices(page, size),
    staleTime: 1000 * 60 * 60, // 60 minutes
  })

  return {
    invoices: invoicesQuery.data?.invoices || [],
    page: invoicesQuery.data?.page || 1,
    total: invoicesQuery.data?.total || 0,
    isLoading: invoicesQuery.isLoading,
    error: invoicesQuery.error,
    refetch: invoicesQuery.refetch,
  }
}

export const useInvoice = (id: string) => {
  const invoiceQuery = useQuery({
    queryKey: ['invoice', id],
    queryFn: () => apiService.getInvoiceById(id),
    enabled: !!id, 
    staleTime: 1000 * 60 * 60, // 60 minutes
  })

  return {
    invoice: invoiceQuery.data,
    isLoading: invoiceQuery.isLoading,
    error: invoiceQuery.error,
  }
}