export class Agent {
    private id: string;
    private isActive: boolean;

    constructor(id: string) {
        this.id = id;
        this.isActive = false;
    }

    initialize() {
        this.isActive = true;
        console.log(`Agent ${this.id} initialized.`);
    }

    executeAction(action: string) {
        if (!this.isActive) {
            console.log(`Agent ${this.id} is not active. Please initialize the agent first.`);
            return;
        }
        console.log(`Agent ${this.id} executing action: ${action}`);
        // Logic for executing the action goes here
    }

    deactivate() {
        this.isActive = false;
        console.log(`Agent ${this.id} deactivated.`);
    }
}