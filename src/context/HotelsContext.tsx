'use client'
import React, {ReactNode, useContext} from 'react';

interface hotelData {
    from: number
    to: number;
    total: number;
    hotels: any[]
}

interface HotelsContext {
    hotelsData: hotelData
}


const HotelsContext = React.createContext<HotelsContext | undefined>(undefined);

interface Props {
    hotelsData: hotelData
    children: ReactNode
}
const HotelsContextProvider = ({children, hotelsData}: Props) => {
    const valuesToPass = {
        hotelsData
    }
    return (
        <HotelsContext.Provider value={valuesToPass}>
            {children}
        </HotelsContext.Provider>
    );
};

export default HotelsContextProvider;

export const useHotelsContext = () => useContext(HotelsContext) as HotelsContext;
