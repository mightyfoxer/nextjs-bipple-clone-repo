"use client";

import { FileIcon, X } from "lucide-react";
import Image from "next/image";

import { UploadDropzone } from "@/lib/uploadthing";

import "@uploadthing/react/styles.css";
import { FaCamera } from "react-icons/fa6";

interface FileUploadProps {
  onChange: (url?: string) => void;
  value: string;
  endpoint: "messageFile" | "serverImage";
}

export const FileUpload = ({ onChange, value, endpoint }: FileUploadProps) => {
  const fileType = value?.split(".").pop();

  if (value && fileType !== "pdf") {
    return (
      <div className="relative border border-transparent h-28 w-28">
        <Image fill src={value} alt="Upload" className="rounded-full" />
        <button
          onClick={() => onChange("")}
          className="absolute top-0 right-0 p-1 text-white rounded-full shadow-sm bg-rose-500"
          type="button"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    );
  }

  if (value && fileType === "pdf") {
    return (
      <div className="relative flex items-center p-2 mt-2 rounded-md h-28 w-28 bg-background/10">
        <FileIcon className="w-10 h-10 fill-indigo-200 stroke-indigo-400" />
        <a
          href={value}
          target="_blank"
          rel="noopener noreferrer"
          className="ml-2 text-sm text-indigo-500 dark:text-indigo-400 hover:underline"
        >
          {value}
        </a>
        <button
          onClick={() => onChange("")}
          className="absolute p-1 text-white rounded-full shadow-sm bg-rose-500 -top-2 -right-2"
          type="button"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    );
  }

  return (
    <UploadDropzone
      endpoint={endpoint}
      appearance={{
        allowedContent: "hidden",
        label: "mt-[0.1rem]",
        button: "mt-[0.2rem]",
      }}
      content={{
        uploadIcon({ ready, isUploading }) {
          if (ready || !ready)
            return (
              <div className="absolute bottom-0 flex items-center justify-center w-full p-4 text-white bg-black">
                <FaCamera />
              </div>
            );

          if (isUploading) return <div className="hidden sr-only"></div>;
          return;
        },
        label({ ready, isUploading }) {
          if (ready || !ready) return <div></div>;
          if (isUploading) return <div className="hidden sr-only"></div>;
          return;
        },
      }}
      className="cursor-pointer relative py-0 focus:ring-0 h-28 w-28 border-2 border-[#53ACFF] rounded-full overflow-hidden"
      onClientUploadComplete={(res) => {
        onChange(res?.[0].url);
      }}
      onUploadError={(error: Error) => {
        console.log(error);
      }}
    />
  );
};
