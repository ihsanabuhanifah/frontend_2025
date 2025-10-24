"use client";

import Button from "./component/Button";
import InputText from "./component/InputText";
import Label from "./component/Label";

export default function Home() {
  return (
    <div className="flex items-center justify-center h-screen w-screen">
      <form className="flex flex-col gap-4 w-1/3">
        <Label title="Name" isRequired />
        <InputText
          id="name"
          isError={true}
          onChange={() => {
            alert("Hello");
          }}
          type="text"
          name="name"
          placeholder="Name"
        />

        <Label text="lg" color="red" title="email" htmlFor={"name"} />
        <InputText
          messageError="Wajib menggunakan format email"
          isError
          onChange={() => {
            alert("Hello");
          }}
          type="text"
          name="name"
          placeholder="Email"
        />
        <Label text="xl" title="username" htmlFor={"name"} />
        <InputText
          messageError="Wajib menggunakan Username"
          onChange={() => {
            alert("Hello");
          }}
          type="text"
          name="name"
          placeholder="Username"
        />

        <Button isLoading title="Simpan" colorSchema="blue" />
        <Button title="Simpan" colorSchema="blue" variant="solid" />
        <Button width="md" title="Simpan" colorSchema="blue" variant="solid" />
        <Button title="Simpan" colorSchema="green" variant="outline" />
        <Button title="Simpan" colorSchema="green" variant="solid" />
      </form>
    </div>
  );
}
