"use client"
import axios from "axios"
import { useRouter } from "next/navigation";

export default function ProfilePage(){
    const router = useRouter();
    const logout = async() => {
        await axios.get('/api/users/logout');
        alert('logged out');
        router.push('/login');
    }

    return(
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>Profile</h1>

            <button className="bg-blue-500 hover:bg-blue-800 text-white p-5 mt-3 rounded" onClick={logout}>
                LogOut
            </button>
        </div>
    )
}