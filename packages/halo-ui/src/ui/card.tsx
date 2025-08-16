// Copied from Eco repo
import React from "react";
export function Card({ children }: { children: React.ReactNode }) {
  return <div className="card">{children}</div>;
}
export function CardContent({ children }: { children: React.ReactNode }) {
  return <div className="card-content">{children}</div>;
}
