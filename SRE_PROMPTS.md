# SRE Agent Swarm - Prompt Library

## Quick Start Prompts

### Test the Setup
```
Create a simple agent team with 2 teammates to verify the setup is working.
Have them introduce themselves and list their capabilities.
```

## Incident Response Prompts

### General Incident Investigation
```
Create an SRE incident response team. The [SERVICE_NAME] service is experiencing [ISSUE_DESCRIPTION].

Spawn 3 agents:
1. Incident Response Agent: Analyze error logs and recent deployments
2. Monitoring Agent: Query Dynatrace for metrics around [TIMESTAMP]
3. Performance Agent: Check for performance degradation patterns

Have them collaborate to identify the root cause and propose remediation steps.
Create a shared incident timeline document.
```

### Database Performance Issue
```
Create an agent team to investigate database performance issues.

Spawn 4 agents:
- Agent 1: Review slow query logs and execution plans
- Agent 2: Check Dynatrace for database connection pool metrics
- Agent 3: Analyze recent schema changes and migrations
- Agent 4: Review application code for N+1 queries and inefficient patterns

Have them debate findings and converge on specific optimization recommendations.
```

### Memory Leak Investigation
```
The application memory usage has been growing steadily. Create an agent team
with competing hypotheses:

- Agent 1: Event listener memory leaks (hypothesis: unbounded listeners)
- Agent 2: Caching issues (hypothesis: cache growing without eviction)
- Agent 3: Connection pool leaks (hypothesis: unreleased connections)
- Agent 4: Object retention (hypothesis: closures holding references)

Use Dynatrace memory metrics. Have agents test their theories and disprove
each other until we find the actual cause.
```

### API Gateway Issues
```
Create an SRE team to investigate API gateway timeout issues.

Spawn 5 agents:
- Network agent: Check DNS, load balancer, and routing configs
- Backend agent: Analyze upstream service response times
- Config agent: Review gateway timeout and retry settings
- Monitoring agent: Pull Dynatrace traces for failed requests
- Dependency agent: Check external API dependencies

Require plan approval before any configuration changes.
```

## Production Readiness Prompts

### Full Production Readiness Review
```
Create an SRE team to conduct a production readiness review for the
new feature in branch [BRANCH_NAME].

Spawn 6 agents:
1. Security Agent: Review for OWASP top 10 vulnerabilities and secrets exposure
2. Performance Agent: Validate load testing results and response time SLOs
3. Infrastructure Agent: Verify resource limits, autoscaling, and capacity plans
4. Monitoring Agent: Ensure logs, metrics, traces, and alerts are configured
5. Chaos Agent: Test failure scenarios and circuit breakers
6. Documentation Agent: Verify runbooks, architecture docs, and on-call guides

Use Sonnet for all agents. Each agent should create a checklist and mark items
as pass/fail. Compile results into a production readiness scorecard.
```

### Kubernetes Deployment Review
```
Create an agent team to review the Kubernetes deployment configuration
at [PATH_TO_K8S_CONFIGS].

Spawn 4 specialists:
- Resource agent: Review requests, limits, HPA, and VPA settings
- Security agent: Check security contexts, network policies, and RBAC
- Reliability agent: Verify health checks, readiness probes, and PodDisruptionBudgets
- Config agent: Review ConfigMaps, Secrets, and environment variables

Have them each create a findings document with severity ratings.
```

### Database Migration Safety Review
```
We need to run a database migration in production. Create an SRE safety team.

Spawn 4 agents:
- Migration agent: Review the migration scripts for safety
- Rollback agent: Design and validate rollback procedures
- Performance agent: Estimate migration time and lock durations
- Monitoring agent: Set up alerts and metrics for the migration

Require plan approval. Each agent must sign off before proceeding.
```

## Performance Optimization Prompts

