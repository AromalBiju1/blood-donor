'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function RequestForm() {
  const router = useRouter();
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [patientName, setPatientName] = useState('');
const [bloodGroup, setBloodGroup] = useState('');
const [age, setAge] = useState('');
const [unitsRequired, setUnitsRequired] = useState('');
const [gender, setGender] = useState('');
const [hospitalName, setHospitalName] = useState('');
const [hospitalAddress, setHospitalAddress] = useState('');


  const handleSubmit = async (e) => {
  e.preventDefault();

  const formData = {
    patientName,
    bloodGroup,
    age: Number(age),
    unitsRequired: Number(unitsRequired),
    gender,
    hospitalName,
    hospitalAddress,
  };

  try {
    const res = await fetch('/api/request', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    const data = await res.json();

    if (data.success) {
      toast.success('Request submitted successfully!', {
        position: 'top-right',
        className: 'bg-green-600 text-white font-semibold',
        progressClassName: 'bg-green-400',
      });
      setSubmitted(true);
    } else {
      throw new Error(data.error || 'Failed to submit request');
    }
  } catch (error) {
    toast.error('Submission failed. Try again.', {
      position: 'top-right',
      className: 'bg-red-600 text-white font-semibold',
      progressClassName: 'bg-red-400',
    });
  }
};


  const handleGoHome = () => {
    router.push('/dashboard');
  };

  return (
    <div className="bg-gray-50 text-gray-800 h-screen flex">
      <ToastContainer/>
      <aside className="w-64 bg-white shadow-md flex flex-col">
        <div className="flex items-center justify-center p-6 border-b">
          <img
            src="/logo.png"
            alt="logo"
            className="rounded-full"
          />
        </div>

        <nav className="flex-1 p-4">
          <h2 className="text-sm font-semibold text-gray-500 mb-2">OVERVIEW</h2>
          <ul className="space-y-3">
            <li>
              <a
                href="#"
                onClick={() => router.push('/dashboard')}
                className="flex items-center space-x-2 hover:text-blue-600 font-medium"
              >
                <span>📄</span> <span>Profile</span>
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center space-x-2 text-blue-600">
                <span>📝</span> <span>Request</span>
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center space-x-2 hover:text-blue-600">
                <span>🏆</span> <span>Leaderboard</span>
              </a>
            </li>
          </ul>

          {/* Requests */}
          <div className="mt-6">
            <h2 className="text-sm font-semibold text-gray-500 mb-2">REQUESTS</h2>
            <ul className="space-y-2">
              <li className="flex items-center space-x-2"><span>Prashant</span></li>
              <li className="flex items-center space-x-2"><span>Prashant</span></li>
              <li className="flex items-center space-x-2"><span>Prashant</span></li>
            </ul>
          </div>
          <div className="mt-6">
            <h2 className="text-sm font-semibold text-gray-500 mb-2">YOUR REQUESTS</h2>
            <ul>
              <li className="flex items-center space-x-2"><span>Prashant</span></li>
            </ul>
          </div>
        </nav>

        <div className="p-4 border-t">
          <a href="#" className="flex items-center space-x-2 text-red-500 hover:underline">
            <span>🚪</span>
            <span>Logout</span>
          </a>
        </div>
      </aside>

  
      <main className="flex-1 m-6 bg-white rounded-md shadow-lg overflow-hidden">
    
        <div className="w-full h-32">
          <img src="/top.png" alt="Red Banner" className="object-cover w-full h-full" />
        </div>

        <div className="p-10">
          {submitted ? (
            // ✅ Success Message
            <div className="flex flex-col items-center justify-center h-full">
              <h1 className="text-2xl font-bold text-green-700 mb-4 text-center">
                You have successfully completed your request! ✅
              </h1>
              <p className="text-gray-600 text-center max-w-xl mb-8">
                Your blood request has been submitted to nearby donors and the hospital blood bank.
                We’ll notify you as soon as matching donors are found.
              </p>
              <button
                onClick={handleGoHome}
                className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700 transition"
              >
                Home
              </button>
            </div>
          ) : (
            // 🩸 Blood Request Form
            <form className="grid grid-cols-1 md:grid-cols-2 gap-6" onSubmit={handleSubmit}>
              <div>
                <label className="block mb-1 text-gray-700 font-medium">Full name of patient</label>
                <input
                  type="text"
                  placeholder="Patient Name"
                  required
                  value={patientName}
                   onChange={(e) => setPatientName(e.target.value)}
                  className="w-full p-3 text-gray-500 border-none rounded-lg bg-gray-50"
                />
              </div>

              <div>
                <label className="block mb-1 text-gray-700 font-medium">Blood group</label>
                <input
                  type="text"
                  placeholder="Blood group"
                  required
                  value={bloodGroup}
                   onChange={(e) => setBloodGroup(e.target.value)}
                  className="w-full p-3 text-gray-500 border-none rounded-lg bg-gray-50"
                />
              </div>

              <div>
                <label className="block mb-1 text-gray-700 font-medium">Age</label>
                <input
                  type="number"
                  placeholder="Age"
                  required
                  value={age}
                   onChange={(e) => setAge(e.target.value)}
                  className="w-full p-3 text-gray-500 border-none rounded-lg bg-gray-50"
                />
              </div>

              <div>
                <label className="block mb-1 text-gray-700 font-medium">Units required</label>
                <input
                  type="number"
                  placeholder="Units"
                  required
                  value={unitsRequired}
                   onChange={(e) => setUnitsRequired(e.target.value)}
                  className="w-full p-3 text-gray-500 border-none rounded-lg bg-gray-50"
                />
              </div>

              <div>
                <label className="block mb-1 text-gray-700 font-medium">Gender</label>
                <input
                  type="text"
                  placeholder="Gender"
                  required
                  value={gender}
                   onChange={(e) => setGender(e.target.value)}
                  className="w-full p-3 text-gray-500 border-none rounded-lg bg-gray-50"
                />
              </div>

              <div>
                <label className="block mb-1 text-gray-700 font-medium">Hospital/Clinic name</label>
                <input
                  type="text"
                  placeholder="Hospital or clinic"
                  required
                  value={hospitalName}
                   onChange={(e) => setHospitalName(e.target.value)}
                  className="w-full p-3 text-gray-500 border-none rounded-lg bg-gray-50"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block mb-1 text-gray-700 font-medium">Hospital address</label>
                <input
                  type="text"
                  placeholder="Address"
                  required
                  value={hospitalAddress}
                   onChange={(e) => setHospitalAddress(e.target.value)}
                  className="w-full p-3 text-gray-500 border-none rounded-lg bg-gray-50"
                />
              </div>

              <div className="md:col-span-2 flex justify-end mt-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700 transition disabled:opacity-50"
                >
                  {loading ? 'Submitting...' : 'Done'}
                </button>
              </div>
            </form>
          )}
        </div>
      </main>
    </div>
  );
}
