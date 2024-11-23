'use client'
import React, {ReactNode, useContext} from 'react';

type HotelContext = {
    hotelData: any;
}

const HotelContext = React.createContext<HotelContext | undefined>(undefined);

type HotelContextProvider = {
    hotelData: any
    children: ReactNode
}

const HotelContextProvider = ({
    hotelData,
    children
                      }: HotelContextProvider) => {

    const valuesToPass = {
        hotelData
    }

    return (
        <HotelContext.Provider value={valuesToPass}>
            {children}
        </HotelContext.Provider>
    );
};

export default HotelContextProvider;

export const useHotelContext = () => useContext(HotelContext) as HotelContext;
