/* eslint-disable */
import React, { useState } from "react";
import { Link } from "react-router-dom";


const Navbar: React.FC = () => {

    return (
        <nav className="w-full py-4 bg-white shadow-md">
            <div className="container mx-auto flex justify-center">
                <Link to="/" className="text-green-600 text-2xl font-bold">
                    SuperMarché
                </Link>
            </div>
        </nav>
    );
};

export default Navbar;
