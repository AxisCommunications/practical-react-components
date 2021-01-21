#!/usr/bin/env bash

CONVENTIONAL_COMMIT_REGEX='^(fix|feat|chore|docs|refactor|ci)(\([[:alnum:]_]+\))?!?:[[:space:]][^[:space:]](.*)[^.]$'

function usage {
  cat <<EOF
  Usage: $(basename $0) [range]
  
  If no range is given, HEAD~..HEAD is used (so only the latest commit
  will be checked).

  Note that the a range fa56eb..HEAD does not include the fa56eb commit
  (to start from e.g. fa56eb, you would write fa56eb~..HEAD to use the parent
  as starting point).

  Check if message conforms to a conventional commit message, see
  https://www.conventionalcommits.org/en/v1.0.0/#specification
EOF
}

range="HEAD~..HEAD"
if [[ ! -z "$1" ]]; then
  range="$1"
fi

for sha in $(git rev-list "$range" || exit 1); do
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
