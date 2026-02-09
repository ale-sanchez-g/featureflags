# SRE Agent Swarm - Quick Start Guide

## Setup (5 minutes)

### 1. Verify Agent Teams Are Enabled

Agent teams are now enabled in your [~/.claude/settings.json](~/.claude/settings.json):

```json
{
  "env": {
    "CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS": "1"
  },
  "teammateMode": "auto"
}
```

### 2. Test Split Pane Mode (Optional)

For the best experience, install tmux to see all agents in separate panes:

```bash
# macOS
brew install tmux

# Then start a tmux session
tmux

# Or use iTerm2 with:
tmux -CC
```

If you prefer everything in one terminal, you can use in-process mode (no installation needed).

### 3. Verify Dynatrace Integration

Your Dynatrace MCP server is already configured in [.vscode/mcp.json](.vscode/mcp.json). Agents will have access to:
- Query metrics and traces
- Analyze logs
- Create dashboards
- Set up alerts

## Your First SRE Agent Team (2 minutes)

### Test the Setup

Start Claude Code and run:

```
Create a simple agent team with 2 teammates to verify the setup is working.
Have them introduce themselves and list their SRE capabilities.
```

You should see:
1. Claude creates the team
2. Two teammates spawn
3. They introduce themselves
4. The lead synthesizes their responses

### Control Teammates

**In in-process mode:**
- `Shift+Up/Down`: Navigate between teammates
- `Enter`: View a teammate's full session
- `Escape`: Interrupt a teammate
- `Ctrl+T`: Toggle task list
- Type: Send message to selected teammate

**In split-pane mode:**
- Click a pane to interact with that teammate
- Each teammate has their own visible terminal

## Quick Wins - Try These Prompts

### 1. Review Your CI/CD Security (5 min)

Your repo has OPA policies and security pipelines. Let's audit them:

```
Create an agent team to review the security setup in this repository.

Spawn 3 agents:
- Security pipeline agent: Review .github/workflows for security scanning
- OPA policy agent: Analyze OPA policy files for effectiveness
- Secrets agent: Scan for any exposed credentials or API keys

Have them compile findings into a security checklist.
```

### 2. Performance Baseline (3 min)

Establish performance baselines using Dynatrace:

```
Create an agent team to establish performance baselines for this application.

Spawn 2 agents:
- Metrics agent: Query Dynatrace for current performance metrics
- Analysis agent: Analyze the metrics and identify any concerns

Use the Dynatrace MCP server. Create a baseline document with current
performance characteristics.
```

### 3. Production Readiness (10 min)

Before your next deployment:

```
Create an SRE team to review production readiness for this repository.

Spawn 4 agents:
- Infrastructure agent: Review Kubernetes configs and resource limits
- Monitoring agent: Check observability setup (logs, metrics, traces)
- Security agent: Verify security scanning and OPA policies
- Testing agent: Review test coverage and CI/CD pipeline health

Each agent should create a go/no-go checklist. Compile into a readiness report.
```

## Understanding Agent Teams

### Team Structure

```
┌─────────────────────────────────────────┐
│          Team Lead (You)                │
│  Coordinates work, synthesizes results  │
└─────────────────┬───────────────────────┘
                  │
        ┌─────────┴─────────┬─────────────────┐
        │                   │                 │
┌───────▼────────┐  ┌──────▼──────┐  ┌──────▼──────┐
│  Teammate 1    │  │ Teammate 2  │  │ Teammate 3  │
│  (Incident     │  │ (Monitoring)│  │ (Security)  │
│   Response)    │  │             │  │             │
└────────────────┘  └─────────────┘  └─────────────┘
        │                   │                 │
        └─────────┬─────────┴─────────────────┘
                  │
        ┌─────────▼─────────┐
        │  Shared Task List │
        │  ~/.claude/tasks/ │
        └───────────────────┘
```

### How Agents Communicate

1. **Direct messaging**: Teammates send messages to each other
2. **Broadcast**: Send to all teammates at once (use sparingly)
3. **Shared task list**: Coordinate work and dependencies
4. **Automatic notifications**: Lead gets notified when teammates finish

### Token Usage

