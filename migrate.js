const j = require('jscodeshift');
const replacer = require('./replacer');

module.exports = (fileInfo, api, options) => {
  const newSource = j(fileInfo.source, options);
  // Scenario
  replacer(newSource.find(j.ExpressionStatement, {
    expression: {
      callee: {
        name: 'Scenario',
      },
    },
  }));
  // xScenario
  replacer(newSource.find(j.ExpressionStatement, {
    expression: {
      callee: {
        name: 'xScenario',
      },
    },
  }));
  // Data().Scenario
  replacer(newSource.find(j.ExpressionStatement, {
    expression: {
      callee: {
        property: {
          name: 'Scenario',
        },
      },
    },
  }));
  // Scenario.only
  replacer(newSource.find(j.ExpressionStatement, {
    expression: {
      callee: {
        object: {
          name: 'Scenario',
        },
        property: {
          name: 'only',
        },
      },
    },
  }));
  // Scenario.skip
  replacer(newSource.find(j.ExpressionStatement, {
    expression: {
      callee: {
        object: {
          name: 'Scenario',
        },
        property: {
          name: 'skip',
        },
      },
    },
  }));
  // Scenario.todo
  replacer(newSource.find(j.ExpressionStatement, {
    expression: {
      callee: {
        object: {
          name: 'Scenario',
        },
        property: {
          name: 'todo',
        },
      },
    },
  }));

  return newSource.toSource();
};
