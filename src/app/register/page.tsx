"use client"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useNotification } from "@/components/Notification"
import Link from "next/link"
export default function Signup() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  const router = useRouter()

  const { showNotification } = useNotification()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (password !== confirmPassword) {
      showNotification("Passwords do not match", "error")
      return
    }

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || "Registration failed")
      }

      showNotification("Registration successful! Please log in.", "success")
      router.push("/login")
    } catch (error) {
      showNotification(
        error instanceof Error ? error.message : "Registration failed",
        "error"
      )
    }
  }

  return (
    <div className="max-w-md mx-auto my-[60px] bg-secondary-content py-[40px] rounded-md px-5">
      <h1 className="text-4xl leading-tight font-bold mb-10">Register</h1>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-y-5">
        <div className="grid grid-cols-1 gap-y-1.5">
          <label
            htmlFor="email"
            className="block md:text-lg text-base font-medium leading-tight"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div className="grid grid-cols-1 gap-y-1.5">
          <label
            htmlFor="password"
            className="block md:text-lg text-base font-medium leading-tight"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div className="grid grid-cols-1 gap-y-1.5">
          <label
            htmlFor="confirmPassword"
            className="block md:text-lg text-base font-medium leading-tight"
          >
            Confirm Password
          </label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <button
          type="submit"
          className="block mt-3 w-full bg-blue-500 text-white md:text-lg text-base font-medium leading-tight py-3 rounded hover:bg-blue-600"
        >
          Register
        </button>
        <p className="text-center mt-4">
          Already have an account?{" "}
          <Link href="/login" className="text-blue-500 hover:text-blue-600">
            Login
          </Link>
        </p>
      </form>
    </div>
  )
}
