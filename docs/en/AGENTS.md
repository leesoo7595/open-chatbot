# Agent Guidelines

## Overview

Use repository skills as the primary source of architecture rules.
The `skills/` directory is self-contained and does not require `docs/` at runtime.

## Skill-Based Activation

- `skills/fla-architecture/SKILL.md` (always)
- `skills/fla-file-directory-convention/SKILL.md` (path or module structure changes)
- `skills/fla-layer-resolver/SKILL.md` (select effective layer by deepest path segment)

Layer skills:
- `/_pages/` -> `skills/fla-page/SKILL.md`
- `/_containers/` -> `skills/fla-container/SKILL.md`
- `/_states/` -> `skills/fla-state/SKILL.md`
- `/_components/` -> `skills/fla-component/SKILL.md`
- `/_apis/` -> `skills/fla-api/SKILL.md`
- `/_utils/` -> `skills/fla-util/SKILL.md`

## Work Policy

First, understand existing style/flow in target files and minimize change scope.
For edits outside layer directories, apply global and file-directory rules only.

## Execution Policy (User requested)

- Build by **one function at a time**, not by whole modules.
- Required order:
  1. Define only the smallest needed interface/type for the function in the same scope (or split suffix file).
  2. Implement that one function.
  3. Explain how that function maps inputs to outputs and list edge cases.
- Do not create broad shared type/config files (`types`, `validation`, etc.) until a function first requires them.
- Before each function step, report:
  - function name
  - dependent interface/type (if newly added)
  - expected behavior
  - what to review
  - rollback point
- After each function step, report:
  - what changed
  - how to verify
  - blocking questions or assumptions
- Keep changes reversible and scoped.

## Learning-First Workflow (User requested)

- Start every work session from the smallest observable behavior:
  1. "Hello-world" baseline (does the layer execute/return anything).
  2. One tiny UI interaction (button click / event wiring).
  3. One observable output (console/debug log or visible response).
  4. Replace debug with actual behavior only after the previous step is verified.
- For each step, expose exactly one observable proof:
  - "this function ran"
  - "this event fired"
  - "this output changed"
- Do not optimize or generalize before the step is understandable from the previous step.
- Always keep the next step explainable from already-verified previous behavior.

## Product Direction Alignment (Chat widget work)

- Do not treat the component as a full “finished system” at the start. Add the next minimal function needed for the next visible behavior.
- Use widget behavior examples first (message enter, message list update, render), not infrastructure-first abstractions.
- Keep framework-coupling minimal while moving forward: avoid adding shared cross-cutting files until a function requires them.
- When a function is added, explain in one pass:
  - what input the function receives
  - what output or state changes it produces
  - what edge cases it handles
- Separate UI shell work from behavior work:
  - UI Shell step: structure, layout, spacing, typography, colors, and component visuals only.
  - Behavior step: event wiring, input/state/data flow, API invocation, and response rendering only.
  - Do not merge UI shell and behavior work in the same function unless it is the minimum required next step.
- Keep refactoring separate from feature work:
  - Refactor step: readability, naming, extraction, and cleanup only.
  - Feature step: user-visible behavior changes only.
  - Do not apply refactor and feature change in the same step unless the feature change is not possible without the refactor.
- Do not add provider/search abstractions until a simple message-send->response roundtrip is implemented and verified.

## Commit Approval Flow

- Do not run a commit until I confirm the commit message (and optional scope) with you.
- Before committing, propose:
  - commit message
  - files included
  - summary of changed behavior
- Wait for user confirmation before executing git add + git commit.
