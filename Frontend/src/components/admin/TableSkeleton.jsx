import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

export default function TableSkeleton({ rows = 5, columns = 4 }) {
  return (
    <>
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <tr key={rowIndex} className="border-b border-border/50 bg-background/50">
          {Array.from({ length: columns }).map((_, colIndex) => (
            <td key={colIndex} className="px-4 py-4">
              <Skeleton className="h-4 w-full max-w-[200px]" />
            </td>
          ))}
        </tr>
      ))}
    </>
  );
}
