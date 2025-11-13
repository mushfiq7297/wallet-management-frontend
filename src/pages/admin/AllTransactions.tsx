/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { useGetAllTransactionsQuery } from "@/redux/adminApi/adminApi";
import { useGetAllUsersQuery, useGetAllAgentsQuery } from "@/redux/adminApi/adminApi";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, RefreshCw } from "lucide-react";

export default function AllTransactions() {
  const { data, isLoading, isFetching, isError, refetch } = useGetAllTransactionsQuery();
  const { data: usersData } = useGetAllUsersQuery();
  const { data: agentsData } = useGetAllAgentsQuery();
  const [page, setPage] = React.useState(1);

  const users: any[] = usersData?.data ?? [];
  const agents: any[] = agentsData?.data ?? [];

  function getPhoneById(id: string) {
    return (
      users?.find((u) => u._id === id)?.phone ??
      agents?.find((a) => a._id === id)?.phone ??
      "—"
    );
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-56">
        <Loader2 className="animate-spin h-8 w-8 text-slate-600" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-6">
        <Card>
          <CardContent className="p-4">
            <p className="text-red-600">Failed to load transactions. Try refreshing.</p>
            <div className="mt-3">
              <Button onClick={() => refetch()}>
                <RefreshCw className="w-4 h-4 mr-2" /> Retry
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const transactions: any[] = data?.data ?? [];


  
  const pageSize = 10;
  const startIndex = (page - 1) * pageSize;
  const paginatedTransactions = transactions.slice(startIndex, startIndex + pageSize);
  const totalPages = Math.ceil(transactions.length / pageSize);

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold">All Transactions</h2>
        <Button onClick={() => refetch()} disabled={isFetching}>
          <RefreshCw className="w-4 h-4 mr-2" /> Refresh
        </Button>
      </div>

      <Card className="shadow-sm">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[50px]">#</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>From (Phone)</TableHead>
                <TableHead>To (Phone)</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {paginatedTransactions.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-6 text-gray-500">
                    No transactions found.
                  </TableCell>
                </TableRow>
              ) : (
                paginatedTransactions.map((t: any, idx: number) => (
                  <TableRow key={idx}>
                    <TableCell>{startIndex + idx + 1}</TableCell>
                    <TableCell className={`font-medium ${
                      t.type?.toLowerCase() === "cash_in"  ? "text-green-600" :
                      t.type?.toLowerCase() === "cash_out" ? "text-red-600" : ""
                    }`}>
                      {t.type}
                    </TableCell>
                    <TableCell className="font-semibold text-right">৳{t.amount}</TableCell>

                   
                    <TableCell>{getPhoneById(t.from?._id)}</TableCell>

                   
                    <TableCell>{getPhoneById(t.performedBy?._id)}</TableCell>

                    <TableCell className="capitalize">{t.status ?? "—"}</TableCell>
                    <TableCell>
                      {t.createdAt ? new Date(t.createdAt).toLocaleString() : "—"}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>

      
        <div className="flex justify-between items-center p-4 border-t bg-slate-50">
          <Button
            variant="outline"
            disabled={page === 1}
            onClick={() => setPage((p) => p - 1)}
          >
            Previous
          </Button>

          <span className="text-sm font-medium">
            Page {page} of {totalPages}
          </span>

          <Button
            variant="outline"
            disabled={page === totalPages}
            onClick={() => setPage((p) => p + 1)}
          >
            Next
          </Button>
        </div>
      </Card>
    </div>
  );
}