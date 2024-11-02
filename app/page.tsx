import { UserButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import Image from "next/image";

export default function Home() {

  

  
  return (
    <div>
      this is a discord Discord_clone
      <UserButton
      afterSignOutUrl="/">

      </UserButton>
    </div>
  );
}
