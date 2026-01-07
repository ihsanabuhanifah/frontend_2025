import clsx from "clsx";
import React from "react";
type Color = "red" | "blue" | "green";
interface LabelProps {
  title: string;
  color?: Color;
  text?: string
  isRequired?: boolean;
}

export default function Label({
  title,
  isRequired,
  text="md",
  color = "blue",
  ...props
}: LabelProps & React.LabelHTMLAttributes<HTMLLabelElement>) {
  return (
    <label
      className={clsx("", {
        "text-red-500": color === "red",
        "text-blue-500": color === "blue",
        "text-green-500": color === "green",
        "text-lg" : text === "lg",
         "text-3xl" : text === "xl",
         "text-md" : text === "md",
      })}
      {...props}
    >
      {title} {isRequired ? "*" : <></>}{" "}
    </label>
  );
}
