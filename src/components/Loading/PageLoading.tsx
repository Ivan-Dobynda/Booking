import React from "react";
import Loading from "./Loading";

const PageLoading = () => {
  return (
    <div className="fixed z-[10000] inset-0 bg-black bg-opacity-40 flex justify-center items-center">
      <Loading className="text-secondary w-20 h-20" />
    </div>
  );
};

export default PageLoading;
