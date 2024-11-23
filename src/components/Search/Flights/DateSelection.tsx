import Button from "@/components/Button/Button";
import { classNames, formatDateInLocalTimezone } from "@/lib/helpers";
import { Popover, Transition } from "@headlessui/react";
import React, { ReactNode, useState } from "react";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";

interface IDateSelection extends DatesTabProps {
  label: string;
  className?: string;
  icon?: ReactNode;
  value?: null | Date;
  range?: boolean;
  minDate?: Date | null;
}

const tabs = [
  { name: "dates", title: "Specific Dates" },
  { name: "month", title: "Whole Month" },
];

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const DateSelection = ({
  label,
  className,
  value,
  startDate,
  endDate,
  setStartDate,
  setEndDate,
  range,
  minDate,
}: IDateSelection) => {
  const [currentTab, setCurrentTab] = useState("dates");
  const [currentMonth, setCurrentMonth] = useState<string | null>(null);

  return (
    <Popover as="div" className={classNames(className, "relative")}>
      <Popover.Button className="flex w-full flex-col text-left rounded-lg border border-gray-300 bg-gray-200 bg-opacity-30 hover:bg-opacity-60 transition px-3.5 py-3.5 h-[68px]">
        <div className="flex w-full justify-between items-center text-brand-neutral-600 mb-auto">
          <span className="text-sm leading-none -mt-0.5">{label}</span>
        </div>
        <div className="text-brand-neutral-700 text-sm leading-none font-medium">
          {value ? formatDateInLocalTimezone(value) : "Date"}
        </div>
      </Popover.Button>
      <Transition
        className="origin-top"
        enter="transition duration-100 ease-out"
        enterFrom="transform scale-95 opacity-0"
        enterTo="transform scale-100 opacity-100"
        leave="transition duration-75 ease-out"
        leaveFrom="transform scale-100 opacity-100"
        leaveTo="transform scale-95 opacity-0"
      >
        <Popover.Panel
          className="absolute left-0 xl:left-1/2 xl:-translate-x-1/2 mt-2.5 z-10 w-full sm:w-[360px] lg:w-[580px] rounded-lg overflow-hidden bg-white"
          style={{
            boxShadow:
              "0px 4px 12px 0px rgba(24, 39, 75, 0.08), 0px -4px 12px 0px rgba(24, 39, 75, 0.08)",
          }}
        >
          <div className="p-4 lg:p-5">
            {/* <header className="flex justify-center mb-5">
              <div className="border rounded-lg border-brand-blue overflow-hidden">
                {tabs.map((tab, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentTab(tab.name)}
                    className={classNames(
                      tab.name === currentTab
                        ? "bg-brand-blue text-white hover:bg-brand-blue-500"
                        : " hover:bg-brand-blue-50",
                      "inline-block text-xs sm:text-sm leading-none py-2 lg:py-2.5 px-3.5 lg:px-4 w-auto lg:w-36 transition"
                    )}
                  >
                    {tab.title}
                  </button>
                ))}
              </div>
            </header> */}

            <div className={currentTab === "month" ? "" : "hidden"}>
              <MonthTab
                currentMonth={currentMonth}
                setCurrentMonth={(month: string) => setCurrentMonth(month)}
              />
            </div>

            <div
              className={
                currentTab === "dates"
                  ? "-mx-5 lg:-mx-6 -mb-4 lg:-mb-5"
                  : "hidden"
              }
            >
              <DatesTab
                range={range}
                startDate={startDate}
                setStartDate={setStartDate}
                endDate={endDate}
                setEndDate={setEndDate}
                minDate={minDate}
              />
            </div>
          </div>
        </Popover.Panel>
      </Transition>
    </Popover>
  );
};

export default DateSelection;

const MonthTab = ({
  currentMonth,
  setCurrentMonth,
}: {
  currentMonth: string | null;
  setCurrentMonth: (month: string) => void;
}) => {
  return (
    <div>
      <h4 className="text-base text-brand-neutral-800 font-semibold mb-4">
        Month
      </h4>
      <ul className="grid grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-3.5">
        {months.map((month, index) => (
          <li key={index}>
            <button
              onClick={() => setCurrentMonth(month)}
              className={classNames(
                currentMonth === month
                  ? "bg-brand-blue text-white"
                  : "bg-gray-200/70 hover:bg-gray-200 text-brand-black-800",
                "w-full h-20 text-center rounded-lg flex items-center justify-center"
              )}
            >
              <div>
                <h5 className="text-sm mb-0.5">{month}</h5>
                <div className="text-xs">2023</div>
              </div>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

interface DatesTabProps {
  startDate?: Date | null;
  endDate?: Date | null;
  setStartDate?: (date: Date | null) => void;
  setEndDate?: (date: Date | null) => void;
  range?: boolean;
  minDate?: Date | null;
}

const DatesTab = ({
  startDate,
  endDate,
  setStartDate,
  setEndDate,
  range,
  minDate,
}: DatesTabProps) => {
  const onChange = (dates: any) => {
    if (range) {
      const [start, end] = dates;
      setStartDate?.(start);
      setEndDate?.(end);
      return;
    }
    setStartDate?.(dates);
  };

  return (
    <div>
      <div className="hidden lg:block calendar-2-months">
        <DatePicker
          selected={startDate}
          onChange={onChange}
          startDate={startDate}
          endDate={endDate}
          selectsRange={range}
          monthsShown={2}
          inline
          minDate={minDate}
        />
      </div>
      <div className="lg:hidden">
        <DatePicker
          selected={startDate}
          onChange={onChange}
          startDate={startDate}
          endDate={endDate}
          selectsRange={range}
          inline
        />
      </div>
      <div className="py-4 lg:py-5 px-5 lg:px-6 flex flex-col lg:flex-row gap-3 lg:gap-3.5 lg:items-center justify-between border-t border-gray-300">
        <div className="flex gap-2 sm:gap-2.5 lg:gap-3.5 items-center justify-between lg:justify-start">
          {/* <div className="text-xs sm:text-sm text-brand-neutral-600">
            <span>Showing prices in USA for</span>
          </div>
          <div className="flex items-center text-xs sm:text-sm gap-1 sm:gap-1.5">
            <button className="text-brand-neutral-700">
              <FaChevronLeft />
            </button>
            <span className="text-brand-neutral-600">8 day trips</span>
            <button className="text-brand-neutral-700">
              <FaChevronRight />
            </button>
          </div> */}
        </div>
        <div className="flex gap-2 sm:gap-2.5 lg:gap-3.5 items-center justify-between lg:justify-start">
          {/* <div className="text-left lg:text-right">
            <div className="text-xs sm:text-sm leading-none text-brand-neutral-800 mb-2">
              from USA $500
            </div>
            <div className="text-xs leading-none text-brand-neutral-600">
              round trip price
            </div>
          </div> */}

          <Popover.Button
            className={classNames("button w-[84px]", "primary")}
            style={{ minHeight: "45px" }}
          >
            Done
          </Popover.Button>
        </div>
      </div>
    </div>
  );
};
