package pr_has_issue

default allow = false

has_issue_link if input.pull_request.body != null and regex.match("(?i)(closes|fixes|resolves)[[:space:]]*#[0-9]+", input.pull_request.body)

has_issue_reference if input.pull_request.body != null and regex.match("(?i)issue[[:space:]]*[:#]?[[:space:]]*#?[0-9]+", input.pull_request.body)

allow if has_issue_link

allow if has_issue_reference
