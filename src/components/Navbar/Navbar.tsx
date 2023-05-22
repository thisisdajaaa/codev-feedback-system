import Image from "next/image";
import Link from "next/link";
import { signOut } from "next-auth/react";
import React, { FC, useState } from "react";

import clsxm from "@/utils/clsxm";

import { navLinks } from "./config";

const Navbar: FC = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);

  const handleLogout = async (
    event: React.MouseEvent<HTMLLIElement, MouseEvent>
  ) => {
    event.stopPropagation();
    event.preventDefault();

    await signOut();
  };

  return (
    <nav className="fixed flex h-[4.5rem] w-full justify-between bg-white px-6">
      <div className="flex items-center sm:visible md:visible">
        <Image
          src="/assets/codev-logo.svg"
          width={32}
          height={32}
          alt="codev logo"
        />
        <h1 className="ml-3 text-[1.25rem]">Feedback System</h1>
      </div>

      <div
        onClick={() => setIsDropdownOpen((prev) => !prev)}
        className="relative flex cursor-pointer items-center gap-3"
      >
        <Image
          src="/assets/avatar-placeholder.svg"
          width={28}
          height={28}
          alt="avatar placeholder"
        />
        <Image
          className={clsxm(
            "ease 300ms transition",
            isDropdownOpen ? "rotate-180" : ""
          )}
          src="/assets/chevron-down.svg"
          width={12}
          height={6}
          alt="chevron down icon"
        />

        {isDropdownOpen && (
          <div className="absolute top-[4.5rem] -right-6 bg-white">
            <ul className="min-w-[13.5rem]">
              <li className="bg-gray-100 p-4">
                <Link href="#">John Doe</Link>
                <small className="block text-ellipsis whitespace-nowrap text-xs text-gray-500">
                  signed in as johndoe@email.com
                </small>
              </li>

              {navLinks.map((nav, index) => (
                <li
                  key={index}
                  className="p-4 text-gray-600 hover:bg-gray-100 active:bg-gray-100"
                >
                  <Link href={nav.url}>{nav.label}</Link>
                </li>
              ))}

              <li
                className="p-4 text-gray-600 hover:bg-gray-100 active:bg-gray-100"
                onClick={handleLogout}
              >
                <span>Log Out</span>
              </li>
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
};

export { Navbar };
