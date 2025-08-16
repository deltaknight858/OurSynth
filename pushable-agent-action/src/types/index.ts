export interface AgentAction {
  actionType: string;
  payload: any;
}

export interface Command {
  commandType: string;
  targetAgentId: string;
  parameters?: any;
}
