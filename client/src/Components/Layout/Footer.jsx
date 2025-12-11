import React from "react";
import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <>
      <footer className="bg-gray-900 text-white py-6 mt-10">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
          <div className="text-xl font-semibold">
            <p>Gramo</p>
          </div>
          <ul className="flex space-x-4 mt-4 md:mt-0 justify-center">
            <li>
              <Link to="/" className="hover:text-gray-400">
                Home
              </Link>
            </li>
            <li>
              <Link to="/messages" className="hover:text-gray-400">
                Messaging
              </Link>
            </li>
            <li>
              <Link to="/contactUs" className="hover:text-gray-400">
                ContactUs
              </Link>
            </li>

          </ul>

          <p className="mt-4 md:mt-0 text-sm">
            © {new Date().getFullYear()} Gramo. All rights reserved.
          </p>
        </div>
      </footer>
    </>
  );
};