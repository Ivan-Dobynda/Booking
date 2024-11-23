import React from 'react';

interface ReviewCard {
    name: string
    rating: number
    designation: string
    description: string
}
const ReviewCard = ({name, rating, designation, description}: ReviewCard) => {
    return (
        <div className={`p-8 border border-[#E6EBF0] rounded-lg`}>
            <div className={`flex justify-between`}>
                <div>
                    <p className={`text-brand-neutral-900 font-semibold`}>{name}</p>
                    <p className={`text-brand-neutral-700`}>{designation}</p>
                </div>
                <div
                    className={`text-white bg-[#EE9D00] w-[32px] h-[32px] flex items-center justify-center rounded-md`}>
                    {rating}
                </div>
            </div>
            <p className={`mt-4`}>
                {description}
            </p>
        </div>
    );
};

export default ReviewCard;
