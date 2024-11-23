import React from 'react';
import SearchFilter from "@/Component/Filters/SearchFilter";
import PriceRangeFilter from "@/Component/Filters/PriceRangeFilter";
import RatingFilter from "@/Component/Filters/RatingFilter";
import Filter from "@/Component/Filters/CheckFilter";
import NumberFilter from "@/Component/Filters/NumberFilter";

const Filters = () => {
    return (
        <aside className="w-[300px] space-y-7">
            <SearchFilter />
            <PriceRangeFilter title="Your budget (per night)" />

            <RatingFilter title="Hotel star rating" />
            <Filter title="Accommodation type " />
            <Filter title="Distance from center" />
            <Filter title="Fun things to do" />
            <Filter title="Meals" />
            <Filter title="Cancellation policy" />
            <NumberFilter title="Beds" />
            <NumberFilter title="Bedrooms" />
            <NumberFilter title="Bathrooms" />
            <Filter title="Facilities" />
        </aside>
    );
};

export default Filters;
