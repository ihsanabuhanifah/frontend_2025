import { BaseResponse, BaseResponsePagination } from "@/service/axios";

export interface Latihan {
  id: number;
  title: string;
  name: string;
  alamat: string;
  umur: number;
  updated_at: Date;
}

export interface ListLatihanResponse extends BaseResponse {
  data: Latihan[];
  page: number;
  meta: {
    total: number;
    page: number;
    limit: number;
    lastPage: number;
  };
}
export interface LatihanDetailResponse extends BaseResponse {
  data: Latihan;
}

export interface FilterLatihan {
  title: string;
  name: string;
  alamat: string;
  umur: string;
  page: number;
  limit: number;
  keyword : string
}

export interface CreateLatihan {
  title: string;
  name: string;
  alamat: string;
  umur: number | string;
}
