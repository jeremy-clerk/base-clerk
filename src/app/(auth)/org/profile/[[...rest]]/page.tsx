import { OrganizationProfile } from "@clerk/nextjs";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function OrgProfileIndex() {
  return (
    <div className={"flex flex-col gap-4"}>
      <OrganizationProfile path={"/org/profile"} />
      <div className={"flex gap-2 justify-end"}>
        <Link href={"/dashboard"}>
          <Button>Dashboard</Button>
        </Link>
      </div>
    </div>
  );
}
