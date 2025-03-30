"use client"

import { useEffect, useState } from "react"

export interface AdminAuthProps {
  onAuthenticated: () => void
}

export const AdminAuth: React.FC<AdminAuthProps> = ({ onAuthenticated }) => {
  const [key, setKey] = useState("")
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const response = await fetch("/api/auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ key }),
      })

      if (response.ok) {
        onAuthenticated()
        sessionStorage.setItem('password', key);
      } else {
        setError("Invalid admin key")
      }
    } catch {
      setError("Authentication failed")
    }
  }

  useEffect(() => {
    const savedPassword = sessionStorage.getItem('password');
    if (savedPassword) {
      setKey(savedPassword);
    }
  }, []);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Admin Authentication</h2>

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="key" className="block text-sm font-medium text-gray-700 mb-1">
            Admin Key
          </label>
          <input
            type="password"
            autoComplete="current-password"
            id="password"
            value={key}
            onChange={(e) => setKey(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholder="Enter admin password"
            required
          />
        </div>

        {error && <div className="mb-4 text-red-500 text-sm">{error}</div>}

        <button
          type="submit"
          className="cursor-pointer w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
        >
          Login
        </button>
      </form>
    </div>
  )
}

