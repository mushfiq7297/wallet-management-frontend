/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useGetCommissionHistoryQuery } from "@/redux/agentApi/agentApi";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AgentCommissions() {
  const { data, isLoading, isError } = useGetCommissionHistoryQuery();

  if (isLoading) return <p className="p-4">Loading commission history...</p>;
  if (isError) return <p className="p-4 text-red-600">Failed to load data</p>;

  const commissions = data?.data ?? [];

  return (
    <Card className="p-4 shadow-lg">
      <CardHeader>
        <CardTitle className="text-xl font-bold">Commission History</CardTitle>
      </CardHeader>
      <CardContent>
        {commissions.length === 0 ? (
          <p className="text-gray-500">No commission history found.</p>
        ) : (
          <Table>
            <TableCaption>Your total commission transactions history.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead className="text-center">Type</TableHead>
                <TableHead className="text-center">Amount</TableHead>
                <TableHead className="text-center">Commission Earned</TableHead>
                <TableHead className="text-right">Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {commissions.map((tx: any) => (
                <TableRow key={tx.transactionId}>
                  <TableCell>{tx?.user?.name ?? tx?.user?.phone}</TableCell>
                  <TableCell className="text-center">{tx.type}</TableCell>
                  <TableCell className="text-center">৳{tx.amount}</TableCell>
                  <TableCell className="text-center text-green-600 font-semibold">
                    ৳{tx.commissionEarned.toFixed(2)}
                  </TableCell>
                  <TableCell className="text-right text-sm text-muted-foreground">
                    {new Date(tx.date).toLocaleDateString()}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
}