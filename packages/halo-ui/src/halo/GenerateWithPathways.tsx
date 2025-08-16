"use client";

import React from "react";
import { cn } from "../lib/utils";

export interface GenerateWithPathwaysProps {
	onGenerate: () => void;
	className?: string;
}

const GenerateWithPathways: React.FC<GenerateWithPathwaysProps> = ({ onGenerate, className }) => (
	<button
		className={cn("rounded px-4 py-2 bg-[rgb(var(--halo-primary))] text-white font-semibold", className)}
		onClick={onGenerate}
	>
		Generate with Pathways
	</button>
);

export default GenerateWithPathways;
