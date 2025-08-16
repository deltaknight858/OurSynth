"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "../lib/utils";

export interface HaloButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	label?: string;
	icon?: React.ReactNode;
	variant?: "primary" | "secondary" | "ghost" | "danger";
	loading?: boolean;
}

const variantClasses: Record<string, string> = {
	primary:
		"bg-neon-primary text-white border border-neon-primary shadow-md hover:bg-neon-secondary",
	secondary:
		"bg-white text-neon-primary border border-neon-primary shadow hover:bg-neon-primary/10",
	ghost: "bg-transparent text-neon-primary border border-neon-primary hover:bg-white/10",
	danger: "bg-red-600 text-white border border-red-500 shadow hover:bg-red-700",
};

const spinner = (
	<svg className="animate-spin h-4 w-4 mr-2 text-current" viewBox="0 0 24 24">
		<circle
			className="opacity-25"
			cx="12"
			cy="12"
			r="10"
			stroke="currentColor"
			strokeWidth="4"
			fill="none"
		/>
		<path
			className="opacity-75"
			fill="currentColor"
			d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
		/>
	</svg>
);

const HaloButton = React.forwardRef<HTMLButtonElement, HaloButtonProps>(
	({ label, icon, variant = "primary", loading = false, className, children, ...props }, ref) => (
		<button
			ref={ref}
			className={cn(
				"inline-flex items-center justify-center rounded px-4 py-2 font-semibold transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-offset-2",
				variantClasses[variant],
				loading && "opacity-60 cursor-not-allowed",
				className
			)}
			disabled={loading || props.disabled}
			{...props}
		>
			{loading && spinner}
			{icon && <span className="mr-2">{icon}</span>}
			{label || children}
		</button>
	)
);

HaloButton.displayName = "HaloButton";

export default HaloButton;
