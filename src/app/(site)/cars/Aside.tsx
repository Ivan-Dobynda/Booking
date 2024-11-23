import React from "react";

import Filters from "./Filters/Filters";

const Aside = () => {
  return (
    <aside className="w-72 xl:w-[320px] hidden lg:block">
      <Filters />
    </aside>
  );
};

export default Aside;
