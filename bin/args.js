module.exports.options = {
  verbose: {
    abbr: 'v',
    choices: [0, 1, 2],
    default: 0,
    help: 'show more information about the transform process',
    metavar: 'N',
    process: Number,
  },
  dry: {
    abbr: 'd',
    flag: true,
    default: false,
    help: 'dry run (no changes are made to files)',
  },
  print: {
    abbr: 'p',
    flag: true,
    default: false,
    help: 'print transformed files to stdout, useful for development',
  },
  babel: {
    flag: true,
    default: true,
    help: 'apply babeljs to the transform file',
  },
  extensions: {
    default: 'js',
    choices: ['js', 'ts'],
    help: 'transform files with these file extensions (comma separated list)',
    metavar: 'EXT',
  },
  ignorePattern: {
    full: 'ignore-pattern',
    list: true,
    help: 'ignore files that match a provided glob expression',
    metavar: 'GLOB',
  },
  ignoreConfig: {
    full: 'ignore-config',
    list: true,
    help: 'ignore files if they match patterns sourced from a configuration file (e.g. a .gitignore)',
    metavar: 'FILE',
  },
  silent: {
    abbr: 's',
    flag: true,
    default: false,
    help: 'do not write to stdout or stderr',
  },
  parser: {
    choices: ['babel', 'ts'],
    default: 'babel',
    help: 'the parser to use for parsing the source files',
  },
};
