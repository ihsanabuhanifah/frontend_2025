import { ReactNode } from "react";


export default function SiswaLayout({
    children
} : {
    children :ReactNode
}) {
    return (
        <div>
               <div className="w-screen h-24 bg-blue-500">App</div>
            {children}</div>
    )
}