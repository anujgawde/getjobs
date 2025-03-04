"use client";

import { sendVerificationEmail } from "@/api/users/index";
import { checkConnection } from "@/api/index";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import BaseLoader from "@/components/base/BaseLoader";

export default function Home() {
  const router = useRouter();
  const [isConfirmationSent, setIsConfirmationSent] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(false);

  const submitEmailHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    setIsLoading(true);
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const userData = {
      email: form.email.value,
    };
    const verificationResult = await sendVerificationEmail(userData);
    if (verificationResult.verified) {
      router.push("/jobs");
    } else {
      setIsConfirmationSent(true);
    }
    setIsLoading(false);
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
            {/* <button className="rounded-lg bg-primary text-white px-4 py-2 font-semibold">
                Enter
              </button> */}
            <button
              disabled={isLoading}
              className="rounded-lg bg-primary disabled:opacity-80 disabled:hover:bg-primary text-white px-4 py-2 font-semibold hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-colors"
            >
              {isLoading ? (
                <BaseLoader color="white" size="6" borderSize="2" />
              ) : (
                <p>Enter</p>
              )}
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
