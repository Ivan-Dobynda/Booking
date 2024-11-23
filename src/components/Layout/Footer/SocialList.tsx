import React from "react";

import {
  FaFacebookF,
  FaLinkedinIn,
  FaPinterestP,
  FaYoutube,
} from "react-icons/fa";
import { AiFillInstagram } from "react-icons/ai";
import { FaXTwitter } from "react-icons/fa6";

const list = [
  { href: "https://www.facebook.com/flysmartdeals", icon: FaFacebookF },
  {
    href: "https://www.instagram.com/flysmartdeals_",
    icon: AiFillInstagram,
  },
  {
    href: "https://www.linkedin.com/company/flysmartdeals",
    icon: FaLinkedinIn,
  },
  { href: "https://twitter.com/flysmartdeals", icon: FaXTwitter },
  { href: "https://www.pinterest.com/flysmartdeals", icon: FaPinterestP },
  { href: "https://www.youtube.com/@flysmartdeals", icon: FaYoutube },
];
const SocialList = () => {
  return (
    <ul className="flex justify-center lg:justify-start gap-3 flex-wrap">
      {list.map((item, index) => (
        <li key={index}>
          <a
            href={item.href}
            className="text-lg xl:text-xl leading-none w-9 h-9 rounded-full text-brand-blue-400 bg-white inline-flex items-center justify-center hover:bg-opacity-80 transition"
          >
            <item.icon />
          </a>
        </li>
      ))}
    </ul>
  );
};

export default SocialList;
