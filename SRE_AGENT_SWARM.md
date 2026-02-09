# SRE Agent Swarm Configuration

## Overview

This document describes the AI SRE agents swarm architecture designed for Site Reliability Engineering tasks. The swarm leverages Claude Code's agent teams feature to coordinate multiple specialized agents working in parallel.

## Prerequisites

- Claude Code with agent teams enabled (see `~/.claude/settings.json`)
- Dynatrace MCP server configured (see `.vscode/mcp.json`)
- Git repository with CI/CD pipelines

## Agent Team Architecture

### Team Lead
The main session that coordinates all SRE agents, synthesizes findings, and manages the shared task list.

### Specialized Teammates

#### 1. Incident Response Agent
**Role**: First responder for production incidents
**Responsibilities**:
- Analyze error logs and stack traces
- Identify root cause of incidents
- Propose immediate remediation steps
- Create runbooks for common issues
- Coordinate with other agents for cross-cutting issues

#### 2. Monitoring & Observability Agent
**Role**: System health and metrics analyst
**Responsibilities**:
- Query Dynatrace for system metrics
- Analyze performance trends
- Identify anomalies in logs and metrics
- Create alerts and SLO definitions
- Generate observability reports

#### 3. Infrastructure Reliability Agent
**Role**: Infrastructure and capacity planner
**Responsibilities**:
- Review infrastructure configurations
- Analyze resource utilization
- Plan capacity scaling
- Review Kubernetes/container configs
- Optimize infrastructure costs

#### 4. Security & Compliance Agent
**Role**: Security posture and compliance reviewer
**Responsibilities**:
- Review code for security vulnerabilities
- Analyze OPA policies (as seen in the repo)
- Check compliance with security standards
- Review CI/CD security pipeline configurations
- Identify secrets exposure risks

#### 5. Performance Optimization Agent
**Role**: Application performance engineer
**Responsibilities**:
- Profile application performance
- Identify bottlenecks
- Recommend optimization strategies
- Review database query performance
- Analyze API response times

#### 6. Chaos Engineering Agent
**Role**: Resilience tester and validator
**Responsibilities**:
- Design chaos experiments
- Test failure scenarios
- Validate fallback mechanisms
- Review circuit breakers and retries
- Assess blast radius of failures

## Usage Examples

### Example 1: Incident Response

```bash
Create an SRE agent team to investigate the production incident. Spawn:
- An incident response agent to analyze the error logs
- A monitoring agent to check Dynatrace metrics around the incident time
- A performance agent to identify if this is a performance degradation issue
Have them collaborate to find the root cause and recommend fixes.
```

### Example 2: Production Readiness Review

```bash
Create an SRE team to conduct a production readiness review for the new feature.
Spawn 5 agents:
- Infrastructure agent to review resource requirements
- Security agent to check for vulnerabilities
- Monitoring agent to verify observability setup
- Performance agent to validate performance requirements
- Chaos agent to test failure scenarios
Use Sonnet for all agents. Require plan approval before any changes.
```

### Example 3: Performance Investigation

```bash
Users report the application is slow. Create an agent team with competing hypotheses:
- Agent 1: Database query performance issues
- Agent 2: Memory leaks or resource exhaustion
- Agent 3: Network latency or external API delays
- Agent 4: Inefficient algorithms or code
- Agent 5: Infrastructure scaling issues
Have them debate and test each theory using Dynatrace data.
```

### Example 4: Security Audit

```bash
Create a security-focused SRE team to audit the codebase. Spawn:
- A security agent to review OPA policies and security pipeline
- An infrastructure agent to check for misconfigurations
- A monitoring agent to review security logging
Have each agent review their area and compile a security report.
```

### Example 5: Post-Mortem Analysis

```bash
Create an agent team to conduct a post-mortem for last night's outage.
Spawn 4 agents:
- Incident timeline agent: reconstruct the sequence of events
- Root cause agent: analyze logs to find the underlying cause
- Impact assessment agent: quantify user impact and business cost
- Prevention agent: recommend safeguards to prevent recurrence
Synthesize their findings into a post-mortem document.
```

## Best Practices for SRE Agent Teams

### 1. Size Tasks Appropriately
Break down investigations into self-contained units:
- "Analyze Dynatrace metrics for the last 24 hours"
- "Review Kubernetes deployment configs for resource limits"
- "Check error logs for the checkout service"

### 2. Give Teammates Sufficient Context
Include relevant information in spawn prompts:
```
Spawn a monitoring agent with the prompt: "Analyze Dynatrace metrics for the
API service between 2026-02-09 08:00 and 09:00 UTC. Focus on error rates,
latency p99, and throughput. The service uses the endpoint /api/v1/features.
Report any anomalies with severity ratings."
```

