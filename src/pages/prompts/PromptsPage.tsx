import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/Spinner";
import { DashboardHeader } from "@/components/DashboardHeader";
import { usePrompts } from "./hooks/usePrompts";
import { PromptsGrid } from "./components/PromptsGrid";
import { EditPromptDialog } from "./components/EditPromptDialog";

export default function PromptsPage() {
  const navigate = useNavigate();
  const { prompts, loading, updatePrompt } = usePrompts();
  const [selectedBusiness, setSelectedBusiness] = useState("");
  const [open, setOpen] = useState(false);

  const handleEdit = (business: string) => {
    setSelectedBusiness(business);
    setOpen(true);
  };

  const handleMakeCall = (business: string) => {
    navigate("/call", {
      state: { business_type: business, prompt: prompts[business], mode: "single" },
    });
  };

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen bg-background">
        <Spinner size="lg" />
      </div>
    );

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <DashboardHeader />

      <main className="flex-1 container mx-auto px-4 md:px-8 py-10">
        <div className="mb-8">
          <Button
            variant="ghost"
            onClick={() => navigate("/dashboard")}
            className="hover:bg-muted/50 hover:scale-105 transition-all flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Dashboard
          </Button>
        </div>

        <h1 className="text-3xl md:text-4xl font-bold text-center mb-10 bg-gradient-to-r from-purple-500 via-purple-500 to-purple-700 bg-clip-text text-transparent drop-shadow-sm">
          Business Prompts
        </h1>

        <PromptsGrid prompts={prompts} onEdit={handleEdit} onCall={handleMakeCall} />
      </main>

      <EditPromptDialog
        open={open}
        business={selectedBusiness}
        prompt={prompts[selectedBusiness] || ""}
        onClose={() => setOpen(false)}
        onSave={(prompt) => updatePrompt(selectedBusiness, prompt)}
      />
    </div>
  );
}
