import React from "react";
import Link from "next/link";

import { PiPencilSimple } from "react-icons/pi";

interface ActionsProps {
  userId: string;
}

const Actions = ({ userId }: ActionsProps) => {
  return (
    <div className="flex gap-2.5 items-center">
      <Link
        href={`/admin/users/edit/${userId}`}
        className="inline-block p-2 text-lg rounded-lg text-white bg-blue-500 hover:bg-blue-600 transition"
      >
        <PiPencilSimple />
      </Link>
      {/* <button className="inline-block p-2 text-lg rounded-lg text-white bg-red-500 hover:bg-red-600 transition">
        <RiDeleteBinLine />
      </button> */}
    </div>
  );
};

export default Actions;
