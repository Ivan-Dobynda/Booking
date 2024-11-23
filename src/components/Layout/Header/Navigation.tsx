import React from "react";
import NavLink from "./NavLink";

export const links = [
  {
    id: 1,
    title: "Home",
    href: "/",
  },
  {
    id: 2,
    title: "Flight",
    href: "/flight",
  },
  {
    id: 4,
    title: "Hotel",
    href: "/hotel",
  },
  {
    id: 3,
    title: "Car Rental",
    href: "/cars",
  },

  // {
  //   id: 5,
  //   title: "Blog",
  //   href: "/blog",
  // },
  {
    id: 6,
    title: "Information",
    href: "/information",
  },
];

const Navigation = () => {
  return (
    <nav className="absolute left-1/2 transform -translate-x-1/2 hidden md:block">
      <ul className="flex gap-8 lg:gap-10">
        {links.map((link) => (
          <li key={link.id}>
            <NavLink {...link} />
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navigation;
