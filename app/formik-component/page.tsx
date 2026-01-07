"use client";

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

export default function FormikExamplePage() {
  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded-lg shadow">
      <h1 className="text-2xl font-semibold mb-4">Contoh Formik + Yup</h1>

      <Formik
        initialValues={{ name: "", email: "" }}
        validationSchema={Yup.object({
          name: Yup.string().required("Nama wajib diisi"),
          email: Yup.string()
            .email("Format email tidak valid")
            .required("Email wajib diisi"),
        })}
        onSubmit={(values, { resetForm }) => {
          console.log(values);
          alert("Form Berhasil Disubmit!");
          resetForm();
        }}
      >
        {({ isSubmitting }) => (
          <Form className="space-y-4">
            {/* Input Name */}
            <div>
              <label className="block mb-1 font-medium">Nama</label>
              <Field
                name="name"
                className="w-full border p-2 rounded"
                placeholder="Masukkan nama"
              />
              <ErrorMessage
                name="name"
                component="div"
                className="text-red-600 text-sm mt-1"
              />
            </div>

            {/* Input Email */}
            <div>
              <label className="block mb-1 font-medium">Email</label>
              <Field
                name="email"
                className="w-full border p-2 rounded"
                placeholder="Masukkan email"
              />
              <ErrorMessage
                name="email"
                component="div"
                className="text-red-600 text-sm mt-1"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition"
            >
              {isSubmitting ? "Memproses..." : "Submit"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
