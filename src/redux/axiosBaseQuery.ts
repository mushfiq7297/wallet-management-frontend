import { axiosInstance } from "@/lib/axios"
import { BaseQueryFn } from "@reduxjs/toolkit/query"
import { AxiosError, AxiosRequestConfig } from "axios"

const axiosBaseQuery =
  ({ baseUrl }: { baseUrl?: string } = { baseUrl: "http://localhost:5000/api/v1" }): BaseQueryFn<
    {
      url: string
      method?: AxiosRequestConfig['method']
      data?: AxiosRequestConfig['data']
      params?: AxiosRequestConfig['params']
      headers?: AxiosRequestConfig['headers']
    },
    unknown,
    unknown
  > =>
  async ({ url, method, data, params, headers }) => {
    try {
      const result = await axiosInstance({
        url: `${baseUrl}${url}`,
        method,
        data,
        params,
        headers,
      })
      return { data: result.data }
    } catch (axiosError) {
      const err = axiosError as AxiosError
      return {
        error: {
          status: err.response?.status,
          data: err.response?.data || err.message,
        },
      }
    }
  }

  export default axiosBaseQuery