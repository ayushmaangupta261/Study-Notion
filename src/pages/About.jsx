import React from "react";

const AboutUs = () => {
  return (
    <div className="bg-gray-900 text-white min-h-screen">
      {/* Hero Section */}
      <section className="text-center py-20 bg-blue-600">
        <h1 className="text-5xl font-bold">About Us</h1>
        <p className="text-lg mt-4">We are committed to excellence and innovation.</p>
      </section>
      
      {/* Mission Section */}
      <section className="max-w-4xl mx-auto text-center py-16 px-6">
        <h2 className="text-3xl font-semibold">Our Mission</h2>
        <p className="mt-4 text-gray-300">
          Our mission is to provide cutting-edge solutions that empower individuals and businesses. We strive to create an impact with innovation and integrity.
        </p>
      </section>
      
      {/* Team Section */}
      <section className="py-16 bg-gray-800">
        <h2 className="text-center text-3xl font-semibold">Meet Our Team</h2>
        <div className="flex flex-wrap justify-center gap-8 mt-8">
          <div className="bg-gray-700 p-6 rounded-lg w-64 text-center shadow-lg">
            <img
              src="https://via.placeholder.com/100"
              alt="Team Member"
              className="mx-auto rounded-full"
            />
            <h3 className="text-xl font-semibold mt-4">John Doe</h3>
            <p className="text-gray-400">CEO & Founder</p>
          </div>
          <div className="bg-gray-700 p-6 rounded-lg w-64 text-center shadow-lg">
            <img
              src="https://via.placeholder.com/100"
              alt="Team Member"
              className="mx-auto rounded-full"
            />
            <h3 className="text-xl font-semibold mt-4">Jane Smith</h3>
            <p className="text-gray-400">CTO</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;