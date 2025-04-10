"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function Navigation() {
  const { data: session } = useSession();
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const navLinks = [
    { href: "/dashboard", label: "Projects" },
    { href: "/survey", label: "Survey" },
    { href: "/governance", label: "Governance" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
    ...(session?.user.role === "ADMIN" ? [{ href: "/admin/dashboard", label: "Admin" }] : []),
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    setIsDropdownOpen(false); // Close dropdown when toggling mobile menu
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <nav className="bg-white shadow sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Left Section: Brand and Desktop Links */}
          <div className="flex items-center">
            <Link href="/" className="text-xl font-bold ">
              Open<span className="text-red-700">Village</span>
            </Link>
            {/* Desktop Navigation */}
            <div className="hidden md:ml-6 md:flex md:space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                    pathname === link.href
                      ? "border-blue-500 text-gray-900"
                      : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Right Section: User Info and Mobile Toggle */}
          <div className="flex items-center">
            {/* Desktop User Info with Dropdown */}
            <div className="hidden md:flex md:items-center md:space-x-4 relative">
              {session ? (
                <div
                  className="group relative"
                  // onMouseEnter={() => setIsDropdownOpen(true)}
                  // onMouseLeave={() => setIsDropdownOpen(false)}
                >
                  <button
                    className="flex items-center text-sm text-gray-500 hover:text-gray-700 focus:outline-none"
                    onClick={toggleDropdown}
                  >
                    {session.user.name}
                    <svg
                      className="ml-1 h-4 w-4 cursor-pointer"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>
                  {/* Dropdown Menu */}
                  {isDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                      <Link
                        href="/profile"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        Profile
                      </Link>
                      <Link
                        href="/api/auth/signout"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        Sign out
                      </Link>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  href="/api/auth/signin"
                  className="text-gray-500 hover:text-gray-700 text-sm font-medium"
                >
                  Sign in
                </Link>
              )}
            </div>
            {/* Mobile Menu Toggle */}
            <button
              className="md:hidden p-2 text-gray-500 hover:text-gray-700 focus:outline-none"
              onClick={toggleMobileMenu}
            >
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                {isMobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu (Dropdown) */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`block px-3 py-2 rounded-md text-base font-medium ${
                    pathname === link.href
                      ? "bg-blue-50 text-blue-700"
                      : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              {session ? (
                <>
                  <button
                    className="block w-full text-left px-3 py-2 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                    onClick={toggleDropdown}
                  >
                    {session.user.name}
                    <svg
                      className="inline ml-1 h-4 w-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>
                  {isDropdownOpen && (
                    <div className="pl-4 space-y-1">
                      <Link
                        href="/profile"
                        className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        Profile
                      </Link>
                      <Link
                        href="/api/auth/signout"
                        className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        Sign out
                      </Link>
                    </div>
                  )}
                </>
              ) : (
                <Link
                  href="/api/auth/signin"
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Sign in
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}