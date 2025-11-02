import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface PromptCardProps {
  business: string;
  prompt: string;
  onEdit: (business: string) => void;
  onCall: (business: string) => void;
}

export function PromptCard({ business, prompt, onEdit, onCall }: PromptCardProps) {
  return (
    <Card className="bg-card border border-border/40 hover:shadow-purple-500/20 transition-all duration-300">
      <CardContent className="p-6 space-y-3">
        <h2 className="text-xl font-semibold capitalize text-purple-400">
          {business.replace(/_/g, " ")}
        </h2>
        <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed">
          {prompt}
        </p>

        <div className="flex justify-between pt-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onEdit(business)}
            className="hover:text-white-400 hover:border-purple-400 transition-all"
          >
            Edit Prompt
          </Button>

          <Button
            size="sm"
            onClick={() => onCall(business)}
            className="bg-purple-600 hover:bg-purple-700 text-white"
          >
            Make a Call
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
