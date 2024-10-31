"use client";

import { useOrganizationList, useSession } from "@clerk/nextjs";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function JoinOrg() {
  const { isLoaded, setActive, userInvitations, userSuggestions } =
    useOrganizationList({
      userInvitations: true,
    });
  const { session } = useSession();
  const router = useRouter();

  useEffect(() => {
    (async () => {
      if (!setActive) return;
      if (userInvitations.data?.length === 0 || !userInvitations.data) return;
      const invite = userInvitations.data[0];
      if (invite.status !== "accepted") {
        const res = await invite.accept();
        const orgId = res.publicOrganizationData.id;
        if (res.status === "accepted") {
          await setActive({ session, organization: orgId });
          router.push("/org/profile");
        }
      }
    })();
  }, [isLoaded, userInvitations]);

  if (!isLoaded) return null;
  //probably would want some logic here for selecting an org if they don't have any invitations or suggestions but they still don't have an active org for whatever reason.
  return (
    <div
      className={
        "w-full rounded-md p-4 max-w-sm flex items-center justify-center"
      }
    >
      <div className={"font-bold text-2xl animate-pulse"}>
        Setting up your account...
      </div>
    </div>
  );
}
