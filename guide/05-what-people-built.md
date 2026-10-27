# 5. What people are building

The projects from the video, so you can go look at them yourself. Then the decision models that showed up after Jev.

[◀ Previous: build a model router](04-model-router.md) · [Back to the guide](../README.md)

---

## Projects from the video

| Project | What it does | Link |
|---|---|---|
| **The Intelliprompter** | A teleprompter that holds your talking points instead of a script. It transcribes you live and Jev checks off each point once you've started talking about it. Allie at TypeSafe came up with the idea, and the one in the video was built from it. | [TypeSafe's Intelliprompter cookbook](https://docs.typesafe.ai/cookbooks/intelliprompter) |
| **jevgrep** | Jev finds the right files for a coding agent, so the agent spends less time searching. The author's claim: 40% lower coding agent cost on SWE-bench. | [github.com/dzhng/jevgrep](https://github.com/dzhng/jevgrep) |
| **Jev in Hermes** | Skills that hand yes or no decisions inside a Hermes agent to Jev. | [github.com/kerpopule/hermes-jev-skills](https://github.com/kerpopule/hermes-jev-skills) |
| **Jev plays Doom** | TypeSafe's launch demo: Jev making the calls in Doom, fast. | [The demo on X](https://x.com/CompleteSkeptic/status/2099925687465570372) |

More recipes, from content moderation to Twitch chat filters, are in TypeSafe's [cookbooks](https://docs.typesafe.ai/cookbooks).

## The copies

Within three weeks of Jev launching, three more companies shipped their own decision models. They all work the same way: send some text and typed questions, get back probabilities. Learn one and you've mostly learned them all.

| Who | What | Where it runs | Link |
|---|---|---|---|
| **OpenAI** | Decisions API | OpenAI's cloud | [OpenAI's guide](https://developers.openai.com/api/docs/guides/decisions) |
| **Cloudflare** | Clef and Clef-flash, open weights | Cloudflare, or your own machine | [Cloudflare's announcement](https://blog.cloudflare.com/clef-decision-models) |
| **Ollama** | Decision models (Nimble, Tev1) | Your own machine | [Ollama's announcement](https://ollama.com/blog/ollama-now-supports-jev-style-decision-models) |

OpenAI uses different words for the same ideas (`predicate` where Jev says `noul`, for example), so a request needs small changes to move between them.

### The race from the video

The video ran one question, "Is this YouTube comment spam?", over 127 real comments from the channel (20 bot comments, 107 real fans) on six models at once. The four local models shared one Mac, which made each one slower than it would be alone.

| | Jev | OpenAI Decisions | Clef-flash | Clef 27B | Nimble | Tev1 |
|---|---|---|---|---|---|---|
| Bots caught | 20 of 20 | 18 of 20 | 16 of 20 | 17 of 20 | 11 of 20 | 6 of 20 |
| Fans wrongly flagged | 8 of 107 | 10 of 107 | 4 of 107 | 4 of 107 | 6 of 107 | 6 of 107 |
| Time per comment | 0.16 s | 0.17 s | 0.40 s | 0.42 s | 0.44 s | 0.33 s |
| Runs on | Cloud | Cloud | Local | Local | Local | Local |

Measured October 8, 2026, on jev-1.13.0, on one question and one set of comments. That's a small test, not a benchmark. Run your own questions on your own data before you pick one.

## Where to go next

- TypeSafe's docs: [docs.typesafe.ai](https://docs.typesafe.ai). Start with [How to build with TypeSafe](https://docs.typesafe.ai/concepts/how-to-build-with-system-one).
- The launch post: [Introducing System One Models and Jev](https://typesafe.ai/blog/introducing-system-one-models-and-jev).
- TypeSafe on X: [@typesafeai](https://x.com/typesafeai).

[◀ Previous: build a model router](04-model-router.md) · [Back to the guide](../README.md)
