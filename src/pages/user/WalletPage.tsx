/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import {
  useSendMoneyMutation,
  useTopUpMutation,
  useWithdrawMutation,
  useGetMyWalletQuery,
} from "@/redux/userApi/wallet.api";
import { SubmitHandler, useForm } from "react-hook-form";
import { ArrowUpCircle, ArrowDownCircle, Send, Wallet } from "lucide-react";


export default function WalletPage() {
  const [tab, setTab] = useState("topup");


  const { data: walletData, refetch } = useGetMyWalletQuery(undefined, {
    pollingInterval: 5000,
    
  });
  console.log("walletData",walletData)

  const [topUp] = useTopUpMutation();
  const [withdraw] = useWithdrawMutation();
  const [sendMoney] = useSendMoneyMutation();

  type FormValues = {
    amount: number;
    toPhone?: string;
  };

  const { register, handleSubmit, reset } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      if (tab === "topup") {
        const res = await topUp({ amount: data.amount }).unwrap();
        toast.success(res.message || "Top-up successful");
      } else if (tab === "withdraw") {
        const res = await withdraw({ amount: data.amount }).unwrap();
        toast.success(res.message || "Withdrawal successful");
      } else if (tab === "send") {
        const res = await sendMoney({
          toPhone: data.toPhone!,
          amount: data.amount,
        }).unwrap();
        toast.success(res.message || "Money sent successfully");
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
            <CardTitle className="text-2xl font-bold">My Wallet</CardTitle>
          </div>
          <span className="text-3xl font-extrabold text-green-600">
            ৳{walletData?.data?.balance?.toFixed(2) ?? "0.00"}
          </span>
        </CardHeader>
      </Card>

  
      <Card className="shadow-md border border-gray-100">
        <CardContent className="p-6">
          {/* Tab Buttons */}
          <div className="flex justify-center gap-3 mb-6">
            <Button
              variant={tab === "topup" ? "default" : "outline"}
              onClick={() => setTab("topup")}
              className="flex items-center gap-2"
            >
              <ArrowDownCircle className="w-4 h-4" /> Top Up
            </Button>
            <Button
              variant={tab === "withdraw" ? "default" : "outline"}
              onClick={() => setTab("withdraw")}
              className="flex items-center gap-2"
            >
              <ArrowUpCircle className="w-4 h-4" /> Withdraw
            </Button>
            <Button
              variant={tab === "send" ? "default" : "outline"}
              onClick={() => setTab("send")}
              className="flex items-center gap-2"
            >
              <Send className="w-4 h-4" /> Send Money
            </Button>
          </div>

          {/* --- Form --- */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-md mx-auto">
            {tab === "send" && (
              <div>
                <Label>Receiver Phone Number</Label>
                <Input
                  placeholder="e.g. 017XXXXXXXX"
                  {...register("toPhone", { required: tab === "send" })}
                />
              </div>
            )}

            <div>
              <Label>Amount</Label>
              <Input
                type="number"
                placeholder="Enter amount"
                {...register("amount", { required: true, min: 1 })}
              />
            </div>

            <Button type="submit" className="w-full text-lg py-5">
              {tab === "topup"
                ? "Top Up Now"
                : tab === "withdraw"
                ? "Withdraw Now"
                : "Send Money"}
            </Button>
          </form>
        </CardContent>
      </Card>

     

    </div>
  );
}
