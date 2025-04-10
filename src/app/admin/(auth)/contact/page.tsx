import prisma from '@/lib/db';

export default async function ContactSubmissionsPage() {
  const submissions = await prisma.contactSubmission.findMany({
    orderBy: {
      createdAt: 'desc', // Orders submissions by creation date, newest first
    },
  });

  return (
    <div className=" bg-gray-50">
      {submissions.map((submission) => (
        <div key={submission.id} className="p-4 bg-white rounded shadow mb-4">
          <p className="font-medium">{submission.name} ({submission.email})</p>
          <p className="text-sm text-gray-500">{new Date(submission.createdAt).toLocaleString()}</p>
          <p className="mt-2">{submission.message}</p>
        </div>
      ))}
    </div>
  );
}
