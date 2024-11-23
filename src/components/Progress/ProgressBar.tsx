import React from 'react';

interface ProgressBar {
    withTopLabel?: boolean;
    title?: string;
    rating?: number;
    progress?: number;
}

const ProgressBar = ({withTopLabel, progress, rating, title}: ProgressBar) => {
    return (
        <div>
            {withTopLabel && (
                <div className={`flex justify-between items-center text-brand-neutral-700`}>
                    <p>{title}</p>
                    <p>{rating}</p>
                </div>
            )}

            <div className={`relative h-2 mt-2`}>
                <div
                    className={`absolute top-0 left-0 w-full h-full bg-brand-neutral-200 rounded-full`}/>
                <div
                    style={{
                        width: `${progress}%`,
                    }}
                    className={`absolute top-0 left-0 h-full bg-brand-blue-300 w-[${progress}%] rounded-full`}/>
            </div>
        </div>
    );
};

export default ProgressBar;