### 3. Avoid File Conflicts
When multiple agents need to edit files:
- Assign different components to different agents
- Use the shared task list to coordinate file access
- Have one agent own documentation while others own code

### 4. Use Delegate Mode for Complex Coordination
For large incident response or multi-system investigations:
1. Start the team
2. Press Shift+Tab to enable delegate mode
3. Let the lead focus on coordination while teammates execute

### 5. Leverage Dynatrace Integration
All SRE agents have access to the Dynatrace MCP server:
- Query metrics programmatically
- Pull traces and logs
- Create dashboards
- Set up alerting

### 6. Enforce Quality Gates with Hooks
Create hooks to ensure SRE standards:
- `TaskCompleted`: Verify test coverage before marking tasks done
- `TeammateIdle`: Ensure runbooks are updated after incident response

## Team Coordination Patterns

### Pattern 1: Parallel Investigation
Multiple agents investigate different aspects simultaneously:
- Faster time to resolution
- Reduces MTTR (Mean Time To Recovery)
- Catches issues across multiple layers

### Pattern 2: Challenge and Validate
Agents actively challenge each other's findings:
- Reduces confirmation bias
- Improves root cause accuracy
- Surfaces edge cases

### Pattern 3: Specialist + Generalist
One generalist agent coordinates while specialists dive deep:
- Lead: orchestrates overall response
- Teammates: specialized analysis

### Pattern 4: Layered Review
Agents review in layers (frontend → backend → infra → data):
- Each agent depends on the previous layer's findings
- Use task dependencies in the shared task list
- Systematic coverage of the stack

## Integration with Existing Tools

### Dynatrace
Agents can query metrics, logs, and traces via the MCP server.

### Git
- Review commit history for changes related to incidents
- Analyze pipeline configurations
- Check for recent deployments

### CI/CD Pipelines
- Review pipeline failures
- Analyze security scan results
- Check OPA policy enforcement

## Token Usage Considerations

Agent teams use significantly more tokens. For SRE work:

**Good use cases** (worth the cost):
- Production incidents (parallel investigation saves time)
- Production readiness reviews (comprehensive coverage)
- Complex performance investigations
- Security audits across multiple domains

**Not recommended** (use single session):
- Simple log analysis
- Single file reviews
- Routine monitoring tasks
- Quick configuration changes

## Troubleshooting

### Teammates Not Collaborating
If agents work in silos:
```
Remind your teammates to share findings with each other regularly.
Have them discuss their theories before concluding.
```

### Lead Implementing Instead of Delegating
```
Enable delegate mode by pressing Shift+Tab, or remind the lead:
"Wait for your teammates to complete their tasks. Focus on coordination only."
```

### Task Deadlocks
If tasks are blocked on dependencies:
```
Check the shared task list at ~/.claude/tasks/{team-name}/
Review which tasks are blocking others and resolve manually if needed.
```

### Permission Prompts
Pre-approve common SRE operations in [~/.claude/settings.json](~/.claude/settings.json):
- File reads from log directories
- Dynatrace queries
- Git commands

## Example Workflows

### Workflow 1: On-Call Incident Response
1. Alert fires from monitoring system
2. Start agent team: "Investigate production alert for high error rate"
3. Spawn: Incident Response + Monitoring + Performance agents
4. Agents collaborate to find root cause
5. Lead synthesizes findings and creates action items
6. One agent creates runbook while another implements fix
7. Monitoring agent verifies resolution

### Workflow 2: Weekly SRE Review
1. Start team: "Conduct weekly SRE review of production systems"
2. Spawn agents for: Performance, Security, Infrastructure, Monitoring
3. Each agent analyzes their domain for the past week
4. Lead compiles findings into weekly report
5. Team creates prioritized list of improvements

### Workflow 3: Pre-Deployment Validation
1. Before major deployment, start team
2. Spawn agents for comprehensive checks
3. Security agent: vulnerability scan
4. Performance agent: load test analysis
5. Infrastructure agent: capacity verification
6. Chaos agent: failure mode testing
7. Lead creates go/no-go decision with evidence

## Next Steps

1. Start with simple investigations to learn the workflow
2. Build up to more complex incident response scenarios
3. Create custom prompts for your specific SRE needs
4. Document lessons learned in `~/.claude/projects/.../memory/`
5. Iterate on team composition based on what works

## Resources

- [Agent Teams Documentation](https://code.claude.com/docs/en/agent-teams)
- [Subagents vs Agent Teams](https://code.claude.com/docs/en/sub-agents)
- [Dynatrace MCP Server](https://github.com/dynatrace-oss/Dynatrace-mcp)
- [Hooks for Quality Gates](https://code.claude.com/docs/en/hooks)
