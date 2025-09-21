"use client";
import { useEffect, useState } from "react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";

export default function Loginpage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [keepLoggedIn, setKeepLoggedIn] = useState(false);
  const [showPassword, setshowPassword] = useState(false);
  const [isSignup, setisSignup] = useState(false);

  const [name, setName] = useState("");
  const [dob, setDob] = useState("");

  return (
    <div
      className="w-screen h-screen bg-cover  flex  bg-center"
      style={{ backgroundImage: "url('/bg-login.png')" }}
    >
      <div className=" w-full max-w-md flex flex-col justify-center m-4 px-16">
        <h1 className="text-2xl font-bold text-black mb-4">
          {isSignup ? "Sign Up" : "Sign In"}
        </h1>
        <p className="text-gray-600 mb-4">
          {isSignup
            ? "Sign up to enjoy the features of Revolutie"
            : "Please login to continue to your account"}
        </p>
        {!isSignup && (
          <form className="space-y-4">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border text-gray-500 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />

            <div className="relative w-full">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border text-gray-500 px-4 py-2 rounded-md pr-10 focus:outline-none focus:ring-2 focus:ring-blue-600"
                required
              />

              <button
                type="button"
                onClick={() => setshowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
              >
                {showPassword ? (
                  <EyeSlashIcon className="w-5 h-5" />
                ) : (
                  <EyeIcon className="w-5 h-5" />
                )}
              </button>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-800"
            >
              Sign in
            </button>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="keepLoggedIn"
                className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                onChange={(e) => setKeepLoggedIn(e.target.checked)}
              />
              <label htmlFor="keepLoggedIn" className="ml-2 text-gray-600">
                Keep me logged in
              </label>
            </div>
            <div className="flex items-center my-4">
              <hr className="flex-grow border-gray-300" />
              <span className="mx-2 text-gray-500">or</span>
              <hr className="flex-grow border-gray-300" />
            </div>

            <button
              type="button"
              className="w-full flex items-center justify-center gap-2 border text-black text-bold border-gray-300 py-2 rounded-md hover:bg-gray-100"
            >
              <img src="/google.svg" alt="Google" className="w-5 h-5" />
              Sign in with Google
            </button>

            
          </form>
        )}
        {isSignup && (
          <form className="space-y-4">
            <input
              type="text"
              placeholder="Full Name"
              className="w-full border text-gray-500 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />

            <input
              type="date"
              placeholder="Date of Birth"
              className="w-full border text-gray-500 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <input
              type="email"
              placeholder="Email"
              className="w-full border text-gray-500 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <div className="relative w-full">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="w-full border text-gray-500 px-4 py-2 rounded-md pr-10 focus:outline-none focus:ring-2 focus:ring-blue-600"
                required
              />
              <button
                type="button"
                onClick={() => setshowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
              >
                {showPassword ? (
                  <EyeSlashIcon className="w-5 h-5" />
                ) : (
                  <EyeIcon className="w-5 h-5" />
                )}
              </button>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-800"
            >
              Sign Up
            </button>

            <div className="flex items-center my-4">
              <hr className="flex-grow border-gray-300" />
              <span className="mx-2 text-gray-500">or</span>
              <hr className="flex-grow border-gray-300" />
            </div>

            <button
              type="button"
              className="w-full flex items-center justify-center gap-2 border text-black border-gray-300 py-2 rounded-md hover:bg-gray-100"
            >
              <img src="/google.svg" alt="Google" className="w-5 h-5" />
              Sign up with Google
            </button>
          </form>

          
        )}
        <div className="flex justify-center mt-4">
              {isSignup ? (
                <>
                  <p className="text-black">Already have an account?</p>
                  <p
                    className="text-blue-600 font-semibold ml-1 cursor-pointer"
                    onClick={() => setisSignup(false)}
                  >
                    Sign In
                  </p>
                </>
              ) : (
                <>
                  <p className="text-black">Need an account?</p>
                  <p
                    className="text-blue-600 font-semibold ml-1 cursor-pointer"
                    onClick={() => setisSignup(true)}
                  >
                    Create one
                  </p>
                </>
              )}
            </div>
      </div>
    </div>
  );
}
