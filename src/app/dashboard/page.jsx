"use client"
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import axios from "axios";
import { useRouter } from "next/navigation";
const Dashboard = () => {
  const router = useRouter();
  const {data:session,status} = useSession();
  const [profile,setProfile] = useState(null);
  const [loading,setLoading] = useState(true);
  
  useEffect(() => {
  async function fetchProfile() {
    try {
      if (status === "authenticated") {
        const res = await axios.get(`/api/profile/${session.user?.id}`);

        if (res.status === 404) {
          setProfile(null); 
        } else {
          setProfile(res.data);
        }
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
    } finally {
      setLoading(false);
    }
  }

  fetchProfile();
}, [status, session]);
   if(loading) return <p className="text-center mt-10">Loading...</p>
  if(!session) return  <p className="text-center mt-10">Please log in to view your dashboard.</p>;

   const handleClick = () => {
    router.push('/request'); 
  };



  
  return (
    <div className="bg-gray-50 text-gray-800 h-screen flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md flex flex-col">
        <div className="flex items-center justify-center p-6 border-b">
          <img
            src="/logo.png"
            alt="logo"
            className="rounded-full"
          />
        </div>

        {/* Overview */}
        <nav className="flex-1 p-4">
          <h2 className="text-sm font-semibold text-gray-500 mb-2">OVERVIEW</h2>
          <ul className="space-y-3">
            <li>
              <a
                href="#"
                className="flex items-center space-x-2 text-blue-600 font-medium"
              >
                <span>📄</span> <span>Profile</span>
              </a>
            </li>
            <li>
              <a
                href="#" onClick={handleClick}
                className="flex items-center space-x-2 text-gray-700 hover:text-blue-600" 
              >
                <span>📝</span> <span>Request</span>
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center space-x-2 text-gray-700 hover:text-blue-600"
              >
                <span>🏆</span> <span>Leaderboard</span>
              </a>
            </li>
          </ul>

          {/* Requests */}
          <div className="mt-6">
            <h2 className="text-sm font-semibold text-gray-500 mb-2">
              REQUESTS
            </h2>
            <ul className="space-y-2">
              <li className="flex items-center space-x-2">
                
                <span>Prashant</span>
              </li>
              <li className="flex items-center space-x-2">
                
                <span>Prashant</span>
              </li>
              <li className="flex items-center space-x-2">
                
                <span>Prashant</span>
              </li>
            </ul>
          </div>

          {/* Your Requests */}
          <div className="mt-6">
            <h2 className="text-sm font-semibold text-gray-500 mb-2">
              YOUR REQUESTS
            </h2>
            <ul>
              <li className="flex items-center space-x-2">
                
                <span>Prashant</span>
              </li>
            </ul>
          </div>
        </nav>

        {/* Logout */}
        <div className="p-4 border-t">
          <a
            href="#"
            className="flex items-center space-x-2 text-red-500 hover:underline"
          >
            <span>🚪</span>
            <span>Logout</span>
          </a>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold">Welcome, {session.user?.name}</h2>
          <p className="text-sm text-gray-500">date</p>
        </div>

        {/* Profile Banner */}
         <img src="/top.png" className="w-full h-36 object-cover rounded-xl mb-6" alt=""/>

        {/* Profile Card */}
        <div className="bg-white shadow-md rounded-lg p-6 -mt-12 relative z-10">
          <div className="flex items-center space-x-4">
            <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center text-3xl">
              👤
            </div>
            <div>
              <h3 className="text-lg font-semibold">{profile?.name}</h3>
              <p className="text-gray-500 text-sm">{session.user?.email}</p>
            </div>
          </div>

          {/* Profile Info */}
          <div className="grid grid-cols-2 gap-y-4 gap-x-8 mt-6 text-sm">
            <div>
              <label className="block text-gray-700 mb-1">Name</label>
              <input name='name' defaultValue={profile?.name || ""} type="text" placeholder="Your First Name" className="w-full p-3 border-none rounded-lg bg-gray-50"/>
            </div>
           <div>
              <label className="block text-gray-700 mb-1">Phone</label>
              <input defaultValue={profile?.phone || ""} name='phone' type="text" placeholder="Phone Number" className="w-full p-3 border-none rounded-lg bg-gray-50"/>
            </div>
           <div>
              <label className="block text-gray-700 mb-1">Year</label>
              <input defaultValue={profile?.year||""} name='year' type="text" placeholder="year" className="w-full p-3 border-none rounded-lg bg-gray-50"/>
            </div>
            <div>
              <label className="block text-gray-700 mb-1">Blood Group</label>
              <input defaultValue={profile?.blood_group||""}  name='blood-_group' type="text" placeholder="Blood group" className="w-full p-3 border-none rounded-lg bg-gray-50"/>
            </div>
           <div>
              <label className="block text-gray-700 mb-1">Semester</label>
              <input defaultValue={profile?.semester||""}  name='semester' type="text" placeholder="Semester" className="w-full p-3 border-none rounded-lg bg-gray-50"/>
            </div>
            <div>
              <label className="block text-gray-700 mb-1">Gender</label>
              <input defaultValue={profile?.gender||""}  name='gender' type="text" placeholder="Gender" className="w-full p-3 border-none rounded-lg bg-gray-50"/>
            </div>
             <div>
              <label className="block text-gray-700 mb-1">Division</label>
              <input defaultValue={profile?.division||""}  name='division' type="text" placeholder="Division" className="w-full p-3 border-none rounded-lg bg-gray-50"/>
            </div>
            <div>
              <label className="block text-gray-700 mb-1">Allergies if any</label>
              <input defaultValue={profile?.allergies||""}  name='allergies' type="text" placeholder="Allergies" className="w-full p-3 border-none rounded-lg bg-gray-50"/>
            </div>
             <div className="md:col-span-2">
              <label className="block text-gray-700 mb-1">Address</label>
              <textarea defaultValue={profile?.address||""}  name='address' placeholder="Address" className="w-full p-3 border-none rounded-lg bg-gray-50"></textarea>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;