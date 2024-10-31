import { SignIn } from "@clerk/nextjs";

export default function SignInIndex() {
  return (
    <div className={"flex flex-col justify-center items-center h-full"}>
      <SignIn />
    </div>
  );
}
