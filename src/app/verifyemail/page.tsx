"use client"
import axios from 'axios';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

export default function verifyemailpage(){
  const [token, setToken] = useState("");
  const [error, setError] = useState(false);
  const [verified, setVerified] = useState(false)

  const verifyUserEmail = async () => {
    try {
        await axios.post("/api/users/verifyemail", {token})
        setVerified(true);
    } catch (error:any) {
        setError(true);
        console.log(error.response.data)
    }
  }

    useEffect(()=> {
        const urlToken = window.location.search.split("=")[1];
        setToken(urlToken || "");
    },[])

    useEffect(() => {
      if(token.length>0 || ""){
        verifyUserEmail();
      }
    }, [token])
    

    return(
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1 className='text-4xl'>Verify Email</h1>

            <h2 className='bg-orange-500 p-2 text-black'> {token ? `${token}` : "no token"} </h2>

            {/* If verified */}
            {verified && (
                <div>
                    <h2 className="text-4xl">
                        Email Verified Successfully
                    </h2>
                    <Link href="/login" className='bg-blue-500 hover:bg-blue-800 p-3 mt-4'>
                        Login
                    </Link>
                </div>
            )}

            {error &&(
                <div>
                    <h2 className='text-4xl bg-red'>
                        Verification Failed
                    </h2>
                </div>
            )}
        </div>
    )
}