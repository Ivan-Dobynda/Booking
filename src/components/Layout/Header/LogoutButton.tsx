"use client";

import { ButtonHTMLAttributes, useState } from "react";
import ModalWrapper from "@/Component/Modals/ModalWrapper";
import Button from "@/Component/Button/Button";
import { signOut } from "next-auth/react";

const LogoutButton = ({
  onClick,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSignOut = () => {
    signOut();
    localStorage.removeItem("initialProfileModalClosed");
  };
  return (
    <>
      <button
        {...props}
        type={"submit"}
        onClick={() => {
          setIsModalOpen(true);
        }}
        {...props}
      >
        Sign out
      </button>
      <ModalWrapper open={isModalOpen} setOpen={setIsModalOpen}>
        <div className={`p-8 relative bg-white rounded-xl`}>
          <h2>Do you really want to logout 🤔</h2>
          <div className={"mt-8 flex items-center justify-center gap-4"}>
            <Button onClick={handleSignOut} variant={"green"}>
              Yes
            </Button>
            <Button
              onClick={() => {
                setIsModalOpen(false);
                close();
              }}
              variant={"secondary"}
            >
              No
            </Button>
          </div>
        </div>
      </ModalWrapper>
    </>
  );
};

LogoutButton.displayName = "LogoutButton";

export default LogoutButton;
