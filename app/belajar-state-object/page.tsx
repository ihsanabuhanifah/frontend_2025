"use client";

import { useState } from "react";
import InputText from "../component/InputText";
import Label from "../component/Label";
import RadioButton from "../component/Radio";

interface Profile {
  nama: string;
  email: string;
  password: string;
  umur: number;
  isLulus: boolean;
}

export default function BelajarStateObject() {
  const [profile, setProfile] = useState<Profile>({
    nama: "ihsan",
    email: "ihsan@gmail.com",
    password: "12345678",
    umur: 20,
    isLulus: false,
  });
  return (
    <>
      <h1>Belajar State Object</h1>

      <Card value={profile.nama} label="Nama" />
      <Card value={profile.email} label="Email" />
      <Card value={profile.password} label="Password" />
      <Card value={profile.umur} label="Umur" />
      <Card
        value={profile.isLulus ? "Lulus" : "Belum Lulus"}
        label="Keterangan"
      />

      <Label htmlFor="nama" title="Nama" />
      <InputText
        disabled
        value={profile.nama}
        id="nama"
        onChange={(e) => {
          setProfile((prevProfile) => {
            return {
              ...prevProfile,
              nama: e.target.value,
            };
          });
        }}
      />
      <Label htmlFor="email" title="Email" />
      <InputText
        value={profile.email}
        id="email"
        onChange={(e) => {
          setProfile((prevProfile) => {
            return {
              ...prevProfile,
              email: e.target.value,
            };
          });
        }}
      />

      <Label htmlFor="isLulus" title="Keterangan" />
      <div className="flex items-center space-x-5">
        <RadioButton
          title={"Lulus"}
          value="true"
          checked={profile.isLulus}
          onChange={(e) => {
            setProfile((prevProfile) => {
              return {
                ...prevProfile,
                isLulus: true,
              };
            });
          }}
        />
        <RadioButton
          title={"Belum Lulus"}
          value="false"
          checked={!profile.isLulus}
          onChange={(e) => {
            setProfile((prevProfile) => {
              return {
                ...prevProfile,
                isLulus: false,
              };
            });
          }}
        />
      </div>
    </>
  );
}

function Card({
  label,
  value,
}: {
  label: string;
  value: string | number | null;
}) {
  return (
    <div className="grid grid-cols-2 gap-5 w-[60%]">
      <h2 className="font-bold">{label}</h2>
      <h2 className="text-gray-600 uppercase font-semibold">: {value}</h2>
    </div>
  );
}
