/* eslint-disable @typescript-eslint/no-explicit-any */
import { ApiResponse, Wallet } from "@/types";
import { baseApi } from "../baseApi";

export const adminApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({

    getAllUsers: builder.query<ApiResponse<any[]>, void>({
      query: () => ({
        url: "/admin/users",
        method: "GET",
      }),
      providesTags: ["USER"],
    }),


    makeAgent: builder.mutation<ApiResponse<any>, string>({
      query: (id) => ({
        url: `/admin/user/${id}/make-agent`,
        method: "PATCH",
      }),
      invalidatesTags: ["USER", "AGENT"],
    }),


    makeAdmin: builder.mutation<ApiResponse<any>, string>({
      query: (id) => ({
        url: `/admin/user/${id}/make-admin`,
        method: "PATCH",
      }),
      invalidatesTags: ["USER"],
    }),

   
    getAllAgents: builder.query<ApiResponse<any[]>, void>({
      query: () => ({
        url: "/admin/agents",
        method: "GET",
      }),
      providesTags: ["AGENT"],
    }),

    // ✅ Approve agent
    approveAgent: builder.mutation<ApiResponse<any>, string>({
      query: (id) => ({
        url: `/admin/agent/${id}/approve`,
        method: "PATCH",
      }),
      invalidatesTags: ["AGENT"],
    }),

    suspendAgent: builder.mutation<ApiResponse<any>, string>({
      query: (id) => ({
        url: `/admin/agent/${id}/suspend`,
        method: "PATCH",
      }),
      invalidatesTags: ["AGENT"],
    }),


    getAllWallets: builder.query<ApiResponse<Wallet[]>, void>({
      query: () => ({
        url: "/admin/wallets",
        method: "GET",
      }),
      providesTags: ["WALLET"],
    }),

    blockWallet: builder.mutation<ApiResponse<Wallet>, string>({
      query: (id) => ({
        url: `/admin/wallet/${id}/block`,
        method: "PATCH",
      }),
      invalidatesTags: ["WALLET"],
    }),


    unblockWallet: builder.mutation<ApiResponse<Wallet>, string>({
      query: (id) => ({
        url: `/admin/wallet/${id}/unblock`,
        method: "PATCH",
      }),
      invalidatesTags: ["WALLET"],
    }),


    getAllTransactions: builder.query<ApiResponse<any[]>, void>({
      query: () => ({
        url: "/admin/transactions",
        method: "GET",
      }),
      providesTags: ["TRANSACTION"],
    }),
  }),
});

export const {
  useGetAllUsersQuery,
  useMakeAgentMutation,  
  useMakeAdminMutation,  
  useGetAllAgentsQuery,
  useApproveAgentMutation,
  useSuspendAgentMutation,
  useGetAllWalletsQuery,
  useBlockWalletMutation,
  useUnblockWalletMutation,
  useGetAllTransactionsQuery,
} = adminApi;
