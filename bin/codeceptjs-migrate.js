#!/usr/bin/env node

const yargs = require('yargs');
const Runner = require('jscodeshift/src/Runner.js');
const path = require('path');
const fs = require('fs');
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
    '$0 [path]',
    'migrate all CodeceptJS tests from v.2 to v.3',
    (yargs) => {
      yargs.positional('path', {
        describe: 'path to a project',
        type: 'string',
      });
      yargs.boolean('--all');
    },
    (argv) => {
      let filePattern = argv.path || '.';
      const defaultOptions = {
        transform: path.join(__dirname, '../migrate.js'),
        verbose: 0,
        dry: false,
        print: false,
        babel: true,
        extensions: 'js',
        ignorePattern: ['node_modules'],
        ignoreConfig: [],
        runInBand: false,
        silent: false,
        parser: 'babel',
        stdin: false,
      };

      if (fs.lstatSync(filePattern).isDirectory()) {
        filePattern = path.join(filePattern, '*_test.js');
      }
      const options = { ...defaultOptions, ...argv };

      run([filePattern], options);
    },
  )
  .options({ ...args.options })
  .help('help').argv;
