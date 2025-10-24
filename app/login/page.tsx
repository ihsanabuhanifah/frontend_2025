"use client";
import Button from "../component/Button";
import { AppContext } from "../component/AppContext";
import { useContext, useState } from "react";
import { useRouter } from "next/navigation";
import InputText from "../component/InputText";
import Label from "../component/Label";

export default function LoginPage() {
  const appContext = useContext(AppContext);
  const { login, setIdentity } = appContext;
  const router = useRouter();
  let [username, setUsername] = useState<string>("");
  let [name, setName] = useState<string>("");

  return (
    <div className=" w-screen h-screen flex items-center justify-center">
      <div className="w-1/2">
        <div>Halaman Login</div>

        <section className="felx flex-col gap-3 mb-5">
          <div>
            <Label title="username" htmlFor="username" />
            <InputText
              value={username as string}
              onChange={(e: any) => setUsername(e.target.value)}
              name="Username"
              placeholder="Masukkan username"
              type="text"
            />
          </div>
        </section>
        <section className="felx flex-col gap-3 mb-5">
          <div>
            <Label title="Nama" htmlFor="name" />
            <InputText
              value={name}
              onChange={(e: any) => setName(e.target.value)}
              name="Name"
              placeholder="Masukkan Nama"
              type="text"
            />
          </div>
        </section>

        <Button
          height="lg"
          disabled={!username && !name}
          onClick={() => {
            if (setIdentity) {
              setIdentity({
                name: name,
                username: username
              });
            }

            if (login) {
              login();
            }
            router.push("/admin");
          }}
          title="Login"
          colorSchema="blue"
        />
      </div>
    </div>
  );
}
