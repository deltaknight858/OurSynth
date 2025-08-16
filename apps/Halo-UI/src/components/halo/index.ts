
// Halo UI Design System - Component Exports
// Tree-shakeable component library with glassmorphism and neon aesthetics

export { default as HaloButton } from "./HaloButton";
export type { HaloButtonProps } from "./HaloButton";

export { default as HaloCard } from "./HaloCard";
export type { HaloCardProps } from "./HaloCard";

export { default as HaloInput } from "./HaloInput";
export type { HaloInputProps } from "./HaloInput";

export { default as ApiKeyInput } from "./ApiKeyInput";
export type { ApiKeyInputProps } from "./ApiKeyInput";

export { default as HaloTextarea } from "./HaloTextarea";
export type { HaloTextareaProps } from "./HaloTextarea";

export { default as PromptInput } from "./PromptInput";
export type { PromptInputProps } from "./PromptInput";

export { default as HaloSelect } from "./HaloSelect";
export type { HaloSelectProps, HaloSelectOption } from "./HaloSelect";

export { default as HaloDialog } from "./HaloDialog";
export type { HaloDialogProps } from "./HaloDialog";

export { default as HaloBadge } from "./HaloBadge";
export type { HaloBadgeProps } from "./HaloBadge";

export { default as HaloTooltip } from "./HaloTooltip";
export type { HaloTooltipProps } from "./HaloTooltip";

export { default as HaloToggle } from "./HaloToggle";
export type { HaloToggleProps } from "./HaloToggle";

export { default as HaloProgress } from "./HaloProgress";
export type { HaloProgressProps } from "./HaloProgress";

export { default as HaloCheckbox } from "./HaloCheckbox";
export type { HaloCheckboxProps } from "./HaloCheckbox";

export { default as HaloSlider } from "./HaloSlider";
export type { HaloSliderProps } from "./HaloSlider";

export { default as HaloTabs } from "./HaloTabs";
export type { HaloTabsProps, HaloTab } from "./HaloTabs";

export { default as HaloAlert } from "./HaloAlert";
export type { HaloAlertProps } from "./HaloAlert";

export { default as HaloSpinner } from "./HaloSpinner";
export type { HaloSpinnerProps } from "./HaloSpinner";

export { default as HaloAvatar } from "./HaloAvatar";
export type { HaloAvatarProps } from "./HaloAvatar";

export { default as HaloErrorBoundary } from "./HaloErrorBoundary";
export type { HaloErrorBoundaryProps } from "./HaloErrorBoundary";

export { default as HaloErrorBoundaryProvider, useErrorBoundaryContext } from "./HaloErrorBoundaryProvider";

export { default as GlobalBottomNavBar } from "./GlobalBottomNavBar";
export type { GlobalBottomNavBarProps, NavBarItem } from "./GlobalBottomNavBar";

export { default as CommandCenter } from "./CommandCenter";
export type { CommandCenterProps } from "./CommandCenter";

export { default as ChatInterface } from "./ChatInterface";
export type { ChatInterfaceProps, Message } from "./ChatInterface";

export { default as ThemeToggle } from "./ThemeToggle";

export { default as StepWizard } from "./StepWizard";
export type { StepWizardProps, StepDefinition, StepComponentProps, ValidationError } from "./StepWizard";

// Command Registry
export { commandRegistry, registerCommand } from "@/lib/commandRegistry";
export type { CommandDefinition, CommandGroup } from "@/lib/commandRegistry";
