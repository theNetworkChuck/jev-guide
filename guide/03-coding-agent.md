# 3. Let your coding agent do it

Jev is built to talk to code, not to you. If you build with an AI coding agent (Claude Code, Codex, Cursor and so on), you don't need to learn every detail of the API. Your agent does. TypeSafe ships an official **agent skill** that teaches your agent how to use Jev the right way.

[◀ Previous: your first API call](02-first-api-call.md) · [Back to the guide](../README.md) · [Next: build a model router ▶](04-model-router.md)

---

## Step 1. Install TypeSafe's skill

These commands come from TypeSafe's own [agent skill page](https://docs.typesafe.ai/agent-skill). Pick the one for your agent.

**Claude Code.** Run these two commands in your terminal:

```bash
claude plugin marketplace add typesafe-ai/skills
claude plugin install typesafe@typesafe-ai
```

**Any other agent** (Codex, Cursor and others):

```bash
npx skills add typesafe-ai/skills --skill typesafe-ai
```

It asks which agent you use. It installs into the current project by default; add `-g` to install it for every project.

You can read what the skill tells your agent here: [SKILL.md on GitHub](https://github.com/typesafe-ai/skills/blob/main/skills/typesafe-ai/SKILL.md).

## Step 2. Give your agent the key

Your agent's code will need the same key from chapter 2. Keep it in an environment variable named `TYPESAFE_API_KEY`, the name TypeSafe's docs and SDKs use. Don't paste the key into the chat with your agent, and don't let it write the key into a file that gets committed.

## Step 3. Ask where Jev fits

Open your agent in one of your own projects and ask it something like this:

```text
Use the TypeSafe skill. Look through this project and tell me where Jev
could help: places where the code needs a quick judgment call about text,
like sorting, routing, filtering, or checking something. For each idea,
say what question Jev would be asked, which question type it would use
(noul, choice or score), and what the code would do with the answer.
Don't build anything yet.
```

This is what the video means by "just ask your AI agent how it can help." You don't have to come up with the ideas. Your agent reads your code and finds the spots where an `if` statement would need common sense.

In Claude Code you can call the skill by name with `/typesafe:typesafe-ai`.

## Step 4. Build one

Pick the idea you like and ask the agent to build it. A good build prompt says what goes in, what comes out, and what happens when Jev isn't sure:

```text
Use the TypeSafe skill to build the [idea] we talked about. Read
TYPESAFE_API_KEY from the environment. Show me Jev's answer and its
probabilities for each input. When Jev's top answer is under 0.6,
don't act on it automatically: [say what should happen instead, like
"pick the safer option" or "flag it for me"]. Write a test for it.
```

That last part matters. Jev always tells you how sure it is. Your code decides what to do with a "not sure" answer.

## If your agent isn't using the skill

- Start a new session after installing, so the agent picks up the skill.
- Name it in your prompt: "Use the TypeSafe skill."
- TypeSafe's [agent skill page](https://docs.typesafe.ai/agent-skill) has more example prompts and fixes.

## What it built for us

When we asked our agent where Jev could help, one of the ideas was a **model router**: Jev reads each request and decides whether a cheap small model can handle it or it needs a big one. That's the next chapter, and the code is in this repo.

[◀ Previous: your first API call](02-first-api-call.md) · [Back to the guide](../README.md) · [Next: build a model router ▶](04-model-router.md)
