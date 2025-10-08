"use client";
import { useRouter } from 'next/navigation';
import React,{ useState } from 'react';

export default function BloodDonationSite() {
const router = useRouter();
const [isLoading, setIsLoading] = useState(false);

const handleGoHome = async () => {
  await new Promise(resolve => setTimeout(resolve, 1000)); // 800ms delay
      console.log('Navigating to login...');
  router.push('/login');
};



  return (
    <div className="min-h-screen bg-gray-50">
        {/* Full Page Loading Overlay */}
      {isLoading && (
        <div className="fixed inset-0 bg-white z-50 flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-red-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
            <p className="mt-4 text-gray-700 text-lg font-medium">Redirecting to Login...</p>
          </div>
        </div>
      )}
      {/* Navigation Bar */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center">
              <div className="flex items-center space-x-2">
                <div className="flex items-center justify-center p-6 border-b">
          <img src="/logo.png" alt="logo" className="rounded-full h-16" />
        </div>
               
              </div>
            </div>

            {/* Navigation Links */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#" className="text-gray-700 hover:text-gray-900">Contact us</a>
              <a href="#" className="text-gray-700 hover:text-gray-900">Help</a>
              <button onClick={handleGoHome} className="bg-red-600 text-white px-6 py-2 rounded-full hover:bg-red-700 transition">
                Register  
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="grid md:grid-cols-2 gap-8 p-8 md:p-12">
            {/* Left Column - Text Content */}
            <div className="flex flex-col  space-y-6">
              <h1 className="text-4xl items-right md:text-5xl font-bold text-red-700 leading-tight">
                Save Life Donate <br />Blood
              </h1>
              <p className="text-gray-600 leading-relaxed text-sm">
                <strong>Blood donation is a simple yet powerful act of kindness that can save a life. Every time someone donates blood, they're potentially helping patients in need, whether it's surgeons, accidents, or life threatening medical conditions. A single donation can help saves lives. Blood is only other side that represents an aging or the life-force, promotes good health for the donor. Regular blood donation ensures that hospitals and blood banks are prepared for emergencies. By donating blood, we build a healthier community, where simple costs nothing but means everything.</strong>
              </p>
            </div>

            {/* Right Column - Heart Illustration */}
            <div className="flex items-center justify-center">
              <div className="relative w-full max-w-md aspect-square">
                <img src="../1.png" alt="heart"  />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}