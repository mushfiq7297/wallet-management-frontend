import { ApiResponse, Wallet } from "@/types";
import { baseApi } from "../baseApi";


export const walletApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getMyWallet: builder.query<ApiResponse<Wallet>, void>({
      query: () => ({
        url: "/user/me",
        method: "GET",
      }),
      providesTags: ["WALLET"],
    }),
    topUp: builder.mutation<ApiResponse<Wallet>, { amount: number }>({
      query: (data) => ({
        url: "/wallet/topup",
        method: "POST",
        data,
      }),
      invalidatesTags: ["WALLET", "TRANSACTION"],
    }),
    withdraw: builder.mutation<ApiResponse<Wallet>, { amount: number }>({
      query: (data) => ({
        url: "/wallet/withdraw",
        method: "POST",
        data,
      }),
      invalidatesTags: ["WALLET", "TRANSACTION"],
    }),
    sendMoney: builder.mutation<ApiResponse<Wallet>, { toPhone: string; amount: number }>({
      query: (data) => ({
        url: "/wallet/send",
        method: "POST",
        data,
      }),
      invalidatesTags: ["WALLET", "TRANSACTION"],
    }),
  }),
});

export const {
  useGetMyWalletQuery,
  useTopUpMutation,
  useWithdrawMutation,
  useSendMoneyMutation,
} = walletApi;
