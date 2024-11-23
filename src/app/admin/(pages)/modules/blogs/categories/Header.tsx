"use client";
import React, { useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";

import H1 from "@admin/_components/Typo/H1";
import Button from "@admin/_components/Button/Button";

import CategoryModal from "./Modal/CategoryModal";

const Header = () => {
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);

  return (
    <>
      <CategoryModal open={categoryModalOpen} setOpen={setCategoryModalOpen} />
      <header className="mb-8 flex items-center justify-between">
        <div>
          <H1>Manage Blog Categories</H1>
        </div>
        <div>
          <Button
            className="gap-2 h-full"
            onClick={() => setCategoryModalOpen(true)}
            startIcon={
              <span className="text-xl">
                <AiOutlinePlus />
              </span>
            }
          >
            Add New
          </Button>
        </div>
      </header>
    </>
  );
};

export default Header;
