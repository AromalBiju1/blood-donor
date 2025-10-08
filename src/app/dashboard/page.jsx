"use client";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import axios from "axios";
import { useRouter } from "next/navigation";
import RequestForm from "../request/page";
import { toast } from "react-toastify";
import { signOut } from "next-auth/react";

const Dashboard = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [reqToDonate, setReqToDonate] = useState([]);
  const [activeSection, setActiveSection] = useState("profile");
  const [selectRequest, setSelectRequest] = useState(null);
 const [leaderboard, setLeaderboard] = useState([]);
  const [leaderboardLoading, setLeaderboardLoading] = useState(false);
  const [leaderboardError, setLeaderboardError] = useState(null);
  const [yourRequests, setYourRequests] = useState([]);
const [availableRequests, setAvailableRequests] = useState([]);


useEffect(() => {
  async function fetchData() {
    try {
      if (status === "authenticated") {
        const res = await axios.get(`/api/profile/${session.user?.id}`);
        const reqRes = await axios.get("/api/request");

        const allRequests = reqRes.data;

        setYourRequests(
          allRequests.filter(req => req.requester_id === session.user?.id)
        );

        setAvailableRequests(
          allRequests.filter(req => req.requester_id !== session.user?.id && !req.accepted)
        );

        setProfile(res.status === 404 ? null : res.data);
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
    } finally {
      setLoading(false);
    }
  }

  fetchData();
}, [status, session]);


useEffect(() => {
    if (activeSection !== "leaderboard") return; // only fetch when active

    const fetchLeaderboard = async () => {
      setLeaderboardLoading(true);
      setLeaderboardError(null);
      try {
        const res = await axios.get("/api/leaderboard");
        setLeaderboard(res.data);
      } catch (error) {
        setLeaderboardError("Failed to load leaderboard");
        toast.error("Failed to load leaderboard: " + error.message);
      } finally {
        setLeaderboardLoading(false);
      }
    };

    fetchLeaderboard();
  }, [activeSection]);

  const handleDonationRes = async (requestId, status) => {
  console.log("Calling handleDonationRes with:", { requestId, status });

  const validStatuses = ["pending", "accepted", "rejected", "donated"];
  if (!validStatuses.includes(status)) {
    console.error("❌ Invalid status sent to handleDonationRes:", status);
    toast.error("Invalid donation status: " + status);
    return;
  }

  try {
    const res = await axios.post("/api/responses", { requestId, status });
    console.log("response from /api/responses:", res.data);
if (res.data.success) {
  setAvailableRequests(prev => prev.filter(req => req.id !== requestId));
  toast.success("Agreed to donate");
  setSelectRequest(null);
toast.success("Agreed to donate");
    } else {
      toast.error("Unable to update: " + (res.data.error || "Unknown error"));
    }
  } catch (error) {
    console.error(
      "error in handleDonationRes:",
      error.response?.data || error.message || error
    );
    
    const errMsg =
      error.response?.data?.error ||
      error.message ||
      JSON.stringify(error);

    toast.error("Unable to update: " + errMsg);
  }
};

const handleLogout = () => {
    signOut({ redirect: false }).then(() => {
      router.push("http://localhost:3000");
    });
  };


  const handleDonationConfirm = async (donorId, confirmed) => {
    try {
      await axios.post("/api/confirm", {
        requestId:session.user?.id,
        donorId,
        confirmed,
      });
      //alert(confirmed ? "Donation confirmed" : "Not confirmed");
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (!session)
    return <p className="text-center mt-10">Please log in to view your dashboard.</p>;

  return (
    <div className="bg-gray-50 text-gray-800 h-screen flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md flex flex-col">
        <div className="flex items-center justify-center p-6 border-b">
          <img src="/logo.png" alt="logo" className="rounded-full" />
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
                <span>📄</span>
                <span onClick={() => { setActiveSection("profile"); setSelectRequest(null); }}>
                  Profile
                </span>
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center space-x-2 text-gray-700 hover:text-blue-600"
              >
                <span>📝</span>
                <span onClick={() => { setActiveSection("request"); setSelectRequest(null); }}>
                  Request
                </span>
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center space-x-2 text-gray-700 hover:text-blue-600"
              >
                <span>🏆</span>
                <span onClick={() => { setActiveSection("leaderboard"); setSelectRequest(null); }}>
                  Leaderboard
                </span>
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center space-x-2 ml-8 text-gray-700 hover:text-blue-600"
              >
                <span onClick={() => { setActiveSection("donate"); setSelectRequest(null); }}>
                  Donation
                </span>
              </a>
            </li>
          </ul>

         {/* Requests to Donate */}
<div className="mt-6">
  <h2 className="text-sm font-semibold text-gray-500 mb-2">REQUESTS</h2>
  <ul>
    {availableRequests.map((req) => (
      <li
        key={req.id}
        onClick={() => {
          setSelectRequest(req);
          setActiveSection("donate");
        }}
        className="cursor-pointer flex justify-between items-center mb-2 p-2 bg-gray-100 rounded hover:bg-gray-200"
      >
        <div>
          <p className="font-bold text-blue-600">{req.patientName}</p>
        </div>
      </li>
    ))}
  </ul>
</div>

{/* Your Requests */}
<div className="mt-6">
  <h2 className="text-sm font-semibold text-gray-500 mb-2">YOUR REQUESTS</h2>
  <ul>
    {yourRequests.map((req) => (
      <li
        key={req.id}
        onClick={() => {
          setSelectRequest(req);
          setActiveSection("confirm");
        }}
        className="cursor-pointer flex justify-between items-center mb-2 p-2 bg-gray-100 rounded hover:bg-gray-200"
      >
        <div>
          <p className="font-bold text-blue-600">{req.patientName}</p>
          <p className="text-xs text-gray-500">
            Status: {req.status || (req.accepted ? "Accepted" : "Pending")}
          </p>
        </div>
      </li>
    ))}
  </ul>
</div>

        </nav>

       <div className="p-4 border-t">
  <button
    onClick={handleLogout}
    className="flex items-center space-x-2 text-red-500 hover:underline"
  >
    <span>🚪</span>
    <span>Logout</span>
  </button>
</div>
      </aside>

      {/* Main Content */}
      {activeSection === "profile" && (
        <main className="flex-1 p-8 mb-4">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold">Welcome, {session.user?.name}</h2>
            <p className="text-sm text-gray-500">date</p>
          </div>
           <div className="w-full rounded-xl overflow-hidden mb-8">
            <img src="/top.png" alt="Red Banner" className="object-cover w-full h-30" />
          </div>
          <div className="bg-white shadow-md rounded-lg p-6 -mt-19 relative z-10">
            <div className="flex items-center space-x-4">
              <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center text-3xl">👤</div>
              <div>
                <h3 className="text-lg font-semibold">{profile?.name}</h3>
                <p className="text-gray-500 text-sm">{session.user?.email}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-y-4 gap-x-8 mt-6 text-sm">
              <div>
                <label className="block text-gray-700 mb-1">Name</label>
                <input name="name" defaultValue={profile?.name || ""} type="text" className="w-full p-3 border-none rounded-lg bg-gray-50" />
              </div>
              <div>
                <label className="block text-gray-700 mb-1">Phone</label>
                <input defaultValue={profile?.phone || ""} name="phone" type="text" className="w-full p-3 border-none rounded-lg bg-gray-50" />
              </div>
              <div>
                <label className="block text-gray-700 mb-1">Year</label>
                <input defaultValue={profile?.year || ""} name="year" type="text" className="w-full p-3 border-none rounded-lg bg-gray-50" />
              </div>
              <div>
                <label className="block text-gray-700 mb-1">Blood Group</label>
                <input defaultValue={profile?.blood_group || ""} name="blood_group" type="text" className="w-full p-3 border-none rounded-lg bg-gray-50" />
              </div>
              <div>
                <label className="block text-gray-700 mb-1">Semester</label>
                <input defaultValue={profile?.semester || ""} name="semester" type="text" className="w-full p-3 border-none rounded-lg bg-gray-50" />
              </div>
              <div>
                <label className="block text-gray-700 mb-1">Gender</label>
                <input defaultValue={profile?.gender || ""} name="gender" type="text" className="w-full p-3 border-none rounded-lg bg-gray-50" />
              </div>
              <div>
                <label className="block text-gray-700 mb-1">Division</label>
                <input defaultValue={profile?.division || ""} name="division" type="text" className="w-full p-3 border-none rounded-lg bg-gray-50" />
              </div>
              <div>
                <label className="block text-gray-700 mb-1">Allergies</label>
                <input defaultValue={profile?.allergies || ""} name="allergies" type="text" className="w-full p-3 border-none rounded-lg bg-gray-50" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-gray-700 mb-1">Address</label>
                <textarea defaultValue={profile?.address || ""} name="address" className="w-full p-3 border-none rounded-lg bg-gray-50"></textarea>
              </div>
            </div>
          </div>
        </main>
      )}

      {activeSection === "request" && <RequestForm />}

      {activeSection === "donate" && selectRequest && (
        <main className="flex-1 p-8">
          <div className="w-full rounded-xl overflow-hidden mb-8">
            <img src="/top.png" alt="Red Banner" className="object-cover w-full h-30" />
          </div>

          {!selectRequest.accepted ? (
            <>
              <h3 className="text-2xl font-semibold mb-6 text-left">Would you like to donate to this person?</h3>

              <form
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
                onSubmit={async (e) => {
                  e.preventDefault();
                  setSelectRequest({ ...selectRequest, accepted: true });
                  await handleDonationRes(selectRequest.id, "accepted");
                }}
              >
                <div>
                  <label className="block mb-1 text-gray-700 font-medium">Full name of patient</label>
                  <input type="text" value={selectRequest.patientName} readOnly className="w-full p-3 text-gray-500 border-none rounded-lg bg-gray-50" />
                </div>

                <div>
                  <label className="block mb-1 text-gray-700 font-medium">Blood group</label>
                  <input type="text" value={selectRequest.bloodGroup} readOnly className="w-full p-3 text-gray-500 border-none rounded-lg bg-gray-50" />
                </div>

                <div>
                  <label className="block mb-1 text-gray-700 font-medium">Age</label>
                  <input type="number" value={selectRequest.age} readOnly className="w-full p-3 text-gray-500 border-none rounded-lg bg-gray-50" />
                </div>

                <div>
                  <label className="block mb-1 text-gray-700 font-medium">Units required</label>
                  <input type="number" value={selectRequest.unitsRequired || ""} readOnly className="w-full p-3 text-gray-500 border-none rounded-lg bg-gray-50" />
                </div>

                <div>
                  <label className="block mb-1 text-gray-700 font-medium">Gender</label>
                  <input type="text" value={selectRequest.gender} readOnly className="w-full p-3 text-gray-500 border-none rounded-lg bg-gray-50" />
                </div>

                <div>
                  <label className="block mb-1 text-gray-700 font-medium">Hospital/Clinic name</label>
                  <input type="text" value={selectRequest.hospitalName} readOnly className="w-full p-3 text-gray-500 border-none rounded-lg bg-gray-50" />
                </div>

                <div className="md:col-span-2">
                  <label className="block mb-1 text-gray-700 font-medium">Hospital address</label>
                  <input type="text" value={selectRequest.hospitalAddress || ""} readOnly className="w-full p-3 text-gray-500 border-none rounded-lg bg-gray-50" />
                </div>

                <div className="md:col-span-2 flex justify-end mt-4">
                  <button type="submit" className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700 transition">Accept</button>
                </div>
              </form>
            </>
          ) : (
            <div className="text-center mt-10">
              <h2 className="text-2xl font-semibold mb-4">You have accepted the request! ✅</h2>
              <p className="mb-6 text-gray-600">Your willingness to help makes a big difference. Please coordinate with the requester or hospital for details.</p>
              <p className="text-red-600 font-medium mb-8">❤️ Thank you for helping save lives.</p>
              <button onClick={() => setSelectRequest(null)} className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700 transition">Home</button>
            </div>
          )}
        </main>
      )}

      {activeSection === "confirm" && selectRequest && (
        <main className="flex-1 m-6 bg-white rounded-md shadow-lg overflow-hidden">
          <div className="w-full rounded-xl overflow-hidden mb-8">
            <img src="/top.png" alt="Red Banner" className="object-cover w-full h-30" />
          </div>

          <div className="w-full mx-auto bg-white shadow-md rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-4 text-center">Confirm Donation Received</h2>

            <p className="text-gray-700 mb-6 text-center">
              Hello 👋, we hope your blood donation request has been fulfilled. <br />
              Have you received the required donation from <strong>{selectRequest.patientName}</strong>? Please confirm so we can update our records and notify the donors.
            </p>

            <div className="flex justify-center gap-4">
              <button
                onClick={() => { handleDonationConfirm(selectRequest.id, true); setActiveSection("received"); }}
                className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
              >
                Yes
              </button>
              <button
                onClick={() => { handleDonationConfirm(selectRequest.id, false); setActiveSection("not_received");}}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
              >
                No
              </button>
            </div>
          </div>
        </main>
      )}

      {activeSection === "received" && selectRequest && (
        <main className="flex-1 p-8">
        <div className="w-full rounded-xl overflow-hidden mb-8">
            <img src="/top.png" alt="Red Banner" className="object-cover w-full h-30" />
            
          </div>
        <div className="text-center mt-10">
          <h2 className="text-2xl font-semibold mb-4">We are glad we could help you in the time of need ❤️</h2>
          <p className="mb-6 text-gray-600">Wishing you or your loved one a speedy recovery, thank you for trusting us ❤️</p>
          <button onClick={() => setSelectRequest(null)} className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700 transition">Home</button>
        </div>
        </main>
              )}

        {activeSection === "not_received" && selectRequest && (
        <main className="flex-1 p-8">
        <div className="w-full rounded-xl overflow-hidden mb-8">
            <img src="/top.png" alt="Red Banner" className="object-cover w-full h-30" />
            
          </div>
        <div className="text-center mt-10">
          <h2 className="text-2xl font-semibold mb-4">We are sorry about the delay in arranging your blood donation ⏳</h2>
          <p className="mb-6 text-gray-600">Please be assured that your request has been re-shared with our donor network and hospital partners. <br/> We're doing our best to get the required units to you as soon as possible ❤️</p>
          <button onClick={() => setSelectRequest(null)} className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700 transition">Home</button>
        </div>
        </main>
        )}

{activeSection === "leaderboard" && (
  <main className="flex-1 p-8">
    <div className="w-full rounded-xl overflow-hidden mb-6">
      <img src="/top.png" alt="Banner" className="object-cover w-full h-30" />
    </div>

    {leaderboardLoading ? (
      <p>Loading leaderboard...</p>
    ) : leaderboardError ? (
      <p className="text-red-500">{leaderboardError}</p>
    ) : leaderboard.length === 0 ? (
      <p>No leaderboard data available.</p>
    ) : (
      <>
        <h2 className="text-xl font-semibold mb-2">Your score is:</h2>

        {(() => {
        

          const userRank = leaderboard.findIndex(user => user.id === session.user?.id) + 1;

          function getOrdinalSuffix(i) {
            const j = i % 10,
              k = i % 100;
            if (j === 1 && k !== 11) return "st";
            if (j === 2 && k !== 12) return "nd";
            if (j === 3 && k !== 13) return "rd";
            return "th";
          }

          return (
            <p className="mb-6">
              You are in <strong>{userRank > 0 ? `${userRank}${getOrdinalSuffix(userRank)}` : "N/A"}</strong> place
            </p>
          );
        })()}

        <div className="flex flex-wrap md:flex-nowrap gap-6">
          {/* Podium */}
          <div className="flex-1 flex justify-around items-end">
            {(() => {
              const podiumOrder = [1, 0, 2]; // visual left, center (1st), right
              const podiumColors = [
                { bg: "bg-yellow-400", text: "text-yellow-600", label: "1st" },
                { bg: "bg-gray-300", text: "text-gray-600", label: "2nd" },
                { bg: "bg-amber-300", text: "text-orange-600", label: "3rd" },
              ];

              return podiumOrder.map((visualIndex, displayIndex) => {
                const actualIndex = displayIndex; // 0 = 1st, 1 = 2nd, 2 = 3rd
                const person = leaderboard[actualIndex];
                if (!person) return null;

                const style = podiumColors[actualIndex];

                return (
                  <div key={person.id || actualIndex} className="text-center">
                    <div className={`${style.bg} p-4 rounded-t-lg text-white w-24 relative`}>
                      {actualIndex === 0 && (
                        <span className="absolute -top-4 left-1/2 -translate-x-1/2 text-xl">👑</span>
                      )}
                      <p className="text-lg font-semibold">{style.label}</p>
                      <p className="text-sm">{person.points} Pts</p>
                    </div>
                    <p className={`mt-2 text-sm ${style.text} font-medium`}>{person.name}</p>
                  </div>
                );
              });
            })()}
          </div>

          {/* Leaderboard Table */}
          <div className="w-full md:w-1/3 bg-gray-300 rounded-lg shadow-md p-4 text-gray-800">
            <div className="flex justify-between mb-2 font-semibold border-b pb-1">
              <span>Name</span>
              <span>Place</span>
              <span>Points</span>
            </div>
            {leaderboard.map((user, idx) => (
              <div key={user.id || idx} className="flex justify-between py-2 border-t border-white/30">
                <span>{user.name}</span>
                <span>{idx + 1}</span>
                <span>{user.points}</span>
              </div>
            ))}
          </div>
        </div>
      </>
    )}
  </main>
)}



    </div>
  );
};

export default Dashboard;
