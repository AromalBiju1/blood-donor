"use client"
import React from "react";

const Dashboard = () => {
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
          <div className="ml-3">
            <h1 className="text-red-600 font-bold">BLOODLINE</h1>
            <p className="text-xs text-gray-500">Give. Connect. Live</p>
          </div>
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
                href="#"
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
          <h2 className="text-2xl font-semibold">Welcome, User</h2>
          <p className="text-sm text-gray-500">date</p>
        </div>

        {/* Profile Banner */}
        <div className="relative bg-red-500 h-32 rounded-lg overflow-hidden">
          
        </div>

        {/* Profile Card */}
        <div className="bg-white shadow-md rounded-lg p-6 -mt-12 relative z-10">
          <div className="flex items-center space-x-4">
            <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center text-3xl">
              👤
            </div>
            <div>
              <h3 className="text-lg font-semibold">User Name</h3>
              <p className="text-gray-500 text-sm">example@gmail.com</p>
            </div>
          </div>

          {/* Profile Info */}
          <div className="grid grid-cols-2 gap-y-4 gap-x-8 mt-6 text-sm">
            <p>
              <span className="font-semibold">Full Name:</span>
            </p>
            <p>
              <span className="font-semibold">Year:</span>
            </p>
            <p>
              <span className="font-semibold">Semester:</span>
            </p>
            <p>
              <span className="font-semibold">Division:</span>
            </p>
            <p>
              <span className="font-semibold">Address:</span>
            </p>
            <p>
              <span className="font-semibold">Ph no:</span>
            </p>
            <p>
              <span className="font-semibold">Gender:</span>
            </p>
            <p>
              <span className="font-semibold">Blood grp:</span>
            </p>
            <p>
              <span className="font-semibold">Allergies if any:</span>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;