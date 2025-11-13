/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  useGetAllAgentsQuery,
  useApproveAgentMutation,
  useSuspendAgentMutation,
} from "@/redux/adminApi/adminApi";

import { toast } from "sonner";

export default function AllAgents() {
  const { data, refetch, isLoading, isFetching } = useGetAllAgentsQuery();
  const [approve] = useApproveAgentMutation();
  const [suspend] = useSuspendAgentMutation();

  const [page, setPage] = useState(1);

  const agents: any[] = data?.data ?? [];

  const pageSize = 10;
  const startIndex = (page - 1) * pageSize;
  const paginatedAgents = agents.slice(startIndex, startIndex + pageSize);
  const totalPages = Math.ceil(agents.length / pageSize);

  const handleApprove = async (id: string) => {
    await approve(id).unwrap();
    toast.success("✅ Agent Approved");
    refetch();
  };

  const handleSuspend = async (id: string) => {
    await suspend(id).unwrap();
    toast.success("⛔ Agent Suspended");
    refetch();
  };

  if (isLoading)
    return <p className="p-4">Loading agents...</p>;

  return (
    <div className="p-6 space-y-4">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-xl font-semibold">All Agents</h2>

        <Button onClick={() => refetch()} disabled={isFetching}>
          Refresh
        </Button>
      </div>

      <div className="rounded-md border overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>#</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead className="text-center">Status</TableHead>
              <TableHead className="text-center">Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {paginatedAgents.map((agent: any, idx: number) => (
              <TableRow key={agent._id}>
                <TableCell>{startIndex + idx + 1}</TableCell>
                <TableCell>{agent.name}</TableCell>
                <TableCell>{agent.email}</TableCell>
                <TableCell>{agent.phone}</TableCell>

                <TableCell className="text-center">
                  <Badge
                    className={
                      agent.status === "APPROVED"
                        ? "bg-green-100 text-green-600"
                        : "bg-red-100 text-red-600"
                    }
                  >
                    {agent.status}
                  </Badge>
                </TableCell>

                <TableCell>
                  <div className="flex justify-center gap-2">
                    <Button
                      size="sm"
                      className="bg-green-100 text-green-600 hover:bg-green-200"
                      onClick={() => handleApprove(agent._id)}
                    >
                      Approve
                    </Button>

                    <Button
                      size="sm"
                      variant="destructive"
                       className="bg-red-100 text-red-600 hover:bg-red-200"
                      onClick={() => handleSuspend(agent._id)}
                    >
                      Suspend
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      
      <div className="flex justify-between items-center p-4 border rounded-md bg-slate-50">
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
    </div>
  );
}
