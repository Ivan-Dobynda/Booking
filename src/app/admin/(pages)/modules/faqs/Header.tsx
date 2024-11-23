import React from "react";
import Link from "next/link";
import { AiOutlinePlus } from "react-icons/ai";

import H1 from "@admin/_components/Typo/H1";
import Button from "@admin/_components/Button/Button";

const Header = () => {
  return (
    <header className="mb-8 flex items-center justify-between">
      <div>
        <H1>Manage FAQs</H1>
      </div>
      <div>
        <Link href="/admin/modules/faqs/create">
          <Button
            className="gap-2 h-full"
            startIcon={
              <span className="text-xl">
                <AiOutlinePlus />
              </span>
            }
          >
            Add New
          </Button>
        </Link>
      </div>
    </header>
  );
};

export default Header;
