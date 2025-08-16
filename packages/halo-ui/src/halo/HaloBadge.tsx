"use client";


import React from "react";
import { cn } from "../lib/utils";
import styles from "./HaloBadge.module.css";

export interface HaloBadgeProps {
	label: string;
	color?: string;
	className?: string;
}


const HaloBadge: React.FC<HaloBadgeProps> = ({ label, color = "#00fff0", className }) => (
	<span
		className={cn(styles.haloBadge, className)}
		style={{ backgroundColor: color }}
	>
		{label}
	</span>
);

export default HaloBadge;
