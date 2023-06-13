import Image from "next/image";
import { useRouter } from "next/router";
import { signOut, useSession } from "next-auth/react";
import React, { FC, useState } from "react";

import clsxm from "@/utils/clsxm";
import { useUserRole } from "@/hooks";

import { SYSTEM_URL } from "@/constants/pageUrl";

import { navLinks } from "./config";
import { Typography } from "../Typography";

const Navbar: FC = () => {
  const { data } = useSession();
  const router = useRouter();
  const { isAdmin, isSurveyor } = useUserRole();

  const { pathname } = router;

  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);

  const handleLogout = async (
    event: React.MouseEvent<HTMLLIElement, MouseEvent>
  ) => {
    event.stopPropagation();
    event.preventDefault();

    await signOut();
  };

  return (
    <nav className="fixed z-10 flex h-[4.5rem] w-full justify-between bg-white px-6 shadow-md">
      <div className="flex items-center xs:invisible sm:visible md:visible">
        <Image
          src="/assets/codev-logo.svg"
          width={32}
          height={32}
          alt="codev logo"
        />
        <h1 className="ml-3 text-[1.25rem]">Feedback System</h1>

        <ul className="ml-[3.625rem] flex h-full">
          <li
            onClick={() => router.push(SYSTEM_URL.HOME)}
            className={clsxm(
              "flex cursor-pointer items-center px-8 py-[1.313rem] transition-all hover:bg-gray-100",
              pathname === SYSTEM_URL.HOME && "bg-gray-100"
            )}
          >
            <Typography preset="heading2">Home</Typography>
          </li>

          {isSurveyor && (
            <li
              onClick={() => router.push(SYSTEM_URL.RESPONSES)}
              className={clsxm(
                "flex cursor-pointer items-center px-8 py-[1.313rem] transition-all hover:bg-gray-100",
                pathname === SYSTEM_URL.RESPONSES && "bg-gray-100"
              )}
            >
              <Typography preset="heading2">Responses</Typography>
            </li>
          )}

          {(isAdmin || isSurveyor) && (
            <li
              onClick={() => router.push(SYSTEM_URL.MY_SURVEYS)}
              className={clsxm(
                "flex cursor-pointer items-center px-8 py-[1.313rem] transition-all hover:bg-gray-100",
                pathname === SYSTEM_URL.MY_SURVEYS && "bg-gray-100"
              )}
            >
              <Typography preset="heading2">My Surveys</Typography>
            </li>
          )}
        </ul>
      </div>

      <div
        onClick={() => setIsDropdownOpen((prev) => !prev)}
        className="relative flex cursor-pointer items-center gap-3"
      >
        <Image
          src={data?.user.image || "/assets/avatar-placeholder.svg"}
          width={28}
          height={28}
          className="rounded-full"
          alt="avatar"
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
          <div className="absolute top-[4.5rem] -right-6 z-20 border bg-white">
            <ul className="min-w-[13.5rem]">
              <li className="bg-gray-100 p-4">
                {data?.user.name}
                <small className="block text-ellipsis whitespace-nowrap text-xs text-gray-500">
                  signed in as {data?.user.email}
                </small>
              </li>

              {navLinks.map((nav, index) => (
                <li
                  key={index}
                  onClick={() => router.push(nav.url)}
                  className="p-4 text-gray-600 hover:bg-gray-100 active:bg-gray-100"
                >
                  {nav.label}
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
