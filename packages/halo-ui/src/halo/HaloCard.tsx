"use client";

import React from "react";
import { cn } from "../lib/utils";

export interface HaloCardProps {
	children: React.ReactNode;
	className?: string;
}

const HaloCard: React.FC<HaloCardProps> = ({ children, className }) => (
	<div className={cn("rounded-lg shadow-md bg-[rgb(var(--halo-bg))] p-4", className)}>
		{children}
	</div>
);

export default HaloCard;
