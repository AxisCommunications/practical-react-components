#!/usr/bin/env python3

import argparse
import sys

import utils
import config

#
# Stop immediately if version too old.
#
_MINIMUM_PYTHON_VERSION = "3.7"
if sys.version_info < tuple(map(int, _MINIMUM_PYTHON_VERSION.split("."))):
    raise Exception(
        f"You need Python >= {_MINIMUM_PYTHON_VERSION}, but you are running {sys.version}"
    )

GROUP_TITLES = {
    "build": "👷 Build",
    "chore": "🚧 Maintenance",
    "ci": "🚦 Continuous integration",
    "docs": "📝 Documentation",
    "feat": "✨ Features",
    "fix": "🐛 Bug fixes",
    "perf": "🏎️ Performance",
    "refactor": "♻️ Refactoring",
    "revert": "⏪️ Reverts",
    "style": "💄 Styling",
    "test": "🧪 Test",
}


def changelog_part(commitish_to: str, commitish_from: str, version: str):
    date = utils.cmd(["git", "log", "-1", "--format=%ci", commitish_to])

    if commitish_from is None:
        commit_range = commitish_to
    elif commitish_to == "HEAD":
        commit_range = f"{commitish_from}..HEAD"
    else:
        commit_range = f"{commitish_from}..{commitish_to}~"

    commits = utils.cmd(
        [
            "git",
            "log",
            "--no-merges",
            "--date-order",
            "--format=%H%n%h%n%B%x1f",
            commit_range,
        ]
    )

    if commits == "":
        return ""

    messages = {}

    for commit in commits.split("\x1f"):
        sha, shortsha, msg = commit.strip().split("\n", maxsplit=2)

        try:
            data = utils.conventional_commit_parse(msg)
            issues = utils.closing_issues_commit_parse(msg)
            messages.setdefault(data["type"], []).append(
                {**data, "issues": issues, "sha": sha, "shortsha": shortsha}
            )
        except:
            # No conventional commit
            pass

    content = [
        f"## [{version}]({config.GITHUB_RELEASE_URL}/{version})",
        f"{date}, [Compare changes]({config.GITHUB_COMPARE_URL}/{commitish_from}...{version})",
    ]

    for group in GROUP_TITLES.keys():
        if group not in messages:
            continue

        content.append(f"\n### {GROUP_TITLES[group]}\n")

        for data in messages[group]:

            prefix = "  - "

            pull_request = utils.get_github_pull_request(data["sha"])
            # pull_request[0] is id, pull_request[1] is url
            if pull_request is not None:
                prefix += f"[!{pull_request[0]}]({pull_request[1]}) - "

            if data["scope"] is not None:
                prefix += f'**{data["scope"]}**: '

            postfix = (
                f' ([`{data["shortsha"]}`]({config.GITHUB_COMMIT_URL}/{data["sha"]}))'
            )

            commit_author = utils.get_github_author(data["sha"])
            # commit_author[0] is username, commit_author[1] is url
            if commit_author is not None:
                postfix += f" ([**@{commit_author[0]}**]({commit_author[1]}))"

            if data["breaking"]:
                content.append(f'{prefix}**BREAKING** {data["description"]}{postfix}')
            else:
                content.append(f'{prefix} {data["description"]}{postfix}')

    return "\n".join(content)


HEADER = """
# Changelog
All notable changes to this project will be documented in this file.

"""


if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="Generate or update a CHANGELOG.md file."
    )

    parser.add_argument(
        "-s",
        "--skip-header",
        action="store_true",
        help="Don't include a changelog header",
    )

    parser.add_argument(
        "-r",
        "--release",
        type=str,
        metavar="RELEASE",
        help="New release tag (e.g. vX.Y.Z), includes full changelog with a new entry for things not tagged",
    )

    subparsers = parser.add_subparsers(
        dest="type", metavar="COMMAND", help='One of "single" or "full".', required=True
    )

    single = subparsers.add_parser(
        "single", description="Generate changelog for a single tag."
    )
    single.add_argument("-t", "--tag", type=str, metavar="TAG")

    full = subparsers.add_parser(
        "full", description="Generate a changelog covering entire history."
    )

    args = parser.parse_args()

    tags = utils.cmd(
        [
            "git",
            "-c",
            "versionsort.suffix=-alpha",
            "tag",
            "--list",
            "--sort=-version:refname",
            "--merged",
            "HEAD",
        ]
    ).split()

    if args.release is not None:
        tags.insert(0, "HEAD")
    tags.append(None)

    if args.type == "single":
        if args.tag is None:
            try:
                args.tag = tags[0]
            except:
                print(f"Error: no tags found!")
                sys.exit(1)
        if args.tag not in tags:
            print(f"Error: tag {args.tag} not found!")
            sys.exit(1)

    if not args.skip_header:
        sys.stdout.write(HEADER)

    for commitish_to, commitish_from in zip(tags[:-1], tags[1:]):
        if args.type == "single" and args.tag != commitish_to:
            continue
        sys.stdout.write(
            changelog_part(
                commitish_to,
                commitish_from,
                args.release if commitish_to == "HEAD" else commitish_to,
            )
        )
        sys.stdout.write("\n\n")

    sys.stdout.close()
