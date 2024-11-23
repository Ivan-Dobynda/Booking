"use client";
import React, { useEffect, useState } from "react";
import { useGlobalContext } from "@/context/GlobalContext";
import BasicInfoEdit from "../profile/(profile)/sections/BasicInfoEdit";
import ModalWrapper from "@/components/Modals/ModalWrapper";
import ProfileContextProvider from "@/context/ProfileInfoContext";

const Modal = () => {
  const { user } = useGlobalContext();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  useEffect(() => {
    const popupClosed = !!localStorage.getItem("initialProfileModalClosed");
    if (!user || popupClosed) return;
    const openModal =
      user.dob === null || user.gender === null || user.lastName === null;
    if (openModal) {
      setIsEditModalOpen(true);
    }
  }, [user]);

  const closeModal = () => {
    setIsEditModalOpen(false);
    localStorage.setItem("initialProfileModalClosed", "true");
  };

  return (
    <>
      <ProfileContextProvider additionalTravellers={null}>
        <ModalWrapper open={isEditModalOpen} setOpen={setIsEditModalOpen}>
          <BasicInfoEdit closeModal={closeModal} />
        </ModalWrapper>
      </ProfileContextProvider>
    </>
  );
};

export default Modal;
