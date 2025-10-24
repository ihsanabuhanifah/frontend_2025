import { ReactNode } from "react";


export default function SiswaLayout({
    children
} : {
    children :ReactNode
}) {
    return (
        <div>
               <div className="w-screen h-24 bg-red-500">App</div>
            {children}</div>
    )
}