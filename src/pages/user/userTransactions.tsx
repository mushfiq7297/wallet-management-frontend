/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useGetMyTransactionsQuery } from "@/redux/userApi/transaction.api";
import type { Transaction } from "@/types";

export default function UserTransactions() {
  const { data, isLoading, error, refetch, isFetching } =
    useGetMyTransactionsQuery();

  const [page, setPage] = useState(1);

  if (isLoading) {
    return <p className="text-center py-10">Loading transactions...</p>;
  }

  if (error) {
    return (
      <p className="text-center text-red-600 py-10">
        Failed to load transactions
      </p>
    );
  }

  const transactions: Transaction[] = data?.data || [];

  // ✅ Pagination logic
  const pageSize = 8;
  const startIndex = (page - 1) * pageSize;
  const paginatedTransactions = transactions.slice(
    startIndex,
    startIndex + pageSize
  );
  const totalPages = Math.ceil(transactions.length / pageSize);

  return (
    <div className="w-full mx-auto mt-10">
      <Card className="shadow-md border border-gray-200 dark:border-gray-800">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="text-xl font-semibold">
              Transaction History
            </CardTitle>

            <Button onClick={() => refetch()} disabled={isFetching}>
              Refresh
            </Button>
          </div>
        </CardHeader>

        <CardContent>
          {transactions.length > 0 ? (
            <>
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b text-left dark:border-gray-700">
                    <th className="p-2">Date</th>
                    <th className="p-2">Type</th>
                    <th className="p-2">Amount</th>
                    <th className="p-2">Status</th>
                  </tr>
                </thead>

                <tbody>
                  {paginatedTransactions.map((tx) => {
                    const normalizedType = tx.type?.toLowerCase() || "";
                    const isOutgoing =
                      normalizedType.includes("withdraw") ||
                      normalizedType.includes("send");

                    const rawStatus = tx.status || tx.status || "unknown";
                    const status = rawStatus.toLowerCase();
                    const formattedStatus =
                      status.charAt(0).toUpperCase() + status.slice(1);

                    return (
                      <tr
                        key={tx._id}
                        className="border-b hover:bg-gray-50 dark:hover:bg-gray-800 dark:border-gray-700"
                      >
                        <td className="p-2">
                          {new Date(tx.createdAt).toLocaleString()}
                        </td>

                        <td className="p-2 capitalize">{tx.type}</td>

                        <td className="p-2 font-medium">
                          {isOutgoing ? (
                            <span className="text-red-600 dark:text-red-400">
                              -৳{tx.amount}
                            </span>
                          ) : (
                            <span className="text-green-600 dark:text-green-400">
                              +৳{tx.amount}
                            </span>
                          )}
                        </td>

                        <td className="p-2">
                          <span
                            className={`px-2 py-1 rounded text-xs font-medium ${
                              status.includes("complete")
                                ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"
                                : status.includes("fail")
                                ? "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300"
                                : status.includes("pending")
                                ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300"
                                : "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300"
                            }`}
                          >
                            {formattedStatus}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>

              {/* ✅ Pagination Footer */}
              <div className="flex justify-between items-center p-4 border-t dark:border-gray-800">
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
            </>
          ) : (
            <p className="text-gray-500 text-center py-6 dark:text-gray-400">
              No transactions yet
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

