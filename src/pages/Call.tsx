import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { DashboardHeader } from "@/components/DashboardHeader";
import { CallForm } from "@/components/CallForm";
import { Button } from "@/components/ui/button";
import { BulkCallUploader } from "@/components/BulkCallUploader";

const Call = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />

      <main className="container mx-auto px-4 md:px-6 py-8 md:py-12">
  {/* 🔙 Back Button */}
  <Button
    variant="ghost"
    onClick={() => navigate("/dashboard")}
    className="mb-8 hover:bg-muted/50 hover:scale-105 transition-all"
  >
    <ArrowLeft className="mr-2 h-4 w-4" />
    Back to Dashboard
  </Button>

  {/* 📞 Call Section */}
  <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-8">
    {/* 🧍 Single Call Form */}
    <div className="flex-1 bg-gradient-to-br from-card/50 to-card/30 backdrop-blur-sm border border-white/[0.08] rounded-3xl p-8 md:p-10 shadow-2xl">
      <CallForm />
    </div>

    {/* 📁 Bulk Call Uploader */}
    <div className="flex-1 bg-gradient-to-br from-card/50 to-card/30 backdrop-blur-sm border border-white/[0.08] rounded-3xl p-8 md:p-10 shadow-2xl">
      <h2 className="text-2xl font-semibold mb-4 text-center text-primary">
        Bulk Call Upload
      </h2>
      <BulkCallUploader />
    </div>
  </div>
</main>

    </div>
  );
};

export default Call;
