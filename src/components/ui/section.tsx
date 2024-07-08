import React from "react"

interface SectionInterface {
    title: string,
    children: React.ReactNode
}
export default function Section({ title, children }: SectionInterface) {
    return (
        <div className="flex flex-col gap-2">
            <hr className="my-5" />
            <p className="capitalize">{title}</p>
            {children}
        </div>
    )
}