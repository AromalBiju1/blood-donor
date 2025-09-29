"use client"
import React from 'react'
import axios from 'axios';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
const SignupPage = () => {
    const [formData,setFormData] = useState({
    phone: '',
    year: '',
    blood_group: '',
    semester: '',
    gender: '',
    division: '',
    allergies: '',
    address: ''
    });
    const [loading,setLoading] = useState(false);
    const router = useRouter();

    const handleChange = async (e) => {
       setFormData({...formData,[e.target.name]:e.target.value})
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true)
        try {
         const response = await axios.post("/api/profile",formData);
        //  console.log(response.data.message);
         toast.success(response.data.message);
         router.push("/dashboard")
        }
        catch(error) {
         toast.error(error.response?.data?.error);
        }
        finally {
            setLoading(false)
        }
    }

  return (
    <div className='flex flex-col min-h-screen bg-gray-50'>
       <header className="p-5">
    <img src="/logo.png" className="w-27 h-12" alt="Logo"/>
  </header>

  <main className="max-w-4xl mx-auto bg-white rounded-xl shadow-md p-6">
    <img src="/top.png" className="w-full h-36 object-cover rounded-xl mb-6" alt=""/>
    <h1 className="text-xl font-semibold mb-6">Please enter your details to create an account.</h1>

    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <label className="block text-gray-700 mb-1">Name</label>
        <input name='name' type="text" placeholder="Your First Name" className="w-full p-3 border-none rounded-lg bg-gray-50"/>
      </div>
      <div>
        <label className="block text-gray-700 mb-1">Ph no:</label>
        <input name='phone'  value={formData.phone} onChange={handleChange}  type="text" placeholder="Phone number" className="w-full p-3 border-none rounded-lg bg-gray-50"/>
      </div>

      <div>
        <label className="block text-gray-700 mb-1">Year</label>
        <input name='year' value={formData.year} onChange={handleChange} type="text" placeholder="Year" className="w-full p-3 border-none rounded-lg bg-gray-50"/>
      </div>
      <div>
        <label className="block text-gray-700 mb-1">Blood grp</label>
        <input name='blood_group' value={formData.blood_group} onChange={handleChange} type="text" placeholder="Blood group" className="w-full p-3 border-none rounded-lg bg-gray-50"/>
      </div>

      <div>
        <label className="block text-gray-700 mb-1">Semester</label>
        <input name='semester' value={formData.semester} onChange={handleChange} type="text" placeholder="Semester" className="w-full p-3 border-none rounded-lg bg-gray-50"/>
      </div>
      <div>
        <label className="block text-gray-700 mb-1">Gender</label>
        <input name='gender' value={formData.gender} onChange={handleChange} type="text" placeholder="Gender" className="w-full p-3 border-none rounded-lg bg-gray-50"/>
      </div>

      <div>
        <label className="block text-gray-700 mb-1">Division</label>
        <input name='division' value={formData.division} onChange={handleChange} type="text" placeholder="Division" className="w-full p-3 border-none rounded-lg bg-gray-50"/>
      </div>
      <div>
        <label className="block text-gray-700 mb-1">Allergies if any</label>
        <input name='allergies' value={formData.allergies} onChange={handleChange} type="text" placeholder="Allergies" className="w-full p-3 border-none rounded-lg bg-gray-50"/>
      </div>

      <div className="md:col-span-2">
        <label className="block text-gray-700 mb-1">Address</label>
        <textarea name='address' value={formData.address} onChange={handleChange} placeholder="Address" className="w-full p-3 border-none rounded-lg bg-gray-50"></textarea>
      </div>

      <div className="md:col-span-2 flex justify-end">
        <button disabled={loading} type="submit" className={`bg-red-700 text-white px-6 py-2 rounded-lg hover:bg-red-800${loading ? 'cursor-not-allowed opacity-50':''}`}>
          Done
        </button>
      </div>
    </form>
  </main>
    </div>
  )
}

export default SignupPage
