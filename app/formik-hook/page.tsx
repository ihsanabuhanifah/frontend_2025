"use client";

import { useFormik } from "formik";
import * as Yup from "yup";

export default function UseFormikExamplePage() {
  // --- Inisialisasi Formik ---
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
    },

    validationSchema: Yup.object({
      name: Yup.string().required("Nama wajib diisi"),
      email: Yup.string()
        .email("Email tidak valid")
        .required("Email wajib diisi"),
    }),

    onSubmit: (values, { resetForm }) => {
      console.log(values);
      alert("Form berhasil disubmit!");
      resetForm();
    },
  });

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded-lg shadow">
      <h1 className="text-2xl font-semibold mb-4">Contoh useFormik + Yup</h1>

      <form onSubmit={formik.handleSubmit} className="space-y-4">
        {/* INPUT NAME */}
        <div>
          <label className="block mb-1 font-medium">Nama</label>
          <input
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="Masukkan nama"
            className="w-full border p-2 rounded"
          />
          {formik.touched.name && formik.errors.name && (
            <p className="text-red-600 text-sm mt-1">
              {formik.errors.name}
            </p>
          )}
        </div>

        {/* INPUT EMAIL */}
        <div>
          <label className="block mb-1 font-medium">Email</label>
          <input
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="Masukkan email"
            className="w-full border p-2 rounded"
          />
          {formik.touched.email && formik.errors.email && (
            <p className="text-red-600 text-sm mt-1">
              {formik.errors.email}
            </p>
          )}
        </div>

        {/* SUBMIT BUTTON */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
