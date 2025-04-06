

"use client";

import React, { useState } from "react";
import { createGovernance } from "@/actions/governance.action";
import { useSession } from "next-auth/react";
import { Governance } from "@/types";
import Link from "next/link";

export default function GovernanceForm({initialData}:{initialData: Governance | null}) {
  const { data: session } = useSession();
  const [isSubmiting,setIsSubmiting] = React.useState<boolean>(false);

  const [formData, setFormData] = useState({
    title: "",
    content: "",
    type: "Decision", // Default type
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmiting(true)

    if (!session) {
      alert("Please log in to create a governance record.");
      return;
    }

    try {
      await createGovernance({
        ...formData,
        authorId: session.user.id,
      });
      alert("Governance record created successfully!");
      setFormData({ title: "", content: "", type: "Decision" });
      setIsSubmiting(false)

    } catch (error) {
      console.error(error);
      alert("Failed to create governance record.");
      setIsSubmiting(false)

    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4">
      <input
        type="text"
        placeholder="Title"
        value={formData.title}
        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        className="w-full p-2 border rounded"
        required
      />
      <textarea
        placeholder="Content"
        value={formData.content}
        onChange={(e) => setFormData({ ...formData, content: e.target.value })}
        className="w-full p-2 border rounded"
        required
      />
      <select
        value={formData.type}
        name="type"
        defaultValue={initialData?.type || 'ANNOUNCEMENT'}
        onChange={(e) => setFormData({ ...formData, type: e.target.value })}
        className="w-full p-2 border rounded"
      >
        <option value="DECISION">Decision</option>
        <option value="PLAN">Plan</option>
          <option value="ANNOUNCEMENT">Announcement</option>
          <option value="FINANCIAL">Financial Report</option>
          <option value="MEETING">Meeting Minutes</option>
          <option value="POLICY">Policy Update</option>
      </select>
      {/* <div>
        <label className="block text-sm font-medium mb-1">Type</label>
        <select
          name="type"
          defaultValue={initialData?.type || 'ANNOUNCEMENT'}
          className="select select-bordered w-full"
        >
        </select>
      </div> */}
      {/* <button type="submit" className="bg-blue-500 text-white p-2 rounded">
        Create Governance Record
      </button> */}
      <div className="flex justify-end gap-4 items-center">
        <Link href="/admin/governance" className="btn btn-ghost bg-orange-500 text-white p-2 rounded">
          Cancel
        </Link>
        <button disabled={isSubmiting} type="submit" className={`${isSubmiting  ? "cursor-not-allowed " : "cursor-pointer "} bg-blue-500 text-white p-2 rounded`}>
          {isSubmiting ? 
          <span>{initialData ? "Updating" : "Creating"}</span>
          :
          <> {initialData ? 'Update' : 'Create'} Post </>
          }
      </button>
      </div>
    </form>
  );
}