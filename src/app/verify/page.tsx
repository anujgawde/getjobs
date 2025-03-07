"use client";
import { verifyEmail } from "@/api/users";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Verify() {
  const params = useSearchParams();
  const router = useRouter();
  const verifyEmailHandler = async () => {
    const verifyEmailResult = await verifyEmail({
      token: params.get("tid"),
    });
    localStorage.setItem("verifiedEmail", verifyEmailResult.email);
    router.push("/jobs");
  };
  useEffect(() => {
    verifyEmailHandler();
  }, []);
  return (
    <div className="flex items-center h-screen justify-center">
      <p className="text-2xl font-bold text-center">
        Congratulation, you are verified. You will be redirected in a few
        seconds!
      </p>
    </div>
  );
}
