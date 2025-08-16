export class CommandCenter {
  private agents: Map<string, any>;

  constructor() {
    this.agents = new Map();
  }

  registerAgent(agentId: string, agent: any) {
    this.agents.set(agentId, agent);
  }

  sendCommand(agentId: string, command: string) {
    const agent = this.agents.get(agentId);
    if (agent) {
      agent.executeAction(command);
    } else {
      console.error(`Agent with ID ${agentId} not found.`);
    }
  }
}
