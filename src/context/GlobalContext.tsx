'use client'
import React, {createContext, ReactNode, useContext} from 'react';
import {Country, Currency, Language, User} from "@prisma/client";

interface GlobalContext {
    countries: Partial<(Country & {languages: Language[]} & {currencies: Currency[]})> [],
    user: Partial<User> | null
}

const GlobalContext = createContext<GlobalContext | undefined>(undefined)

interface GlobalContextProviderProps  {
    children: ReactNode
    countries: Country[]
    user: Partial<User>
}

const GlobalContextProvider = ({children, countries, user}: GlobalContextProviderProps) => {

    const valuesToPass = {
        countries,
        user
    }

    return (
        <GlobalContext.Provider value={valuesToPass}>
            {children}
        </GlobalContext.Provider>
    );
};

export default GlobalContextProvider;

export const useGlobalContext = () => useContext(GlobalContext) as GlobalContext;
