import { axiosClient } from "@/service/axios";
import {
  CreateLatihan,
  FilterLatihan,
  LatihanDetailResponse,
  ListLatihanResponse,
} from "./interace";

export const latihanService = {
  list: async (params:FilterLatihan): Promise<ListLatihanResponse> => {
    return await axiosClient.get("/latihan/list", {params}).then((n) => n.data);
  },
  create: async (payload: CreateLatihan): Promise<any> => {
    return await axiosClient
      .post("/latihan/create", {
        ...payload,
        umur: Number(payload.umur),
      })
      .then((n) => n.data);
  },
  detail: async (id: string): Promise<LatihanDetailResponse> =>
    axiosClient.get(`/latihan/detail/${id}`).then((res) => res.data),
};
