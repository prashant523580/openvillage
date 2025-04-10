// import Image from 'next/image';
import Link from 'next/link';
import ContactForm from '@/components/ContactForm';
import { FaFacebook, FaWhatsapp } from 'react-icons/fa';
// import { BsInstagram, BsLinkedin, BsTwitterX } from 'react-icons/bs';
import { Metadata } from 'next';
// import { Linkedin } from 'lucide-react';
export const metadata: Metadata = {
    title: "Contact Us",
    description: 'Rural community development platform',
  }
export default function ContactPage() {
  return (
    <div className="bg-gradient-to-r from-blue-100 to-green-100 min-h-screen py-12">
      <div className="container mx-auto px-4">
        {/* Page Header */}
        <header className="text-center mb-12">
          <h1 className="text-5xl font-extrabold text-gray-900">Contact Us</h1>
          <p className="mt-4 text-lg text-gray-700">
            We&apos;d love to hear from you! Please reach out for inquiries or to share your feedback.
          </p>
        </header>

        {/* Main Content: Form and Social Media */}
        <div className="flex flex-col md:flex-row md:space-x-8">
          {/* Contact Form */}
          <div className="md:w-1/2 bg-white shadow-lg rounded-lg p-8">
            <h2 className="text-3xl font-semibold text-gray-800 mb-6">Send Us a Message</h2>
            <ContactForm />
          </div>

          {/* Social Media and Additional Info */}
          <div className="md:w-1/2 mt-8 md:mt-0">
            <div className="bg-white shadow-lg rounded-lg p-8">
              <h2 className="text-3xl font-semibold text-gray-800 mb-6">Connect With Us</h2>
              <p className="text-gray-600 mb-8">
                Follow us on social media to stay updated with our latest initiatives and community projects.
              </p>
              <div className="flex space-x-6 mb-8">
                {/* Social Media Icons */}
                <Link href=" https://www.facebook.com/share/16EToBghKg/" target="_blank" rel="noopener noreferrer">
                  <FaFacebook color="blue"/>
                </Link>
                <Link href="https://wa.me/+9779868911831" target="_blank" rel="noopener noreferrer">
                  <FaWhatsapp color="green"/>
                </Link>
                {/* <Link href="https://twitter.com/rdsnapal" target="_blank" rel="noopener noreferrer">
                 <BsTwitterX/>
                </Link>
                <Link href="https://instagram.com/rdsnapal" target="_blank" rel="noopener noreferrer">
                <BsInstagram color='purple'/>
                </Link>
                <Link href="https://linkedin.com/company/rdsnapal" target="_blank" rel="noopener noreferrer">
                 <BsLinkedin color='blue'/>
                </Link> */}
              </div>

              {/* Additional Contact Information */}
              <div className="border-t border-gray-200 pt-8">
                <h3 className="text-2xl font-semibold text-gray-800 mb-4">Other Ways to Reach Us</h3>
                <p className="text-gray-600 mb-2">
                  <strong>Email: </strong>
                  <a href="mailto:info@rdsnapal.org" className="text-blue-600 hover:underline">
                    info@rdsnapal.org
                  </a>
                </p>
                <p className="text-gray-600 mb-2">
                  <strong>Phone: </strong>+977-1-1234567
                </p>
                <p className="text-gray-600">
                  <strong>Address: </strong>Kathmandu, Nepal
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
