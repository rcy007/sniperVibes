"use client";

// @ts-nocheck
import React, { useCallback, useState } from "react";
import { supabaseBrowser } from "@/lib/supabase-browser";
import { Button, Card } from "@/components/ui";
import { useDropzone } from "react-dropzone";
import { Loader2 } from "lucide-react";

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
      className="p-6 text-center cursor-pointer bg-white/50 dark:bg-black/40 backdrop-blur-xs border-dashed border-2 border-transparent hover:border-foreground transition-colors"
    >
      <input {...getInputProps()} />
      {loading ? (
        <Loader2 className="animate-spin w-6 h-6 mx-auto" />
      ) : isDragActive ? (
        <p>Drop the image here ...</p>
      ) : (
        <div>
          <p className="font-medium">Drag & drop portfolio screenshot here</p>
          <p className="text-xs opacity-70 mt-1">or click to select a file</p>
        </div>
      )}
    </Card>
  );
} 