'use client'
import React, {useState} from 'react';
import Button from "@/Component/Button/Button";
import ModalWrapper from "@/Component/Modals/ModalWrapper";
import BasicInfoEdit from "@/app/(site)/profile/(profile)/sections/BasicInfoEdit";

const EditBasicInfoButton = () => {
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    return (
        <div>
            <Button size={'small'} onClick={() => {
                setIsEditModalOpen(true);
            }}>
                Edit
            </Button>
            <ModalWrapper open={isEditModalOpen} setOpen={setIsEditModalOpen}>
                <BasicInfoEdit closeModal={() => {
                    setIsEditModalOpen(false);
                }}/>
            </ModalWrapper>
        </div>
    );
};

export default EditBasicInfoButton;
