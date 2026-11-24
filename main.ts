import { mkdirSync, writeFileSync } from "node:fs";

// One sentence, 195 characters: a pitch to a friend who has never coded,
// asking them to let an AI agent build the app idea they keep describing.
const sentence =
  "You've told me about that little app over dinner a dozen times, so let an AI agent build it tonight while you watch, and if you don't love it by breakfast, all you've lost is one evening's story.";

// The gate only accepts 1 to 240 characters, so refuse to write anything
// outside that range rather than hand the judge an invalid entry.
if (sentence.length < 1 || sentence.length > 240) {
  throw new Error(`entry is ${sentence.length} characters, not 1-240`);
}

// The entry must be exactly one sentence, so check the shape too: one
// terminal full stop, no other sentence-ending punctuation inside it.
const stops = sentence.match(/[.!?]/g) ?? [];
if (stops.length !== 1 || !sentence.endsWith(".")) {
  throw new Error("entry must be exactly one sentence");
}
if (sentence.trim().length === 0) {
  throw new Error("entry must not be only whitespace");
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", sentence, "utf8");
console.log(`wrote ${sentence.length} characters to /output/entry.txt`);
