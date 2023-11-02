"use client"
import axios from "axios"
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ProfilePage(){
    const router = useRouter();
    const [data, setData] = useState("")
    const logout = async() => {
        await axios.get('/api/users/logout');
        alert('logged out');
        router.push('/login');
    }

    const getUserDetails = async() => {
        const response = await axios.get("/api/users/me");
        console.log(response.data)
        setData(response.data.data._id)
    }

    return(
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>Profile</h1>

            <h2 className="bg-yellow-400 rounded p-2">{data === '' ? "" : <Link href={`/profile/${data}`}>{data}</Link>}</h2>

            <button className="bg-blue-500 hover:bg-blue-800 text-white p-5 mt-3 rounded" onClick={logout}>
                LogOut
            </button>
            <button className="bg-green-500 hover:bg-green-800 text-white p-5 mt-3 rounded" onClick={getUserDetails}>
                GetUserDetails
            </button>
        </div>
    )
}