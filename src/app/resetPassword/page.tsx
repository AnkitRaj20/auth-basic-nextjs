"use client"

import axios from "axios";
import { useEffect, useState } from "react"

export default function passwordRecoverPage(){
    const [password, setPassword] = useState("")
    const [confirmPassword, setconfirmPassword] = useState("")
    const [token, setToken] = useState("");
    const [error, setError] = useState(false);
    const [verified, setVerified] = useState(false)

    const onReset = async() => {
        const match = password.match(confirmPassword);

        if(match){
            try {
                await axios.post("/api/users/resetPassword", {token, password});
                setVerified(true);
            } catch (error:any) {
                console.log(error.response.data);
                setError(true)
            }
        }else{
            setError(true)
        }
    }

    useEffect(()=>{
        // Getting the token from the URL to verify
        const urlToken = window.location.search.split("=")[1];
        setToken(urlToken || "")
    },[])
    
    return(
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1 className="text-4xl">Reset Your Password</h1>

            <input type="password" 
            className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="password"
            />

            <input type="password" 
            className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
            id="password"
            value={confirmPassword}
            onChange={(e) => setconfirmPassword(e.target.value)}
            placeholder="Confirm Password"
            />

            <button 
            onClick={onReset}
            className="p-2 bg-green-500 text-white hover:bg-green-800
            border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600">
                Reset Password
            </button>
        </div>
    )
}
