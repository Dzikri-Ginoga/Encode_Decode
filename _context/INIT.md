# Repository Initialization Sequence

Execute steps sequentially to bootstrap the repo. Current state is pre-scaffold: index.html is a stub, js/ and css/ do not exist yet.

1. Directory Creation:
   ```bash
   mkdir -p css js/shared js/modules/classic1 js/modules/classic2 js/modules/modern1 js/modules/modern2 js/modules/super-crypto docs
   ```

2. Base File Provisioning:
   - Update index.html with root entry script `<script type="module" src="js/main.js"></script>`.
   - Create css/styles.css with responsive layout and visualizer log styles.
   - Create js/main.js as central module loader and tab router.
   - Create js/shared/utils.js for bitwise operations, ASCII/hex conversion, and string formatting helpers.

3. Module Stubbing:
   - In each cipher directory (classic1, classic2, modern1, modern2), create cipher.js for pure logic and view.js for DOM handling and step log rendering.
   - Every cipher.js must export `encrypt(input, key)` and `decrypt(input, key)`, each returning `{ result: string, steps: Array<{ title: string, detail: string }> }` with JSDoc annotations.

4. Super Encryption Engine:
   - Implement js/modules/super-crypto/pipeline.js to run classic1 -> classic2 -> modern1 -> modern2 in sequence with aggregated trace.
   - Implement js/modules/super-crypto/view.js for aggregated step visualizer.

5. Journal Initialization:
   - Ensure docs/journal.json contains project metadata and an entry per logic or architecture change.
