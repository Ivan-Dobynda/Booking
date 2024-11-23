import React, {useState} from 'react';
import ButtonWithHeadingAndTitle from "@/Component/Button/ButtonWithHeadingAndTitle";
import ModalWrapper from "@/Component/Modals/ModalWrapper";
import FlightPreferencesEdit from "@/app/(site)/profile/(profile)/sections/FlightPreferenceEdit/FlightPreferencesEdit";

const FlightPreferencesButton = () => {
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    return (
        <div>
            <ButtonWithHeadingAndTitle onClick={() => {
                setIsEditModalOpen(true);
            }} title={'Flight Preferences'} subTitle={'Seat preference and home airport'}/>
            <ModalWrapper open={isEditModalOpen} setOpen={setIsEditModalOpen}>
                <FlightPreferencesEdit closeModal={() => {
                    setIsEditModalOpen(false);
                }} />
            </ModalWrapper>
        </div>
    );
};

export default FlightPreferencesButton;
