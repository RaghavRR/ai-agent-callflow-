import { useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { DashboardHeader } from "@/components/DashboardHeader";
import { Button } from "@/components/ui/button";
import CallForm from "./CallForm";
import { BulkCallUploader } from "@/components/bulk-calls/BulkCallUploader/BulkCallUploader";
import { useEffect, useState } from "react";
import ModeToggle from "./ModeToggle";
import { Card, CardContent } from "@/components/ui/card";

const Call = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { mode = "single", business_type = "", prompt = "" } = location.state || {};

  const [selectedMode, setSelectedMode] = useState<"single" | "bulk">(mode);
  const [prefill, setPrefill] = useState({ business_type, prompt });

  useEffect(() => {
    if (location.state) {
      setSelectedMode(mode);
      setPrefill({ business_type, prompt });
    }
  }, [location.state]);

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />

      <main className="container mx-auto px-4 md:px-6 py-10">
        {/* 🔙 Back Button */}
        <Button
          variant="ghost"
          onClick={() => navigate("/prompts")}
          className="mb-8 hover:bg-muted/50 hover:scale-105 transition-all"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Prompts
        </Button>

        <Card className="mb-8 border-purple-500/30 bg-card/60 backdrop-blur-sm">
          <CardContent className="p-6 space-y-3">
            <h2 className="text-xl font-semibold capitalize text-purple-400">
              Business Type: <span className="text-foreground">{prefill.business_type}</span>
            </h2>
            <p className="text-sm text-muted-foreground whitespace-pre-line leading-relaxed">
              <strong>Prompt:</strong> {prefill.prompt || "No prompt available for this business."}
            </p>
          </CardContent>
        </Card>

        <ModeToggle selectedMode={selectedMode} setSelectedMode={setSelectedMode} />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
          <div
            className={`transition-all duration-300 ${
              selectedMode === "single"
                ? "opacity-100 scale-100"
                : "opacity-40 scale-95 pointer-events-none"
            }`}
          >
            <CallForm businessType={prefill.business_type} prefill={prefill} />
          </div>
          <div
            className={`transition-all duration-300 ${
              selectedMode === "bulk"
                ? "opacity-100 scale-100"
                : "opacity-40 scale-95 pointer-events-none"
            }`}
          >
            <BulkCallUploader businessType={prefill.business_type} prefill={prefill} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Call;
