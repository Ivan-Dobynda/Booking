"use client";

import Button from "@/components/Button/Button";
import { useRouter } from "next/navigation";

const FlightDetailErrorMessage = ({ message }: { message: string }) => {
  const router = useRouter();
  return (
    <div className="min-h-[35rem] flex items-center justify-center">
      <div className="flex flex-col items-center justify-center gap-10">
        <h1 className="text-red-500 font-medium text-3xl text-center ">
          {message}
        </h1>
        <Button onClick={() => router.back()}>Go to home</Button>
      </div>
    </div>
  );
};

export default FlightDetailErrorMessage;
