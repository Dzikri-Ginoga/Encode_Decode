# Agent Execution Guidelines and Protocols

## 1. Core Operating Principles

1. **Research First (No Assumptions):**
   - Do research if needed; do not assume cipher implementations, mathematical operations, shift directions, or parameter sizes[cite: 2].
   - Cross-reference all algorithm implementations against provided lecture materials or verified reference specifications before writing code[cite: 2].

2. **Formatting and Styling Constraints:**
   - **No Emojis:** Do not use emojis anywhere in codebase comments, UI text, commit messages, PR descriptions, or documentation files.
   - **No Em or En Dashes:** Do not use em dashes or en dashes in documentation, code comments, or UI text. Use standard ASCII hyphens (-) or alternative standard punctuation such as colons, semicolons, or commas.
   - **No Lucide Icons:** Do not import or integrate Lucide icons or any third-party icon libraries. Render UI indicators using pure CSS, semantic HTML elements, or standard ASCII characters.

3. **Architecture and Code Constraints:**
   - **Vanilla JS Modular Monolith:** Use native Browser ES Modules (`<script type="module">`). Do not add build tools, bundlers, or npm runtime dependencies.
   - **UI Isolation:** Pure cipher math logic must remain completely isolated from DOM interactions. Cipher logic must reside in `cipher.js` and UI rendering in `view.js`.

---

## 2. Module Interface Specification

Every cipher module under `js/modules/` must export two primary functions: `encrypt` and `decrypt`[cite: 1].

```javascript
/**
 * Executes cipher transformation and returns output with step logs.
 * @param {string} input - Plaintext or Ciphertext input
 * @param {object} key - Cipher key parameters
 * @returns {{ result: string, steps: Array<{ title: string, detail: string }> }}
 */
export function encrypt(input, key) {
  // Logic implementation
}

/**
 * Executes reverse cipher transformation and returns output with step logs.
 * @param {string} input - Ciphertext or Plaintext input
 * @param {object} key - Cipher key parameters
 * @returns {{ result: string, steps: Array<{ title: string, detail: string }> }}
 */
export function decrypt(input, key) {
  // Logic implementation
}
```

## 3. Documentation and Indexing Protocols
Decision Records:

 - Any architectural modification or module interface change must be documented in docs/ following the format docs/NNNN-title-DD-mon-YYYY.md.

 - Each decision record must begin with the standardized ## Meta block.

Document Indexing:

 - Every newly created file in docs/ must be registered in docs/INDEX.md.

Task Completion Logging:

 - Upon finishing any task or commit, append an entry to docs/journal.json describing the change and referencing the relevant decision record ID.


## 4. Documentation Registry and Index 
### Project Specifications
 - @_context/PRD.md -  Product Requirements Document   
 - @context/STACK.md - Technology Stack Specifications
 - @context/INIT.md - Repository Setup Sequence
 - @context/GIT_CONVENTIONS.md - Git and GitHub Collaboration Standards
