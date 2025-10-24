"use client";

import { use } from "react";
import { useSearchParams } from "next/navigation";

export default function SiswaPage({
  params,
}: {
  params: Promise<{ slug: string; id: string }>;
}) {
  const resolvedParams = use(params); // ✅ unwrap promise
  const searchParams = useSearchParams();
  const search = searchParams.get("search");
  const page = searchParams.get("page");

  return (
    <>
      <div>
        Detail {resolvedParams.slug} {resolvedParams.id} {search} {page}
      </div>
    </>
  );
}
