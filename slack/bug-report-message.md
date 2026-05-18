# Bug report message template (paste into Slack Workflow Builder)

Use this in the **"Send a message"** step of the bug-report Workflow in `#alpe-bugs`.
Variable names assume Workflow Builder field IDs `game_slug`, `url`, `browser`,
`expected`, `actual`, `severity`. Adjust if your Workflow uses different IDs.

```
:bug: *Bug report — {{game_slug}}*

*URL:* {{url}}
*Browser/device:* {{browser}}
*Severity:* {{severity}}

*Expected*
{{expected}}

*Actual*
{{actual}}

Reporter: <@{{user}}>
Next step: open a GitHub issue using the "Bug report" template on the game repo.
```

## Suggested follow-up actions

- React with :eyes: when triaging.
- React with :white_check_mark: once a GitHub issue exists.
- Edit the message thread with the issue link.
