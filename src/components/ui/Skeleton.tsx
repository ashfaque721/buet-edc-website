"use client";

import React from "react";
import clsx from "clsx";

export function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={clsx(
        "bg-white/[0.04] border border-white/5 animate-pulse rounded-2xl",
        className
      )}
      {...props}
    />
  );
}
