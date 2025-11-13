/* eslint-disable @typescript-eslint/no-unused-vars */
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { toast } from "sonner";
import { useGetAllUsersQuery, useMakeAdminMutation, useMakeAgentMutation } from "@/redux/adminApi/adminApi";

const AllUsers = () => {
  const { data, isLoading, isError, refetch, isFetching } = useGetAllUsersQuery();

  const [makeAgent] = useMakeAgentMutation();
  const [makeAdmin] = useMakeAdminMutation();

  const [page, setPage] = useState(1);

  if (isLoading) return <p className="p-4">Loading users...</p>;
  if (isError) return <p className="p-4 text-red-500">Failed to load users.</p>;

  const users: any[] = data?.data ?? [];


  const pageSize = 10;
  const startIndex = (page - 1) * pageSize;
  const paginatedUsers = users.slice(startIndex, startIndex + pageSize);
  const totalPages = Math.ceil(users.length / pageSize);

  const handleMakeAgent = async (id: string) => {
    try {
      await makeAgent(id).unwrap();
      toast.success("User promoted to Agent");
      refetch();
    } catch (error) {
      toast.error("Failed to promote user to agent");
    }
  };

  const handleMakeAdmin = async (id: string) => {
    try {
      await makeAdmin(id).unwrap();
      toast.success("User promoted to Admin");
      refetch();
    } catch (error) {
      toast.error("Failed to promote user to admin");
    }
  };

  return (
    <div className="p-6 space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">All Users</h2>

        <Button onClick={() => refetch()} disabled={isFetching}>
          Refresh
        </Button>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto rounded-md">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>#</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {paginatedUsers.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-6 text-gray-500">
                      No Users Found
                    </TableCell>
                  </TableRow>
                ) : (
                  paginatedUsers.map((user: any, idx: number) => (
                    <TableRow key={user._id}>
                      <TableCell>{startIndex + idx + 1}</TableCell>
                      <TableCell>{user.name}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>{user.phone}</TableCell>

                      <TableCell>
                        <Badge className={user.status === "ACTIVE" ? "bg-green-600" : "bg-red-600"}>
                          {user.status}
                        </Badge>
                      </TableCell>

                      <TableCell>
                        <Badge variant="outline">{user.role}</Badge>
                      </TableCell>

                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="outline">Change Role</Button>
                          </DropdownMenuTrigger>

                          <DropdownMenuContent>
                            {user.role !== "AGENT" && (
                              <DropdownMenuItem onClick={() => handleMakeAgent(user._id)}>
                                Make Agent
                              </DropdownMenuItem>
                            )}
                            {user.role !== "ADMIN" && (
                              <DropdownMenuItem onClick={() => handleMakeAdmin(user._id)}>
                                Make Admin
                              </DropdownMenuItem>
                            )}
                          </DropdownMenuContent>
                        </DropdownMenu>
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

export default AllUsers;
