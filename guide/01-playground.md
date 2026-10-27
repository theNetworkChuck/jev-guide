# 1. Try it in the Playground

No code. You paste a comment, paste a question, and press Run. This is the same thing the video does at the start.

[◀ Back to the guide](../README.md) · [Next: your first API call ▶](02-first-api-call.md)

---

## What the Playground screen has

- **State**: the text Jev reads. Leave **Plain text** selected.
- **Questions**: a code box, not a form. Questions are written in JSON. The **Noul**, **Score** and **Choice** buttons drop in a starter question you can edit, but pasting the blocks below is easier.
- **Run request**: sends it (or press Command + Enter on a Mac, Ctrl + Enter on Windows).
- **Response**: one row per question, with the answer and how long it took.
- On the right at first you'll see TypeSafe's **example requests**. Click **Close examples** for a clean screen.

## Before you paste anything

Every paste goes like this: click in the box, select everything in it (Command + A or Ctrl + A), then paste. Pasting without selecting first adds a second block, and the Run button goes grey with a message like "1 issue blocking Run."

## Steps

**Step 1.** Go to **[console.typesafe.ai/playground](https://console.typesafe.ai/playground)** and log in. Click **Close examples**.

**Step 2.** Paste this into **State**. It's a real bot comment from the NetworkChuck channel, with the scammer's name removed. Notice it spells "Instagram" with look-alike letters to get past word filters.

```
I checked out few comments and I got help by *👉 the scammer 👈* Find Him *on in$ţă_ɢʀăᴍ* he helped me out fast and reliable 💯✅✅✅
```

**Step 3.** Paste this into **Questions**, then click **Run request**:

```json
{
  "spam": {
    "type": "noul",
    "instructions": "Is this YouTube comment spam?"
  }
}
```

You should see about **96% true**, in well under a second. That's a **noul**: a yes or no question, answered as how likely the answer is yes.

Click the **JSON** view at the top of the Response panel. That's exactly what your code would get: no sentences, just the decision.

**Step 4.** Now try a real fan comment. Paste this into **State** and click **Run request**:

```
an ai it department investigating a real network is so fun to watch
```

You should see about **21% true**. Not spam.

**Step 5.** Put the bot comment from step 2 back into **State**. Then ask four small questions at once. Paste this into **Questions** and click **Run request**:

```json
{
  "spam": {
    "type": "noul",
    "instructions": "Is this YouTube comment spam?"
  },
  "contact": {
    "type": "noul",
    "instructions": "Does it tell people to contact someone off YouTube?"
  },
  "money": {
    "type": "noul",
    "instructions": "Does it talk about money, investing or crypto?"
  },
  "link": {
    "type": "noul",
    "instructions": "Does it push the reader to a link or profile?"
  }
}
```

You should see roughly: spam **96%**, contact **92%**, money **12%**, link **94%**. Money stays low because this bot isn't about money. Not every question has to light up. That's the point of asking several small ones.

**Step 6.** Add a **choice** question (multiple choice). Paste this into **Questions** and click **Run request**:

```json
{
  "spam": {
    "type": "noul",
    "instructions": "Is this YouTube comment spam?"
  },
  "contact": {
    "type": "noul",
    "instructions": "Does it tell people to contact someone off YouTube?"
  },
  "money": {
    "type": "noul",
    "instructions": "Does it talk about money, investing or crypto?"
  },
  "link": {
    "type": "noul",
    "instructions": "Does it push the reader to a link or profile?"
  },
  "wants": {
    "type": "choice",
    "instructions": "What does this commenter want?",
    "criteria": {
      "ask a question": "Ask a real question about the video",
      "request a video": "Ask for a future video",
      "say thanks": "Thank the creator",
      "give feedback": "Give feedback about the video",
      "promote something": "Get people to buy, visit or contact"
    }
  }
}
```

You should see the same four, plus **wants: promote something**, at nearly 100%.

**Step 7.** Add a **score**. Paste this into **Questions** and click **Run request**:

```json
{
  "spam": {
    "type": "noul",
    "instructions": "Is this YouTube comment spam?"
  },
  "contact": {
    "type": "noul",
    "instructions": "Does it tell people to contact someone off YouTube?"
  },
  "money": {
    "type": "noul",
    "instructions": "Does it talk about money, investing or crypto?"
  },
  "link": {
    "type": "noul",
    "instructions": "Does it push the reader to a link or profile?"
  },
  "wants": {
    "type": "choice",
    "instructions": "What does this commenter want?",
    "criteria": {
      "ask a question": "Ask a real question about the video",
      "request a video": "Ask for a future video",
      "say thanks": "Thank the creator",
      "give feedback": "Give feedback about the video",
      "promote something": "Get people to buy, visit or contact"
    }
  },
  "positive": {
    "type": "score",
    "instructions": "How positive is it?",
    "criteria": ["Negative", "Neutral", "Positive"]
  }
}
```

You should see a positive score around **1.6 out of 2**. Look at that: the scam comment reads as friendly. Scammers are nice on purpose. That's why "is it nice?" is a bad spam test, and why the small questions matter.

**Step 8.** Leave the questions alone. Paste the fan comment from step 4 into **State** and click **Run request**. You should see roughly: spam **21%**, contact **6%**, money **3%**, link **5%**, wants **give feedback**, positive about **1.6**.

Same questions, completely different picture. In a real app, **your code** would combine those answers into a verdict (for example: spam is high AND contact or link is high, so hide it). Jev answers each question; you decide what to do with the answers.

## Things that will trip you

- **Line breaks inside quotes break the JSON.** If a copy picks up a line break in the middle of a sentence, the block turns invalid. Copy the whole block from the copy button on GitHub.
- **If answers look wrong after you press Clear, reload the page** and paste again.
- **The Playground shows percents** (96% true). The API shows the same thing as a number (0.96).

[◀ Back to the guide](../README.md) · [Next: your first API call ▶](02-first-api-call.md)
