"use client";

// import { auth } from "@/auth";
import Link from "next/link";
// import { redirect } from "next/navigation";
import { useState } from "react";
import { signOut } from "next-auth/react";
import Image from "next/image";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

//   // Server-side check for session and role
//   const checkAuth = async () => {
//     const session = await auth();
//     if (!session?.user || session.user.role !== "ADMIN") {
//       redirect("/");
//     }
//     return session;
//   };

//   checkAuth();

  const handleLogout = async () => {
    await signOut({ callbackUrl: "/" });
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-md transform transition-transform duration-300 ease-in-out lg:sticky lg:top-0 lg:translate-x-0 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-4 flex justify-between items-center">
          <h1 className="text-xl font-bold text-black">Admin Panel</h1>
          <button
            className="lg:hidden text-gray-800 focus:outline-none"
            onClick={() => setIsSidebarOpen(false)}
          >
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <nav className="mt-4">
          <Link
            href="/admin/dashboard"
            className="block py-2.5 px-4 rounded transition duration-200 hover:bg-blue-100 hover:text-blue-700"
          >
            Dashboard
          </Link>
          <Link
            href="/admin/projects"
            className="block py-2.5 px-4 rounded transition duration-200 hover:bg-blue-100 hover:text-blue-700"
          >
            Projects
          </Link>
          <Link
            href="/admin/governance"
            className="block py-2.5 px-4 rounded transition duration-200 hover:bg-blue-100 hover:text-blue-700"
          >
            Governance
          </Link>
          <Link
            href="/admin/users"
            className="block py-2.5 px-4 rounded transition duration-200 hover:bg-blue-100 hover:text-blue-700"
          >
            Users
          </Link>
          <Link
            href="/admin/survey"
            className="block py-2.5 px-4 rounded transition duration-200 hover:bg-blue-100 hover:text-blue-700"
          >
            Survey
          </Link>
          <Link
            href="/admin/donors"
            className="block py-2.5 px-4 rounded transition duration-200 hover:bg-blue-100 hover:text-blue-700"
          >
            Donors
          </Link>
          <Link
            href="/admin/contact"
            className="block py-2.5 px-4 rounded transition duration-200 hover:bg-blue-100 hover:text-blue-700"
          >
            Contact Submission
          </Link>
        </nav>
      </aside>

      {/* Overlay for mobile sidebar */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Navigation */}
        <header className="bg-white shadow-md sticky top-0 z-30">
          <div className="flex justify-between lg:justify-end items-center p-4">
            <button
              className="text-black focus:outline-none lg:hidden"
              onClick={() => setIsSidebarOpen(true)}
            >
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
            <div className="relative">
              <div className="flex items-center cursor-pointer group">
                <span className="mr-2 text-text hidden sm:inline">Admin</span>
                <Image
                  className="h-8 w-8 rounded-full object-cover"
                  src="/next.svg"
                  alt="Profile"
                  width={100}
                  height={100}
                />
                {/* Dropdown */}
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 hidden group-hover:block">
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 p-6 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}