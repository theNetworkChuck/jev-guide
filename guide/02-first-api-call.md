# 2. Your first API call

The Playground is just a page on top of one API call. Here you send that same call from your terminal, which is how your own code will talk to Jev.

[◀ Previous: the Playground](01-playground.md) · [Back to the guide](../README.md) · [Next: let your coding agent do it ▶](03-coding-agent.md)

---

## Step 1. Get an API key

1. Go to **[console.typesafe.ai/keys](https://console.typesafe.ai/keys)** and log in.
2. Create a new key and copy it. You usually only get to see it once.

## Step 2. Put the key in your shell

In your terminal (macOS, Linux, or Windows with WSL):

```bash
export TYPESAFE_API_KEY="paste-your-key-here"
```

This only lasts until you close the terminal. That's on purpose: the key never lands in a file. Don't paste it into a script you'll share or commit.

## Step 3. Get this repo

```bash
git clone https://github.com/theNetworkChuck/jev-guide.git
cd jev-guide
```

You also need `curl` (7.76 or newer; check with `curl --version`) and `jq`. On a Mac: `brew install jq`. On Ubuntu or WSL: `sudo apt install jq`.

## Step 4. Ask Jev about the scam comment

```bash
bash examples/spam-check.sh
```

This sends the bot comment from chapter 1 plus all six questions from [`examples/questions.json`](../examples/questions.json). You get back something like this (trimmed):

```json
{
  "model": "jev-1.14.0",
  "answers": {
    "spam":     { "type": "noul", "noul": 0.96 },
    "contact":  { "type": "noul", "noul": 0.92 },
    "money":    { "type": "noul", "noul": 0.12 },
    "link":     { "type": "noul", "noul": 0.94 },
    "wants":    { "type": "choice", "choice": "promote something", "probabilities": { "promote something": 1.0, "...": 0.0 } },
    "positive": { "type": "score", "score": 1.58 }
  },
  "usage": { "input_tokens": 529, "output_tokens": 141 }
}
```

The `usage` line is what you pay for. TypeSafe charges per input token ($0.042 per million on jev-1.14.0, see their [models page](https://docs.typesafe.ai/models)), and output is free. So 529 tokens costs about two thousandths of a cent.

## Step 5. Try your own comment

```bash
bash examples/spam-check.sh "an ai it department investigating a real network is so fun to watch"
```

Spam drops to about 0.21. Try a few of your own.

## What the script actually sends

Open [`examples/spam-check.sh`](../examples/spam-check.sh). It's one HTTP request:

```
POST https://api.typesafe.ai/v1/systemone
Authorization: Bearer <your key>
Content-Type: application/json

{
  "model": "jev-latest",
  "state": "the comment text",
  "questions": { ...the six questions... }
}
```

That's the whole API. `model` picks the model (`jev-latest` points at the newest stable Jev; it answered as `jev-1.14.0` when we tested), `state` is what Jev reads, and `questions` is what you want to know. Each question's name (`spam`, `contact`, ...) comes back as the name of its answer.

## Change the questions

Open [`examples/questions.json`](../examples/questions.json) and edit it. Some ideas:

- Add a noul: `"question": { "type": "noul", "instructions": "Is the commenter asking a question?" }`
- Change the choice options to match your own comment section.
- Add more levels to the score, like `["Hostile", "Negative", "Neutral", "Positive", "Glowing"]`.

Then run the script again. That's it. You're programming with Jev.

## Want Python or JavaScript instead?

TypeSafe has official SDKs. Their [quick start](https://docs.typesafe.ai/introduction/quickstart) has the same first request in Python, JavaScript and TypeScript.

[◀ Previous: the Playground](01-playground.md) · [Back to the guide](../README.md) · [Next: let your coding agent do it ▶](03-coding-agent.md)
