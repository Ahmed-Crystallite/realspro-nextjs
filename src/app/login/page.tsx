"use client"

import { signIn } from "next-auth/react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { useNotification } from "@/components/Notification"
import Link from "next/link"

export default function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const router = useRouter()
  const { showNotification } = useNotification()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    })

    if (result?.error) {
      showNotification(result.error, "error")
    } else {
      showNotification("Login successful!", "success")
      router.push("/")
    }
  }

  return (
    <div className="max-w-md mx-auto my-[60px] bg-secondary-content py-[80px] rounded-md px-5">
      <h1 className="text-4xl leading-tight font-bold mb-10">Login</h1>
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
        <button
          type="submit"
          className="block mt-3 w-full bg-blue-500 text-white md:text-lg text-base font-medium leading-tight py-3 rounded hover:bg-blue-600"
        >
          Login
        </button>
        <p className="text-center mt-4">
          Don&apos;t have an account?
          <Link href="/register" className="text-blue-500 hover:text-blue-600">
            Register
          </Link>
        </p>
      </form>
    </div>
  )
}
