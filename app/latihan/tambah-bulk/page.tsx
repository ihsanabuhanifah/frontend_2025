"use client";

import { getIn, useFormik } from "formik";
import * as Yup from "yup";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { latihanService } from "../service";
import Button from "@/app/component/Button";
import { useRouter } from "next/navigation";
import { CreateLatihan, CreateLatihanBulk } from "../interace";

export default function LatihanForm() {
  const queryClient = useQueryClient();
  const router = useRouter();

  // Mutation untuk create data
  const createDataBulk = useMutation({
    mutationFn: (formData: CreateLatihanBulk) =>
      latihanService.create_bulk(formData),
    onSuccess: async (response) => {
console.log("response", response)

      formik.resetForm();
      Swal.fire({
        title: "Good job!",
        text: response.message,
        icon: "success",
      });
      queryClient.invalidateQueries({ queryKey: ["latihan-list"] });
    },
    onError: () => {
      Swal.fire({
        title: "Error!",
        text: "Ada Kesalahan",
        icon: "error",
      });
    },
  });

  // Formik
  const formik = useFormik<CreateLatihanBulk>({
    initialValues: {
      data: [{ title: "", name: "", alamat: "", umur: "" }],
    },

    validationSchema: Yup.object({
      data: Yup.array().of(
        Yup.object({
          title: Yup.string().required("Judul wajib diisi"),
          name: Yup.string()
            .email("Harus berupa email valid")
            .required("Nama wajib diisi"),

          alamat: Yup.string().required("Alamat wajib diisi"),

          umur: Yup.number()
            .typeError("Umur harus berupa angka")
            .required("Umur wajib diisi")
            .min(1, "Umur tidak boleh kurang dari 1"),
        })
      ),
    }),

    onSubmit: (values) => {
      createDataBulk.mutate(values);
    },
  });

   { console.log("Formik Values:", formik.values)}

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form
        onSubmit={formik.handleSubmit}
        className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-md space-y-4"
      >
        <h1 className="text-2xl font-semibold text-gray-700 text-center">
          Form Latihan Bulk (Formik + Yup)
        </h1>

        <button type="button" onClick={() => router.push("/latihan")}>
          ← Kembali
        </button>
       

        {/* TITLE */}

       
        {formik.values.data.map((item, index) => {
          return (
            <div key={index} className="border  p-3 rounded mb-3 bg-gray-50">
              <div className="w-full mb-5 flex justify-end">
                {" "}
                <button
                  type="button"
                  onClick={() =>
                    formik.setFieldValue(
                      "data",
                      formik.values.data.filter((_, i) => i !== index)
                    )
                  }
                  className=" text-red-500 font-bold"
                >
                  ✕ Hapus
                </button>
              </div>
              {/* TITLE */}
              <input
                name={`data[${index}].title`}
                value={item.title}
                onBlur={formik.handleBlur}
                onChange={(e) =>
                  formik.setFieldValue(`data[${index}].title`, e.target.value)
                }
                className="w-full border p-2"
                placeholder="Judul"
              />
              {getIn(formik.touched, `data[${index}].title`) &&
                getIn(formik.errors, `data[${index}].title`) && (
                  <p className="text-red-500 text-sm">
                    {getIn(formik.errors, `data[${index}].title`)}
                  </p>
                )}

              {/* NAME */}
              <input
                name={`data[${index}].name`}
                value={item.name}
                onBlur={formik.handleBlur}
                onChange={(e) =>
                  formik.setFieldValue(`data[${index}].name`, e.target.value)
                }
                className="w-full border p-2 mt-2"
                placeholder="Nama"
              />
              {getIn(formik.touched, `data[${index}].name`) &&
                getIn(formik.errors, `data[${index}].name`) && (
                  <p className="text-red-500 text-sm">
                    {getIn(formik.errors, `data[${index}].name`)}
                  </p>
                )}

              {/* ALAMAT */}
              <input
                name={`data[${index}].alamat`}
                value={item.alamat}
                onBlur={formik.handleBlur}
                onChange={(e) =>
                  formik.setFieldValue(`data[${index}].alamat`, e.target.value)
                }
                className="w-full border p-2 mt-2"
                placeholder="Alamat"
              />
              {getIn(formik.touched, `data[${index}].alamat`) &&
                getIn(formik.errors, `data[${index}].alamat`) && (
                  <p className="text-red-500 text-sm">
                    {getIn(formik.errors, `data[${index}].alamat`)}
                  </p>
                )}

              {/* UMUR */}
              <input
                name={`data[${index}].umur`}
                value={item.umur}
                onBlur={formik.handleBlur}
                type="number"
                onChange={(e) =>
                  formik.setFieldValue(`data[${index}].umur`, e.target.value)
                }
                className="w-full border p-2 mt-2"
                placeholder="Umur"
              />
              {getIn(formik.touched, `data[${index}].umur`) &&
                getIn(formik.errors, `data[${index}].umur`) && (
                  <p className="text-red-500 text-sm">
                    {getIn(formik.errors, `data[${index}].umur`)}
                  </p>
                )}
            </div>
          );
        })}

        <button
          type="button"
          onClick={() =>
            formik.setFieldValue("data", [
              ...formik.values.data,
              { title: "", name: "", alamat: "", umur: "" },
            ])
          }
        >
          + Tambah Baris
        </button>
        <Button
          isLoading={createDataBulk.isPending}
          type="submit"
          colorSchema="blue"
          title="Kirim"
        />
      </form>
    </div>
  );
}
