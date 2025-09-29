"use client"
import React from 'react'
import { useSession } from 'next-auth/react'
const Dashboard = () => {
    const {data:session,status} = useSession();

    if(status === "loading") return <p>Loading...</p>
    if(!session) return <p>You are not logged in</p>
  return (
    <div>
      <h1>Welcome,{session.user?.name}</h1>
    </div>
  )
}

export default Dashboard
