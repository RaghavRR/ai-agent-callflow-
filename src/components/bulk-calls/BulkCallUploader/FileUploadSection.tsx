import React from "react";
import { Upload } from "lucide-react";

interface FileUploadSectionProps {
  onFileUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const FileUploadSection = ({ onFileUpload }: FileUploadSectionProps) => {
  return (
    <div className="space-y-3">
      <label
        htmlFor="file"
        className="block text-sm font-medium text-gray-300"
      >
        Upload Excel File
      </label>

      <div className="flex items-center gap-3">
        <input
          id="file"
          type="file"
          accept=".xlsx, .xls"
          onChange={onFileUpload}
          className="w-full text-sm border border-gray-600 rounded-lg px-3 py-2 bg-zinc-800 text-gray-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-purple-500/40"
        />
        <Upload className="text-purple-500 h-5 w-5" />
      </div>
    </div>
  );
};
