// app/about/page.tsx
import Image from 'next/image'
import Link from 'next/link'
import { Briefcase, CalendarCheck, ClipboardList, HeartHandshake, User } from 'lucide-react' // Using a Lucide icon for team member profile
import { Metadata } from 'next';
export const metadata: Metadata = {
    title: "About Us",
    description: 'Rural community development platform',
  }
export default function AboutPage() {
  // Sample team members with Nepali names, roles, and unique IDs.
//   const teamMembers = [
//     { id: 1, name: 'राजेश शर्मा', role: 'Board Member' },
//     { id: 2, name: 'मीना ज्ञवाली', role: 'Director' },
//     { id: 3, name: 'सुरेश थापा', role: 'Manager' },
//     { id: 4, name: 'कमला श्रेष्ठ', role: 'Program Organizer' },
//     { id: 5, name: 'दिनेश गुरुङ', role: 'Volunteer' },
//     { id: 6, name: 'शिशिर ढकाल', role: 'Volunteer' },
//   ]
const teamMembers = [
    {
      name: "Rajesh Thapa",
      role: "Board Member",
      icon: <User className="w-8 h-8" />,
    },
    {
      name: "Sita Sharma",
      role: "Board Member",
      icon: <User className="w-8 h-8" />,
    },
    {
      name: "Anita Gurung",
      role: "Director",
      icon: <Briefcase className="w-8 h-8" />,
    },
    {
      name: "Bikram Rai",
      role: "Manager",
      icon: <ClipboardList className="w-8 h-8" />,
    },
    {
      name: "Niraj Basnet",
      role: "Program Organizer",
      icon: <CalendarCheck className="w-8 h-8" />,
    },
    {
      name: "Pooja Tamang",
      role: "Volunteer",
      icon: <HeartHandshake className="w-8 h-8" />,
    },
    {
      name: "Ramesh Shrestha",
      role: "Volunteer",
      icon: <HeartHandshake className="w-8 h-8" />,
    },
  ];
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <section className="bg-blue-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Empowering Rural Communities in Nepal</h1>
          <p className="text-lg md:text-xl mb-8">A youth-led initiative for sustainable development</p>
          <Image
            src="/images/rural.webp" // Replace with actual image path
            alt="Rural community in Nepal"
            width={800}
            height={400}
            className="mx-auto rounded-lg shadow-lg"
          />
        </div>
      </section>

      {/* Mission Statement */}
      <section className="py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Our Mission</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Rural Development Service Nepal (RDS Nepal) is a youth-led initiative dedicated to empowering rural communities across Nepal by addressing key challenges in education, health, agriculture, and livelihood development. Founded with the belief that sustainable change begins at the grassroots level, we strive to create lasting impact.
          </p>
        </div>
      </section>

      {/* Focus Areas */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-12">Our Focus Areas</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <Image
                src="/images/education-icon.png" // Replace with actual icon/image
                alt="Education"
                width={80}
                height={80}
                className="mx-auto mb-4"
              />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Education</h3>
              <p className="text-gray-600">Improving access to quality education</p>
            </div>
            <div className="text-center">
              <Image
                src="/images/health-icon.jpg" // Replace with actual icon/image
                alt="Health"
                width={80}
                height={80}
                className="mx-auto mb-4"
              />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Health</h3>
              <p className="text-gray-600">Enhancing essential healthcare services</p>
            </div>
            <div className="text-center">
              <Image
                src="/images/agriculture-icon.avif" // Replace with actual icon/image
                alt="Agriculture"
                width={80}
                height={80}
                className="mx-auto mb-4"
              />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Agriculture</h3>
              <p className="text-gray-600">Supporting farmers with knowledge and resources</p>
            </div>
            <div className="text-center">
              <Image
                src="/images/livelihood-icon.png" // Replace with actual icon/image
                alt="Livelihood Development"
                width={80}
                height={80}
                className="mx-auto mb-4"
              />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Livelihood Development</h3>
              <p className="text-gray-600">Creating opportunities for a better life</p>
            </div>
          </div>
        </div>
      </section>

      {/* Approach */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Our Approach</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            We work hand-in-hand with local populations to identify real problems and co-create practical solutions. Whether it’s a school in need of supplies, a health post lacking basic facilities, or a farming community looking to modernize, RDS Nepal is there to listen, learn, and support.
          </p>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Our Team</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-8">
            We are a passionate team of students and volunteers driven by a shared goal: to bridge the rural-urban gap and uplift lives with compassion, innovation, and action.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  {member.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-1">{member.name}</h3>
                <p className="text-blue-600 font-medium">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* <section className="py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Our Team</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-8">
            Our team is made up of board members, directors, managers, program organizers, and volunteers who are dedicated to bridging the rural-urban gap and transforming lives.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {teamMembers.map((member) => (
              <div key={member.id} className="bg-white rounded-lg shadow p-6 flex flex-col items-center transition transform hover:-translate-y-1 hover:shadow-xl">
              
                <div className="bg-blue-600 rounded-full p-4 mb-4">
                  <User className="h-10 w-10 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800">{member.name}</h3>
                <p className="text-gray-600">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section> */}

      {/* Call to Action */}
      <section className="bg-blue-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Join Us in Making a Difference</h2>
          <p className="text-lg mb-8">Get involved with RDS Nepal and help empower rural communities.</p>
          <Link href="/contact" className="bg-white text-blue-600 px-6 py-3 rounded-md font-semibold hover:bg-gray-100 transition">
            Get Involved
          </Link>
        </div>
      </section>
    </div>
  )
}
