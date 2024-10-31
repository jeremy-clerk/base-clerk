import { currentUser } from "@clerk/nextjs/server";
import { Button } from "@/components/ui/button";
import { SignOutButton } from "@clerk/nextjs";
import Link from "next/link";

export default async function Home() {
  const user = await currentUser();

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        {user && (
          <div className={"flex flex-col gap-2"}>
            <span className={"font-bold text-2xl"}>Hey, {user.firstName}!</span>
            <div className={"flex gap-4"}>
              <SignOutButton redirectUrl={"/"}>
                <button
                  className={
                    "bg-primary text-zinc-800 p-1 rounded-md hover:bg-primary/80 text-sm font-semibold px-2"
                  }
                >
                  Sign Out
                </button>
              </SignOutButton>
              <Link href={"/dashboard"}>
                <Button>Dashboard</Button>
              </Link>
              <Link href={"/org/profile"}>
                <Button>Org Profile</Button>
              </Link>
              <Link href={"/org/create"}>
                <Button>Org Create</Button>
              </Link>
            </div>
          </div>
        )}
        {!user && (
          <div className={"flex flex-col gap-2 items-center justify-center"}>
            <span className={"font-bold text-2xl"}>Not Signed In</span>
            <div className={"flex gap-2"}>
              <Link href={"/sign-in"}>
                <Button>Sign In</Button>
              </Link>
              <Link href={"/sign-up"}>
                <Button>Sign Up</Button>
              </Link>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
