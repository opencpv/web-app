"use client";
import useAssets from "@/customHooks/useAssets";
import React, { useState } from "react";
import { greatVibes } from "@/app/fonts/font";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { svgs } = useAssets();
  const pathname = usePathname();
  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };
  const links = [
    { name: "Hackathons", href: "/hackathons" },
    { name: "Grants", href: "/grants" },
    { name: "Scholarships", href: "/scholarships" },
    { name: "Fellowships", href: "/fellowships" },
  ];
  const isWaitlistPage = pathname.startsWith("/landing");
  const isAdminPage = pathname.startsWith("/admin");
  const isModeratorPage = pathname.startsWith("/moderator");
  if (isWaitlistPage || isAdminPage || isModeratorPage) {
    return null;
  }
  return (
    <nav className="sticky top-0 z-50 w-full bg-zinc-900 shadow-dark-mild dark:bg-neutral-700">
      <div className="container mx-auto px-4 py-2 lg:py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img
              src={svgs.siteLogo.src}
              alt="Site Logo"
              className="h-10 w-10"
            />
            <h1
              className={`${greatVibes.className} text-white font-black text-xl`}
            >
              Elevate Access
            </h1>
          </div>
          <div className="hidden lg:flex items-center gap-6">
            {links.map((link, index) => (
              <Link
                key={index}
                href={link.href}
                className="text-black  bg-yellow-400 hover:bg-yellow-500 px-4 py-2 rounded-md transition-all duration-200"
              >
                {link.name}
              </Link>
            ))}
            <button className="bg-white px-6 py-2 rounded-md text-sm font-medium hover:bg-gray-100 transition-all duration-200">
              Login
            </button>
          </div>
          <button
            onClick={toggleNavbar}
            className="lg:hidden text-white p-2"
            aria-label="Toggle Menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
        {isOpen && (
          <div className="lg:hidden">
            <div className="flex flex-col gap-2 pt-4 pb-6">
              {links.map((link, index) => (
                <Link
                  key={index}
                  href={link.href}
                  className="text-black font-semibold bg-yellow-400 hover:bg-yellow-500 px-4 py-2 rounded-md text-center transition-all duration-200"
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              <button className="bg-white px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-100 transition-all duration-200">
                Login
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
