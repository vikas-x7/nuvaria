import React from "react";
import { Music2 } from "lucide-react";

const Linkedin = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const Instagram = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

export default function Footer() {
  return (
    <footer className="  md: bg-[#0A0A0A] text-gray-300 font-inter">
      {/* Main Footer Content */}
      <div className=" mx-auto px-6 py-12">
        {/* Top Section */}
        <div className="flex justify-between items-start mb-12">
          {/* Logo and Tagline */}
          <div>
            <div className="flex items-center justify-center gap-2  ">
              <div className="w-8 h-8  rounded-sm flex items-center justify-center">
                <img src="./images/fevicon.svg" alt="" />
              </div>
              <span className="text-white text-2xl font-instrument">
                Nuvaria
              </span>
            </div>
          </div>


        </div>

        {/* Divider */}
        <div className="border-t border-[#2E2E2E] mb-12"></div>

        {/* Links Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Product Column */}
          <div>
            <h3 className="text-white font-semibold mb-4">Product</h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors text-sm"
                >
                  AI image
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors text-sm"
                >
                  AI video generator
                </a>
              </li>
              <li></li>
            </ul>
          </div>

          {/* Company Column */}
          <div>
            <h3 className="text-white font-semibold mb-4">Company</h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors text-sm"
                >
                  Nuvaria AI
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors text-sm"
                >
                  Side Proeject
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Column */}
          <div>
            <h3 className="text-white font-semibold mb-4">Contact</h3>
            <div className="space-y-3 text-sm">
              <p className="text-gray-400">
                Interstellar Orion Complex, Sector Gate 12 Alpha Centauri
                System, GRC-AC-7781
              </p>
              <a
                href="mailto:marketplace@caelor.com"
                className="text-gray-400 hover:text-white transition-colors block"
              >
                vikaspal.icu@gmail.com
              </a>
            </div>
          </div>

          {/* Social Media & Badge Column */}
          <div className="flex flex-col items-start md:items-end">
            {/* Social Icons */}
            <div className="flex gap-3 mb-6">


              <a
                href="#"
                className="w-10 h-10  rounded flex items-center justify-center hover:bg-gray-800 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10  rounded flex items-center justify-center hover:bg-gray-800 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
            </div>

            {/* Atlassian Badge */}
          </div>
        </div>

        {/* Divider */}
        <div className="mb-6"></div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
          <div className="text-gray-500">
            All rights reserved 2025 © Nuvaria
          </div>
          <div className="flex gap-6">
            <a
              href="#"
              className="text-gray-400 hover:text-white transition-colors"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-white transition-colors"
            >
              India
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
