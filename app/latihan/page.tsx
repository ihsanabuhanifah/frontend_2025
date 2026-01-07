"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { latihanService } from "./service";
import { FilterLatihan } from "./interace";
import Drawer from "../component/Drawer";
import InputText from "../component/InputText";
import Button from "../component/Button";
import Swal from "sweetalert2";

export default function LatihanPage() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const [open, setOpen] = useState(false);
  const [filter, setFilter] = useState<FilterLatihan>({
    title: "",
    name: "",
    alamat: "",
    umur: "",
    page: 1,
    limit: 10,
    keyword: "",
  });

  const [filterSubmit, setFilterSubmit] = useState(filter);

  const handleChangeFilter = (e: any) => {
    setFilter((v) => ({ ...v, [e.target.name]: e.target.value }));
  };

  const handleSubmit = () => {
    setFilterSubmit({ ...filter, page: 1 }); // reset ke halaman 1 saat filter berubah
    setOpen(false);
  };

  const handlePageChange = (newPage: number) => {
    if (newPage < 1) return;
    setFilterSubmit((prev) => ({ ...prev, page: newPage }));
  };

  const handleLimitChange = (limit: number) => {
    setFilterSubmit((prev) => ({ ...prev, limit: limit, page: 1 }));
  };

  const { data, isFetching, isError, refetch } = useQuery({
    queryKey: ["latihan-list", {filterSubmit}],
    queryFn: () => latihanService.list(filterSubmit),
    retry: 1,
    staleTime : 1000 * 60 * 60,  // waktu cache di anggap fresh sehingga tidak refrech
    refetchInterval : 1000 * 60 * 60, // untuk refetch pada intervel tertentu
    select: (res) => res,
  });

  const mutate = useMutation({
    mutationFn: (id: number) => latihanService.delete(id),
    onSuccess: async(res) => {

      await queryClient.cancelQueries({ queryKey: ["latihan-list"] }); // untauk cancel jika ada fetch dari listihan-list

      const previousData: any = queryClient.getQueryData(["latihan-list"]);

     

      const filtered = previousData.data.filter((item: {
        id  : number
      })=> item.id !== Number(res.message))
      queryClient.setQueryData(["latihan-list"], () => {
        return {
          ...previousData,
          data: [...filtered],
        };
      });
      // queryClient.invalidateQueries({
      //   queryKey: ["latihan-list"],
      //    exact: false, // invalidasi semua yang punya prefix ini
      // });

      Swal.fire({
        title: "Good job!",
        text: "Berhasil Terhapus",
        icon: "success",
      });
    },

    onError: () => {
      Swal.fire({
        title: "Error!",
        text: "Ada Kesalahan",
        icon: "error",
      });
    },
  });

  useEffect(() => {
    const timeout = setTimeout(() => {
      setFilterSubmit(filter);
    }, 500);

    return () => {
      clearTimeout(timeout);
    };
  }, [filter.keyword]);

 

  const handleDelete = (id: number) => {
    Swal.fire({
      title: "Yakin ingin menghapus?",
      text: "Data yang dihapus tidak dapat dikembalikan!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Ya, hapus!",
    }).then((result) => {
      if (result.isConfirmed) {
        mutate.mutateAsync(id);
      }
    });
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">
        📚 Daftar Latihan
      </h1>

      {/* Drawer Filter */}
      <Drawer title="Filter" isOpen={open} onClose={() => setOpen(false)}>
        <div className="space-y-5">
          <InputText
            name="title"
            value={filter.title}
            placeholder="title..."
            onChange={handleChangeFilter}
          />
          <InputText
            name="name"
            value={filter.name}
            placeholder="Name..."
            onChange={handleChangeFilter}
          />
          <InputText
            name="alamat"
            value={filter.alamat}
            placeholder="alamat..."
            onChange={handleChangeFilter}
          />
          <InputText
            name="umur"
            value={filter.umur}
            placeholder="umur..."
            onChange={handleChangeFilter}
          />
          <Button onClick={handleSubmit} title="Submit" colorSchema="green" />
        </div>
      </Drawer>

      {/* Toolbar */}
      <div className="grid grid-cols-12 gap-3 mb-5">
        <div className="col-span-6 ">
          <InputText
            onChange={(e) => {
              setFilter((prev) => {
                return {
                  ...prev,
                  keyword: e.target.value,
                };
              });
            }}
            placeholder="Cari latihan..."
          />
        </div>

        <div className="col-start-11 h-full">
          {" "}
          <Button
            width="full"
            onClick={() => router.push("latihan/tambah")}
            title="Tambah +"
            colorSchema="green"
          />
        </div>
        <div className="col-start-12">
          {" "}
          <Button
            onClick={() => setOpen(true)}
            title="Filter"
            colorSchema="blue"
          />
        </div>
      </div>

      {/* Table */}
      {isFetching ? (
        <div className="text-center py-10 text-gray-600">Memuat data...</div>
      ) : isError ? (
        <div className="text-center text-red-600 py-10">Gagal memuat data.</div>
      ) : (
        <>
          <table className="min-w-full border border-gray-200 shadow-md rounded-lg overflow-hidden">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 text-left">#</th>
                  <th className="px-4 py-2 text-left">Judul</th>
                <th className="px-4 py-2 text-left">Nama</th>
                <th className="px-4 py-2 text-left">Alamat</th>
                <th className="px-4 py-2 text-left">Umur</th>
                <th className="px-4 py-2 text-left">Detail</th>
              </tr>
            </thead>
            <tbody>
              {data?.data?.map((item: any, i: number) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-4 py-2">{i + 1}</td>
                    <td className="px-4 py-2">{item.title}</td>
                  <td className="px-4 py-2">{item.name}</td>
                  <td className="px-4 py-2">{item.alamat}</td>
                  <td className="px-4 py-2">{item.umur}</td>
                  <td className="px-4 py-2">
                    <Button
                      colorSchema="blue"
                      title="Detail"
                      onClick={() => router.push(`latihan/${item.id}/detail`)}
                    />
                      <Button
                      colorSchema="green"
                      title="Edit"
                      onClick={() => router.push(`latihan/${item.id}/edit`)}
                    />

                    <Button
                      colorSchema="red"
                      title="Delete"
                      onClick={() => {
                        handleDelete(item.id);
                      }}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination Controls */}

          <div className="flex justify-center items-center mt-6 space-x-5">
            <select
              className="border border-gray-300 rounded-lg px-3 py-2 text-gray-700 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition"
              value={filterSubmit.limit}
              onChange={(e) => {
                handleLimitChange(Number(e.target.value));
              }}
            >
              <option value={1}>1</option>
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
            </select>

            <div className="flex items-center">
              <button
                className="border rounded-full h-8 w-8 bg-blue-400 text-white hover:bg-blue-500 disabled:opacity-50"
                onClick={() => handlePageChange(filterSubmit.page - 1)}
                disabled={filterSubmit.page === 1}
              >
                ←
              </button>

              <p className="text-gray-600 whitespace-nowrap border p-2 rounded-lg mx-5">
                Halaman {filterSubmit.page} dari {data?.meta.lastPage || 1}
              </p>

              <button
                className="border rounded-full h-8 w-8 bg-blue-400 text-white hover:bg-blue-500 disabled:opacity-50"
                onClick={() => handlePageChange(filterSubmit.page + 1)}
                disabled={filterSubmit.page === data?.meta.lastPage}
              >
                →
              </button>
            </div>

            <div>Total Data : {data?.meta?.total}</div>
          </div>
        </>
      )}
    </div>
  );
}
