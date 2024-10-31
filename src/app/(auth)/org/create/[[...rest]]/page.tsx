import { CreateOrganization } from "@clerk/nextjs";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function OrgCreateIndex() {
  return (
    <div className={"flex gap-4 flex-col"}>
      <CreateOrganization />
      <div className={"flex justify-end"}>
        <Link href={"/"}>
          <Button>Home</Button>
        </Link>
      </div>
    </div>
  );
}
