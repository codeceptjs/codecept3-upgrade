const j = require('jscodeshift');
const replacer = require('./replacer');

module.exports = (fileInfo, api, options) => {
  if (!fileInfo.path.match(/_test\.js$/) && !options.all) {
    return; // not a test, skipping
  }
  const newSource = j(fileInfo.source, process.env.NODE_ENV === 'test' ? options : {});
  // Before
  replacer(newSource.find(j.CallExpression, {
    callee: {
      name: 'Before',
    },
  }));
  // After
  replacer(newSource.find(j.CallExpression, {
    callee: {
      name: 'After',
    },
  }));
  // BeforeSuite
  replacer(newSource.find(j.CallExpression, {
    callee: {
      name: 'BeforeSuite',
    },
  }));
  // AfterSuite
  replacer(newSource.find(j.CallExpression, {
    callee: {
      name: 'AfterSuite',
    },
  }));
  // Scenario
  replacer(newSource.find(j.CallExpression, {
    callee: {
      name: 'Scenario',
    },
  }));
  // xScenario
  replacer(newSource.find(j.CallExpression, {
    callee: {
      name: 'xScenario',
    },
  }));
  // Data().Scenario
  replacer(newSource.find(j.CallExpression, {
    callee: {
      property: {
        name: 'Scenario',
      },
    },
  }));
  // Scenario.only
  replacer(newSource.find(j.CallExpression, {
    callee: {
      object: {
        name: 'Scenario',
      },
      property: {
        name: 'only',
      },
    },
  }));
  // Scenario.skip
  replacer(newSource.find(j.CallExpression, {
    callee: {
      object: {
        name: 'Scenario',
      },
      property: {
        name: 'skip',
      },
    },
  }));
  // Scenario.todo
  replacer(newSource.find(j.CallExpression, {
    callee: {
      object: {
        name: 'Scenario',
      },
      property: {
        name: 'todo',
      },
    },
  }));

  return newSource.toSource();
};
