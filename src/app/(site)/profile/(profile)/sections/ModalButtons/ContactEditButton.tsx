'use client'
import React, {useState} from 'react';
import Button from "@/Component/Button/Button";
import ModalWrapper from "@/Component/Modals/ModalWrapper";
import ContactInfoEdit from "@/app/(site)/profile/(profile)/sections/ContactInfoEdit";

const ContactEditButton = () => {

    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    return (
        <div>
            <Button size={'small'} onClick={() => {
                setIsEditModalOpen(true);
            }}>
                Edit
            </Button>
            <ModalWrapper open={isEditModalOpen} setOpen={setIsEditModalOpen}>
                <ContactInfoEdit closeModal={() => {
                    setIsEditModalOpen(false);
                }} />
            </ModalWrapper>
        </div>
    );
};

export default ContactEditButton;
