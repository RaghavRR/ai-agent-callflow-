import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export default function ModeToggle({ selectedMode, setSelectedMode }) {
  return (
    <div className="flex justify-center mb-10">
      <div className="relative bg-muted/40 p-1 rounded-xl flex items-center shadow-sm">
        <motion.div
          layout
          className="absolute inset-y-1 left-1 w-1/2 rounded-lg bg-primary/10"
          animate={{
            x: selectedMode === "bulk" ? "100%" : "0%",
          }}
          transition={{ type: "spring", stiffness: 400, damping: 30 }}
        />

        <Button
          onClick={() => setSelectedMode("single")}
          variant="ghost"
          className={`relative z-10 w-24 rounded-lg transition-none cursor-pointer
            ${selectedMode === "single"
              ? "text-primary font-semibold"
              : "text-muted-foreground"
            }`}
        >
          Single Call
        </Button>

        <Button
          onClick={() => setSelectedMode("bulk")}
          variant="ghost"
          className={`relative z-10 w-24 rounded-lg transition-none cursor-pointer
            ${selectedMode === "bulk"
              ? "text-primary font-semibold"
              : "text-muted-foreground"
            }`}
        >
          Bulk Call
        </Button>
      </div>
    </div>
  );
}
