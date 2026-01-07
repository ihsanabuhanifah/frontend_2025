import clsx from "clsx";
interface InputTextProps {
  messageError?: string;
  isError?: boolean;
  value?: number | string | boolean | null | undefined | "";
  disabled? : boolean
}

export default function InputText({
  messageError,
  isError,
  value,
  disabled = false,
  ...props
}: InputTextProps & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <>
      <input
      disabled={disabled}
        value={value as string}
        {...props}
        className={clsx(`border border-black rounded-lg p-2 w-full`, {
          "border-red-500 border-2": isError,
          "border-gray-100 bg-gray-100" : disabled
        })}
      />
      {/* {isError ? 
      <span className="text-red-500 italic">Wajib isi</span> : <></>} */}

      {isError && (
        <span className="text-red-500 italic">
          {messageError ? messageError : "Wajib isi"}
        </span>
      )}
    </>
  );
}
