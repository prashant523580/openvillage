"use client";

import React, { useState } from "react";
import { createProject } from "@/actions/project.action";
import { useSession } from "next-auth/react";
import { Project, ProjectStatus } from "@/types";

export default function ProjectForm({ initialData }: { initialData?: Project | null }) {
  const { data: session } = useSession();
  const [isSubmitting, setIsSubmitting] = React.useState<boolean>(false);
  
  // Initialize form data with proper date handling
  const [formData, setFormData] = useState({
    title: initialData?.title || "",
    description: initialData?.description || "",
    status: initialData?.status || ProjectStatus.PLANNED,
    startDate: initialData?.startDate 
      ? new Date(initialData.startDate).toISOString().split("T")[0] 
      : new Date().toISOString().split("T")[0],
    endDate: initialData?.endDate 
      ? new Date(initialData.endDate).toISOString().split("T")[0] 
      : "",
    impact: initialData?.impact || "",
    opportunities: initialData?.opportunities || "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    if (!session?.user?.id) {
      alert("Please log in to create a project.");
      setIsSubmitting(false);
      return;
    }

    try {
      await createProject({
        ...formData,
        startDate: new Date(formData.startDate),
        endDate: formData.endDate ? new Date(formData.endDate) : null,
        createdBy: session.user.id,
      });
      
      alert(initialData ? "Project updated successfully!" : "Project created successfully!");
      
      if (!initialData) {
        // Reset form only for new projects
        setFormData({
          title: "",
          description: "",
          status: ProjectStatus.PLANNED,
          startDate: new Date().toISOString().split("T")[0],
          endDate: "",
          impact: "",
          opportunities: "",
        });
      }
    } catch (error) {
      console.error(error);
      alert(initialData ? "Failed to update project." : "Failed to create project.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 max-w-2xl mx-auto">
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-1">Project Title</label>
          <input
            type="text"
            placeholder="Project Title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Description</label>
          <textarea
            placeholder="Description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 h-32"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Status</label>
          <select
            value={formData.status}
            onChange={(e) => setFormData({ ...formData, status: e.target.value as ProjectStatus })}
            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
          >
            <option value={ProjectStatus.PLANNED}>Planned</option>
            <option value={ProjectStatus.ONGOING}>Ongoing</option>
            <option value={ProjectStatus.COMPLETED}>Completed</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Start Date</label>
          <input
            type="date"
            value={formData.startDate}
            onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">End Date (optional)</label>
          <input
            type="date"
            value={formData.endDate}
            onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
            min={formData.startDate}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Expected Impact</label>
          <textarea
            placeholder="Impact"
            value={formData.impact}
            onChange={(e) => setFormData({ ...formData, impact: e.target.value })}
            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 h-32"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Opportunities</label>
          <textarea
            placeholder="Opportunities"
            value={formData.opportunities}
            onChange={(e) => setFormData({ ...formData, opportunities: e.target.value })}
            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 h-32"
            required
          />
        </div>

        <div className="flex justify-end gap-4 mt-8">
          <button
            type="button"
            onClick={() => window.history.back()}
            className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded"
          >
            Cancel
          </button>
          <button
            disabled={isSubmitting}
            type="submit"
            className={`px-6 py-2 text-white rounded ${
              isSubmitting 
                ? "bg-blue-400 cursor-not-allowed" 
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {isSubmitting ? (
              <span>{initialData ? "Saving..." : "Creating..."}</span>
            ) : (
              <span>{initialData ? "Save Changes" : "Create Project"}</span>
            )}
          </button>
        </div>
      </div>
    </form>
  );
}