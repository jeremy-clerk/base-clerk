import { SignUp } from "@clerk/nextjs";

export default function SignUpIndex() {
  return (
    <div className={"flex flex-col justify-center items-center h-full"}>
      <SignUp fallbackRedirectUrl={"/dashboard"} />
    </div>
  );
}
