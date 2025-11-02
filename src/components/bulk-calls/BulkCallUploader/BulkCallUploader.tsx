import React, { useState } from "react";
import * as XLSX from "xlsx";
import { useAuth } from "@/contexts/useAuth";
import { toast } from "sonner";
import { FileUploadSection } from "./FileUploadSection";
import { CallButton } from "./CallButton";

interface Prefill {
  business_type?: string;
  prompt?: string;
}

interface BulkCallUploaderProps {
  prefill?: Prefill;
  businessType?: string;
}

export const BulkCallUploader = ({
  prefill = {},
  businessType = "",
}: BulkCallUploaderProps) => {
  const [phoneNumbers, setPhoneNumbers] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const { token } = useAuth();

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result;
      if (!result || typeof result === "string") return;

      const data = new Uint8Array(result);
      const workbook = XLSX.read(data, { type: "array" });
      const sheet = workbook.Sheets[workbook.SheetNames[0]];
      const rows = XLSX.utils.sheet_to_json<string[]>(sheet, { header: 1 });

      const numbers = rows
        .flat()
        .map((v) => String(v).trim())
        .filter((v) => /^\d{10,15}$/.test(v));

      if (!numbers.length) return toast.error("No valid numbers found!");

      setPhoneNumbers(numbers);
      toast.success(`Loaded ${numbers.length} phone numbers`);
    };

    reader.readAsArrayBuffer(file);
  };

  const handleStartCalling = async () => {
    if (!phoneNumbers.length) return toast.error("Please upload a file first!");
    if (!businessType.trim()) return toast.error("Enter a business type!");
    if (!token) return toast.error("Please login first!");

    setLoading(true);
    try {
      const payload = {
        business_type: businessType,
        phoneNumbers: phoneNumbers.map((num) =>
          num.startsWith("+") ? num : `+91${num}`
        ),
      };

      const res = await fetch("http://localhost:8000/api/call/bulkCall", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (res.ok) {
        toast.success(`Bulk call triggered for ${phoneNumbers.length} numbers`);
        setPhoneNumbers([]);
      } else {
        toast.error(data.error || "Failed to trigger bulk call");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong while starting the calls.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-md w-full border border-gray-700/30 bg-zinc-900/40 rounded-xl p-6 space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-white mb-2">
          Bulk Call Uploader
        </h2>
        <p className="text-sm text-gray-400">
          Upload an Excel file containing phone numbers and trigger calls in one
          go.
        </p>
      </div>

      <FileUploadSection onFileUpload={handleFileUpload} />

      {phoneNumbers.length > 0 && (
        <div className="text-sm text-green-400">
          {phoneNumbers.length} numbers ready to call
        </div>
      )}

      <CallButton
        onClick={handleStartCalling}
        disabled={!phoneNumbers.length || loading || !token}
        loading={loading}
        token={token}
        count={phoneNumbers.length}
      />
    </div>
  );
};
