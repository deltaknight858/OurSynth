"use client";

import React from "react";
import { cn } from "../lib/utils";

export interface GlobalBottomNavBarProps {
	items: { label: string; icon?: React.ReactNode; onClick: () => void }[];
	className?: string;
}

const GlobalBottomNavBar: React.FC<GlobalBottomNavBarProps> = ({ items, className }) => (
	<nav className={cn("fixed bottom-0 left-0 right-0 flex justify-around bg-[rgb(var(--halo-bg))] border-t border-[rgba(var(--halo-fg),0.1)] py-2 z-50", className)}>
		{items.map((item, idx) => (
			<button
				key={idx}
				className="flex flex-col items-center text-[rgb(var(--halo-fg))] hover:text-[rgb(var(--halo-primary))]"
				onClick={item.onClick}
			>
				{item.icon}
				<span className="text-xs mt-1">{item.label}</span>
			</button>
		))}
	</nav>
);

export default GlobalBottomNavBar;
