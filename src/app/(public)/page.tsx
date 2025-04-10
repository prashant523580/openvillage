// app/page.tsx
import Link from 'next/link';
import { auth } from '@/auth'; // Your auth helper (adjust the path accordingly)

// Feature Card component (can be extracted into its own file)
function FeatureCard({ title, description }: { title: string; description: string }) {
  return (
    <div className="p-6 bg-white rounded-lg shadow hover:shadow-lg transition">
      <h2 className="text-xl font-bold mb-2 text-gray-800">{title}</h2>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}

// Testimonial component (as an example)
function Testimonial({ quote, author }: { quote: string; author: string }) {
  return (
    <div className="p-6 bg-white rounded-lg shadow italic">
      <p className="text-gray-700">{quote}</p>
      <p className="mt-4 text-right text-gray-900 font-semibold">- {author}</p>
    </div>
  );
}

// FAQ component (as an example)
function FAQItem({ question, answer }: { question: string; answer: string }) {
  return (
    <div className="p-4 border-b last:border-none">
      <h3 className="text-lg font-semibold text-gray-800">{question}</h3>
      <p className="text-gray-600 mt-2">{answer}</p>
    </div>
  );
}

export default async function Home() {
  const session = await auth(); // Check session on the server side

  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="bg-blue-600 text-white py-20">
        <div className="max-w-6xl mx-auto text-center px-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Welcome to Community Connect</h1>
          <p className="text-xl mb-8">Empowering rural communities through technology</p>
          {!session ? (
            <Link
              href="/login"
              className="bg-white text-blue-600 px-8 py-3 rounded-lg text-lg font-semibold hover:bg-opacity-90 transition"
            >
              Get Started
            </Link>
          ) : (
            <div className="space-y-4">
              <Link
                href="/dashboard"
                className="bg-white text-blue-600 px-8 py-3 rounded-lg text-lg font-semibold hover:bg-opacity-90 transition"
              >
                Go to Dashboard
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Our Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard
              title="Community Surveys"
              description="Share your needs and help prioritize community projects."
            />
            <FeatureCard
              title="Project Dashboard"
              description="Track local projects with real-time updates and insights."
            />
            <FeatureCard
              title="Governance Transparency"
              description="Access governance reports and make informed decisions."
            />
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-8">What Our Community Says</h2>
          <div className="space-y-8">
            <Testimonial
              quote="Community Connect has transformed the way we collaborate and solve local challenges."
              author="Sita K."
            />
            <Testimonial
              quote="A seamless platform that bridges the gap between community needs and practical solutions."
              author="Hari P."
            />
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Frequently Asked Questions</h2>
          <div className="divide-y divide-gray-200">
            <FAQItem
              question="What is Community Connect?"
              answer="It is a platform designed to empower rural communities by bridging the gap between needs and resources."
            />
            <FAQItem
              question="How can I participate?"
              answer="You can sign up, submit surveys, and connect with local projects through the platform."
            />
            <FAQItem
              question="Who can access the dashboard?"
              answer="Registered users can access personalized dashboards and other tools."
            />
          </div>
        </div>
      </section>
    </div>
  );
}
