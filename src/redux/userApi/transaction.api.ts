import { ApiResponse, Transaction } from "@/types";
import { baseApi } from "../baseApi";


export const transactionApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getMyTransactions: builder.query<ApiResponse<Transaction[]>, void>({
      query: () => ({
        url: "/transaction/my-transactions",
        method: "GET",
      }),
      providesTags: ["TRANSACTION"],
    }),
  }),
});

export const { useGetMyTransactionsQuery } = transactionApi;
