#!/usr/bin/env bun
// A model router you can see. Jev reads the request, answers ONE
// multiple-choice question (small / medium / large model?), and prints the
// probability of each option. Then the request goes to the winner via OpenRouter.
//
//   bun router.ts                      run the five demo prompts
//   bun router.ts "your prompt here"   route one prompt
//   bun router.ts --decide-only ...    show Jev's decision, skip the model call
//
// Keys come from your shell: TYPESAFE_API_KEY (always) and OPENROUTER_API_KEY
// (only when you want the chosen model to answer). Neither is ever printed.

const MODELS: Record<string, string> = {
  small: "openai/gpt-6-luna",
  medium: "google/gemini-3.6-flash",
  large: "anthropic/claude-sonnet-5",
};

const QUESTION = {
  route: {
    type: "choice",
    instructions: "Which size of AI model does this request need to be answered correctly?",
    criteria: {
      small: "Trivial: arithmetic, short facts, greetings, one-line rewrites",
      medium: "Everyday: explanations, summaries, short creative writing, simple code",
      large: "Hard: math proofs, multi-step reasoning, finding and fixing bugs in code, long or subtle analysis",
    },
  },
};

const DEMO_PROMPTS = [
  "What's 2+2?",
  "Write a haiku about coffee.",
  "Explain BGP route selection to a network engineer, in order.",
  "Prove there are infinitely many primes.",
  "This Python function returns the wrong total when the list has duplicate IDs. Find the bug and fix it:\n\ndef total(items):\n    seen = {}\n    for it in items:\n        seen[it['id']] = it['qty']\n    return sum(seen.values())",
];

const SURE_ENOUGH = 0.6;
const JEV_PRICE_PER_TOKEN = 0.042 / 1_000_000;

function typesafeKey(): string {
  const key = process.env.TYPESAFE_API_KEY;
  if (!key) throw new Error('set TYPESAFE_API_KEY first: export TYPESAFE_API_KEY="your-key"');
  return key;
}

function bar(p: number, width = 20): string {
  const n = Math.round(p * width);
  return "█".repeat(n) + "·".repeat(width - n);
}

async function decide(prompt: string, key: string) {
  const t0 = performance.now();
  const res = await fetch("https://api.typesafe.ai/v1/systemone", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({ model: "jev-latest", state: prompt, questions: QUESTION }),
  });
  if (!res.ok) throw new Error(`Jev answered HTTP ${res.status}: ${(await res.text()).slice(0, 300)}`);
  const json: any = await res.json();
  const ms = performance.now() - t0;
  const a = json.answers.route;
  return { choice: a.choice as string, probs: a.probabilities as Record<string, number>, ms, cost: (json.usage?.input_tokens ?? 0) * JEV_PRICE_PER_TOKEN };
}

async function answer(model: string, prompt: string) {
  const key = process.env.OPENROUTER_API_KEY;
  if (!key) throw new Error("set OPENROUTER_API_KEY to send the request to the chosen model");
  const t0 = performance.now();
  const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    // Room for reasoning models: at low max_tokens they can spend it all thinking and return nothing.
    body: JSON.stringify({ model, messages: [{ role: "user", content: prompt }], max_tokens: 3000, usage: { include: true } }),
  });
  const json: any = await res.json();
  if (!res.ok) throw new Error(`OpenRouter answered HTTP ${res.status}: ${json?.error?.message ?? "no message"}`);
  return { text: String(json.choices?.[0]?.message?.content ?? "").trim(), ms: performance.now() - t0, cost: json.usage?.cost as number | undefined };
}

const args = process.argv.slice(2);
const decideOnly = args.includes("--decide-only");
const given = args.filter((a) => a !== "--decide-only");
const prompts = given.length ? [given.join(" ")] : DEMO_PROMPTS;
const key = typesafeKey();

for (const prompt of prompts) {
  console.log(`\n━━━ ${prompt.split("\n")[0]}${prompt.includes("\n") ? " …" : ""}`);
  const d = await decide(prompt, key);
  console.log(`Jev decided in ${d.ms.toFixed(0)} ms for $${d.cost.toFixed(7)}:`);
  for (const size of ["small", "medium", "large"]) {
    const p = d.probs[size] ?? 0;
    const mark = size === d.choice ? "  ◀ PICKED" : "";
    console.log(`  ${size.padEnd(6)} ${bar(p)} ${p.toFixed(2)}${mark}`);
  }
  // Code, not Jev, decides what to do with uncertainty: below the bar, play it safe and move up one size.
  const sizes = ["small", "medium", "large"];
  let pick = d.choice;
  const top = d.probs[pick] ?? 0;
  if (top < SURE_ENOUGH && pick !== "large") {
    pick = sizes[sizes.indexOf(pick) + 1];
    console.log(`Jev is only ${top.toFixed(2)} sure, under ${SURE_ENOUGH}: the code plays it safe and moves up to ${pick}.`);
  }
  console.log(`→ sending to ${pick}: ${MODELS[pick]}`);
  if (decideOnly) continue;
  try {
    const a = await answer(MODELS[pick], prompt);
    const cost = a.cost === undefined ? "" : `, $${a.cost.toFixed(6)}`;
    console.log(`Answer (${(a.ms / 1000).toFixed(1)} s${cost}):\n${a.text.slice(0, 400)}${a.text.length > 400 ? " …" : ""}`);
  } catch (e) {
    console.log(`(model call skipped: ${(e as Error).message})`);
  }
}
