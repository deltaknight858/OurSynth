# PowerShell script to enable pushable agent action from the command center

function Invoke-AgentAction {
    param (
        [string]$agentId,
        [string]$action
    )

    # Simulate sending a command to the agent
    Write-Host "Sending action '$action' to agent with ID: $agentId"

    # Here you would include the logic to communicate with the agent
    # For example, using REST API calls or other IPC mechanisms

    # Simulate response from the agent
    $response = @{
        Status  = "Success"
        Message = "Action '$action' executed successfully on agent '$agentId'."
    }

    return $response
}

# Example usage
$agentId = "agent-001"
$action = "start"
$response = Invoke-AgentAction -agentId $agentId -action $action

# Output the response
Write-Host "Response from agent: $($response.Status) - $($response.Message)"