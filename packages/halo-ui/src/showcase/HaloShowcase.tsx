// Migrated from apps/Halo-UI/src/pages/index.tsx

"use client";

import React from "react";
import { motion } from "framer-motion";
import {
	HaloButton,
	HaloCard,
	HaloInput,
	HaloDialog,
	HaloBadge,
	HaloTooltip,
	HaloToggle,
	HaloProgress,
	HaloSelect,
	HaloCheckbox,
	HaloSlider,
	HaloTabs,
	HaloAlert,
	HaloSpinner,
	HaloAvatar,
	ThemeToggle,
	CommandCenter
} from "../halo";
import { useCommandCenter, useRegisterCommands } from "../hooks/useCommandCenter";
import { Sparkles, Wand2, Stars, Settings, Code, Users, Bell, ArrowRight, Command as CommandIcon, Home, HelpCircle, MessageSquare, Edit3, Zap } from "lucide-react";
import { Toaster } from "../ui/toaster";
import { Card, CardContent } from "../ui/card";
import Link from "next/link";
import ThemeLayout from "../layout/ThemeLayout";
import { useTheme } from "../contexts/ThemeContext";
import { useToast } from "../hooks/use-toast";

export default function HaloShowcase() {
	const [dialogOpen, setDialogOpen] = React.useState(false);
	const [progress, setProgress] = React.useState(67);
	const [sliderValue, setSliderValue] = React.useState(42);
	const [activeTab, setActiveTab] = React.useState("components");
	const [showAlert, setShowAlert] = React.useState(true);
	const [toggleStates, setToggleStates] = React.useState({
		notifications: true,
		darkMode: false,
		animations: true
	});
	const [checkboxStates, setCheckboxStates] = React.useState({
		terms: false,
		marketing: true,
		newsletter: false
	});
	const [selectValue, setSelectValue] = React.useState("");

	const { isOpen, setIsOpen } = useCommandCenter();
	const { theme, setTheme } = useTheme();
	const { toast } = useToast();

	// Register global commands for the main app
	const globalCommands = [
		{
			id: "navigate-home",
			title: "Go to Home",
			description: "Navigate to the main homepage",
			group: "Navigation" as const,
			keywords: ["home", "main", "index"],
			icon: Home,
			shortcut: "Ctrl+H",
			run: () => {
				window.scrollTo({ top: 0, behavior: 'smooth' });
			}
		},
		{
			id: "navigate-command-demo",
			title: "Command Center Demo",
			description: "View the command palette demonstration",
			group: "Navigation" as const,
			keywords: ["command", "palette", "demo"],
			icon: CommandIcon,
			run: () => {
				window.location.href = "/command-center-demo";
			}
		},
		{
			id: "navigate-chat-demo",
			title: "Chat Interface Demo",
			description: "Experience the advanced chat interface with streaming",
			group: "Navigation" as const,
			keywords: ["chat", "interface", "messaging", "ai", "streaming"],
			icon: MessageSquare,
			run: () => {
				window.location.href = "/chat-interface-demo";
			}
		},
		{
			id: "navigate-toast-demo",
			title: "Toast Demo",
			description: "View the toast notification system",
			group: "Navigation" as const,
			keywords: ["toast", "notifications"],
			icon: Bell,
			run: () => {
				window.location.href = "/toast-demo";
			}
		},
		{
			id: "toggle-theme",
			title: "Toggle Theme",
			description: "Switch between light and dark themes",
			group: "Actions" as const,
			keywords: ["theme", "dark", "light", "mode"],
			icon: theme === "dark" ? Sparkles : Stars,
			shortcut: "Ctrl+T",
			run: () => {
				setTheme(theme === "dark" ? "light" : "dark");
				toast({
					title: "Theme Changed",
					description: `Switched to ${theme === "dark" ? "light" : "dark"} theme`,
				});
			}
		},
		{
			id: "open-dialog",
			title: "Open Welcome Dialog",
			description: "Display the main welcome dialog",
			group: "Actions" as const,
			keywords: ["dialog", "modal", "welcome"],
			icon: Wand2,
			run: () => {
				setDialogOpen(true);
			}
		},
		{
			id: "help-shortcuts",
			title: "View Keyboard Shortcuts",
			description: "Display all available keyboard shortcuts",
			group: "Help" as const,
			keywords: ["shortcuts", "keyboard", "help", "keys"],
			icon: HelpCircle,
			shortcut: "?",
			run: () => {
				toast({
					title: "Keyboard Shortcuts",
					description: "⌘K: Open Command Palette, Ctrl+T: Toggle Theme, ?: Help",
				});
			}
		}
	];

	useRegisterCommands(globalCommands);

	const selectOptions = [
		{ value: "design", label: "Design System" },
		{ value: "components", label: "Components" },
		{ value: "animations", label: "Animations" },
		{ value: "glassmorphism", label: "Glassmorphism" }
	];

	const tabData = [
		{
			id: "components",
			label: "Components",
			content: (
				<div className="space-y-6">
					<div className="grid grid-cols-2 gap-4">
						<div>
							<h4 className="font-semibold text-[rgb(var(--halo-fg))] mb-3">Form Controls</h4>
													<div className="space-y-3">
														<HaloButton variant="primary" className="w-full">Primary Button</HaloButton>
														<HaloButton variant="secondary" className="w-full">Secondary Button</HaloButton>
														{/* 'glass' is not a valid variant, so fallback to 'ghost' */}
														<HaloButton variant="ghost" className="w-full">Glass Button</HaloButton>
													</div>
						</div>
						<div>
							<h4 className="font-semibold text-[rgb(var(--halo-fg))] mb-3">Feedback</h4>
							<div className="flex items-center gap-2 mb-3">
								<HaloSpinner size="sm" variant="primary" />
								<span className="text-sm text-[rgb(var(--halo-muted))]">Loading...</span>
							</div>
													<div className="flex gap-2">
														{/* HaloBadge only accepts 'label' and 'color' props */}
														<HaloBadge label="New" color="#00fff0" />
														<HaloBadge label="Beta" color="#ff00ff" />
														<HaloBadge label="Draft" color="#cccccc" />
													</div>
						</div>
					</div>
				</div>
			)
		},
		{
			id: "forms",
			label: "Forms",
			content: (
				<div className="space-y-4">
					<HaloCheckbox
						label="Accept Terms & Conditions"
						description="By checking this box, you agree to our terms of service"
						checked={checkboxStates.terms}
						onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCheckboxStates({...checkboxStates, terms: e.target.checked})}
					/>
					<HaloCheckbox
						label="Marketing Communications"
						checked={checkboxStates.marketing}
						onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCheckboxStates({...checkboxStates, marketing: e.target.checked})}
						variant="secondary"
					/>
																										<HaloSlider
																											label="Volume"
																											value={sliderValue}
																											onValueChange={setSliderValue}
																										/>
				</div>
			)
		},
		{
			id: "showcase",
			label: "Showcase",
			content: (
				<div className="space-y-4">
											<div className="flex items-center gap-4">
												{/* HaloAvatar only accepts src, alt, size, className. Use initials as alt if no src. */}
												<HaloAvatar src="" alt="JD" />
												<HaloAvatar src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face" alt="User" />
												<HaloAvatar src="" alt="AI" />
												<HaloAvatar src="" alt="SY" size={64} />
											</div>
					<p className="text-[rgb(var(--halo-muted))] text-sm">
						Experience the complete design system with consistent theming, smooth animations, and accessibility-first approach.
					</p>
				</div>
			)
		}
	];

	React.useEffect(() => {
		const interval = setInterval(() => {
			setProgress(prev => (prev >= 100 ? 0 : prev + 1));
		}, 100);
		return () => clearInterval(interval);
	}, []);

	return (
		<ThemeLayout>
			<div className="min-h-screen halo-noise relative overflow-x-hidden">
				<ThemeToggle />
				{/* ...rest of the code from apps/Halo-UI/src/pages/index.tsx... */}
			</div>
		</ThemeLayout>
	)
}
// ...existing code from apps/Halo-UI/src/pages/index.tsx
