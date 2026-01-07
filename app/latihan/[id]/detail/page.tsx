"use client";
 
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Swal from "sweetalert2";
import { latihanService } from "../../service";
import Button from "@/app/component/Button";// pastikan path sesuai
import { Latihan } from "../../interace";
 
export default function LatihanDetailPage() {
  const { id } = useParams(); // menangkap parameter id dari URL
  const router = useRouter();
 
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);


  useEffect(() => {
      const fetchData = async () => {
        try {
          setLoading(true);
          const response = await latihanService.detail(id as string);
  
          console.log("Res", response)
  
          setData(response);
        } catch (err: any) {
          console.error("Fetch error:", err);
          setError("Gagal memuat data latihan 😢");
          Swal.fire({
            icon: "error",
            title: "Terjadi Kesalahan!",
            text: "Tidak dapat memuat data dari server.",
          });
        } finally {
          setLoading(false);
        }
      };
  
      fetchData();
    }, [id]);


    console.log("detail =>", data)

    console.log(data?.data.title)
    
 
  if (loading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500"></div>
        <p className="ml-3 text-blue-600 font-medium">
          Memuat data detail latihan...
        </p>
      </div>
    );
  }
 
  if (error || !data) {
    return (
      <div className="flex flex-col justify-center items-center h-[60vh] text-center">
        <p className="text-red-600 font-semibold mb-2">
          {error ?? "Data tidak ditemukan 😢"}
        </p>
        <Button
          title="Kembali"
          colorSchema="blue"
          onClick={() => router.push("/latihan")}
        />
      </div>
    );
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">
        📋 Detail Latihan
      </h1>
 
      <div className="bg-white shadow-md rounded-lg p-6 border border-gray-200">
      {/* //data disini */}


      <div className="">
        <div>Nama : {data.name}</div>
        <div>Alamt : {data.alamat}</div>
        <div>Umur : {data.umur}</div>
         <div>Title : {data.title}</div>
        

      </div>
      </div>
 
      <div className="mt-6">
        <Button
          title="Kembali ke Daftar"
          colorSchema="blue"
          onClick={() => router.push("/latihan")}
        />
      </div>
    </div>
  );
}