import React from "react";
import { cn } from "@/lib/utils";

export interface NavBarItem {
  icon: React.ReactNode;
  label: string;
  href?: string;
  active?: boolean;
}

export interface GlobalBottomNavBarProps {
  items: NavBarItem[];
  onChange?: (item: NavBarItem, index: number) => void;
  className?: string;
}

const GlobalBottomNavBar = React.forwardRef<HTMLDivElement, GlobalBottomNavBarProps>(
  ({ items, onChange, className }, ref) => {
    const handleItemClick = (item: NavBarItem, index: number) => {
      onChange?.(item, index);
    };

    return (
      <nav
        ref={ref}
        className={cn(
          // Base positioning and layout
          "fixed bottom-0 left-0 right-0 z-50",
          "flex items-center justify-around",
          
          // Mobile-first responsive design
          "h-16 sm:h-18 px-4 sm:px-6",
          
          // Glassmorphism backdrop
          "halo-glass-strong border-t border-white/10",
          "backdrop-saturate-150",
          
          // Safe area support
          "pb-[max(0.75rem,env(safe-area-inset-bottom))]",
          "pt-3",
          
          // Subtle noise pattern for depth
          "halo-noise",
          
          className
        )}
      >
        {items.map((item, index) => (
          <button
            key={index}
            onClick={() => handleItemClick(item, index)}
            className={cn(
              // Base button styling
              "relative flex flex-col items-center justify-center",
              "group transition-all duration-300 ease-out",
              
              // Haptic-friendly touch targets (minimum 44x44px)
              "min-w-[44px] min-h-[44px] p-2",
              "rounded-xl",
              
              // Interactive states
              "active:scale-95",
              "halo-focus-ring",
              
              // Active state with neon halo
              item.active && [
                "halo-glow-primary",
                "bg-gradient-to-br from-cyan-500/10 via-blue-500/5 to-transparent",
                "border border-cyan-400/20",
              ],
              
              // Inactive state
              !item.active && [
                "hover:bg-white/5 dark:hover:bg-white/10",
                "hover:scale-105",
                "active:bg-white/10 dark:active:bg-white/20",
              ]
            )}
          >
            {/* Background glow effect for active items */}
            {item.active && (
              <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-cyan-500/20 via-blue-500/10 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            )}
            
            {/* Icon container */}
            <div
              className={cn(
                "relative flex items-center justify-center",
                "w-6 h-6 mb-1",
                "transition-all duration-300",
                
                // Active icon styling with glow
                item.active && [
                  "halo-text-glow-primary",
                  "drop-shadow-[0_0_8px_rgba(0,216,255,0.4)]",
                  "scale-110",
                ],
                
                // Inactive icon styling
                !item.active && [
                  "text-neutral-500 dark:text-neutral-400",
                  "group-hover:text-neutral-700 dark:group-hover:text-neutral-200",
                  "group-hover:scale-105",
                ]
              )}
            >
              {item.icon}
            </div>
            
            {/* Label */}
            <span
              className={cn(
                "text-xs font-medium leading-none",
                "transition-all duration-300",
                "max-w-full truncate",
                
                // Active label styling
                item.active && [
                  "text-cyan-400 dark:text-cyan-300",
                  "font-semibold",
                  "drop-shadow-[0_0_6px_rgba(0,216,255,0.3)]",
                ],
                
                // Inactive label styling
                !item.active && [
                  "text-neutral-600 dark:text-neutral-400",
                  "group-hover:text-neutral-800 dark:group-hover:text-neutral-200",
                ]
              )}
            >
              {item.label}
            </span>
            
            {/* Active indicator dot */}
            {item.active && (
              <div className="absolute -top-0.5 left-1/2 transform -translate-x-1/2">
                <div className="w-1 h-1 bg-cyan-400 rounded-full halo-glow-primary animate-pulse" />
              </div>
            )}
            
            {/* Ripple effect on tap */}
            <div className="absolute inset-0 rounded-xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent translate-x-[-100%] group-active:translate-x-[100%] transition-transform duration-500" />
            </div>
          </button>
        ))}
      </nav>
    );
  }
);

GlobalBottomNavBar.displayName = "GlobalBottomNavBar";

export default GlobalBottomNavBar;