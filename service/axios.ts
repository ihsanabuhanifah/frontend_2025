import axios, { AxiosInstance } from "axios";

export const axiosClient: AxiosInstance = axios.create({
  baseURL: "http://localhost:8700",
  headers: { "Content-Type": "application/json" },
});

export interface BaseResponse {
  status: string;
  message: string;
  data: [] | {};
}

export interface BaseResponsePagination {
  status: string;
  message: string;
  pagination: {
    page: number;
    limit: number;
    pageSize: number;
    total: number;
  };
}