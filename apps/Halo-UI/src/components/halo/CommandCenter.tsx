
import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";
import { commandRegistry, CommandDefinition } from "@/lib/commandRegistry";
import { cn } from "@/lib/utils";
import { 
  Search, 
  Navigation,
  Zap,
  HelpCircle,
  Settings,
  ChevronRight
} from "lucide-react";

export interface CommandCenterProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  placeholder?: string;
  className?: string;
}

const groupIcons: { [key: string]: React.ElementType } = {
  Navigation: Navigation,
  Actions: Zap,
  Help: HelpCircle,
  System: Settings,
};

const CommandCenter: React.FC<CommandCenterProps> = ({
  open,
  onOpenChange,
  placeholder = "Type a command or search...",
  className
}) => {
  const [query, setQuery] = useState("");
  const [commands, setCommands] = useState<CommandDefinition[]>([]);
  const [filteredCommands, setFilteredCommands] = useState<CommandDefinition[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleCommandSelect = useCallback((command: CommandDefinition) => {
    try {
      command.run();
      onOpenChange(false);
    } catch (error) {
      console.error("Command execution failed:", error);
    }
  }, [onOpenChange]);

  useEffect(() => {
    const unsubscribe = commandRegistry.subscribe(setCommands);
    setCommands(commandRegistry.getAll());
    return unsubscribe;
  }, []);

  useEffect(() => {
    const results = commandRegistry.search(query);
    setFilteredCommands(results);
    setSelectedIndex(0);
  }, [query, commands]);

  useEffect(() => {
    if (!open) {
      setQuery("");
      setSelectedIndex(0);
    }
  }, [open]);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === "Escape") {
      onOpenChange(false);
      return;
    }

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex(prev => (prev + 1) % (filteredCommands.length || 1));
      return;
    }

    if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex(prev => prev === 0 ? (filteredCommands.length - 1) : prev - 1);
      return;
    }

    if (e.key === "Enter") {
      e.preventDefault();
      if (filteredCommands.length > 0) {
        const selectedCommand = filteredCommands[selectedIndex];
        if (selectedCommand) {
          handleCommandSelect(selectedCommand);
        }
      }
    }
  }, [filteredCommands, selectedIndex, onOpenChange, handleCommandSelect]);

  useEffect(() => {
    if (open) {
      document.addEventListener("keydown", handleKeyDown);
      return () => document.removeEventListener("keydown", handleKeyDown);
    }
  }, [open, handleKeyDown]);

  const groupedCommands = React.useMemo(() => {
    if (query.trim()) {
      return [{ name: "Search Results", commands: filteredCommands }];
    }

    const groups = commandRegistry.getByGroup();
    return groups.filter(group => group.commands.length > 0);
  }, [filteredCommands, query]);

  const renderCommandItem = (command: CommandDefinition, index: number) => {
    const Icon = command.icon;
    const isSelected = index === selectedIndex;

    return (
      <CommandItem
        key={command.id}
        value={command.id}
        onSelect={() => handleCommandSelect(command)}
        className={cn(
          "relative flex items-center gap-3 px-4 py-3 cursor-pointer transition-all duration-200",
          "hover:bg-gradient-to-r hover:from-[rgba(var(--halo-primary),0.1)] hover:to-transparent",
          isSelected && "bg-gradient-to-r from-[rgba(var(--halo-primary),0.15)] to-transparent border-l-2 border-[rgb(var(--halo-primary))]"
        )}
        disabled={command.disabled}
      >
        <div className="flex items-center gap-3 flex-1 min-w-0">
          {Icon && (
            <div className={cn(
              "flex-shrink-0 w-5 h-5 transition-colors duration-200",
              isSelected 
                ? "text-[rgb(var(--halo-primary))]" 
                : "text-[rgb(var(--halo-muted))]"
            )}>
              <Icon size={20} />
            </div>
          )}
          
          <div className="flex-1 min-w-0">
            <div className={cn(
              "font-medium transition-colors duration-200",
              isSelected 
                ? "text-[rgb(var(--halo-fg))]" 
                : "text-[rgb(var(--halo-fg))]"
            )}>
              {command.title}
            </div>
            {command.description && (
              <div className="text-sm text-[rgb(var(--halo-muted))] truncate">
                {command.description}
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2">
          {command.shortcut && (
            <CommandShortcut className={cn(
              "px-2 py-1 rounded bg-[rgba(var(--halo-fg),0.05)] text-[rgb(var(--halo-muted))]",
              "border border-[rgba(var(--halo-fg),0.1)] font-mono text-xs",
              isSelected && "bg-[rgba(var(--halo-primary),0.1)] border-[rgba(var(--halo-primary),0.2)]"
            )}>
              {command.shortcut}
            </CommandShortcut>
          )}
          
          <ChevronRight 
            size={16} 
            className={cn(
              "text-[rgb(var(--halo-muted))] transition-colors duration-200",
              isSelected && "text-[rgb(var(--halo-primary))]"
            )} 
          />
        </div>
      </CommandItem>
    );
  };

  let commandIndex = 0;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent 
        className={cn(
          "max-w-2xl p-0 gap-0 overflow-hidden",
          "bg-gradient-to-br from-[rgba(var(--halo-bg),0.95)] to-[rgba(var(--halo-bg),0.9)]",
          "backdrop-blur-xl border border-[rgba(var(--halo-fg),0.1)]",
          "shadow-2xl shadow-[rgba(var(--halo-primary),0.1)]",
          "halo-glow-subtle",
          className
        )}
      >
        <Command
          className="bg-transparent border-none"
          shouldFilter={false}
          value={filteredCommands[selectedIndex]?.id}
        >
          <div className="flex items-center gap-3 px-4 py-3 border-b border-[rgba(var(--halo-fg),0.1)]">
            <Search 
              size={20} 
              className="text-[rgb(var(--halo-muted))] flex-shrink-0" 
            />
            <CommandInput
              value={query}
              onValueChange={setQuery}
              placeholder={placeholder}
              className="border-none bg-transparent text-[rgb(var(--halo-fg))] placeholder:text-[rgb(var(--halo-muted))] focus:ring-0 h-auto py-0"
            />
          </div>

          <CommandList className="max-h-[400px] overflow-y-auto scrollbar-thin scrollbar-thumb-[rgba(var(--halo-fg),0.2)] scrollbar-track-transparent">
            <CommandEmpty className="py-8 text-center">
              <div className="flex flex-col items-center gap-2">
                <Search 
                  size={32} 
                  className="text-[rgb(var(--halo-muted))] opacity-50" 
                />
                <p className="text-[rgb(var(--halo-muted))]">
                  No commands found for "{query}"
                </p>
                <p className="text-sm text-[rgb(var(--halo-muted))] opacity-70">
                  Try different keywords or browse available commands
                </p>
              </div>
            </CommandEmpty>

            <AnimatePresence>
              {groupedCommands.map((group, groupIndex) => {
                const GroupIcon = groupIcons[group.name as keyof typeof groupIcons];
                
                return (
                  <motion.div
                    key={group.name}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ delay: groupIndex * 0.1 }}
                  >
                    <CommandGroup>
                      <div className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-[rgb(var(--halo-muted))] bg-[rgba(var(--halo-fg),0.02)]">
                        {GroupIcon && <GroupIcon size={16} />}
                        {group.name}
                        <div className="ml-auto text-xs text-[rgb(var(--halo-muted))] opacity-70">
                          {group.commands.length} {group.commands.length === 1 ? 'command' : 'commands'}
                        </div>
                      </div>
                      
                      {group.commands.map((command) => {
                        const itemIndex = commandIndex++;
                        return renderCommandItem(command, itemIndex);
                      })}
                    </CommandGroup>
                    
                    {groupIndex < groupedCommands.length - 1 && (
                      <CommandSeparator className="bg-[rgba(var(--halo-fg),0.05)]" />
                    )}
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </CommandList>

          <div className="flex items-center justify-between px-4 py-2 text-xs text-[rgb(var(--halo-muted))] bg-[rgba(var(--halo-fg),0.02)] border-t border-[rgba(var(--halo-fg),0.05)]">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1">
                <kbd className="px-1.5 py-0.5 bg-[rgba(var(--halo-fg),0.1)] rounded border border-[rgba(var(--halo-fg),0.2)] font-mono">↑</kbd>
                <kbd className="px-1.5 py-0.5 bg-[rgba(var(--halo-fg),0.1)] rounded border border-[rgba(var(--halo-fg),0.2)] font-mono">↓</kbd>
                to navigate
              </span>
              <span className="flex items-center gap-1">
                <kbd className="px-1.5 py-0.5 bg-[rgba(var(--halo-fg),0.1)] rounded border border-[rgba(var(--halo-fg),0.2)] font-mono">↵</kbd>
                to select
              </span>
              <span className="flex items-center gap-1">
                <kbd className="px-1.5 py-0.5 bg-[rgba(var(--halo-fg),0.1)] rounded border border-[rgba(var(--halo-fg),0.2)] font-mono">esc</kbd>
                to close
              </span>
            </div>
            <div className="text-[rgb(var(--halo-muted))] opacity-70">
              {filteredCommands.length} results
            </div>
          </div>
        </Command>
      </DialogContent>
    </Dialog>
  );
};

export default CommandCenter;
