# Agent-log message template (paste into `#alpe-agent-log`)

After a Cursor agent finishes a task, the launcher posts this:

```
:robot_face: *Agent task complete*

Issue: <issue-url>
PR: <pr-url>
Branch: <branch-name>
Build: :large_green_circle: green   <!-- or :red_circle: red -->

*What changed*
- bullet 1
- bullet 2

*What I did NOT touch*
- file or system

*Follow-ups (optional)*
- new issue idea
```

Pin this template in `#alpe-agent-log` so it's easy to copy.

In Phase 1.5, the Cursor SDK posts this automatically; until then, the human launcher pastes it.
