import React from 'react';
import Button from "@/Component/Button/Button";
import ModalWrapper from "@/Component/Modals/ModalWrapper";

interface ConfirmChangesModalProps {
    title?: string;
    open?:  boolean | undefined;
    setOpen?:  ((open: boolean) => void) | undefined
    onCancelClickHandler: () => void
    onSaveClickHandler: () => void
    disabledSave?: boolean
}

const ConfirmChangesModal = ({disabledSave, title, open, setOpen, onCancelClickHandler, onSaveClickHandler}: ConfirmChangesModalProps) => {
    return (
        <ModalWrapper open={open} setOpen={setOpen}>
            <section className={`bg-white rounded-2xl card-shadow p-4 sm:p-5 lg:px-12 lg:py-8`}>
                <h2 className={`font-semibold text-2xl`}>
                    {title ?? 'Do you want to save the changes?'}
                </h2>

                <div className={`flex items-center justify-center gap-8 mt-5`}>
                    <Button onClick={onCancelClickHandler}>
                        Cancel
                    </Button>
                    <Button disabled={disabledSave}  onClick={onSaveClickHandler} variant={'green'}>
                        Save
                    </Button>
                </div>

            </section>
        </ModalWrapper>
    );
};

export default ConfirmChangesModal;
