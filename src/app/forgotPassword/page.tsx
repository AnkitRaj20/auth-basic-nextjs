"use client";

import axios from "axios";
import { useState } from "react";

export default function forgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState(false)

  const onSubmit = async () => {
    try {
        alert('click me')
        await axios.post("/api/users/forgotPassword",{ email})
    } catch (error:any) {
        console.log(error);
        setError(true);
    }
  };
  return (
    <div className="flex flex-col min-h-screen items-center justify-center py-2">
      <h1 className="text-4xl">Forgot Password</h1>

      <input
        className="p-2 mt-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
        type="email"
        id="email"
        placeholder="Enter Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <button
        onClick={onSubmit}
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
      >
        Submit
      </button>
    </div>
  );
}
