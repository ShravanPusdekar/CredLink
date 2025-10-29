"use client"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"

export default function VerifyOtpPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const phone = searchParams.get("phone") || ""
  const [otp, setOtp] = useState(["", "", "", "", "", ""])
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleOtpChange = (value: string, index: number) => {
    if (value.length > 1) value = value[0]
    const newOtp = [...otp]
    newOtp[index] = value.replace(/\D/g, "")
    setOtp(newOtp)
    setError("")
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      const inputs = document.querySelectorAll<HTMLInputElement>(".otp-input")
      inputs[index - 1]?.focus()
    }
  }

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault()
    if (otp.join("").length !== 6) {
      setError("Please enter a valid 6-digit OTP")
      return
    }
    setLoading(true)
    setError("")
    try {
      // Simulate OTP verification
      await new Promise(resolve => setTimeout(resolve, 1000))
      router.push("/auth/login")
    } catch {
      setError("Invalid OTP. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2 className="auth-title mb-4">Verify OTP</h2>
        <p className="mb-2 text-gray-600">OTP sent to <span className="font-semibold">{phone}</span></p>
        <form onSubmit={handleVerify} className="space-y-6">
          <div className="flex gap-2 justify-center">
            {otp.map((digit, index) => (
              <input
                key={index}
                className="otp-input auth-input w-12 h-12 text-center text-lg"
                type="text"
                maxLength={1}
                value={digit}
                onChange={e => handleOtpChange(e.target.value, index)}
                onKeyDown={e => handleKeyDown(e, index)}
                required
              />
            ))}
          </div>
          {error && <p className="text-sm text-red-600 mt-2">{error}</p>}
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Verifying..." : "Verify OTP"}
          </Button>
        </form>
      </div>
    </div>
  )
}
