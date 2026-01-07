
// "use client";
 
// import { useEffect, useState } from "react";
// import Swal from "sweetalert2";
// import { Latihan } from "./interace";
// import { latihanService } from "./service";
// import Button from "../component/Button";
// import { useRouter } from "next/navigation";
// import { useQuery } from "@tanstack/react-query";
 
// export default function LatihanPage() {
//   const router = useRouter();
 
//   const { data, isFetching, isError, refetch } = useQuery({
//     queryKey: ["latihan-list"],
//     queryFn: () => latihanService.list(),
//     retry: 1, // mencoba ulang 1x jika gagal
//     select: (res) => res.data,
//   });
 
//   if (isFetching) {
//     return (
//       <div className="flex justify-center items-center h-[60vh]">
//         <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500"></div>
//         <p className="ml-3 text-blue-600 font-medium">Memuat data latihan...</p>
//       </div>
//     );
//   }
 
//   if (isError) {
//     return (
//       <div className="flex flex-col justify-center items-center h-[60vh] text-center">
//         <p className="text-red-600 font-semibold mb-2">{isError}</p>
//         <button
//           onClick={() => refetch}
//           className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-all"
//         >
//           Coba Lagi
//         </button>
//       </div>
//     );
//   }
 
//   return (
//     <div className="p-8">
//       <h1 className="text-2xl font-bold mb-6 text-gray-800">
//         📚 Daftar Latihan
//       </h1>
 
//       {data && data.length === 0 ? (
//         <p className="text-gray-500 italic">Belum ada data latihan.</p>
//       ) : (
//         <table className="min-w-full border border-gray-200 shadow-md rounded-lg overflow-hidden">
//           <thead className="bg-gray-100">
//             <tr>
//               <th className="px-4 py-2 text-left text-gray-700 font-semibold">
//                 #
//               </th>
//               <th className="px-4 py-2 text-left text-gray-700 font-semibold">
//                 Nama
//               </th>
//               <th className="px-4 py-2 text-left text-gray-700 font-semibold">
//                 Alamat
//               </th>
//               <th className="px-4 py-2 text-left text-gray-700 font-semibold">
//                 Umur
//               </th>
//               <th className="px-4 py-2 text-left text-gray-700 font-semibold">
//                 Diupdate
//               </th>
//               <th className="px-4 py-2 text-left text-gray-700 font-semibold">
//                 Detail
//               </th>
//             </tr>
//           </thead>
//           <tbody>
//             {data &&
//               data.map((item, i) => (
//                 <tr
//                   key={item.id}
//                   className={`${
//                     i % 2 === 0 ? "bg-white" : "bg-gray-50"
//                   } hover:bg-blue-50 transition-colors`}
//                 >
//                   <td className="px-4 py-2">{i + 1}</td>
//                   <td className="px-4 py-2 font-medium text-gray-800">
//                     {item.name}
//                   </td>
//                   <td className="px-4 py-2 text-gray-700">{item.alamat}</td>
//                   <td className="px-4 py-2 text-gray-700">{item.umur}</td>
//                   <td className="px-4 py-2 text-gray-500 text-sm">
//                     {new Date(item.updated_at).toLocaleString("id-ID")}
//                   </td>
//                   <td>
//                     <Button
//                       colorSchema="blue"
//                       title="detail"
//                       onClick={() => {
//                         router.push(`latihan/${item.id}/detail`);
//                       }}
//                     />
//                   </td>
//                 </tr>
//               ))}
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// }
 
