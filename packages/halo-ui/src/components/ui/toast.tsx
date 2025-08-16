// Add ToastActionElement type for use-toast.ts compatibility
// import React from "react"; // Already imported above if needed

export type ToastActionElement = React.ReactElement<any>;
// Copied from Eco repo
import React from "react";
export type ToastProps = { title?: React.ReactNode; description?: React.ReactNode };
export function Toast({ title, description }: ToastProps) {
  return <div>{title} {description}</div>;
}
