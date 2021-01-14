#!/usr/bin/env bash

CONVENTIONAL_COMMIT_REGEX='^(fix|feat|chore|docs|refactor)(\([[:alnum:]_]+\))?!?:[[:space:]][^[:space:]](.*)[^.]$'

function usage {
  cat <<EOF
  Usage: $(basename $0) [commitish]
  
  The optional argument indicates the commit to start the check from,
  and the range that is checked will be <commitish>..HEAD.
  Note that the commitish itself is not included (to start from
  e.g. fa56eb, you would write fa56eb~ to use the parent as starting
  point).

  If no commitish is given, HEAD~ is used (so only the current commit
  will be checked).

  Check if message conforms to a conventional commit message, see
  https://www.conventionalcommits.org/en/v1.0.0/#specification
EOF
}

start="HEAD~"
if [[ ! -z "$1" ]]; then
  start="$1"
fi

for sha in $(git rev-list "$start..HEAD"); do
  msg=$(git log -1 --format="%s" $sha)
  if [[ ! "$msg" =~ $CONVENTIONAL_COMMIT_REGEX ]]; then
    echo "bad commit message:"
    echo "$msg"
    exit 1
  else
    echo "good commit message:"
    echo "$msg"
  fi
done