Each teammate is a separate Claude instance, so tokens add up:
- 3 teammates = ~3x the token usage
- Use for: Incidents, complex investigations, production reviews
- Don't use for: Simple tasks, single-file reviews

## Common Commands

### Start a Team
```
Create an agent team to [TASK]
```

### Spawn Specific Roles
```
Spawn a monitoring agent with the prompt: "[SPECIFIC INSTRUCTIONS]"
```

### Talk to a Teammate
```
Tell the security agent to focus on OPA policies
```

### Check Progress
```
Show me the status of all teammates and the task list
```

### Shut Down a Teammate
```
Ask the monitoring agent to shut down
```

### Clean Up the Team
```
Clean up the team
```

## Delegate Mode

For complex coordination, enable delegate mode:

1. Start your agent team
2. Press `Shift+Tab` to cycle into delegate mode
3. The lead will only coordinate, not implement

This prevents the lead from doing work itself and ensures proper delegation.

## Troubleshooting

### "Agent teams not enabled"
Solution: Restart Claude Code to pick up the settings.json changes

### Teammates not appearing
- Check: Are you in in-process mode? Press Shift+Down to see them
- Check: Is tmux installed? Run `which tmux`
- Try: Specify the mode explicitly: `--teammate-mode in-process`

### Lead doing work instead of delegating
```
Wait for your teammates to complete their tasks. Focus on coordination only.
```

Or press `Shift+Tab` to enable delegate mode.

### Too many permission prompts
Pre-approve common operations in [~/.claude/settings.json](~/.claude/settings.json):
```json
{
  "permissions": {
    "allowedCommands": {
      "bash": ["git", "ls", "cat"],
      "filesystem": {
        "read": ["/path/to/logs/**"]
      }
    }
  }
}
```

### Teammates stopped with errors
Navigate to the teammate with Shift+Up/Down and give them new instructions:
```
The error is because of [REASON]. Try [ALTERNATIVE APPROACH] instead.
```

## Next Steps

1. **Read the full guide**: [SRE_AGENT_SWARM.md](SRE_AGENT_SWARM.md)
2. **Browse prompts**: [SRE_PROMPTS.md](SRE_PROMPTS.md)
3. **Try a real scenario**: Pick an incident or review task
4. **Customize for your needs**: Adapt the agent roles and prompts
5. **Build your memory**: Document learnings in `~/.claude/projects/.../memory/`

## Example: End-to-End Incident Response

Let's walk through a complete incident response:

```bash
# 1. Start the investigation
Create an SRE incident response team. The API gateway is returning 503 errors.

Spawn 3 agents:
- Incident agent: Check recent deployments and changes
- Monitoring agent: Query Dynatrace for error patterns and metrics
- Performance agent: Analyze response times and throughput

# 2. Monitor progress
# (Agents work in parallel, sharing findings)

# 3. Give guidance to specific agents
Tell the monitoring agent to focus on the last 2 hours

# 4. Get status update
Show me what we've learned so far and what the current hypotheses are

# 5. Make a decision
Based on the findings, create an action plan to resolve the issue

# 6. Clean up
Shut down all teammates and clean up the team
```

## Best Practices

1. **Start small**: Begin with 2-3 agents, not 6
2. **Be specific**: Give detailed spawn prompts with context
3. **Monitor actively**: Check in on teammates, don't let them run unattended
4. **Size tasks right**: Each task should take 5-10 minutes
5. **Avoid file conflicts**: Assign different files to different agents
6. **Use delegate mode**: For complex multi-agent coordination
7. **Clean up**: Always shut down teammates and clean up the team when done

## Resources

- Full guide: [SRE_AGENT_SWARM.md](SRE_AGENT_SWARM.md)
- Prompt library: [SRE_PROMPTS.md](SRE_PROMPTS.md)
- Official docs: https://code.claude.com/docs/en/agent-teams
- Dynatrace MCP: https://github.com/dynatrace-oss/Dynatrace-mcp

## Getting Help

If you encounter issues:
1. Check the [Troubleshooting](#troubleshooting) section above
2. Read the [official documentation](https://code.claude.com/docs/en/agent-teams)
3. Report issues at https://github.com/anthropics/claude-code/issues

Happy SRE-ing! 🚀
