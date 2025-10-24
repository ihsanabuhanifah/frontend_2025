"use client";

export default function DashboardPage() {
  // Contoh data yang bisa kamu tampilkan di dashboard
  const stats = [
    { label: "Total Pengguna", value: 1250 },
    { label: "Transaksi Hari Ini", value: 82 },
    { label: "Feedback Baru", value: 12 },
    { label: "Server Status", value: "🟢 Online" },
  ];

  return (
   
     
      <section className="space-y-8">
       <h2>Data</h2>
      </section>
    
  );
}
