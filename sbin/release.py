#!/usr/bin/env python3

import argparse
import json

import utils
import changelog

parser = argparse.ArgumentParser()
parser.add_argument(
    "level",
    metavar="LEVEL",
    nargs="?",
    default="prerelease",
    choices=[
        "major",
        "minor",
        "patch",
        "premajor",
        "preminor",
        "prepatch",
        "prerelease",
    ],
)
args = parser.parse_args()

with open("package.json", "r") as f:
    data = json.load(f)
    current_version = data["version"]
    next_version = utils.cmd(
        [
            "yarn",
            "semver",
            current_version,
            "--increment",
            args.level,
            "--preid",
            "beta",
        ]
    )
    next_tag = f"v{next_version}"

    # Generate new commit
    print(f" - Update versions to {next_version}")
    utils.cmd(["yarn", "workspaces", "foreach", "version", "--deferred", next_version])
    utils.cmd(["yarn", "version", "apply", "--all"])

    print(" - Update changelog")
    changelog_part = utils.cmd(
        ["./sbin/changelog.py", "--release", next_tag, "--skip-header", "single"]
    )
    with open("CHANGELOG.md", "r+") as f:
        old = f.read()
        f.seek(0)
        f.write(changelog.HEADER)
        f.write(changelog_part)
        f.write("\n\n")
        f.write(old[len(changelog.HEADER) :])

    print(" - Create release commit and tag")
    utils.cmd(["git", "commit", "-a", "-m", next_tag])
    utils.cmd(["git", "tag", "-a", "-m", next_tag, next_tag])
