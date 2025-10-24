"use client";

import Link from "next/link";

export default function DashboardPage() {
  const users = [
    { id: 1, name: "Ihsan Santana", role: "Admin" },
    { id: 2, name: "Siti Rahma", role: "User" },
    { id: 3, name: "Budi Hartono", role: "Moderator" },
  ];

  return (
    <section className="space-y-8 p-6">
      <h2 className="text-2xl font-semibold">Daftar User</h2>

      <table className="w-full border-collapse rounded-xl overflow-hidden shadow-md">
        <thead className="bg-gray-300">
          <tr>
            <th className="text-left px-4 py-3">Nama</th>
            <th className="text-left px-4 py-3">Role</th>
            <th className="text-left px-4 py-3">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr
              key={user.id}
              className="border-t dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-50"
            >
              <td className="px-4 py-3">{user.name}</td>
              <td className="px-4 py-3">{user.role}</td>
              <td className="px-4 py-3">
                <Link
                  href={`/admin/users/${user.id}`}
                  className="text-blue-600 dark:text-blue-400 hover:underline"
                >
                  Lihat Detail
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
