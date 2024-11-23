import React, {useEffect, useState} from 'react';
import Button from "@/Component/Button/Button";
import ModalWrapper from "@/Component/Modals/ModalWrapper";
import AdditionalTravellerEdit from "@/app/(site)/profile/(profile)/sections/AdditionalTravellerEdit";
import {useProfileInfoContext} from "@/context/ProfileInfoContext";

const AddAdditionalTraveller = () => {
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    const {travellerToEdit, setTravellerToEdit} = useProfileInfoContext();

    useEffect(() => {
        if (travellerToEdit) {
            setIsEditModalOpen(true);
        }
    },[travellerToEdit])

    return (
        <div>
            <Button
                onClick={() => {
                    setIsEditModalOpen(true);
                }}
                variant={'secondary'} size={'small'} className={`w-full mt-4`}
            >
                Add Additional Traveller
            </Button>
            <ModalWrapper open={isEditModalOpen} setOpen={(val) => {
                setIsEditModalOpen(val);
                setTravellerToEdit(undefined);
            }}>
                <AdditionalTravellerEdit closeModal={() => {
                    setIsEditModalOpen(false);
                    setTravellerToEdit(undefined);
                }} />
            </ModalWrapper>
        </div>
    );
};

AddAdditionalTraveller.displayName = 'AddAdditionalTraveller';

export default AddAdditionalTraveller;
