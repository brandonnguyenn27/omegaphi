"use client";

import { useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { signOut } from "@/actions/auth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { SidebarTrigger } from "@/components/ui/sidebar";
import Image from "next/image";

type HeaderProps = {
  logoUrl: string;
};
export default function Header({ logoUrl }: HeaderProps) {
  const router = useRouter();

  return (
    <header className="border-b w-full">
      <div className="flex items-center h-16 px-4 justify-between">
        <div className="flex items-center">
          <SidebarTrigger className="mr-4" />
          <Link href="/" className="text-xl font-semibold mt-1">
            <Image src={logoUrl} alt="Logo" width={120} height={60} priority />
          </Link>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger className="focus:outline-none">
            <Avatar>
              <AvatarImage src="" alt="Profile" />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuItem onClick={() => router.push("/profile")}>
              Profile
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={signOut}>Log out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
