import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CallForm from "@/pages/call/CallForm";
import { BulkCallUploader } from "@/components/bulk-calls/BulkCallUploader/BulkCallUploader";
import { Spinner } from "@/components/Spinner";

export default function CallPromptPage() {
  const { businessType } = useParams();
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPrompt = async () => {
      try {
        const res = await fetch("/prompts-api/prompts");
        const data = await res.json();
        setPrompt(data[businessType as string] || "No prompt found.");
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchPrompt();
  }, [businessType]);

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen text-white">
        <Spinner size="lg" />
      </div>
    );

  return (
    <div className="min-h-screen bg-zinc-950 text-white p-8 space-y-10">
      <div className="max-w-2xl mx-auto text-center">
        <h1 className="text-3xl font-bold capitalize mb-4">
          {businessType?.replace("_", " ")}
        </h1>
        <div className="bg-zinc-900 border border-gray-700 rounded-xl p-6 text-gray-300">
          {prompt}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-10 max-w-5xl mx-auto">
        <CallForm businessType={businessType} prefill={{ prompt }} />
        <BulkCallUploader businessType={businessType} prefill={{ prompt }} />
      </div>
    </div>
  );
}