### Application Performance Audit
```
Create a performance optimization team to audit the application.

Spawn 5 agents:
- Frontend agent: Analyze bundle size, rendering, and client-side performance
- Backend agent: Profile API endpoints and identify slow operations
- Database agent: Review queries, indexes, and connection patterns
- Caching agent: Evaluate caching strategy and hit rates
- Infrastructure agent: Check resource utilization and scaling behavior

Use Dynatrace to gather baseline metrics. Each agent should propose
specific, measurable optimizations with expected impact.
```

### API Latency Investigation
```
The /api/v1/features endpoint p99 latency increased from 200ms to 800ms.
Create an agent team to investigate.

Spawn agents with hypotheses:
- Agent 1: Database query regression
- Agent 2: Increased payload size
- Agent 3: External API dependency slowdown
- Agent 4: Resource contention (CPU/memory)
- Agent 5: Network issues

Have them use Dynatrace traces to test each hypothesis. Update a shared
findings document as they rule out theories.
```

## Security Audit Prompts

### Security Posture Review
```
Create a security-focused SRE team to audit the codebase and infrastructure.

Spawn 5 agents:
1. Application Security: Review code for injection vulnerabilities, XSS, CSRF
2. Infrastructure Security: Check for misconfigurations in K8s, cloud resources
3. Pipeline Security: Review OPA policies, security scanning in CI/CD
4. Secrets Management: Scan for exposed credentials, API keys, tokens
5. Compliance: Verify logging, data retention, and regulatory requirements

Each agent should use the security checklist format and rate findings by severity.
Compile results into a security scorecard.
```

### Vulnerability Response
```
A critical vulnerability was announced in [DEPENDENCY_NAME]. Create an
incident response team.

Spawn 4 agents:
- Inventory agent: Find all usages of the vulnerable dependency
- Impact agent: Assess whether our usage is exploitable
- Remediation agent: Plan the upgrade path and breaking changes
- Verification agent: Design tests to confirm the fix

Use delegate mode. Coordinate the response and create an action plan.
```

## Chaos Engineering Prompts

### Failure Mode Testing
```
Create a chaos engineering team to test resilience of the [SERVICE_NAME] service.

Spawn 5 agents to test different failure scenarios:
- Agent 1: Database connection failures (test circuit breakers)
- Agent 2: Downstream API timeouts (test retry logic)
- Agent 3: Memory pressure (test graceful degradation)
- Agent 4: Pod failures (test Kubernetes self-healing)
- Agent 5: Network partitions (test eventual consistency)

Each agent should design an experiment, run it, and document the results.
Identify gaps in resilience and create improvement tasks.
```

### Disaster Recovery Drill
```
Create an agent team to conduct a disaster recovery drill.

Spawn 4 agents:
- Backup agent: Test backup restoration procedures
- Failover agent: Test automated failover mechanisms
- Data agent: Verify data consistency after recovery
- Communication agent: Test incident communication workflows

Document the drill results and update the disaster recovery runbook.
```

## Monitoring & Observability Prompts

### Observability Setup
```
Create an SRE team to set up comprehensive observability for the new service.

Spawn 4 agents:
- Metrics agent: Define RED metrics (Rate, Errors, Duration) and business KPIs
- Logging agent: Design structured logging strategy and log levels
- Tracing agent: Implement distributed tracing for key workflows
- Alerting agent: Create SLO-based alerts with runbook links

Use the Dynatrace MCP server to configure everything. Each agent should
create configuration files and documentation.
```

### SLO Definition Workshop
```
Create an agent team to define SLOs for the [SERVICE_NAME] service.

Spawn 3 agents:
- User Experience agent: Define SLIs based on user impact
- Reliability agent: Calculate error budgets and burn rates
- Alerting agent: Design multi-window, multi-burn-rate alerts

Have them debate what metrics matter most and converge on 3-5 key SLOs.
Document the SLOs with rationale and implementation plan.
```

## Post-Mortem Prompts

