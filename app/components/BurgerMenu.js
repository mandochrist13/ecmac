"use client"

import React, { useState } from "react";
import { Button } from "@/components/ui/button";

const HamburgerMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex lg:hidden">
      {/* Checkbox pour activer/désactiver le menu */}
      <input
        type="checkbox"
        id="hamburger"
        className="absolute -left-full"
        checked={isOpen}
        onChange={() => setIsOpen(!isOpen)}
      />

      {/* Label pour afficher l'icône hamburger */}
      <label
        htmlFor="hamburger"
        className="fixed top-4 right-4 z-20 flex items-center justify-center w-16 h-16 bg-[#52bf78] rounded-full shadow-xl cursor-pointer"
        aria-label="Menu"
      >
        <span
          className={`block w-10 h-1 bg-[#130159] relative transition-all duration-300 ${
            isOpen ? "bg-transparent" : ""
          }`}
        >
          <span
            className={`absolute w-full h-full bg-[#130159] top-[-10px] transition-transform duration-300 ${
              isOpen ? "top-[-1px] rotate-45" : ""
            }`}
          ></span>
          <span
            className={`absolute w-full h-full bg-[#130159] top-[10px] transition-transform duration-300 ${
              isOpen ? "top-[-1px] -rotate-45" : ""
            }`}
          ></span>
        </span>
      </label>

      {/* Menu de navigation */}
      <nav
        className={`fixed z-10 top-0 right-0 h-full w-3/4 max-w-xs bg-[#130159] text-[#fff] font-semibold transform ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-500`}
      >
        <ul className="mt-24 space-y-6 px-6">
          <li>
            <a href="#!" className="text-lg block focus:outline-none focus:ring-2 focus:ring-indigo-600">
              Rubrique 1
            </a>
          </li>
          <li>
            <a href="#!" className="text-lg block focus:outline-none focus:ring-2 focus:ring-indigo-600">
              Rubrique 2
            </a>
          </li>
          <li>
            <a href="#!" className="text-lg block focus:outline-none focus:ring-2 focus:ring-indigo-600">
              Rubrique 3
            </a>
          </li>
          <li>
            <a href="#!" className="text-lg block focus:outline-none focus:ring-2 focus:ring-indigo-600">
              Rubrique 4
            </a>
          </li>
          <li>
            <a href="#!" className="text-lg block focus:outline-none focus:ring-2 focus:ring-indigo-600">
              Rubrique 5
            </a>
          </li>
          <Button className="" variant="default">
                      <span className="absolute inset-0 w-full h-full bg-[#130159] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out z-0"></span>
                      <span className="relative z-10 transition-colors duration-500 ease-in-out group-hover:text-[#ffffff]">
                        S'inscrire
                      </span>
                    </Button>
        </ul>
      </nav>
    </div>
  );
};

export default HamburgerMenu;
