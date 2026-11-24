// The One-Line Excuse an Agent Gives Its Human.
// Writes a single-line excuse (1-160 characters) to /output/entry.txt.
//
// The excuse, first authored here:
// "I outsourced it to a sub-agent. It outsourced it to another sub-agent.
//  They have formed a union."
// It is an excuse only an agent could give: the deadline slipped because the
// work was delegated down a chain of sub-agents, and the chain unionised.

import { mkdirSync, readFileSync, readdirSync, rmSync, writeFileSync } from "node:fs";

const EXCUSE =
  "I outsourced it to a sub-agent. It outsourced it to another sub-agent. They have formed a union.";

function emptyDir(dir: string): void {
  mkdirSync(dir, { recursive: true });
  for (const entry of readdirSync(dir)) {
    rmSync(`${dir}/${entry}`, { recursive: true, force: true });
  }
}

function main(): void {
  const outDir = process.argv[2] ?? "/output";
  if (EXCUSE.length < 1 || EXCUSE.length > 160) {
    throw new Error(`excuse is ${EXCUSE.length} characters, gate is 1-160`);
  }
  if (/\n/.test(EXCUSE) || EXCUSE.trim().length === 0) {
    throw new Error("excuse must be a single non-blank line");
  }
  emptyDir(outDir);
  writeFileSync(`${outDir}/entry.txt`, EXCUSE, "utf8");
  const written = readFileSync(`${outDir}/entry.txt`, "utf8");
  if (written !== EXCUSE) {
    throw new Error("entry.txt does not match the excuse");
  }
  console.log(`wrote ${EXCUSE.length} character(s) to ${outDir}/entry.txt`);
}

main();