### Incident Post-Mortem
```
Create an agent team to conduct a blameless post-mortem for the incident
on [DATE] affecting [SYSTEM].

Spawn 5 agents:
- Timeline agent: Reconstruct the sequence of events from logs and metrics
- Root Cause agent: Apply the "5 Whys" technique to find underlying causes
- Impact agent: Quantify user impact, revenue loss, and SLO burn
- Detection agent: Analyze why the issue wasn't caught earlier
- Prevention agent: Propose safeguards and action items

Compile findings into a post-mortem document following the standard template.
```

## Cost Optimization Prompts

### Infrastructure Cost Review
```
Create an agent team to optimize infrastructure costs.

Spawn 4 agents:
- Compute agent: Identify overprovisioned instances and right-sizing opportunities
- Storage agent: Find unused volumes, snapshots, and optimize storage classes
- Network agent: Analyze data transfer costs and optimize traffic patterns
- Database agent: Review database instance sizes and reserved instance opportunities

Each agent should quantify potential savings with implementation complexity.
Prioritize quick wins.
```

## Capacity Planning Prompts

### Capacity Planning
```
We're expecting 5x traffic growth next quarter. Create a capacity planning team.

Spawn 4 agents:
- Load modeling agent: Project resource needs based on growth
- Scaling agent: Design horizontal and vertical scaling strategies
- Cost agent: Estimate budget impact of capacity increases
- Testing agent: Plan load tests to validate capacity plans

Use current Dynatrace metrics as baseline. Create a capacity plan with
milestones and budget projections.
```

## On-Call Improvements Prompts

### On-Call Experience Audit
```
Create an agent team to improve the on-call experience.

Spawn 4 agents:
- Alert agent: Review alert fatigue, false positives, and alert quality
- Runbook agent: Audit runbook coverage and update outdated procedures
- Escalation agent: Review escalation policies and response times
- Tooling agent: Identify gaps in on-call tooling and automation opportunities

Survey recent on-call shifts and compile improvement recommendations.
```

## Tips for Writing Effective Prompts

1. **Be Specific**: Include service names, time ranges, and relevant context
2. **Set Clear Goals**: Define what success looks like for the team
3. **Assign Distinct Roles**: Avoid overlapping responsibilities
4. **Include Data Sources**: Reference Dynatrace, logs, specific files
5. **Use Hypotheses**: For investigations, frame as competing theories
6. **Require Deliverables**: Ask for documents, checklists, or action items
7. **Set Constraints**: Use "require plan approval" for risky changes
8. **Choose Right Model**: Use Sonnet for complex reasoning, Haiku for simple tasks
9. **Enable Delegate Mode**: For complex coordination, press Shift+Tab
10. **Monitor Progress**: Check in on teammates and redirect as needed

## Common Patterns

### Pattern: Parallel Investigation
```
Create an agent team to investigate [PROBLEM] with [N] agents, each testing
a different hypothesis. Have them share findings and challenge each other's
conclusions.
```

### Pattern: Layered Review
```
Create an agent team to review [COMPONENT]. Spawn agents for each layer:
frontend, backend, database, infrastructure. Use task dependencies so each
agent builds on the previous layer's findings.
```

### Pattern: Specialist Deep Dive
```
Create an agent team with one coordinator and [N] specialists. The coordinator
should break down the work and assign focused tasks to each specialist.
Use delegate mode.
```

### Pattern: Red Team / Blue Team
```
Create an agent team with two sub-teams: Red team (find vulnerabilities)
and Blue team (propose defenses). Have them compete to improve the security
posture.
```

## Environment Variables

For easier prompt reuse, set environment variables:

```bash
export SRE_SERVICE="api-gateway"
export SRE_NAMESPACE="production"
export DT_ENVIRONMENT="https://abc12345.apps.dynatrace.com"
```

Then reference in prompts:
```
Create an agent team to investigate issues in $SRE_SERVICE
```
