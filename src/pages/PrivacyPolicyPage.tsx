import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const PrivacyPolicyPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main className="section-padding bg-background">
        <div className="container-custom">
          {/* Header */}
          <div className="max-w-3xl mx-auto text-center my-12">
            <h1 className="heading-md mb-6">
              Privacy <span className="text-gradient">Policy</span>
            </h1>
            <p className="text-gray-600 text-lg">
              East Ocyon Bio Private Limited is committed to protecting your privacy and ensuring 
              compliance with Indian data protection laws and regulations.
            </p>
          </div>

          {/* Privacy Policy Content */}
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-xl shadow-lg p-8 md:p-12">
            {/* Introduction */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Introduction</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                East Ocyon Bio Private Limited ("East Ocyon Bio", "we", "us", or "our"), a company incorporated under the laws of India, having its registered office at Fifth floor, Unit 504A, The Arcadia South City-2, Gurugram, Haryana 122018, India, is committed to protecting your privacy.
              </p>
              <p className="text-gray-700 leading-relaxed">
                This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website{' '}
                <a href="https://eastocyonbio.com/" className="text-blue-600 hover:text-blue-800 underline">
                  https://eastocyonbio.com/
                </a>{' '}
                (the "Website"). Please read this Privacy Policy carefully. By accessing or using our Website, you acknowledge that you have read, understood, and agree to be bound by the terms of this Privacy Policy.
              </p>
            </section>

            {/* Information We Collect */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Information We Collect</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                East Ocyon Bio's Website is primarily an informational site that provides details about our services, team, and achievements. We collect minimal personal information:
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">Information You Provide to Us</h3>
              <p className="text-gray-700 leading-relaxed mb-3">
                We collect personal information that you voluntarily provide to us when you:
              </p>
              <ul className="list-disc list-inside text-gray-700 mb-4 space-y-1">
                <li>Fill out our contact form</li>
                <li>Communicate with us via email</li>
              </ul>
              <p className="text-gray-700 leading-relaxed mb-3">
                The information we may collect includes:
              </p>
              <ul className="list-disc list-inside text-gray-700 mb-4 space-y-1">
                <li>Name</li>
                <li>Email address</li>
                <li>Phone number</li>
                <li>Any other information you choose to provide in your message</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">Automatic Data Collection</h3>
              <p className="text-gray-700 leading-relaxed">
                Our Website does not use cookies or tracking technologies to collect information about your browsing activities. We do not track your behavior on our Website.
              </p>
            </section>

            {/* How We Use Your Information */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">How We Use Your Information</h2>
              <p className="text-gray-700 leading-relaxed mb-3">
                We use the personal information collected through our contact form solely for the following purposes:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-1">
                <li>To respond to your inquiries</li>
                <li>To communicate with you regarding our services</li>
                <li>To provide you with information that you have requested</li>
                <li>To improve our Website and services</li>
              </ul>
            </section>

            {/* Disclosure of Your Information */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Disclosure of Your Information</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                We do not sell, trade, rent, or otherwise transfer your personal information to third parties without your consent, except as described below:
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">Legal Requirements</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                We may disclose your information where required to do so by law or in response to valid requests by public authorities (e.g., a court or a government agency).
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">Business Transfers</h3>
              <p className="text-gray-700 leading-relaxed">
                If we are involved in a merger, acquisition, or sale of all or a portion of our assets, your information may be transferred as part of that transaction.
              </p>
            </section>

            {/* Data Security */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Data Security</h2>
              <p className="text-gray-700 leading-relaxed">
                We implement appropriate technical and organizational measures to protect the security of your personal information. However, please be aware that no method of transmission over the Internet or method of electronic storage is 100% secure.
              </p>
            </section>

            {/* Data Storage */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Data Storage</h2>
              <p className="text-gray-700 leading-relaxed">
                All information collected through our Website is stored on servers located in India.
              </p>
            </section>

            {/* Your Rights Under Indian Law */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Your Rights Under Indian Law</h2>
              <p className="text-gray-700 leading-relaxed mb-3">
                In accordance with the Information Technology Act, 2000, and the Information Technology (Reasonable Security Practices and Procedures and Sensitive Personal Data or Information) Rules, 2011, you have the right to:
              </p>
              <ul className="list-disc list-inside text-gray-700 mb-4 space-y-1">
                <li>Access personal information we hold about you</li>
                <li>Correct inaccuracies in your personal information</li>
                <li>Withdraw consent for the collection and use of your personal information</li>
                <li>Request deletion of your personal information</li>
              </ul>
              <p className="text-gray-700 leading-relaxed">
                To exercise these rights, please contact us using the information provided in the "Contact Us" section below.
              </p>
            </section>

            {/* Changes to This Privacy Policy */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Changes to This Privacy Policy</h2>
              <p className="text-gray-700 leading-relaxed">
                We may update our Privacy Policy from time to time. Any changes will be posted on this page with a revised effective date. We encourage you to review this Privacy Policy periodically to stay informed about how we are protecting your information.
              </p>
            </section>

            {/* Contact Us */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact Us</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                If you have any questions or concerns about this Privacy Policy or our data practices, please contact us at:
              </p>
              <div className="bg-gray-50 p-6 rounded-lg">
                <p className="text-gray-700 font-semibold mb-2">East Ocyon Bio Private Limited</p>
                <p className="text-gray-700 mb-1">Fifth floor, Unit 504A, The Arcadia South City-2</p>
                <p className="text-gray-700 mb-1">Gurugram, Haryana 122018</p>
                <p className="text-gray-700 mb-3">India</p>
                <p className="text-gray-700">
                  Email:{' '}
                  <a href="mailto:dinesh.kundu@eastocyonbio.com" className="text-blue-600 hover:text-blue-800 underline">
                    dinesh.kundu@eastocyonbio.com
                  </a>
                </p>
              </div>
            </section>

            {/* Grievance Officer */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Grievance Officer</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                In accordance with the Information Technology Act, 2000, and the Rules made thereunder, the contact details of the Grievance Officer are provided below:
              </p>
              <div className="bg-yellow-50 border border-yellow-200 p-6 rounded-lg">
                <p className="text-gray-700 mb-2">
                  <span className="font-semibold">Name:</span> <span className="text-yellow-700">[To be updated]</span>
                </p>
                <p className="text-gray-700 mb-2">
                  <span className="font-semibold">Email:</span> <span className="text-yellow-700">[To be updated]</span>
                </p>
                <p className="text-gray-700 font-semibold mb-2">Address:</p>
                <p className="text-gray-700 mb-1">East Ocyon Bio Private Limited</p>
                <p className="text-gray-700 mb-1">Fifth floor, Unit 504A, The Arcadia South City-2</p>
                <p className="text-gray-700 mb-1">Gurugram, Haryana 122018</p>
                <p className="text-gray-700">India</p>
              </div>
            </section>

            {/* Compliance with Indian Laws */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Compliance with Indian Laws</h2>
              <p className="text-gray-700 leading-relaxed mb-3">
                This Privacy Policy is designed to comply with applicable Indian laws and regulations, including but not limited to:
              </p>
              <ul className="list-disc list-inside text-gray-700 mb-4 space-y-1">
                <li>The Information Technology Act, 2000</li>
                <li>The Information Technology (Reasonable Security Practices and Procedures and Sensitive Personal Data or Information) Rules, 2011</li>
                <li>The Personal Data Protection Bill (when enacted)</li>
              </ul>
              <p className="text-gray-700 leading-relaxed">
                By using our Website, you consent to the collection and use of information in accordance with this Privacy Policy and applicable Indian laws.
              </p>
            </section>

            {/* Last Updated */}
            <div className="border-t border-gray-200 pt-6 mt-8">
              <p className="text-sm text-gray-500 text-center">
                This Privacy Policy was last updated on {new Date().toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </p>
            </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PrivacyPolicyPage; 