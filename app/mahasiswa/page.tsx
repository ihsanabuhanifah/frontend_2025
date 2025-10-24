"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Button from "../component/Button";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export default function SiswaPage() {
  const router = useRouter();
const path = usePathname()
  console.log(path)

  let [count, setCount] = useState(0);

  useEffect(() => {
    if (count > 5) {
      router.push(`${path}/12/detail`);
    }
  }, [count]);
  return (
    <div className="grid grid-cols-1 gap-5">

        count : {count}
      <Link href={`${path}/12/detail`}>ihsan</Link>
      <Link href={`${path}/13/detail`}>fajae</Link>
      <Link href={`${path}/13/detail`}>naufal</Link>

      <Button
        onClick={() => {
          router.push(`${path}/12/detail`);
        }}
        colorSchema="blue"
        title="Hilmi"
      />

      <Button
        onClick={() => {
          setCount(count + 1);
        }}
        colorSchema="blue"
        title="tambah"
      />
    </div>
  );
}
