'use client'
import React, {useState} from 'react';
import {TbWorld} from "react-icons/tb";
import ModalWrapper from "@/Component/Modals/ModalWrapper";
import SelectCountryAndLanguage from "@/Component/Layout/Header/SelectCountryAndLanguage";
import {Country} from "@prisma/client";

interface SelectCountryAndLanguageBtnProps {
    currentCountry: Country | null
}

const SelectCountryAndLanguageBtn = ({currentCountry}: SelectCountryAndLanguageBtnProps) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <div>
            <div onClick={() => {
                setIsModalOpen(true);
            }} className={`cursor-pointer flex items-center gap-2 text-white hover:text-brand-orange`}>
                <TbWorld className={`text-xl`}/>
                <p className={`md:hidden lg:inline-block`}>{currentCountry?.country}</p>
            </div>
            <ModalWrapper setOpen={setIsModalOpen} open={isModalOpen}>
                <SelectCountryAndLanguage
                    fnAfterSubmit={() => {
                        setIsModalOpen(false);
                    }}/>
            </ModalWrapper>
        </div>
    );
};

SelectCountryAndLanguageBtn.displayName = 'SelectCountryAndLanguage';

export default SelectCountryAndLanguageBtn;
