import DonateForm from '@/components/DonateForm';
import prisma from '@/lib/db';
import Link from 'next/link';
import React from 'react';

interface PageProps {
    params: Promise<{
        projectID: string
    }>
}

async function ProjectIDPage({ params }: PageProps) {
    const {projectID} = await params;
    const project = await prisma.project.findUnique({
        where: {
            id: projectID
        },
        include: {
            author: true
        }
    });

    if (!project) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-red-600 mb-4">Project Not Found</h1>
                    <Link href="/projects" className="text-blue-600 hover:underline">
                        Back to Projects
                    </Link>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4">
            <div className="max-w-6xl mx-auto">
                <Link href="/projects" className="mb-6 inline-block text-blue-600 hover:underline">
                    ← Back to Projects
                </Link>

                {/* Project Details Card */}
                <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-800 mb-2">{project.title}</h1>
                            <div className="flex items-center space-x-4 mb-4">
                                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                                    project.status === 'ONGOING' ? 'bg-blue-100 text-blue-800' :
                                    project.status === 'COMPLETED' ? 'bg-green-100 text-green-800' : 'bg-gray-100'
                                }`}>
                                    {project.status}
                                </span>
                                <p className="text-sm text-gray-500">
                                    Created by: {project.author.name}
                                </p>
                            </div>
                        </div>
                        <div className="text-gray-500 text-sm">
                            <p>
                                {project.startDate.toLocaleDateString()}
                                {project.endDate && ` - ${project.endDate.toLocaleDateString()}`}
                            </p>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div>
                            <h3 className="text-lg font-semibold text-gray-700 mb-2">Description</h3>
                            <p className="text-gray-600 leading-relaxed">{project.description}</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <h3 className="text-lg font-semibold text-gray-700 mb-2">Impact</h3>
                                <p className="text-gray-600">{project.impact}</p>
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold text-gray-700 mb-2">Opportunities</h3>
                                <p className="text-gray-600">{project.opportunities}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Donation Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Custom Donation Form */}
                    <div className="bg-white rounded-lg shadow-lg p-6">
                        <h2 className="text-2xl font-bold text-gray-800 mb-6">Support This Project</h2>
                        <DonateForm projectId={project.id} />
                    </div>

                    {/* GoFundMe Embed */}
                    <div className="bg-white rounded-lg shadow-lg p-6">
                        <h2 className="text-2xl font-bold text-gray-800 mb-6">Support via GoFundMe</h2>
                        <div className="aspect-w-16 aspect-h-9">
                            {/* Replace with your actual GoFundMe embed code */}
                            <iframe 
                                src="https://www.gofundme.com/f/909a7392/widget/medium/" 
                                className="w-full h-64 border-0"
                                title="GoFundMe Campaign"
                            />
                        </div>
                        <p className="mt-4 text-sm text-gray-500">
                            Secure donations processed through GoFundMe
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProjectIDPage;