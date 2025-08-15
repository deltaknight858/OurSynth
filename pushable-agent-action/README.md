# Pushable Agent Action Project

## Overview
The Pushable Agent Action project enables the interaction between a command center and agents through a structured communication protocol. This project includes the implementation of agents that can receive commands and execute actions as instructed by the command center.

## Project Structure
```
pushable-agent-action
├── src
│   ├── agent
│   │   └── agent.ts
│   ├── command-center
│   │   └── commandCenter.ts
│   └── types
│       └── index.ts
├── scripts
│   └── push-agent-action.ps1
├── package.json
├── tsconfig.json
└── README.md
```

## Installation
To set up the project, follow these steps:

1. Clone the repository:
   ```
   git clone <repository-url>
   cd pushable-agent-action
   ```

2. Install the dependencies:
   ```
   npm install
   ```

3. Compile the TypeScript files:
   ```
   npm run build
   ```

## Usage
### Running the PowerShell Script
To enable the pushable agent action from the command center, execute the PowerShell script:
```
.\scripts\push-agent-action.ps1
```

### Example
1. Initialize the Command Center and Agent:
   ```typescript
   import { CommandCenter } from './src/command-center/commandCenter';
   import { Agent } from './src/agent/agent';

   const commandCenter = new CommandCenter();
   const agent = new Agent();

   commandCenter.registerAgent(agent);
   ```

2. Send a command to the agent:
   ```typescript
   commandCenter.sendCommand({ type: 'ACTION_TYPE', payload: { /* action data */ } });
   ```

## Contributing
Contributions are welcome! Please submit a pull request or open an issue for any enhancements or bug fixes.

## License
This project is licensed under the MIT License. See the LICENSE file for more details.