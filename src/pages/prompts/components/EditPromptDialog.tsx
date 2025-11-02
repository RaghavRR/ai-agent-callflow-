import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useState, useEffect } from "react";

interface EditPromptDialogProps {
  open: boolean;
  business: string;
  prompt: string;
  onClose: () => void;
  onSave: (prompt: string) => Promise<void>;
}

export function EditPromptDialog({ open, business, prompt, onClose, onSave }: EditPromptDialogProps) {
  const [edited, setEdited] = useState(prompt);

  useEffect(() => {
    setEdited(prompt);
  }, [prompt]);

  const handleSave = async () => {
    if (!edited.trim()) return;
    await onSave(edited);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Edit Prompt — {business.replace(/_/g, " ")}</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 mt-4">
          <Textarea
            rows={5}
            value={edited}
            onChange={(e) => setEdited(e.target.value)}
            placeholder="Edit your business prompt..."
            className="w-full"
          />
        </div>

        <DialogFooter className="mt-4 flex justify-end gap-2">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSave} className="bg-purple-600 hover:bg-purple-700 text-white">
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
