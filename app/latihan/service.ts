import { axiosClient } from "@/service/axios";
import {
  CreateLatihan,
  CreateLatihanBulk,
  FilterLatihan,
  LatihanDetailResponse,
  ListLatihanResponse,
  UpdateLatihan,
} from "./interace";

export const latihanService = {
  list: async (params: FilterLatihan): Promise<ListLatihanResponse> => {
    return await axiosClient
      .get("/latihan/list", { params })
      .then((n) => n.data);
  },
  create_bulk: async (payload: CreateLatihanBulk): Promise<any> => {
    return await axiosClient
      .post("/latihan/create-bulk", {
        ...payload,
      })
      .then((n) => n.data);
  },

  create: async (payload: CreateLatihan): Promise<any> => {
    return await axiosClient
      .post("/latihan/create", {
        ...payload,
        umur: Number(payload.umur),
      })
      .then((n) => n.data);
  },

  update: async (payload: UpdateLatihan): Promise<any> => {
    return await axiosClient
      .put(`/latihan/update/${payload.id}`, {
        ...payload,
        umur: Number(payload.umur),
      })
      .then((n) => n.data);
  },
  detail: async (id: string): Promise<LatihanDetailResponse> =>
    axiosClient.get(`/latihan/detail/${id}`).then((res) => res.data),

  delete: async (id: number) =>
    axiosClient.delete(`/latihan/delete/${id}`).then((res) => res.data),
};
