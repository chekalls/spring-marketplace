import React, { useState, useRef } from "react";
import { createPopper } from "@popperjs/core";

const NotificationDropdown: React.FC = () => {
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

  const menuItems = [
    "Action",
    "Another action",
    "Something else here",
    "Separated link",
  ];

  return (
    <>
      <a
        className="text-blueGray-500 block py-1 px-3"
        href="#pablo"
        ref={btnDropdownRef}
        onClick={toggleDropdown}
      >
        <i className="fas fa-bell"></i>
      </a>

      <div
        ref={popoverDropdownRef}
        className={`${
          dropdownPopoverShow ? "block" : "hidden"
        } bg-white text-base z-50 float-left py-2 list-none text-left rounded shadow-lg mt-1 min-w-48`}
      >
        {menuItems.map((label, idx) => (
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
        ))}
      </div>
    </>
  );
};

export default NotificationDropdown;
