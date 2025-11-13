import { ApiResponse, Wallet } from "@/types";
import { baseApi } from "../baseApi";

export const agentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    cashIn: builder.mutation<ApiResponse<Wallet>, { phone: string; amount: number }>({
      query: (data) => ({
        url: "/agent/cash-in",
        method: "POST",
        data,
      }),
      invalidatesTags: ["WALLET", "TRANSACTION"],
    }),

    cashOut: builder.mutation<ApiResponse<Wallet>, { phone: string; amount: number }>({
      query: (data) => ({
        url: "/agent/cash-out",
        method: "POST",
        data,
      }),
      invalidatesTags: ["WALLET", "TRANSACTION"],
    }),

   
    getCommissionHistory: builder.query<ApiResponse<any[]>, void>({
      query: () => ({
        url: "/agent/commission-history",
        method: "GET",
      }),
      providesTags: ["TRANSACTION"],
    }),
  }),
});

export const {
  useCashInMutation,
  useCashOutMutation,
  useGetCommissionHistoryQuery,
} = agentApi;
