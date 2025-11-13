/* eslint-disable @typescript-eslint/no-explicit-any */
import  { useMemo } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetAllUsersQuery, useGetAllAgentsQuery, useGetAllWalletsQuery, useGetAllTransactionsQuery } from "@/redux/adminApi/adminApi";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, BarChart, Bar, PieChart, Pie, Cell } from "recharts";
import { Users, Wallet, UserCheck } from "lucide-react";

const COLORS = ["#60a5fa", "#34d399", "#f59e0b", "#f97316"];

export default function AnalyticsPage() {
  const { data: usersData, isLoading: usersLoading } = useGetAllUsersQuery(undefined);
  const { data: agentsData, isLoading: agentsLoading } = useGetAllAgentsQuery(undefined);
  const { data: walletsData, isLoading: walletsLoading } = useGetAllWalletsQuery(undefined);
  const { data: transactionsData, isLoading: txLoading } = useGetAllTransactionsQuery(undefined);

  const users = usersData?.data ?? [];
  const agents = agentsData?.data ?? [];
  const wallets = walletsData?.data ?? [];
  const transactions = transactionsData?.data ?? [];

 
  const totalUsers = users.length;
  const totalAgents = agents.length;
  const totalWallets = wallets.length;
  const blockedWallets = wallets.filter((w: any) => !!w.isBlocked).length;
  const totalBalance = wallets.reduce((s: number, w: any) => s + (Number(w.balance) || 0), 0);
  const totalTransactions = transactions.length;


  const txByDay = useMemo(() => {
    const map = new Map<string, number>();
    const today = new Date();
    for (let i = 13; i >= 0; i--) {
      const d = new Date(today);
      d.setDate(today.getDate() - i);
      const key = d.toISOString().slice(0, 10);
      map.set(key, 0);
    }

    transactions.forEach((tx: any) => {
      const date = tx.createdAt ? tx.createdAt.slice(0, 10) : undefined;
      if (!date) return;
      if (map.has(date)) map.set(date, (map.get(date) || 0) + 1);
    });

    return Array.from(map.entries()).map(([date, count]) => ({ date, count }));
  }, [transactions]);

  
  const usersByMonth = useMemo(() => {
    const result: any[] = [];
    const now = new Date();
    for (let i = 5; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const label = d.toLocaleString(undefined, { month: "short", year: "numeric" });
      result.push({ label, count: 0 });
    }

    users.forEach((u: any) => {
      const date = u.createdAt ? new Date(u.createdAt) : null;
      if (!date) return;
      const label = date.toLocaleString(undefined, { month: "short", year: "numeric" });
      const item = result.find((r) => r.label === label);
      if (item) item.count += 1;
    });

    return result;
  }, [users]);

  const walletPie = [
    { name: "Active", value: totalWallets - blockedWallets },
    { name: "Blocked", value: blockedWallets },
  ];

  const isLoading = usersLoading || agentsLoading || walletsLoading || txLoading;

  return (
    <div className="w-full p-4 space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Users className="w-6 h-6 text-sky-500" />
              <div>
                <CardTitle className="text-sm">Total Users</CardTitle>
                <div className="text-2xl font-bold">{isLoading ? <Skeleton className="w-24 h-6" /> : totalUsers}</div>
              </div>
            </div>
            <Badge className="bg-sky-100 text-sky-700">{users.filter((u:any)=>u.status==="ACTIVE").length} active</Badge>
          </CardHeader>
        </Card>

        <Card>
          <CardHeader className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <UserCheck className="w-6 h-6 text-green-500" />
              <div>
                <CardTitle className="text-sm">Agents</CardTitle>
                <div className="text-2xl font-bold">{isLoading ? <Skeleton className="w-24 h-6" /> : totalAgents}</div>
              </div>
            </div>
            <Badge className="bg-green-100 text-green-700">{agents.filter((a:any)=>a.status==="ACTIVE").length} active</Badge>
          </CardHeader>
        </Card>

        <Card>
          <CardHeader className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Wallet className="w-6 h-6 text-amber-500" />
              <div>
                <CardTitle className="text-sm">Total Balance</CardTitle>
                <div className="text-2xl font-bold">{isLoading ? <Skeleton className="w-28 h-6" /> : `৳ ${totalBalance.toLocaleString()}`}</div>
              </div>
            </div>
            <Badge className="bg-amber-100 text-amber-700">{blockedWallets} blocked</Badge>
          </CardHeader>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Transactions (last 14 days)</CardTitle>
          </CardHeader>
          <CardContent className="h-64">
            {isLoading ? (
              <Skeleton className="w-full h-full" />
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={txByDay} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis allowDecimals={false} />
                  <Tooltip />
                  <Line type="monotone" dataKey="count" stroke="#60a5fa" strokeWidth={2} dot={{ r: 3 }} />
                </LineChart>
              </ResponsiveContainer>
            )}
          </CardContent>
        </Card>

        <Card className="flex flex-col">
          <CardHeader>
            <CardTitle>Wallet Status</CardTitle>
          </CardHeader>
          <CardContent className="flex-1 flex items-center justify-center">
            {isLoading ? (
              <Skeleton className="w-32 h-32" />
            ) : (
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie data={walletPie} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={70} label>
                    {walletPie.map((_entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            )}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Users Joined (last 6 months)</CardTitle>
        </CardHeader>
        <CardContent className="h-64">
          {isLoading ? (
            <Skeleton className="w-full h-full" />
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={usersByMonth} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="label" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Bar dataKey="count" fill="#34d399" />
              </BarChart>
            </ResponsiveContainer>
          )}
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
       
        <Card>
          <CardHeader>
            <CardTitle>Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li>Total Users: <strong>{totalUsers}</strong></li>
              <li>Total Agents: <strong>{totalAgents}</strong></li>
              <li>Total Wallets: <strong>{totalWallets}</strong></li>
              <li>Total Transactions: <strong>{totalTransactions}</strong></li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
