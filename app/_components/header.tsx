"use client";
import Image from "next/image";
import { Button } from "./ui/button";
import {
  HeartIcon,
  HomeIcon,
  LogInIcon,
  LogOutIcon,
  MenuIcon,
  ScrollTextIcon,
} from "lucide-react";
import Link from "next/link";
import { signIn, useSession, signOut } from "next-auth/react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Separator } from "./ui/separator";

const Header = () => {
  const { data, status } = useSession();

  const handleSignIn = () => signIn();
  const handleSignOut = () => signOut();

  console.log(data?.user);
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

      <Sheet>
        <SheetTrigger asChild>
          <Button
            size="icon"
            variant="outline"
            className="border-none bg-transparent"
          >
            <MenuIcon />
          </Button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle className="text-left">Menu</SheetTitle>
          </SheetHeader>

          {status == "authenticated" ? (
            <>
              <div className="flex justify-between pt-6">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage
                      src={data?.user?.image as string | undefined}
                    />
                    <AvatarFallback>
                      {data?.user?.name?.split(" ")[0][0]}
                      {data?.user?.name?.split(" ")[1][0]}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold">{data?.user?.name}</h3>
                    <span className="block text-xs text-muted-foreground ">
                      {data?.user?.email}
                    </span>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="flex items-center justify-between pt-10">
                <h2 className="font-semibold">Olá, Faça seu login!</h2>
                <Button size="icon" onClick={handleSignIn}>
                  <LogInIcon />
                </Button>
              </div>
            </>
          )}

          <div className="py-6">
            <Separator />
          </div>

          <Button
            variant="ghost"
            className="w-full justify-start  space-x-3  rounded-full text-sm font-normal"
          >
            <HomeIcon size={16} />
            <span className="bloock">Início</span>
          </Button>

          {status == "authenticated" && (
            <>
              <Button
                variant="ghost"
                className="w-full justify-start space-x-3  rounded-full text-sm font-normal"
                asChild
              >
                <Link href="/my-orders">
                  <ScrollTextIcon size={16} />
                  <span className="bloock">Meus pedidos</span>
                </Link>
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start  space-x-3 rounded-full text-sm font-normal"
              >
                <HeartIcon size={16} />
                <span className="bloock">Restaurantes</span>
              </Button>
              <div className="py-6">
                <Separator />
              </div>
              <Button
                onClick={handleSignOut}
                variant="ghost"
                className="w-full justify-start  space-x-3 rounded-full text-sm font-normal"
              >
                <LogOutIcon size={20} />
                <span className="bloock">Sair da conta</span>
              </Button>
            </>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default Header;
