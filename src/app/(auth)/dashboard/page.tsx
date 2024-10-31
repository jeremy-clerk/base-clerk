import { auth } from "@clerk/nextjs/server";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default async function DashboardIndex() {
  const { orgId, sessionClaims } = await auth();

  //need to set the session claims in the Clerk dashboard if you want to use it this way.
  return (
    <div className={"flex"}>
      <div className={"rounded-md shadow p-8 w-full max-w-md border"}>
        <div className={"flex flex-col gap-4"}>
          <h1 className={"font-bold text-2xl text-center"}>
            {sessionClaims?.orgName as string}
          </h1>
          <span className={"text-xs"}>{orgId}</span>
          <div>
            <h1 className={"font-semibold text-xl text-center"}>
              {sessionClaims?.firstName as string}{" "}
              {sessionClaims?.lastName as string}
            </h1>
            <div className={"text-sm text-center"}>
              {sessionClaims?.email as string}
            </div>
          </div>
          <div className={"text-center"}>{sessionClaims?.role as string}</div>
        </div>
        <div className={"flex gap-2 w-full p-6 items-center justify-center"}>
          <Link href={"/"}>
            <Button>Home</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
