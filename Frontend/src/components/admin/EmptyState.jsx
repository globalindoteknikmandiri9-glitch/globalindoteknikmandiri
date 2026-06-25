import React from "react";
import { Inbox } from "lucide-react";
import { cn } from "@/lib/utils";

export default function EmptyState({ icon, title, description, className }) {
  return (
    <div className={cn("flex flex-col items-center justify-center p-8 text-center min-h-[300px]", className)}>
      <div className="flex items-center justify-center w-16 h-16 rounded-full bg-muted/50 mb-4">
        {icon ? (
          React.cloneElement(icon, { className: "w-8 h-8 text-muted-foreground" })
        ) : (
          <Inbox className="w-8 h-8 text-muted-foreground" />
        )}
      </div>
      <h3 className="text-lg font-bold text-foreground tracking-tight">{title || "Tidak Ada Data"}</h3>
      <p className="text-sm text-muted-foreground mt-1 max-w-[250px] mx-auto">
        {description || "Data yang Anda cari tidak ditemukan."}
      </p>
    </div>
  );
}
