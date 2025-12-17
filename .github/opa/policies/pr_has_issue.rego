package pr_has_issue

default allow = false

# Helper: case-insensitive regex match
re_match(pattern, s) {
  regex.match(pattern, s)
}

# Accept if PR body contains common keywords linking an issue, e.g. "Closes #123" or "Fixes #123"
has_issue_link {
  body := input.pull_request.body
  body != null
  re_match("(?i)(closes|fixes|resolves)\\s+#\\d+", body)
}

# Accept if PR body contains an explicit Issue reference like "Issue: #123" or "Issue #123"
has_issue_reference {
  body := input.pull_request.body
  body != null
  re_match("(?i)issue\s*[:#]?\s*#?\\d+", body)
}

allow {
  has_issue_link
}

allow {
  has_issue_reference
}
