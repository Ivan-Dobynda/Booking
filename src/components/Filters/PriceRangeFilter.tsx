import React from "react";

interface FilterTypes {
  title?: string;
  value?: string | undefined;
  onChange?: (value: string) => void; // onChange expects a number
}

const PriceRangeFilter: React.FC<FilterTypes> = ({
  title = "Price",
  value = "2000",
  onChange,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(e.target.value); // Pass the numeric value directly
    }
  };

  return (
    <div className="price-range">
      <header className="flex justify-between pb-2.5 lg:pb-3 mb-2.5 lg:mb-3 border-b border-b-gray-200">
        <h4 className="text-sm lg:text-base leading-none font-medium text-brand-neutral-800">
          {title}
        </h4>
      </header>

      <div className="flex justify-between mb-2">
        <h5 className="text-[15px] leading-none text-brand-neutral-800">
          £300
        </h5>
        <h5 className="text-[15px] leading-none text-brand-neutral-800">
          {`£${value}`}
        </h5>
      </div>
      <div>
        <input
          type="range"
          className="w-full accent-brand-blue h-1.5"
          value={value}
          min={300}
          max={2000}
          onChange={handleChange}
        />
      </div>
    </div>
  );
};

export default PriceRangeFilter;
