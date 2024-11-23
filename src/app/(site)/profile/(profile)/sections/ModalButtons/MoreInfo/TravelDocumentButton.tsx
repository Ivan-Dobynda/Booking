'use client'
import React, {useState} from 'react';
import ButtonWithHeadingAndTitle from "@/Component/Button/ButtonWithHeadingAndTitle";
import ModalWrapper from "@/Component/Modals/ModalWrapper";
import TravelDocumentsEdit from "@/app/(site)/profile/(profile)/sections/TravelDocumentsEdit";


const TravelDocumentButton = () => {
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    return (
        <div>
            <ButtonWithHeadingAndTitle onClick={() => {
                setIsEditModalOpen(true);
            }} title={'Travel documents'} subTitle={'Passport'}/>
            <ModalWrapper open={isEditModalOpen} setOpen={setIsEditModalOpen}>
               <TravelDocumentsEdit closeModal={() => {
                   setIsEditModalOpen(false);
               }} />
            </ModalWrapper>
        </div>
    );
};

export default TravelDocumentButton;
