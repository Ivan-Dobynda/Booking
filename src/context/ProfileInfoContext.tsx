'use client'
import React, {createContext, ReactNode, useContext, useMemo, useState} from 'react';
import {AdditionalTraveler, User} from "@prisma/client";
import {useGlobalContext} from "@/context/GlobalContext";

interface IProfileInfoContext {
    profileInfo: Partial<User>
    additionalTravellers: AdditionalTraveler[] | null
    travellerToEdit: AdditionalTraveler | undefined
    setTravellerToEdit: React.Dispatch<React.SetStateAction<AdditionalTraveler | undefined>>
}

const ProfileInfoContext = createContext<IProfileInfoContext | undefined>(undefined)

interface ProfileContextProviderProps {
    children: ReactNode,
    additionalTravellers: AdditionalTraveler[] | null
}

const ProfileContextProvider = ({children, additionalTravellers}: ProfileContextProviderProps) => {
    const [travellerToEdit, setTravellerToEdit] = useState<AdditionalTraveler | undefined>();
    const {user: profileInfo} = useGlobalContext();
    const values = useMemo(() => ({
        profileInfo: profileInfo as Partial<User>,
        additionalTravellers,
        travellerToEdit,
        setTravellerToEdit,
    }), [profileInfo, travellerToEdit,additionalTravellers])
    return (
        <ProfileInfoContext.Provider value={values}>
            {children}
        </ProfileInfoContext.Provider>
    );
};

export default ProfileContextProvider;

export const useProfileInfoContext = () => useContext(ProfileInfoContext) as IProfileInfoContext;
