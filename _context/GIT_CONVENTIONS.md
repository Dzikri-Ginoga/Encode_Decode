# Git and GitHub Collaboration Conventions

## 1. Repository Configuration
- Remote URL: `https://github.com/Dzikri-Ginoga/KriptoHengker.git`
- Default Branch: `main`
- Primary Line Endings: `LF` (configured via `.gitattributes`)

## 2. Branching Strategy
Use lightweight feature branches off `main`. Branch naming must follow the structure:
`<type>/<scope>-<short-description>`

### Branch Types
- `feat/` : New feature or module implementation
- `fix/` : Bug fixes or algorithm correction
- `docs/` : Documentation updates or decision records
- `refactor/` : Code cleanup without changing functionality
- `style/` : CSS styling or UI visualization updates

### Examples
- `feat/modern1-lfsr-engine`
- `feat/super-crypto-pipeline`
- `fix/classic1-affine-padding`
- `docs/0001-add-lfsr-spec`

## 3. Commit Message Standard
Follow the Conventional Commits specification.

### Structure
```text
<type>(<scope>): <short summary in present tense>

[optional body providing technical details]

[optional footer for related issue/task IDs]
```

### Allowed Scopes
- `classic1` : Menu 1 module
- `classic2` : Menu 2 module
- `modern1`  : Menu 3 module (LFSR Stream Cipher)
- `modern2`  : Menu 4 module
- `super`    : Menu 5 pipeline module
- `ui`       : Visualizer, tabs, or general CSS
- `core`     : `main.js`, router, shared utilities
- `docs`     : Architecture decisions, PRD, or journal

### Commit Examples
- `feat(modern1): implement 4-bit LFSR keystream generator`
- `fix(super): pass hex string correctly between module pipeline steps`
- `style(ui): format step-by-step trace log container`
- `docs(journal): append task completion for repo setup`

## 4. Agent Operational Rules
When an automated agent operates on this repository, it must strictly adhere to the following sequence:

1. Pre-Flight Check: Run `git status` to ensure working tree is clean or aware of modified files.
2. Isolation: Never commit directly to `main`. Always work on a dedicated branch.
3. Atomic Commits: Group related changes together. Do not mix documentation updates with cipher logic refactoring in a single commit.
4. Journal Sync: Every commit modifying codebase logic or architecture must include an accompanying entry update in `docs/journal.json`.
5. No Binary Artifacts: Ensure `.gitignore` prevents tracking node modules, IDE configs, or OS metadata (`.DS_Store`, `Thumbs.db`).

## 5. Pull Request (PR) Workflow
1. Push branch to remote: `git push origin <branch-name>`
2. Open Pull Request targeting `main`.
3. PR Title format: `[<scope>] <Short summary of work done>`
4. PR Body Template:
```markdown
## Summary
Brief description of changes introduced.

## Affected Modules
- [ ] Classic 1
- [ ] Classic 2
- [ ] Modern 1 (LFSR)
- [ ] Modern 2
- [ ] Super Encryption Pipeline

## Verification Steps
1. Open `index.html` via static server.
2. Test input `XYZ` with key `ABC`.
3. Verify step-by-step trace log matches expected mathematical output.
```
