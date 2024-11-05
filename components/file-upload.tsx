"use client";

import { X } from "lucide-react";
import Image from "next/image";
import { UploadDropzone } from "@/lib/uploadthing";
import"@uploadthing/react/styles.css";


interface FileUploadprops {
    onChange : (url?: string) => void;
    value: string;
    endpoint : "messageFile" | "serverImage"
}


export const FileUpload = ({onChange,value,endpoint} : FileUploadprops) => {

    const fileType = value?.split(".").pop();
    console.log(value)

    if (value && fileType !== "pdf"){
        return(
            <div className="relative h-20 w-20">
                <Image 
                fill
                src = {value}
                alt="Upload"
                className="rounded-full"/>
                <button className="bg-rose-500 text-white p-1 rounded-full absolute top-0 right-0 shadow-sm"
                type="button"
                onClick={() => {
                    onChange("")
                }}  >
                    <X  className="h-4 w-4"/>
                </button>

            </div>
        )
    }
    return <div>
        <UploadDropzone 
        endpoint={endpoint}
        onUploadBegin={() => {
            console.log("Upload started");
        }}
        onClientUploadComplete={(res) => {
            onChange(res?.[0].url)
        }}
        onUploadError={(error:Error) => {
            console.log(error);

        }} />

    </div>
}