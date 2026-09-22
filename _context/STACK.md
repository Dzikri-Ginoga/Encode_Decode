# Technical Stack Specifications

- Language: JavaScript (ES2022+ Native Browser Modules)
- Markup: HTML5 (Semantic structural elements)
- Styling: Modern CSS3 (Flexbox/Grid, CSS Custom Properties for theme support)
- Module System: Native ES Modules (`import` / `export`)
- Runtime Environment: Any standard HTTP static file server

## Run Rules
- No build tools, bundlers, or npm runtime dependencies.
- No test runner, linter, or typechecker configured.
- Must serve over HTTP (for example `python -m http.server`) because ES module imports fail on `file://`.
- Verification is manual: open index.html via static server and check the step trace panel.
