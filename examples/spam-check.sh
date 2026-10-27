#!/usr/bin/env bash
# Ask Jev the six questions from the video about one YouTube comment.
#
#   bash examples/spam-check.sh                       the scam comment from the video
#   bash examples/spam-check.sh "your comment here"   any comment you want
#
# Needs: curl, jq, and TYPESAFE_API_KEY set in your shell.
set -euo pipefail
: "${TYPESAFE_API_KEY:?Set TYPESAFE_API_KEY first: export TYPESAFE_API_KEY=\"your-key\"}"

here="$(cd "$(dirname "$0")" && pwd)"

# A real bot comment from the NetworkChuck channel, scammer's name removed.
default_comment='I checked out few comments and I got help by *👉 the scammer 👈* Find Him *on in$ţă_ɢʀăᴍ* he helped me out fast and reliable 💯✅✅✅'
comment="${1:-$default_comment}"

jq -n --arg state "$comment" --slurpfile q "$here/questions.json" \
  '{model: "jev-latest", state: $state, questions: $q[0]}' |
  curl --fail-with-body --silent --show-error \
    https://api.typesafe.ai/v1/systemone \
    -H "Authorization: Bearer $TYPESAFE_API_KEY" \
    -H "Content-Type: application/json" \
    --data-binary @- |
  jq .
