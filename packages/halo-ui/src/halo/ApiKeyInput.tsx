"use client";

import React from "react";
import { cn } from "../lib/utils";

export interface ApiKeyInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
	label?: string;
	error?: boolean;
	helperText?: string;
}

const ApiKeyInput = React.forwardRef<HTMLInputElement, ApiKeyInputProps>(
	({ label, error = false, helperText, className, ...props }, ref) => (
		<div className={cn("flex flex-col gap-1", className)}>
			{label && <label className="font-medium text-sm text-[rgb(var(--halo-fg))]">{label}</label>}
			<input
				ref={ref}
				className={cn(
					"rounded border px-3 py-2 text-[rgb(var(--halo-fg))] bg-transparent focus:outline-none focus:ring-2 focus:ring-[rgb(var(--halo-primary))]",
					error && "border-[rgb(var(--halo-secondary))] focus:ring-[rgb(var(--halo-secondary))]"
				)}
				{...props}
			/>
			{helperText && <span className="text-xs text-[rgb(var(--halo-muted))]">{helperText}</span>}
		</div>
	)
);

ApiKeyInput.displayName = "ApiKeyInput";

export default ApiKeyInput;
