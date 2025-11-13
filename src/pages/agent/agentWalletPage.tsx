/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { SubmitHandler, useForm } from "react-hook-form";
import { ArrowUpCircle, ArrowDownCircle, Wallet } from "lucide-react";
import { useCashInMutation, useCashOutMutation } from "@/redux/agentApi/agentApi";
import { useGetMyWalletQuery } from "@/redux/userApi/wallet.api";

export default function AgentWalletPage() {
  const [tab, setTab] = useState("cashin");

  const { data: walletData, refetch } = useGetMyWalletQuery(undefined, {
      pollingInterval: 5000,
      
    });

  const [cashIn] = useCashInMutation();
  const [cashOut] = useCashOutMutation();

  type FormValues = {
    phone: string;
    amount: number;
  };

  const { register, handleSubmit, reset } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      if (tab === "cashin") {
        const res = await cashIn({ phone: data.phone, amount: data.amount }).unwrap();
        toast.success(res.message || "Cash-in successful");
      } else if (tab === "cashout") {
        const res = await cashOut({ phone: data.phone, amount: data.amount }).unwrap();
        toast.success(res.message || "Cash-out successful");
      }

      reset(); 
      refetch();
    } catch (error: unknown) {
      if (typeof error === "object" && error && "data" in error) {
        const err = error as { data?: { message?: string } };
        toast.error(err.data?.message || "Transaction failed");
      } else {
        toast.error("Transaction failed");
      }
    }
  };

  return (
    <div className="max-w-5xl mx-auto mt-10 space-y-8">
   
      <Card className="shadow-lg border border-gray-200">
        <CardHeader className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Wallet className="text-primary w-6 h-6" />
            <CardTitle className="text-2xl font-bold">Agent Wallet</CardTitle>
          </div>
          <span className="text-3xl font-extrabold text-green-600">
            ৳{walletData?.data?.balance?.toFixed(2) ?? "0.00"}
          </span>
        </CardHeader>
      </Card>

      {/* Cash In / Cash Out Actions */}
      <Card className="shadow-md border border-gray-100">
        <CardContent className="p-6">
          <div className="flex justify-center gap-3 mb-6">
            <Button
              variant={tab === "cashin" ? "default" : "outline"}
              onClick={() => setTab("cashin")}
              className="flex items-center gap-2"
            >
              <ArrowDownCircle className="w-4 h-4" /> Cash In
            </Button>

            <Button
              variant={tab === "cashout" ? "default" : "outline"}
              onClick={() => setTab("cashout")}
              className="flex items-center gap-2"
            >
              <ArrowUpCircle className="w-4 h-4" /> Cash Out
            </Button>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-md mx-auto">
            <div>
              <Label>User Phone Number</Label>
              <Input
                placeholder="e.g. 017XXXXXXXX"
                {...register("phone", { required: true })}
              />
            </div>

            <div>
              <Label>Amount</Label>
              <Input
                type="number"
                placeholder="Enter amount"
                {...register("amount", { required: true, min: 1 })}
              />
            </div>

            <Button type="submit" className="w-full text-lg py-5">
              {tab === "cashin" ? "Cash In" : "Cash Out"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
