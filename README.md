<div align="center">

# You need to learn Jev RIGHT NOW

**The companion guide to the NetworkChuck video.**<br>
Try Jev yourself, step by step, from the Playground to your own code.

<br>

[![Tested on jev-1.14.0](https://img.shields.io/badge/tested%20on-jev--1.14.0-111111?style=for-the-badge)](https://docs.typesafe.ai/models)
[![Chapters](https://img.shields.io/badge/chapters-5-111111?style=for-the-badge)](#the-path)
[![License: MIT](https://img.shields.io/badge/license-MIT-111111?style=for-the-badge)](LICENSE)

</div>

---

## What is Jev?

[Jev](https://typesafe.ai) is a new kind of AI model from TypeSafe. It can't talk. You give it some text (the **state**) and a question, and instead of a paragraph it hands back a **decision**: a probability, a pick from a list, or a score. It does that in a fraction of a second, for a fraction of a cent.

That makes it a bad chatbot and a great building block. Your code gathers the information, Jev makes the judgment call, and your code acts on it. TypeSafe calls this a **System One** model, after the fast gut-call thinking in Daniel Kahneman's *Thinking, Fast and Slow*.

Jev answers with a small set of question types. The video uses these three:

| Type | What you ask | What you get back |
|---|---|---|
| **Noul** | A yes or no question | How likely the answer is yes, from 0 to 1 |
| **Choice** | Pick one option from a list | The pick, plus a probability for every option |
| **Score** | Rate it on a scale you define | A score, plus a probability for every level |

Jev 1.14 (October 14, 2026) added a fourth, **Box**, which finds where something is in an image. See TypeSafe's [Box page](https://docs.typesafe.ai/primitives/box).

## The path

Do them in order. Chapter 1 needs no code at all.

| # | Chapter | What you do |
|---|---|---|
| 1 | [Try it in the Playground](guide/01-playground.md) | Paste a real spam comment, ask Jev about it, see all three question types |
| 2 | [Your first API call](guide/02-first-api-call.md) | Get an API key and send the same questions from your terminal |
| 3 | [Let your coding agent do it](guide/03-coding-agent.md) | Install TypeSafe's official skill and ask your agent where Jev fits in your project |
| 4 | [Build a model router](guide/04-model-router.md) | Run the router from the video: Jev picks a small, medium or large model for each request |
| 5 | [What people are building](guide/05-what-people-built.md) | The projects from the video, and the decision models that copied Jev |

## What you need

- A free **TypeSafe account** at [console.typesafe.ai](https://console.typesafe.ai). New accounts may need to add a little credit before requests run. Check the billing page in the console.
- For chapters 2 and 4: a terminal (macOS, Linux, or Windows with WSL), plus `curl` 7.76 or newer, `jq` and [Bun](https://bun.sh).
- For the full router in chapter 4: an [OpenRouter](https://openrouter.ai) key with a little credit. Without one, the router still shows you Jev's decisions.

## Files in this repo

```
guide/                 the five chapters
examples/
  questions.json       the six questions from the video
  spam-check.sh        sends those questions to Jev about any comment
  router/router.ts     the model router from the video
```

## Good to know

- **Numbers move a little.** Jev's answers can change slightly between runs and between Jev versions. Every number in this guide is from a real run on jev-1.14.0. Treat it as "about this much," not an exact target.
- **Never put your API key in a file you commit.** Every example here reads the key from your shell.
- The router and the spam check are our demo code, not official TypeSafe tools. TypeSafe's own docs live at [docs.typesafe.ai](https://docs.typesafe.ai).

## License

[MIT](LICENSE). TypeSafe and Jev are trademarks of TypeSafe AI. This guide is not affiliated with TypeSafe.
