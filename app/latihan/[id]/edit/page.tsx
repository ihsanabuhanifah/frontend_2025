"use client";

import { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useParams, useRouter } from "next/navigation";
import Swal from "sweetalert2";
import Button from "@/app/component/Button";
import { useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import { latihanService } from "../../service";
import { UpdateLatihan } from "../../interace";

export default function LatihanForm() {
  const { id } = useParams();
  console.log("id", id)
  const queryClient = useQueryClient();
  const router = useRouter();

  const { data, isFetching } = useQuery({
    queryKey: ["latihan-detail", id],
    queryFn: () => latihanService.detail(id as string),
    enabled: !!id,
  });
  
  // --- VALIDASI YUP ---
  const validationSchema = Yup.object({
    title: Yup.string().required("Judul wajib diisi"),
    name: Yup.string()
      .email("Nama harus berupa email yang valid")
      .required("Nama wajib diisi"),
    alamat: Yup.string().required("Alamat wajib diisi"),
    
    umur: Yup.number()
      .typeError("Umur harus berupa angka")
      .min(20, "Umur tidak boleh kurang dari 1")
      .required("Umur wajib diisi"),
  });

  // --- FORM FORMIK ---
  const formik = useFormik<UpdateLatihan>({
    initialValues: {
      id: data?.data?.id || "",
      title: data?.data?.title || "",
      name: data?.data?.name || "",
      alamat: data?.data?.alamat || "",
      umur: data?.data?.umur || "",
    },
    enableReinitialize: true, // penting!
    validationSchema,
    onSubmit: (values) => {
      console.log("submit ok")
      updateData.mutate(values);
    },
  });

  console.log("error", formik.errors)
  console.log("Value", formik.values)

  
  // --- UPDATE API ---
  const updateData = useMutation({
    mutationFn: (formData:UpdateLatihan) => latihanService.update(formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["latihan-list"] });

      Swal.fire({
        title: "Good job!",
        text: "Berhasil Tersimpan",
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

  if (isFetching) return <div>Loading...</div>;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form
        onSubmit={formik.handleSubmit}
        className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-md space-y-4"
      >
        <h1 className="text-2xl font-semibold text-gray-700 text-center">
          Form Update Latihan
        </h1>

        <button type="button" onClick={() => router.push("/latihan")}>
          ← Kembali
        </button>

        {/* Judul */}
        <div>
          <label className="block text-sm font-medium text-gray-600">
            Judul
          </label>
          <input
            type="text"
            name="title"
            value={formik.values.title}
            onChange={formik.handleChange}
            className="mt-1 w-full border rounded-lg px-3 py-2"
            placeholder="Masukkan judul"
          />
          {formik.touched.title && formik.errors.title && (
            <p className="text-red-500 text-sm mt-1">
              {formik.errors.title}
            </p>
          )}
        </div>

        {/* Nama */}
        <div>
          <label className="block text-sm font-medium text-gray-600">
            Nama (email)
          </label>
          <input
            type="text"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            className="mt-1 w-full border rounded-lg px-3 py-2"
            placeholder="Masukkan email"
          />
          {formik.touched.name && formik.errors.name && (
            <p className="text-red-500 text-sm mt-1">
              {formik.errors.name}
            </p>
          )}
        </div>

        {/* Alamat */}
        <div>
          <label className="block text-sm font-medium text-gray-600">
            Alamat
          </label>
          <input
            type="text"
            name="alamat"
            value={formik.values.alamat}
            onChange={formik.handleChange}
            className="mt-1 w-full border rounded-lg px-3 py-2"
            placeholder="Masukkan alamat"
          />
          {formik.touched.alamat && formik.errors.alamat && (
            <p className="text-red-500 text-sm mt-1">
              {formik.errors.alamat}
            </p>
          )}
        </div>

        {/* Umur */}
        <div>
          <label className="block text-sm font-medium text-gray-600">
            Umur
          </label>
          <input
            type="number"
            name="umur"
            value={formik.values.umur}
            onChange={formik.handleChange}
            className="mt-1 w-full border rounded-lg px-3 py-2"
            placeholder="Masukkan umur"
          />
          {formik.touched.umur && formik.errors.umur && (
            <p className="text-red-500 text-sm mt-1">
              {formik.errors.umur}
            </p>
          )}
        </div>

        <Button
          isLoading={updateData.isPending}
          type="submit"
          colorSchema="blue"
          title="Kirim"
        />
      </form>
    </div>
  );
}
