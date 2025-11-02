import React from "react";
import { Button } from "@/components/ui/button";

interface CallButtonProps {
  onClick: () => void;
  disabled: boolean;
  loading: boolean;
  token: string | null;
  count: number;
}

export const CallButton = ({
  onClick,
  disabled,
  loading,
  token,
  count,
}: CallButtonProps) => {
  return (
    <Button
      onClick={onClick}
      disabled={disabled}
      className="w-full h-11 font-medium bg-purple-600 hover:bg-purple-700 disabled:opacity-50 text-white rounded-lg transition-all"
    >
      {loading
        ? "Calling..."
        : !token
        ? "Login to Start"
        : count
        ? `Start Calls (${count})`
        : "Start Calls"}
    </Button>
  );
};
