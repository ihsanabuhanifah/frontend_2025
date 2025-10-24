"use client";

import { useContext, useState } from "react";
import Button from "../component/Button";
import InputText from "../component/InputText";
import clsx from "clsx";
import { AppContext } from "../component/AppContext"; //Langkah 1
import Link from "next/link";

export default function BelajarState() {
  const appContext = useContext(AppContext);  // Langkah 2
  const { toggleTheme, theme } = appContext;  // Langkah 3
  let [count, setCount] = useState<number>(0);
  let [text, setText] = useState<string>("");
  let [isOn, setIsOn] = useState<boolean>(false);
  return (
    <>
      <h1>Siap belajar State</h1>

      {theme === "dark" ? "Ini malam" : "ini siang"}

      {/* langkah 4 untuk klik toogleTheme */}

      <Button
        onClick={() => {
          toggleTheme();
        }}
        title="Ubah Tema"
        colorSchema="blue"
      />.

      <Link href={"/belajar-state-object"}>Pindah</Link>

      <div
        className={clsx(
          "border mt-5 w-28 h-28 rounded-full flex items-center justify-cente",
          {
            "bg-red-500": isOn === true,
            "bg-black": isOn === false,
          }
        )}
      ></div>

      <div className="border h-36  mb-5 flex items-center justify-center border-blue-500">
        {text}
      </div>

      <InputText
        value={text}
        onChange={(e) => {
          setText(e.target.value);
          setCount(count + 1);
        }}
      />

      <div className="border mt-5 w-28 h-28 rounded-full flex items-center justify-center border-red-500">
        {count}
      </div>

      <Button
        onClick={() => {
          setIsOn(!isOn);
        }}
        width="md"
        title="Mati/Nyala"
        colorSchema="green"
      />

      <Button
        onClick={() => {
          setCount(count++);
          setIsOn(true);
        }}
        width="md"
        title="Tambah"
        colorSchema="red"
      />
      <Button
        onClick={() => {
          setCount(count--);
          setIsOn(false);
        }}
        width="md"
        title="kurang"
        colorSchema="blue"
      />
    </>
  );
}
