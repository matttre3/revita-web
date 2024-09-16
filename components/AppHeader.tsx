import React from "react";
import AuthButton from "./header-auth";
import Link from "next/link";
import Image from "next/image";

export default function AppHeader() {
  return (
    <div className="container mx-auto max-w-4xl bg-red-700 rounded-b-2xl">
      <div className="flex items-center justify-between pl-4">
        <div className="flex items-center">
          <h1 className="text-3xl font-bold text-white ">Revita</h1>
          <Link href="/">
            <Image
              src="/images/logo-white.png"
              width={70}
              height={70}
              alt="logo revita"
              className="mx-auto"
            />
          </Link>
        </div>
        <div className="pr-4">
          <AuthButton></AuthButton>
        </div>
      </div>
    </div>
  );
}
