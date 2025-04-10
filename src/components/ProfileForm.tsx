"use client";

import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { updateProfile } from "@/actions/user.action";
// import { User } from "@/types";

// Server action to update the user profile
// async function updateUserProfile(formData: FormData) {
//   "use server";
//   const name = formData.get("name") as string;
//   const phoneNumber = formData.get("phoneNumber") as string;
//   const email = formData.get("email") as string;

//   const session = await import("next-auth/react").then((mod) => mod.getSession());
//   if (!session?.user?.id) {
//     throw new Error("User not authenticated");
//   }

//   const payload : User = {
//       id: session.user.id as string,
//       name,
//       phoneNumber,
//       email,
//   }
// //   const { default: prisma } = await import("@/lib/db");
//   await updateProfile(payload);
// }

export default function ProfileForm() {
    const { data: session, status, update } = useSession();
    const router = useRouter();
    const [formData, setFormData] = useState({
        name: "",
        phoneNumber: "",
        email: "",
    });
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    // Prefill form with session data when available
    useEffect(() => {
        if (session?.user) {
            setFormData({
                name: session.user.name || "",
                phoneNumber: session.user.phoneNumber || "",
                email: session.user.email || "",
            });
        }
    }, [session]);

    // Handle form submission
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);

        if (!session) {
            setError("You must be logged in to update your profile.");
            return;
        }

        try {
            // const data = new FormData();
            // data.append("name", formData.name);
            // data.append("phoneNumber", formData.phoneNumber);
            // data.append("email", formData.email);
            const payload = {
                id: session.user.id,
                name: formData.name,
                email: formData.email,
                phoneNumber: formData.phoneNumber
            }
            await updateProfile(payload);

            // Update the session with new data
            await update({
                ...session,
                user: {
                    ...session.user,
                    name: formData.name,
                    phoneNumber: formData.phoneNumber,
                    email: formData.email,
                },
            });

            setSuccess("Profile updated successfully!");
            router.refresh(); // Refresh the page to reflect changes
        } catch (err) {
            setError("Failed to update profile. Please try again.");
            console.error(err);
        }
    };

    // Redirect if not authenticated
    if (status === "unauthenticated") {
        router.push("/api/auth/signin");
        return null;
    }

    // Loading state
    if (status === "loading") {
        return <div className="text-center p-4">Loading...</div>;
    }

    return (
        <div className="max-w-xl mx-auto p-6 bg-white shadow-md rounded-lg">
            <h2 className="text-2xl font-bold mb-6 text-gray-800"> Profile</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Name Field */}
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                        Name
                    </label>
                    <input
                        type="text"
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Your Name"
                    />
                </div>

                {/* Phone Number Field */}
                <div>
                    <label
                        htmlFor="phoneNumber"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Phone Number
                    </label>
                    <input
                        type="tel"
                        id="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={(e) =>
                            setFormData({ ...formData, phoneNumber: e.target.value })
                        }
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        placeholder="+1234567890"
                        pattern="^\+?[1-9]\d{1,14}$"
                        title="Enter a valid phone number (e.g., +1234567890)"
                    />
                </div>

                {/* Email Field */}
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        placeholder="you@example.com"
                        disabled // Email updates might be restricted due to OAuth
                    />
                    <p className="mt-1 text-xs text-gray-500">
                        Email cannot be changed if set by Google authentication.
                    </p>
                </div>

                {/* Feedback Messages */}
                {error && <p className="text-red-500 text-sm">{error}</p>}
                {success && <p className="text-green-500 text-sm">{success}</p>}

                {/* Submit Button */}
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                    Save Profile
                </button>
            </form>
        </div>
    );
}