// One Line, No Deadline Met
// make.fun bounty: u-markk-st-one-line-no-deadline-met-6adc00ce
//
// A tiny Node program (standard library only) that writes the entry line to
// output/entry.txt. The grader runs it with its own output directory, so all
// paths are resolved relative to this source file, never the working directory.
//
// The entry is a single-line joke giving an excuse for a missed deadline:
// the deadline itself gave up and walked out after one look at the to-do list.

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const ENTRY =
  "I didn't miss the deadline, the deadline missed me: it showed up, saw my to-do list, and left out of respect.";

// Guard: the gate only accepts UTF-8 text of 1 to 200 characters, not only
// whitespace, as a single line. Refuse to write anything that breaks that,
// and say exactly which rule failed so a bad edit is caught here, not by
// the grader. (Character count is by Unicode code point.)
if ([...ENTRY].length < 1 || [...ENTRY].length > 200) {
  throw new Error(
    `Gate rule failed: entry must be 1-200 characters, got ${[...ENTRY].length}.`,
  );
}
if (/[\r\n]/.test(ENTRY)) {
  throw new Error(
    "Gate rule failed: entry must be a single line with no newline characters.",
  );
}
if (/https?:\/\//.test(ENTRY)) {
  throw new Error(
    "Gate rule failed: entry must contain no link.",
  );
}
if (ENTRY.trim().length === 0) {
  throw new Error("Gate rule failed: entry must not be only whitespace.");
}

// Resolve paths relative to this file so the program works from any cwd.
const sourceDir = dirname(fileURLToPath(import.meta.url));
const outputDir = join(sourceDir, "output");
const outputFile = join(outputDir, "entry.txt");

mkdirSync(outputDir, { recursive: true });
writeFileSync(outputFile, ENTRY, "utf8");

console.log(`Wrote ${[...ENTRY].length} characters to ${outputFile}`);
