package pr_has_issue

default allow = false

has_issue_link if {
	input.pull_request.body != null
	regex.match("(?i)(closes|fixes|resolves)[[:space:]]+ale-sanchez-g/featureflags[[:space:]]*#[0-9]+", input.pull_request.body)
}

allow if has_issue_link