"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { CreateLatihan } from "../interace";
import { latihanService } from "../service";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import Button from "@/app/component/Button";
import { useFormik } from "formik";
import * as Yup from "yup";

export default function LatihanForm() {
  const queryClient = useQueryClient();
  const router = useRouter();

  let [messageEror, setMessageEror] = useState("");

  // --- Membaut useMutation

  const createData = useMutation({
    mutationFn: (formData: CreateLatihan) => latihanService.create(formData),
    onSuccess: () => {
      // setFormData({ title: "", name: "", alamat: "", umur: "" });
      // setErrors({ title: "", name: "", alamat: "", umur: "" });

      queryClient.invalidateQueries({
        queryKey: ["latihan-list"],
      });

      setMessageEror("");

      Swal.fire({
        title: "Good job!",
        text: "Berhasil Tersimpan",
        icon: "success",
      });
    },

    onError: (err: any) => {
      setMessageEror(err.response?.data?.message || "Terjadi kesalahan");
      Swal.fire({
        title: "Error!",
        text: "Ada Kesalahan",
        icon: "error",
      });
    },
  });

  const formik = useFormik<CreateLatihan>({
    initialValues: {
      title: "",
      name: "",
      alamat: "",
      umur: "",
    },

    validationSchema: Yup.object({
      title: Yup.string().required(),
      name: Yup.string().email().required(),
      alamat: Yup.string().required(),
      
      umur: Yup.number()
        .typeError("Wajib number")
        .required()
        // .min(20, "Minimal 20")
        // .max(40, "maximal 40"),
    }),
    onSubmit: (values: CreateLatihan) => {
      console.log("berhasil submit", values);

      //setelah disjini mau dikirim kemana

      createData.mutate(values, {
        onSuccess: () => {
          formik.resetForm();
        },
      });
    },

    enableReinitialize: true,
  });

  console.log("values", formik.values);

  console.log("error", formik.errors);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form
        onSubmit={formik.handleSubmit}
        className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-md space-y-4"
      >
        <span className="text-red-500">{messageEror.toString()}</span>

        <h1 className="text-2xl font-semibold text-gray-700 text-center">
          Form Latihan
        </h1>

        <div>
          {" "}
          <button type="button" onClick={() => router.push("/latihan")}>
            {" "}
            ← Kembali
          </button>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600">
            Judul
          </label>
          <input
            type="text"
            name="title"
            value={formik.values.title}
            onChange={(e) => formik.setFieldValue("title", e.target.value)}
            className="mt-1 w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Masukkan judul"
          />
          {formik.errors.title && (
            <p className="text-red-500 text-sm mt-1">{formik.errors.title}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600">
            Nama (email)
          </label>
          <input
            type="text"
            name="name"
            value={formik.values.name}
            onChange={(e) => formik.setFieldValue("name", e.target.value)}
            className="mt-1 w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Masukkan email"
          />
          {formik.errors.name && (
            <p className="text-red-500 text-sm mt-1">{formik.errors.name}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600">
            Alamat
          </label>
          <input
            type="text"
            name="alamat"
            value={formik.values.alamat}
            onChange={(e) => formik.setFieldValue("alamat", e.target.value)}
            className="mt-1 w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Masukkan alamat"
          />
          {formik.errors.alamat && (
            <p className="text-red-500 text-sm mt-1">{formik.errors.alamat}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600">
            Umur
          </label>
          <input
            type="number"
            name="umur"
            value={formik.values.umur}
            onChange={(e) => formik.setFieldValue("umur", e.target.value)}
            className="mt-1 w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Masukkan umur"
          />
          {formik.errors.umur && (
            <p className="text-red-500 text-sm mt-1">{formik.errors.umur}</p>
          )}
        </div>

        <Button
          isLoading={createData.isPending}
          type="button"
          colorSchema="blue"
          title="Tambah"
        />
        <Button
          isLoading={createData.isPending}
          type="submit"
          colorSchema="blue"
          title="Kirim"
        />
      </form>
    </div>
  );
}

// const schema = Yup.object({
//   name: Yup.string().required("Nama wajib diisi"),
//   email: Yup.string().email("Email tidak valid").required(),
//   age: Yup.number().positive().required(),
// });
