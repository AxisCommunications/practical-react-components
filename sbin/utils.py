import os
import urllib.request
import json
import re
import subprocess
import sys
import typing

import config

possible_types = [
    "build",
    "chore",
    "ci",
    "docs",
    "feat",
    "fix",
    "perf",
    "refactor",
    "revert",
    "style",
    "test",
]

types = "|".join(possible_types)

re_conventional_commit_header = re.compile(
    rf"^({types})(?:\(([^\)]+)\))?(!?): (.*)(?:\n|$)"
)


def conventional_commit_parse(message: str):
    match = re.match(re_conventional_commit_header, message)

    if match is None:
        raise Exception("Not a conventional commit")

    type, scope, breaking, header = match.groups()

    return {
        "type": type,
        "scope": scope,
        "breaking": breaking == "!",
        "description": header,
    }


re_closing_issues = re.compile(
    r"^Closes: ([A-Z]+-[0-9]+)$", re.MULTILINE | re.IGNORECASE
)


def closing_issues_commit_parse(message: str):
    return re.findall(re_closing_issues, message)


def get_github_api(url: str):
    try:
        token = os.environ["GITHUB_TOKEN"]
        req = urllib.request.Request(
            f"{config.GITHUB_API_URL}{url}",
            headers={"Authorization": f"Bearer {token}"},
        )
        res = urllib.request.urlopen(req)
        data = json.load(res)

        return data
    except KeyError as e:
        print("GITHUB_TOKEN environment not set")
        sys.exit(1)
    except urllib.error.HTTPError as e:
        print("GitHub API request failed:", e)
        sys.exit(1)


def get_github_pull_request(sha: str):
    data = get_github_api(f"/repos/{config.GITHUB_REPOSITORY}/commits/{sha}/pulls")

    if data is None or len(data) == 0:
        return None

    return (data[0]["number"], data[0]["html_url"])


def get_github_author(sha: str):
    data = get_github_api(f"/repos/{config.GITHUB_REPOSITORY}/commits/{sha}")

    if data is None or data["author"] is None:
        return None

    return (data["author"]["login"], data["author"]["html_url"])


def cmd(cmd: typing.List[str]) -> str:
    """Call shell command and return the result"""
    try:
        return subprocess.check_output(cmd, encoding="utf-8").strip()
    except subprocess.CalledProcessError as exc:
        print(exc.output)
        print(f"'{' '.join(cmd)} failed with exit code '{exc.returncode}'")
        sys.exit(exc.returncode)
