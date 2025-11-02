import { useState } from "react";
import { toast } from "sonner";
import { useAuth } from "@/contexts/useAuth";

export const useCallLogic = () => {
  const [phone_number, setPhoneNumber] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { token } = useAuth();

  const validatePhone = (num: string): boolean => {
    const digits = num.replace(/\D/g, "");
    return digits.length >= 10;
  };

  const handleCall = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validatePhone(phone_number)) {
      toast.error("Please enter a valid phone number (minimum 10 digits)");
      return;
    }

    setIsLoading(true);

    try {
      const res = await fetch("/api/call/singleCall", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token && { Authorization: `Bearer ${token}` }),
        },
        body: JSON.stringify({ phone_number: `+91${phone_number}` }),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success(data.message || "Call initiated successfully!");
        setPhoneNumber("");
      } else {
        toast.error(data.error || "Failed to initiate call. Please try again.");
      }
    } catch (err) {
      toast.error("Server error — try again");
      console.error("Call API error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    phone_number,
    setPhoneNumber,
    isLoading,
    handleCall,
  };
};
