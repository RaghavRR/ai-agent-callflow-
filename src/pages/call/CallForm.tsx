import React, { useState } from "react";
import { toast } from "react-toastify";
import { useAuth } from "@/contexts/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/Spinner";
import { Phone } from "lucide-react";

interface Prefill {
  business_type?: string;
  prompt?: string;
}

interface CallFormProps {
  prefill?: Prefill;
  businessType?: string;
}

export default function CallForm({ prefill = {}, businessType = "" }: CallFormProps) {
  const { token } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!token) return toast.error("Please login first!");
    if (!businessType.trim()) return toast.error("Select a business type!");
    if (!phoneNumber.trim()) return toast.error("Enter a valid phone number!");

    setIsLoading(true);
    try {
      const response = await fetch("http://localhost:8000/api/call/call", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          business_type: businessType,
          phone_number: phoneNumber,
        }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Call failed");

      toast.success("Call initiated successfully!");
      setPhoneNumber("");
    } catch (err: any) {
      console.error("Error while making call:", err);
      toast.error(err.message || "Something went wrong!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md w-full mx-auto bg-zinc-900/50 border border-gray-700/40 rounded-xl p-6 sm:p-8 space-y-6 shadow-sm"
    >
      <div className="text-center">
        <h2 className="text-xl sm:text-2xl font-semibold text-white">Start a Call</h2>
        <p className="text-sm text-gray-400 mt-1">
          Enter a phone number and initiate a call instantly.
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="phoneNumber" className="text-gray-300">
          Customer Phone Number
        </Label>
        <div className="relative">
          <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <Input
            id="phoneNumber"
            type="tel"
            placeholder="Enter phone number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            className="pl-10 bg-zinc-800 border-gray-700 text-gray-100 focus:ring-2 focus:ring-purple-500/30"
            required
            disabled={isLoading}
          />
        </div>
      </div>

      <Button
        type="submit"
        disabled={isLoading}
        className="w-full h-11 font-medium bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-all disabled:opacity-50"
      >
        {isLoading ? (
          <>
            <Spinner size="sm" className="mr-2" /> Calling...
          </>
        ) : (
          <>
            <Phone className="mr-2 h-5 w-5" /> Start Call
          </>
        )}
      </Button>
    </form>
  );
}
