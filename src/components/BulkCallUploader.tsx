import React, { useState } from "react";
import * as XLSX from "xlsx";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";
import { toast } from "sonner";

export const BulkCallUploader = () => {
  const [phone_number, setphone_number] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const { token } = useAuth();

  // 📂 Handle Excel File Upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const data = new Uint8Array(event.target?.result as ArrayBuffer);
      const workbook = XLSX.read(data, { type: "array" });
      const sheet = workbook.Sheets[workbook.SheetNames[0]];
      const rows = XLSX.utils.sheet_to_json(sheet, { header: 1 }) as string[][];

      const numbers = rows
        .flat()
        .map((v) => String(v).trim())
        .filter((v) => /^\d{10,15}$/.test(v));

      setphone_number(numbers);
      toast.success(`Loaded ${numbers.length} phone numbers`);
    };
    reader.readAsArrayBuffer(file);
  };

  // ☎️ Handle Bulk Calling
const handleStartCalling = async () => {
  if (!phone_number.length) return toast.error("Upload an Excel file first!");
  if (!token) return toast.error("Please login first!");

  setLoading(true);

  try {
    const payload = { phoneNumbers: phone_number.map(num => `+91${num}`) };
    console.log("📦 Sending payload:", payload);

    const res = await fetch("/api/call/bulkCall", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });

    const data = await res.json();
    console.log("📥 Response received:", data);

    if (res.ok) {
      toast.success(`✅ Bulk call triggered for ${phone_number.length} numbers!`);
      setphone_number([]);
    } else {
      toast.error(`Failed: ${data.error || data.message}`);
    }
  } catch (err) {
    console.error("❌ Error during bulk call (frontend):", err);
    toast.error("Something went wrong while making calls.");
  } finally {
    setLoading(false);
  }
};



  return (
    <div className="p-6 sm:p-8 md:p-10 border border-white/[0.08] rounded-2xl bg-background/40 shadow-sm max-w-md w-full mx-auto space-y-6 sm:space-y-8">

      {/* Token Debug Info - Remove in production */}
      <div className="text-xs text-muted-foreground bg-muted/20 p-2 rounded">
        Token Status: {token ? "✅ Available" : "❌ Missing"}
      </div>

      {/* File Upload Section */}
      <div className="space-y-3">
        <label
          htmlFor="file"
          className="block text-sm sm:text-base font-medium text-muted-foreground"
        >
          Upload Excel File
        </label>

        <div className="flex flex-col sm:flex-row items-center gap-3">
          <input
            id="file"
            type="file"
            accept=".xlsx, .xls"
            onChange={handleFileUpload}
            className="text-sm bg-background/50 border border-white/[0.08] rounded-lg px-3 py-2 w-full cursor-pointer focus:ring-2 focus:ring-primary/30 focus:border-primary/40 outline-none"
          />
          <Upload className="text-primary h-5 w-5 sm:h-6 sm:w-6" />
        </div>
      </div>

      {/* Phone Numbers Preview */}
      {phone_number.length > 0 && (
        <div className="text-sm text-muted-foreground">
          <p>Numbers loaded: {phone_number.length}</p>
          <p className="text-xs mt-1">First number: +91{phone_number[0]}</p>
        </div>
      )}

      {/* Call Button */}
      <Button
        onClick={handleStartCalling}
        disabled={!phone_number.length || loading || !token}
        className="w-full h-12 sm:h-14 text-sm sm:text-base font-semibold bg-gradient-to-r from-primary to-primary/90 hover:opacity-90 rounded-xl transition-all disabled:opacity-50"
      >
        {loading
          ? "Calling..."
          : !token
          ? "Please Login First"
          : `Start Calls (${phone_number.length || 0})`}
      </Button>
    </div>
  );
};