#!/usr/bin/env node

const yargs = require('yargs');
const Runner = require('jscodeshift/src/Runner.js');
const path = require('path');
const args = require('./args');

process.env.PATH = `${process.env.PATH}:${__dirname}`;

function run(paths, options) {
  Runner.run(
    /^https?/.test(options.transform) ? options.transform : path.resolve(options.transform),
    paths,
    options,
  );
}

yargs
  .command(
    'migrate [path]',
    'migrate all Scenario from v.2 to v.3',
    (yargs) => {
      yargs.positional('path', {
        describe: 'migrate ts or js files',
        type: 'string',
      });
    },
    (argv) => {
      const positionalArguments = process.argv.slice(3);
      const defualtOptions = {
        transform: path.join(__dirname, '../migrate.js'),
        verbose: 0,
        dry: false,
        print: false,
        babel: true,
        extensions: 'js',
        ignorePattern: [],
        ignoreConfig: [],
        runInBand: false,
        silent: false,
        parser: 'babel',
        stdin: false,
      };

      const options = { ...defualtOptions, ...argv };
      run(positionalArguments, options);
    },
  )
  .options({ ...args.options })
  .help('help').argv;
