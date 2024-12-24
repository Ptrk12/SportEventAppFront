import React from 'react';

const About = () => {
  return (
    <div className="min-h-screen text-dark-text-color bg-gray-100">
      {/* Sekcja Hero */}
      <div className="relative h-[400px] bg-gradient-to-r from-orange-500 to-gray-500 flex items-center justify-center">
        <div className="bg-opacity-60 bg-black p-6 rounded-lg text-center">
          <h1 className="text-5xl font-bold text-white">Welcome in Sport Event App</h1>
          <p className="mt-4 text-lg text-gray-200">We connect athletes and sports enthusiasts with events around the world.</p>
        </div>
      </div>
      <div className="container mx-auto p-8 bg-white text-dark-text-color shadow-lg mt-8 rounded-lg">
        <h2 className="text-3xl font-bold text-center text-orange-500 mb-6">Our mission</h2>
        <p className="text-lg leading-relaxed text-center max-w-4xl mx-auto text-gray-700">
        Sport Event App aims to connect athletes and sports enthusiasts by offering a platform where anyone can find and participate in sports events. Our goal is to build a community where people can share their passion for sports, stay active and compete with others.
        </p>
      </div>
      <div className="container mx-auto p-8 mt-12">
        <h2 className="text-3xl font-bold text-center mb-6 text-orange-500">What we offer</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center bg-gray-100 p-6 rounded-lg shadow-lg hover:bg-gray-200 duration-300">
            <h3 className="text-2xl font-semibold mb-2 text-gray-800">Easy register</h3>
            <p className="text-gray-600">Register and attend events effortlessly with a user-friendly interface.</p>
          </div>
          <div className="text-center bg-gray-100 p-6 rounded-lg shadow-lg hover:bg-gray-200 duration-300">
            <h3 className="text-2xl font-semibold mb-2 text-gray-800">A variety of events</h3>
            <p className="text-gray-600">Choose from a wide range of sporting events.</p>
          </div>
          <div className="text-center bg-gray-100 p-6 rounded-lg shadow-lg hover:bg-gray-200 duration-300">
            <h3 className="text-2xl font-semibold mb-2 text-gray-800">People!</h3>
            <p className="text-gray-600">Our community</p>
          </div>
        </div>
      </div>

      <div className="container mx-auto p-8 mt-12 bg-gray-50 text-dark-text-color shadow-lg rounded-lg">
        <h2 className="text-3xl font-bold text-center text-orange-500 mb-6">What people are saying</h2>
        <div className="space-y-6">
          <div className="bg-gray-100 p-6 rounded-lg shadow-md">
            <p className="text-lg italic text-gray-600">"The Sport Event app made it easy for me to find and participate in local sporting events. I love the community and convenience!”</p>
            <p className="text-right mt-4 text-sm text-gray-500">- Jan Kowalski</p>
          </div>
          <div className="bg-gray-100 p-6 rounded-lg shadow-md">
            <p className="text-lg italic text-gray-600">“I was able to participate in many marathons and keep track of my results thanks to the app. It has changed my approach to sports!”</p>
            <p className="text-right mt-4 text-sm text-gray-500">- Anna Nowak</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
