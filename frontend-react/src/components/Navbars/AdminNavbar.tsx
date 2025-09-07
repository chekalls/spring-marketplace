import React from "react";
import UserDropdown from "../Dropdowns/UserDropdown";

const Navbar: React.FC = () => {
  return (
    <>
      {/* Navbar */}
      <nav className="fixed top-0 left-0 w-full z-30 bg-white shadow-md md:flex-row md:flex-nowrap md:justify-start flex items-center p-4 md:pl-72">
        <div className="w-full mx-auto items-center flex justify-between md:flex-nowrap flex-wrap md:px-8 px-4">
          {/* Brand */}
          <a
            className="text-blueGray-800 text-lg font-bold hidden lg:inline-block"
            href="#pablo"
            onClick={(e) => e.preventDefault()}
          >
            Tableau de Bord
          </a>

          {/* Form */}
          <form className="md:flex hidden flex-row flex-wrap items-center lg:ml-auto mr-4">
            <div className="relative flex w-full flex-wrap items-stretch">
              <span className="z-10 h-full leading-snug font-normal absolute text-center text-blueGray-400 bg-transparent rounded text-base items-center justify-center w-10 pl-3 py-3">
                <i className="fas fa-search"></i>
              </span>
              <input
                type="text"
                placeholder="Rechercher..."
                className="border-0 px-3 py-3 placeholder-blueGray-400 text-blueGray-700 relative bg-blueGray-100 rounded-lg text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-full pl-10"
              />
            </div>
          </form>

          {/* User */}
          <ul className="flex-col md:flex-row list-none items-center hidden md:flex">
            <UserDropdown />
          </ul>
        </div>
      </nav>
      {/* End Navbar */}
    </>
  );
};

export default Navbar;