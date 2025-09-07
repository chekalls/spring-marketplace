import React, { useState, useRef } from "react";
import { createPopper } from "@popperjs/core";

// Remplace le chemin par ton vrai chemin d'image
import teamImage from "../../assets/img/team-1-800x800.jpg";

const UserDropdown: React.FC = () => {
  // dropdown props
  const [dropdownPopoverShow, setDropdownPopoverShow] = useState(false);
  const btnDropdownRef = useRef<HTMLAnchorElement | null>(null);
  const popoverDropdownRef = useRef<HTMLDivElement | null>(null);

  const openDropdownPopover = () => {
    if (btnDropdownRef.current && popoverDropdownRef.current) {
      createPopper(btnDropdownRef.current, popoverDropdownRef.current, {
        placement: "bottom-start",
      });
      setDropdownPopoverShow(true);
    }
  };

  const closeDropdownPopover = () => {
    setDropdownPopoverShow(false);
  };

  const toggleDropdown = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    dropdownPopoverShow ? closeDropdownPopover() : openDropdownPopover();
  };

  return (
    <>
      <a
        className="text-blueGray-500 block"
        href="#pablo"
        ref={btnDropdownRef}
        onClick={toggleDropdown}
      >
        <div className="items-center flex">
          <span className="w-12 h-12 text-sm text-white bg-blueGray-200 inline-flex items-center justify-center rounded-full">
            <img
              alt="User avatar"
              className="w-full rounded-full align-middle border-none shadow-lg"
              src={teamImage}
            />
          </span>
        </div>
      </a>
      <div
        ref={popoverDropdownRef}
        className={`${
          dropdownPopoverShow ? "block" : "hidden"
        } bg-white text-base z-50 float-left py-2 list-none text-left rounded shadow-lg min-w-48`}
      >
        {["Action", "Another action", "Something else here", "Separated link"].map(
          (label, idx) => (
            <React.Fragment key={idx}>
              {idx === 3 && <div className="h-0 my-2 border border-solid border-blueGray-100" />}
              <a
                href="#pablo"
                className="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
                onClick={(e) => e.preventDefault()}
              >
                {label}
              </a>
            </React.Fragment>
          )
        )}
      </div>
    </>
  );
};

export default UserDropdown;
