import React from "react";
import CarDetailsCard from "@/components/Cards/CarDetailsCard";
import Button from "@/components/Button/Button";

const CarsListing = () => {
  const cars = new Array(10).fill(null);
  return (
    <div>
      <ul className="space-y-8 mb-6 sm:mb-8 md:mb-10 lg:mb-12">
        {cars.map((car, index) => (
          <li key={index}>
            <CarDetailsCard />
          </li>
        ))}
      </ul>

      <div className="text-center">
        <Button>Show More</Button>
      </div>
    </div>
  );
};

export default CarsListing;
