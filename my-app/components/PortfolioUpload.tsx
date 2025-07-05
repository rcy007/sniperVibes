"use client";

// @ts-nocheck
import React, { useCallback, useState } from "react";
import { supabaseBrowser } from "@/lib/supabase-browser";
import { Button, Card } from "@/components/ui";
import { useDropzone } from "react-dropzone";
import { Loader2, Upload, FileImage, ArrowUp } from "lucide-react";

interface Props {
  onComplete?: () => void;
}

export default function PortfolioUpload({ onComplete }: Props) {
  const [loading, setLoading] = useState(false);
  const supabase = supabaseBrowser();

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      setLoading(true);
      try {
        const file = acceptedFiles[0];
        if (!file) return;
        const path = `${Date.now()}_${file.name}`;
        const { error: uploadErr } = await supabase.storage
          .from("imports")
          .upload(path, file, {
            contentType: file.type,
            upsert: false,
          });
        if (uploadErr) throw uploadErr;

        // invoke edge function
        const { error: fnErr } = await supabase.functions.invoke(
          "process_portfolio_import",
          {
            body: { path },
          }
        );
        if (fnErr) throw fnErr;
        onComplete?.();
      } catch (err) {
        console.error(err);
        alert("Failed to process file: " + (err as Error).message);
      } finally {
        setLoading(false);
      }
    },
    [supabase, onComplete]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [],
    },
    multiple: false,
  });

  return (
    <Card
      {...getRootProps()}
      className="group relative p-8 text-center cursor-pointer bg-gradient-to-br from-white/50 to-white/30 dark:from-black/40 dark:to-black/20 backdrop-blur-xs border-2 border-dashed border-gray-300 dark:border-gray-600 hover:border-blue-500 dark:hover:border-blue-400 hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300 ease-out overflow-hidden"
    >
      <input {...getInputProps()} />
      
      {/* Background gradient overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-purple-50/50 dark:from-blue-900/20 dark:to-purple-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      
      <div className="relative z-10">
        {loading ? (
          <div className="flex flex-col items-center space-y-3">
            <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
            <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Processing...</p>
          </div>
        ) : isDragActive ? (
          <div className="flex flex-col items-center space-y-3">
            <div className="relative">
              <Upload className="w-12 h-12 text-blue-600 animate-bounce" />
              <ArrowUp className="absolute -top-1 -right-1 w-6 h-6 text-green-500 animate-pulse" />
            </div>
            <p className="text-lg font-semibold text-blue-600">Drop the image here...</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Release to upload</p>
          </div>
        ) : (
          <div className="flex flex-col items-center space-y-4">
            <div className="relative">
              <FileImage className="w-12 h-12 text-gray-400 group-hover:text-blue-600 transition-colors duration-300" />
              <Upload className="absolute -bottom-1 -right-1 w-6 h-6 text-blue-500 opacity-0 group-hover:opacity-100 group-hover:translate-y-1 transition-all duration-300" />
            </div>
            <div className="space-y-2">
              <p className="text-lg font-semibold text-gray-800 dark:text-gray-200 group-hover:text-blue-600 transition-colors duration-300">
                Drag & drop portfolio screenshot here
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400 group-hover:text-blue-500 transition-colors duration-300">
                or click to select a file
              </p>
            </div>
            <div className="flex items-center space-x-2 text-xs text-gray-500 dark:text-gray-400">
              <span>Supports: PNG, JPG, JPEG</span>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
} 