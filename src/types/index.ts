import { ComponentType } from "react";

export type TRole = "ADMIN" | "USER" | "AGENT"

export interface ISidebarItem {
  title: string;
  items: {
    title: string;
    url: string;
   component: ComponentType;
  }[];
}


export interface Transaction {
  _id: string;
  type: "topup" | "withdraw" | "send";
  amount: number;
  status: "pending" | "completed" | "failed";
  createdAt: string;
}


export interface Wallet {
  _id: string;
  owner: string;
  balance: number;
  createdAt: string;
  updatedAt: string;
}


export type ApiResponse<T> = {
  statusCode: number;
  success: boolean;
  message: string;
  data?: T;
};


export interface CommissionHistory  {
  transactionId: string;
  type: "CASH_IN" | "CASH_OUT";
  amount: number;
  commissionEarned: number;
  user: {
    _id: string;
    name: string;
    email: string;
    phone: string;
  };
  date: string;
};