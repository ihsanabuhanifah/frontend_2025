"use client";

import { useState } from "react";
import Button from "../component/Button";
import InputText from "../component/InputText";
import RadioButton from "../component/Radio";

interface HasilUjian {
  mata_pelajaran: string;
  nilai: number | string;
  isRemidial: boolean;
}

export default function StateArray() {
  let [mata_pelajaran, setMata_pelajaran] = useState<string>("");
  let [nilai, setNilai] = useState<string>("");
  let [isRemidial, setRemdial] = useState<boolean>(false);
  let [hasil, setHasil] = useState<HasilUjian[]>([
    {
      mata_pelajaran: "Matematika",
      nilai: 100,
      isRemidial: false,
    },
    {
      mata_pelajaran: "Fisika",
      nilai: 80,
      isRemidial: false,
    },
    {
      mata_pelajaran: "Kimia",
      nilai: 90,
      isRemidial: false,
    },
    {
      mata_pelajaran: "Biologi",
      nilai: 50,
      isRemidial: true,
    },
    {
      mata_pelajaran: "PJOK",
      nilai: 70,
      isRemidial: true,
    },
  ]);
  return (
    <>
      <h1>Belajar State Array</h1>
      <table>
        <thead>
          <tr>
            <th className="p-5 border">No</th>
            <th className="p-5 border">Mata Pelajaran</th>
            <th className="p-5 border">Nilai</th>
            <th className="p-5 border">Keterangan</th>
          </tr>
        </thead>
        <tbody>
          {hasil?.map((item, index) => {
            return (
              <tr key={index}>
                <td className="p-5 border">{index + 1}</td>
                <td className="p-5 border">{item.mata_pelajaran}</td>
                <td className="p-5 border">{item.nilai}</td>
                <td className="p-5 border">
                  {item.isRemidial ? "Remidial" : "Tidak"}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

     <section className="border rounded-lg p-5 space-y-5">
         <InputText
        placeholder="Matematika"
        value={mata_pelajaran}
        onChange={(e) => {
          setMata_pelajaran(e.target.value);
        }}
      />
      <InputText
        placeholder="100"
        value={nilai}
        onChange={(e) => {
          setNilai(e.target.value);
        }}
      />

      <div className="flex items-center">
        <RadioButton
          title={"Tidak Remidial"}
          value="false"
          checked={!isRemidial}
          onChange={(e) => {
            setRemdial(false);
          }}
        />
         <RadioButton
          title={"Remidial"}
          value="true"
          checked={isRemidial}
          onChange={(e) => {
            setRemdial(true);
          }}
        />
      </div>

      <Button
        title="Tambah"
        colorSchema="blue"
        onClick={() => {
          setHasil((prevHasil:any) => {
            return [
              ...prevHasil,
              {
                mata_pelajaran: mata_pelajaran,
                nilai: nilai,
                isRemidial: isRemidial,
              },
            ];
          });

          setRemdial(false)
          setMata_pelajaran("")
         setNilai("")
        }}
      />
     </section>
    </>
  );
}
