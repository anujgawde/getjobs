"use client";

import { sendVerificationEmail } from "@/api/users/index";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Home() {
  const router = useRouter();
  const [isConfirmationSent, setIsConfirmationSent] = useState<boolean>(false);

  const submitEmailHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const userData = {
      email: form.email.value,
    };
    console.log(userData);
    const verificationResult = await sendVerificationEmail(userData);
    console.log(verificationResult);
    if (verificationResult.verified) {
      router.push("/jobs");
    } else {
      setIsConfirmationSent(true);
    }
  };
  return (
    <div className="h-screen w-full flex justify-center items-center">
      <div className="w-full flex flex-col items-center justify-center">
        {/* email Component */}
        <form
          onSubmit={submitEmailHandler}
          className="flex flex-col items-start justify-center  w-1/4 space-y-2 relative"
        >
          <div className="flex items-center justify-center w-full space-x-2">
            <input
              // value={email}
              name="email"
              className="p-2 outline-none border rounded-lg w-full"
              placeholder="johndoe@xyz.com"
            />
            <button className="rounded-lg bg-primary text-white px-4 py-2 font-semibold">
              Enter
            </button>
          </div>
          {isConfirmationSent && (
            <p className="text-green-600 font-semibold text-xs absolute -bottom-5">
              A confirmation mail is sent to your email
            </p>
          )}
        </form>
      </div>
    </div>
  );
}
