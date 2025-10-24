"use client"
import { use } from "react";
import { usePathname } from "next/navigation";

export default function SiswaPage({ params }: { params: Promise<{ slug: string }> }) {
const path = usePathname()
  console.log(path)
  const resolved = use(params)
  return <>Detail {resolved.slug}</>;
}

