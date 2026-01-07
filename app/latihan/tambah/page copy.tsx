// "use client";

// import { useMutation, useQueryClient } from "@tanstack/react-query";
// import { useState } from "react";
// import { CreateLatihan } from "../interace";
// import { latihanService } from "../service";
// import { useRouter } from "next/navigation";
// import Swal from "sweetalert2";
// import Button from "@/app/component/Button";

// export default function LatihanForm() {
//   const queryClient = useQueryClient();
//   const router = useRouter();

//   let [messageEror, setMessageEror] = useState("");
//   // const [formData, setFormData] = useState<CreateLatihan>({
//   //   title: "",
//   //   name: "",
//   //   alamat: "",
//   //   umur: "",
//   // });

//   // const [errors, setErrors] = useState<CreateLatihan>({
//   //   title: "",
//   //   name: "",
//   //   alamat: "",
//   //   umur: "",
//   // });

//   // // --- Validasi manual ---
//   // const validate = () => {
//   //   let isValid = true;
//   //   const newErrors = { title: "", name: "", alamat: "", umur: "" };

//   //   if (!formData.title.trim()) {
//   //     newErrors.title = "Judul wajib diisi";
//   //     isValid = false;
//   //   }

//   //   if (!formData.name.trim()) {
//   //     newErrors.name = "Nama wajib diisi";
//   //     isValid = false;
//   //   } else if (!formData.name.includes("@")) {
//   //     newErrors.name = "Nama harus berupa email yang valid";
//   //     isValid = false;
//   //   }

//   //   if (!formData.alamat.trim()) {
//   //     newErrors.alamat = "Alamat wajib diisi";
//   //     isValid = false;
//   //   }

//   //   if (!formData.umur) {
//   //     newErrors.umur = "Umur wajib diisi";
//   //     isValid = false;
//   //   } else if (isNaN(Number(formData.umur))) {
//   //     newErrors.umur = "Umur harus berupa angka";
//   //     isValid = false;
//   //   } else if (Number(formData.umur) < 1) {
//   //     newErrors.umur = "Umur tidak boleh kurang dari 1";
//   //     isValid = false;
//   //   }

//   //   setErrors(newErrors);
//   //   return isValid;
//   // };



//   // --- Membaut useMutation

//   const createData = useMutation({
//     mutationFn: (formData: CreateLatihan) => latihanService.create(formData),
//     onSuccess: () => {
//       setFormData({ title: "", name: "", alamat: "", umur: "" });
//       setErrors({ title: "", name: "", alamat: "", umur: "" });

//       queryClient.invalidateQueries({
//         queryKey: ["latihan-list"],
//       });

//       setMessageEror("");

//       Swal.fire({
//         title: "Good job!",
//         text: "Berhasil Tersimpan",
//         icon: "success",
//       });
//     },

//     onError: (err: any) => {
//       setMessageEror(err.response?.data?.message || "Terjadi kesalahan");
//       Swal.fire({
//         title: "Error!",
//         text: "Ada Kesalahan",
//         icon: "error",
//       });
//     },
//   });

//   // --- Handle submit ---
//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();

//     if (validate()) {
//       createData.mutate(formData); //menjalanakan mutation
//     } else {
//       Swal.fire({
//         title: "Perhatian!",
//         text: "Lengkapi Semua form",
//         icon: "warning",
//       });
//     }
//   };

//   console.log("messageEror:", messageEror);

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-50">
//       <form
//         onSubmit={handleSubmit}
//         className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-md space-y-4"
//       >
//         <span className="text-red-500">{messageEror.toString()}</span>

//         <h1 className="text-2xl font-semibold text-gray-700 text-center">
//           Form Latihan
//         </h1>

//         <div>
//           {" "}
//           <button type="button" onClick={() => router.push("/latihan")}>
//             {" "}
//             ← Kembali
//           </button>
//         </div>

//         <div>
//           <label className="block text-sm font-medium text-gray-600">
//             Judul
//           </label>
//           <input
//             type="text"
//             name="title"
//             value={formData.title}
//             onChange={(e) =>
//               setFormData({ ...formData, title: e.target.value })
//             }
//             className="mt-1 w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
//             placeholder="Masukkan judul"
//           />
//           {errors.title && (
//             <p className="text-red-500 text-sm mt-1">{errors.title}</p>
//           )}
//         </div>

//         <div>
//           <label className="block text-sm font-medium text-gray-600">
//             Nama (email)
//           </label>
//           <input
//             type="text"
//             name="name"
//             value={formData.name}
//             onChange={(e) => setFormData({ ...formData, name: e.target.value })}
//             className="mt-1 w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
//             placeholder="Masukkan email"
//           />
//           {errors.name && (
//             <p className="text-red-500 text-sm mt-1">{errors.name}</p>
//           )}
//         </div>

//         <div>
//           <label className="block text-sm font-medium text-gray-600">
//             Alamat
//           </label>
//           <input
//             type="text"
//             name="alamat"
//             value={formData.alamat}
//             onChange={(e) =>
//               setFormData({ ...formData, alamat: e.target.value })
//             }
//             className="mt-1 w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
//             placeholder="Masukkan alamat"
//           />
//           {errors.alamat && (
//             <p className="text-red-500 text-sm mt-1">{errors.alamat}</p>
//           )}
//         </div>

//         <div>
//           <label className="block text-sm font-medium text-gray-600">
//             Umur
//           </label>
//           <input
//             type="number"
//             name="umur"
//             value={formData.umur}
//             onChange={(e) => setFormData({ ...formData, umur: e.target.value })}
//             className="mt-1 w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
//             placeholder="Masukkan umur"
//           />
//           {errors.umur && (
//             <p className="text-red-500 text-sm mt-1">{errors.umur}</p>
//           )}
//         </div>

//         <Button
//           isLoading={createData.isPending}
//           type="submit"
//           colorSchema="blue"
//           title="Kirim"
//         />
//       </form>
//     </div>
//   );
// }



// // const schema = Yup.object({
// //   name: Yup.string().required("Nama wajib diisi"),
// //   email: Yup.string().email("Email tidak valid").required(),
// //   age: Yup.number().positive().required(),
// // });