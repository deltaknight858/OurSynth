
export interface CommandDefinition {
  id: string;
  title: string;
  shortcut?: string;
  group: "Navigation" | "Actions" | "Help" | "System";
  keywords?: string[];
  icon?: React.ElementType;
  run: () => void;
  disabled?: boolean;
  description?: string;
}

export interface CommandGroup {
  name: string;
  commands: CommandDefinition[];
}

class CommandRegistry {
  private commands = new Map<string, CommandDefinition>();
  private listeners = new Set<(commands: CommandDefinition[]) => void>();

  register(command: CommandDefinition): void {
    this.commands.set(command.id, command);
    this.notifyListeners();
  }

  unregister(commandId: string): void {
    this.commands.delete(commandId);
    this.notifyListeners();
  }

  getAll(): CommandDefinition[] {
    return Array.from(this.commands.values());
  }

  getByGroup(): CommandGroup[] {
    const groups = new Map<string, CommandDefinition[]>();
    
    for (const command of this.commands.values()) {
      const groupName = command.group;
      if (!groups.has(groupName)) {
        groups.set(groupName, []);
      }
      const group = groups.get(groupName);
      if (group) {
        group.push(command);
      }
    }

    return Array.from(groups.entries()).map(([name, commands]) => ({
      name,
      commands: commands.sort((a, b) => a.title.localeCompare(b.title))
    }));
  }

  search(query: string): CommandDefinition[] {
    if (!query.trim()) {
      return this.getAll().slice(0, 20);
    }

    const normalizedQuery = query.toLowerCase();
    const matches: Array<{ command: CommandDefinition; score: number }> = [];

    for (const command of this.commands.values()) {
      if (command.disabled) continue;

      let score = 0;
      const searchTerms = [
        command.title,
        command.description || "",
        ...(command.keywords || []),
        command.group
      ];

      for (const term of searchTerms) {
        const normalizedTerm = term.toLowerCase();
        
        if (normalizedTerm.includes(normalizedQuery)) {
          score += normalizedTerm.startsWith(normalizedQuery) ? 10 : 5;
        }
        
        if (normalizedTerm === normalizedQuery) {
          score += 20;
        }
      }

      if (score > 0) {
        matches.push({ command, score });
      }
    }

    return matches
      .sort((a, b) => b.score - a.score)
      .map(match => match.command)
      .slice(0, 15);
  }

  subscribe(listener: (commands: CommandDefinition[]) => void): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  private notifyListeners(): void {
    const commands = this.getAll();
    this.listeners.forEach(listener => listener(commands));
  }

  execute(commandId: string): void {
    const command = this.commands.get(commandId);
    if (command && !command.disabled) {
      command.run();
    }
  }
}

export const commandRegistry = new CommandRegistry();

export function registerCommand(command: CommandDefinition): () => void {
  commandRegistry.register(command);
  return () => commandRegistry.unregister(command.id);
}