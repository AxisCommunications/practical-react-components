#!/usr/bin/env node
/**
 * Generates props for components
 *
 */

import chalk from 'chalk'
import fs from 'fs'
import path from 'path'
import {
  withCustomConfig,
  PropItem,
  ComponentDoc,
} from 'react-docgen-typescript'
import yargs from 'yargs'

const generateArgs = () => {
  return yargs
    .usage(
      'yarn props - generates a json file with props for TypeScript components'
    )
    .option('source', {
      describe: 'Path to the entry file',
      type: 'array',
    })
    .option('dest', {
      describe: 'Relative path to the output folder',
      type: 'string',
    })
    .option('tsconfig', {
      describe: 'Relative path to the `tsconfig` file',
      type: 'string',
    })
    .demandOption(
      ['source', 'dest', 'tsconfig'],
      'Please provide both `source` and `path` arguments'
    )
    .example('yarn props --source src/index.ts --path ../out', 'Creates props')
    .help('help')
    .wrap(75).argv
}

export const createDir = (target: string) => {
  if (!fs.existsSync(target)) {
    fs.mkdirSync(target, { recursive: true })
  }
}

const propFilter = (prop: PropItem) => {
  if (prop.parent !== undefined) {
    return !prop.parent.fileName.includes('node_modules')
  }

  return true
}

function main() {
  const args = generateArgs()

  console.log(chalk.gray('About to generate the props'))
  const cwd = process.cwd()
  const dest = path.resolve(cwd, args.dest)
  const destFile = path.join(dest, 'props.json')
  const tsconfig = path.resolve(cwd, args.tsconfig)

  let data: ReadonlyArray<ComponentDoc> = []
  for (const source of args.source) {
    const src = path.resolve(cwd, source as string)
    const generator = withCustomConfig(tsconfig, {
      propFilter,
      shouldRemoveUndefinedFromOptional: true,
    })
    data = [...data, ...generator.parse(src)]
  }

  const json = JSON.stringify(data, null, 2)

  createDir(dest)

  fs.writeFileSync(destFile, json)

  console.log(
    chalk.green(`The file, ${destFile}, with props was successfully generated `)
  )
}

main()
