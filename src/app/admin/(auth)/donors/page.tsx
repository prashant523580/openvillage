import prisma from '@/lib/db'; // Adjust the import based on your project structure


export default async function DonorsPage() {
    const donors = await prisma.donor.findMany({
        orderBy: {
            createdAt: 'desc', // Orders donors by creation date, newest first
        },
    });
    return (
        <div className="py-6">
            <h1 className="text-2xl font-bold mb-4">Donors</h1>
            <div className="space-y-4">
                {donors.map((donor) => (
                    <div key={donor.id} className="p-4 bg-white shadow rounded-lg">
                        <p className="font-medium text-lg">{donor.name}</p>
                        <p className="text-gray-500">{donor.email}</p>
                        <p className="text-gray-700">Donated: ${donor.amount.toFixed(2)}</p>
                        <p className="text-gray-400 text-sm">
                            Donated on: {new Date(donor.createdAt).toLocaleDateString()}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}
