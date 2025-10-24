"use client";

import { useParams } from "next/navigation";
import Link from "next/link";

export default function UserDetailPage() {
  const { id } = useParams();

  // Contoh data sementara — di real app biasanya ambil dari API
  const userData = {
    1: { name: "Ihsan Santana", email: "ihsan@example.com", role: "Admin" },
    2: { name: "Siti Rahma", email: "siti@example.com", role: "User" },
    3: { name: "Budi Hartono", email: "budi@example.com", role: "Moderator" },
  };

  const user = userData[id as keyof typeof userData];

  if (!user) {
    return (
      <section className="p-6">
        <h2 className="text-xl font-semibold text-red-600">User tidak ditemukan</h2>
        <Link
          href="/admin/dashboard"
          className="text-blue-500 hover:underline mt-3 block"
        >
          ← Kembali ke daftar user
        </Link>
      </section>
    );
  }

  return (
    <section className="p-6 space-y-4">
      <Link
        href="/admin/users"
        className="text-blue-500 hover:underline inline-block"
      >
        ← Kembali
      </Link>

      <h2 className="text-2xl font-semibold">Detail User #{id}</h2>

      <div className="bg-white d rounded-xl shadow p-6 space-y-3">
        <p>
          <span className="font-semibold">Nama:</span> {user.name}
        </p>
        <p>
          <span className="font-semibold">Email:</span> {user.email}
        </p>
        <p>
          <span className="font-semibold">Role:</span> {user.role}
        </p>
      </div>
    </section>
  );
}
