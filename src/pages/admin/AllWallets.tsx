/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState } from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import {
  useBlockWalletMutation,
  useGetAllWalletsQuery,
  useUnblockWalletMutation,
} from "@/redux/adminApi/adminApi";

import { toast } from "sonner";

const AllWallets = () => {
  const { data, isLoading, isError, refetch, isFetching } =
    useGetAllWalletsQuery();

  const [blockWallet] = useBlockWalletMutation();
  const [unblockWallet] = useUnblockWalletMutation();

  const [page, setPage] = useState(1);

  if (isLoading) return <p className="p-4">Loading wallets...</p>;
  if (isError) return <p className="p-4 text-red-500">Failed to load wallets.</p>;

  const wallets: any[] = data?.data ?? [];


  const pageSize = 10;
  const startIndex = (page - 1) * pageSize;
  const paginatedWallets = wallets.slice(startIndex, startIndex + pageSize);
  const totalPages = Math.ceil(wallets.length / pageSize);

  return (
    <div className="p-6 space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">All Wallets</h2>

        <Button onClick={() => refetch()} disabled={isFetching}>
          Refresh
        </Button>
      </div>

      <Card>
        <CardContent className="p-0">
          {/* Responsive scroll for mobile */}
          <div className="overflow-x-auto rounded-md">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>#</TableHead>
                  <TableHead>Owner (Email)</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Balance</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-center">Action</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {paginatedWallets.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-6 text-gray-500">
                      No Wallets Found
                    </TableCell>
                  </TableRow>
                ) : (
                  paginatedWallets.map((wallet: any, idx: number) => (
                    <TableRow key={wallet._id}>
                      <TableCell>{startIndex + idx + 1}</TableCell>

                      <TableCell>{wallet.owner?.email ?? "N/A"}</TableCell>

                      <TableCell>{wallet.owner?.role ?? "N/A"}</TableCell>

                      <TableCell className="font-semibold">{wallet.balance} ৳</TableCell>

                      <TableCell>
                        <Badge className={wallet.isBlocked ? "bg-red-600" : "bg-green-600"}>
                          {wallet.isBlocked ? "Blocked" : "Active"}
                        </Badge>
                      </TableCell>

                      <TableCell className="text-center">
                        {wallet.isBlocked ? (
                          <Button
                            size="sm"
                            className="bg-green-600 hover:bg-green-700"
                            onClick={async () => {
                              try {
                                await unblockWallet(wallet.owner._id).unwrap();
                                toast.success("Wallet unblocked");
                                refetch();
                              } catch {
                                toast.error("Failed to unblock wallet");
                              }
                            }}
                          >
                            Unblock
                          </Button>
                        ) : (
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={async () => {
                              try {
                                await blockWallet(wallet.owner._id).unwrap();
                                toast.success("Wallet blocked");
                                refetch();
                              } catch {
                                toast.error("Failed to block wallet");
                              }
                            }}
                          >
                            Block
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>

    
        <div className="flex justify-between items-center p-4 border-t bg-slate-50">
          <Button
            variant="outline"
            disabled={page === 1}
            onClick={() => setPage((prev) => prev - 1)}
          >
            Previous
          </Button>

          <span className="text-sm font-medium">
            Page {page} of {totalPages}
          </span>

          <Button
            variant="outline"
            disabled={page === totalPages}
            onClick={() => setPage((prev) => prev + 1)}
          >
            Next
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default AllWallets;
