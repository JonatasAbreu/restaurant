"use client";
import Image from "next/image";
import { Button } from "./ui/button";
import { MenuIcon } from "lucide-react";
import Link from "next/link";
import { signIn, useSession } from "next-auth/react";

const Header = () => {
  const { data } = useSession();
  return (
    <div className=" flex justify-between px-5 pt-6">
      <div className="relative h-[30px] w-[100px]">
        <Link href="/">
          <Image
            src="/logo.png"
            alt="fsw foods"
            fill
            className="object-cover"
          ></Image>
        </Link>
      </div>

      <Button onClick={() => signIn()}>Login</Button>
      {data?.user?.name}

      <Button
        size="icon"
        variant="outline"
        className="border-none bg-transparent"
      >
        <MenuIcon />
      </Button>
    </div>
  );
};

export default Header;
