"use client";
import Button from "@/components/Button/Button";
import useHTTP from "@/hooks/useHTTP";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";

interface PropsType {
  params: { id: string };
}

export default function SuccessPage(props: PropsType) {
  const router = useRouter();
  const apiRef = useRef(false);
  const [error, setError] = useState<string>("");
  const { submit } = useHTTP(
    `${process.env.NEXT_PUBLIC_API_URL}/flight/booking/confirm/${props.params.id}`,
    {
      cb: (data) => {
        toast.success(data.message);
        router.replace(`/bookings/${data.result.orderId}`);
      },
      ecb: (err) => {
        setError(err?.[0]?.message ?? err?.messages);
      },
    }
  );

  useEffect(() => {
    if (!apiRef.current) {
      apiRef.current = true;
      submit();
    }
  }, []);

  const handleGoToHome = () => {
    router.replace("/");
  };

  return (
    <div className="min-h-[35rem] flex items-center justify-center">
      {error ? (
        <div className="flex flex-col items-center justify-center gap-10">
          <h1 className="text-red-500 font-medium text-3xl text-center ">
            {error ?? "Something went wrong, Please try again later"}
          </h1>
          <Button onClick={handleGoToHome}>Go to home</Button>
        </div>
      ) : (
        <div className="loader text-8xl" />
      )}
    </div>
  );
}
