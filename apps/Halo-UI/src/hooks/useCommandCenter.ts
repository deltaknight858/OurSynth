
import { useEffect, useState, useCallback } from "react";
import { registerCommand } from "@/lib/commandRegistry";
import type { CommandDefinition } from "@/lib/commandRegistry";

export function useCommandCenter() {
  const [isOpen, setIsOpen] = useState(false);

  // Handle global Cmd+K shortcut
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        e.stopPropagation();
        setIsOpen(true);
      }
    };

    document.addEventListener("keydown", handleKeyDown, true);
    return () => document.removeEventListener("keydown", handleKeyDown, true);
  }, []);

  const openCommandCenter = useCallback(() => {
    setIsOpen(true);
  }, []);

  const closeCommandCenter = useCallback(() => {
    setIsOpen(false);
  }, []);

  const toggleCommandCenter = useCallback(() => {
    setIsOpen(prev => !prev);
  }, []);

  return {
    isOpen,
    openCommandCenter,
    closeCommandCenter,
    toggleCommandCenter,
    setIsOpen
  };
}

export function useRegisterCommand(command: CommandDefinition) {
  useEffect(() => {
    const unregister = registerCommand(command);
    return unregister;
  }, [command]);
}

export function useRegisterCommands(commands: CommandDefinition[]) {
  useEffect(() => {
    const unregisterFunctions = commands.map(command => registerCommand(command));
    return () => {
      unregisterFunctions.forEach(unregister => unregister());
    };
  }, [commands]);
}