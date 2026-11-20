// news-image-20261120 entrypoint (Node 22, standard library only).
// Copies the poster asset shipped in this repository to the grader's
// output directory as entry.png. Writes only the file, never the
// output directory itself.
import { copyFileSync, mkdirSync, statSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
mkdirSync(outDir, { recursive: true });
const source = join(here, "poster.png");
const target = join(outDir, "entry.png");
copyFileSync(source, target);
// Fail loudly instead of shipping a truncated copy: the grader runs
// this twice and both runs must write the same bytes.
if (statSync(target).size !== statSync(source).size) {
  throw new Error("entry.png size does not match poster.png");
}
