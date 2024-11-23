import React, {ReactNode} from 'react';

interface IconWithText {
    icon: ReactNode
    text: ReactNode
}

const IconWithText = ({icon, text}: IconWithText) => {
    return (
        <div className={`flex gap-2 items-center `}>
            {icon}
            <div className={`text-sm text-brand-neutral-700`}>{text}</div>
        </div>
    );
};

export default IconWithText;
