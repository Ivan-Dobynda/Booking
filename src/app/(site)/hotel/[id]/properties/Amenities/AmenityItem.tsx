import React, {ReactNode} from 'react';
import { BsWifi} from "react-icons/bs";

interface AmenityItem {
    icon?: ReactNode
    title: ReactNode
    options: string[]

}

const AmenityItem = ({icon, title, options}: AmenityItem) => {
    return (
        <div className={`flex gap-2 break-inside-avoid mb-4`}>
            <div className={`mt-1`}>
                <BsWifi/>
            </div>
            <div>
                <p className={`font-[500]`}>{title}</p>
                {/*  list   */}

                <ul className={`list-disc flex flex-col gap-2`}>
                    {options.map((val, index) => (
                        <li className={`ml-4`} key={val + index}>
                            {val}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default AmenityItem;
