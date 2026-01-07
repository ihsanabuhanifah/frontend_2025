"use client";

import Button from "@/app/component/Button";
import { useRouter } from "next/navigation";

export default function LatihanForm() {
  const router = useRouter();

  // Formik

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form
        // onSubmit={formik.handleSubmit}
        className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-md space-y-4"
      >
        <h1 className="text-2xl font-semibold text-gray-700 text-center">
          Form Latihan (Formik + Yup)
        </h1>
        <button type="button" onClick={() => router.push("/latihan")}>
          ← Kembali
        </button>
        {/* TITLE */}
        <div className="border p-3 rounded mb-3 bg-gray-50">
          {/* TITLE */}
          <input
            name={``}
            className="w-full border p-2 mt-2"
            placeholder="Judul"
          />

          {/* NAME */}
          <input
            name={``}
            className="w-full border p-2 mt-2"
            placeholder="Nama"
          />

          {/* ALAMAT */}
          <input
            name={``}
            className="w-full border p-2 mt-2"
            placeholder="Alamat"
          />

          {/* UMUR */}
          <input
            name={""}
            className="w-full border p-2 mt-2"
            placeholder="Umur"
            type="number"
          />
        </div>
        );
        <Button type="submit" colorSchema="blue" title="Kirim" />
      </form>
    </div>
  );
}
