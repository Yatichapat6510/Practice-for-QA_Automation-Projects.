# CLAUDE.md

This file provides guidance to Claude Code when working in this directory.

## What this is

`02_JavaScript/` is a learning/practice folder (one of several numbered folders in the parent `QA_Projects` repo: Python, Playwright, Robot Framework, etc.). It teaches JavaScript, HTML and CSS from basics up to a small multi-file web app. The author is a QA engineer learning to code, so the material is meant to be read, run and tweaked, not shipped.

- **No root `package.json`, no build step, no linter, no dependencies.** Everything runs on plain Node.js (developed on v24) or in the browser.
- The only `package.json` is in `js-data-structure-algorithm/` and has just run scripts.
- **Comments and user-facing strings are in Thai** (code identifiers are English). Keep new comments in Thai and explain the *why* in a teaching tone, matching the existing files. Reply to the user in whatever language they use.
- [README.md](README.md) (Thai) is the folder map and says where new files belong. Keep it in sync when adding or moving things.

## Layout

| Folder | Purpose | Module system | How to run |
| --- | --- | --- | --- |
| [JavaScript/](JavaScript/) | One-file basics: array/map/filter/reduce, destructuring, spread/rest, string, object, async | none (scripts) | `node "JavaScript/Array Map.js"` |
| [HTML/](HTML/) + [CSS/](CSS/) | Basic DOM practice (`index.html`, `style.css`) | browser | Live Server |
| [OOP/](OOP/) | `class`, encapsulation, inheritance, polymorphism, abstraction, combined pet-shop example | CommonJS | `cd OOP && node Class.js` |
| [js-data-structure-algorithm/](js-data-structure-algorithm/) | Big-O examples, linked list/stack/queue, graph, BST, plus `lesson-summary.html` | CommonJS | `npm start` inside it |
| [Projects/QA-Test-Tracker/](Projects/QA-Test-Tracker/) | Framework-free test-case manager (HTML + CSS + ES modules) | ES modules | local server (see below) |

File names in `JavaScript/` contain spaces, commas and typos (`Arrow Funtion.js`, `Sqread Operator.js`, `Rest Parsmeter.js`, `Callback , Promise , Async Await.js`). Quote the paths in shell commands and don't "fix" the names unless asked, because the README and the author's notes refer to them.

## Commands

All run from `02_JavaScript/`.

```bash
# Single practice file
node "JavaScript/Array Map.js"

# OOP: each file runs its own demo when executed directly
cd OOP
node Class.js            # also Encapsulation / Inheritance / Polymorphism / Abstraction / OOP_Combined
node --test              # all tests (35 across 6 suites); uses built-in node:test
node --test OOP.test.js

# Data structures & algorithms
cd js-data-structure-algorithm
npm start                          # run every demo; exits non-zero if any file throws
npm run algorithm | linear | non-linear   # one category
node run-all.js 01-algorithm       # same as above, without npm

# QA Test Tracker: must be served over http (file:// blocks ES modules and fetch)
cd Projects/QA-Test-Tracker
python -m http.server 5500         # then open http://localhost:5500
```

`run-all.js` is the only "test" for the DSA folder: it spawns each `NN-*.js` and every `demo.js` with `cwd` set to that file's folder and fails on a non-zero exit. A new example must be named with a two-digit prefix (algorithm folder) or be a `demo.js` to be picked up.

## Conventions

**CommonJS code (OOP/, js-data-structure-algorithm/)**
- Each file ends with `module.exports = { ... }`, followed by an `if (require.main === module) { ...demo... }` block so the file can be both imported by tests/other files and run directly. Preserve this pattern; it is what makes `OOP.test.js` possible without printing demo output.
- Data-structure folders pair a class file (`Stack.js`) with a `demo.js` that `require`s it.
- Indentation is not uniform: `OOP/` and `Projects/` use **tabs**, `js-data-structure-algorithm/` and `JavaScript/` use **spaces**. Match the file you are editing.

**OOP tests** ([OOP/OOP.test.js](OOP/OOP.test.js)): `describe`/`test` from `node:test` plus `node:assert/strict`. Every test builds its own objects; no shared state except `Users.count`, which is asserted relative to a `before` snapshot. When changing a class's exported API or behaviour in `OOP/`, update this file in the same change and run `node --test`.

**QA Test Tracker** ([Projects/QA-Test-Tracker/](Projects/QA-Test-Tracker/)): read its [README](Projects/QA-Test-Tracker/README.md) first. Architecture in short:
- `index.html` loads only `js/main.js` (`type="module"`); CSS is split `base` → `layout` → `components` → `animations`.
- One-way data flow: user event → `main.js` handler → `TestCaseStore` method (`add/update/remove/setStatus/importMany/clear/query`) → store dispatches `"change"` → `main.js` saves to `localStorage` and calls `render()`. Don't call `render()` or `storage.set` from individual handlers.
- `store.js` and `validation.js` never touch the DOM and return copies of data (`#private` fields, `{ ok, errors | testCase }` result objects). Everything that touches the DOM lives in `ui.js`, which exposes an `elements` map of cached nodes.
- Status/priority/module lists and storage keys live in `constants.js`. Adding a status means editing `constants.js` plus the `[data-status]` colours in `components.css`; dropdowns, validation and stats follow automatically.
- User text must be inserted with `textContent` (never `innerHTML`); this is deliberate XSS protection and documented in `ui.js`.
- `data-testid` attributes in `index.html` (e.g. `case-form`, `submit-case`, `case-row`, `row-edit`, `row-delete`, `stat-pass`) are the stable hooks for Playwright tests written against this page. Don't rename them casually, and add one to any new interactive element.
- DevTools hook: `window.qaTracker = { store, filters, render }`. localStorage keys are prefixed `qa-tracker:`.
- Keyboard shortcuts use `event.code` (`Slash`, `KeyN`) rather than `event.key` so they work on the Thai keyboard layout.

## Gotchas

- [HTML/index.html](HTML/index.html) is mostly commented-out lessons, and its `<script src="Start.js">` / `style.css` paths don't resolve from that folder (real files are `../JavaScript/Start.js`, `../CSS/style.css`). The README notes this. [JavaScript/Start.js](JavaScript/Start.js) is likewise mostly commented-out snippets that the author toggles on to experiment.
- Git state: `OOP/`, `Projects/`, `js-data-structure-algorithm/` and this folder's `README.md` were still untracked when this file was written, and the git root is the parent `QA_Projects` repo (the parent has CI and Robot/Playwright work that is unrelated to this folder). Commit only what the user asks for.
- `.gitignore` ignores `node_modules/`, `__pycache__/` and `.venv/`.
