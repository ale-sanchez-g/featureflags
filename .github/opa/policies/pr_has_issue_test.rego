package pr_has_issue_test

import data.pr_has_issue

# Positive cases
test_closes_title_case if {
    data.pr_has_issue.allow with input as {"pull_request": {"body": "Closes ale-sanchez-g/featureflags#123"}}
}

test_fixes_uppercase if {
    data.pr_has_issue.allow with input as {"pull_request": {"body": "FIXES ale-sanchez-g/featureflags #45"}}
}

test_resolves_mixed_case if {
    data.pr_has_issue.allow with input as {"pull_request": {"body": "resolves ale-sanchez-g/featureflags#9"}}
}

test_case_insensitivity if {
    data.pr_has_issue.allow with input as {"pull_request": {"body": "clOsEs ale-sanchez-g/featureflags#77"}}
}

# Negative / edge cases
test_invalid_repo if {
    not data.pr_has_issue.allow with input as {"pull_request": {"body": "Closes someoneelse/featureflags#1"}}
}

test_missing_issue_number_no_hash if {
    not data.pr_has_issue.allow with input as {"pull_request": {"body": "Closes ale-sanchez-g/featureflags"}}
}

test_missing_issue_number_hash_only if {
    not data.pr_has_issue.allow with input as {"pull_request": {"body": "Closes ale-sanchez-g/featureflags#"}}
}

test_body_null if {
    not data.pr_has_issue.allow with input as {"pull_request": {"body": null}}
}
