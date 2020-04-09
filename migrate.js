const j = require('jscodeshift');

module.exports = (fileInfo) => {
  let newSource = j(fileInfo.source).find(j.ExpressionStatement, {
    expression: {
      callee: {
        name: 'Scenario',
      },
    },
  });

  if (newSource.paths().length > 0) {
    newSource = j(fileInfo.source).find(j.ExpressionStatement, {
      expression: {
        callee: {
          name: 'Scenario',
        },
      },
    })
      .find(j.ArrowFunctionExpression)
      // eslint-disable-next-line array-callback-return
      .filter(p => {
        const root = p.value;
        for (const param of root.params) {
          if (param.type === 'ObjectPattern') {
            // console.log(param);
          }
          return param.type !== 'ObjectPattern';
        }
      })
      .replaceWith(p => {
        const root = p.value;
        const firstParam = root.params[0];
        const lastParam = root.params[root.params.length - 1];
  
        firstParam.name = `{ ${firstParam.name}`;
        lastParam.name = `${lastParam.name} }`;
        return root;
      });
  } else {
    newSource = j(fileInfo.source).find(j.ExpressionStatement, {
      expression: {
        callee: {
          property: {
            name: 'Scenario',
          },
        },
      },
    })
      .find(j.ArrowFunctionExpression)
    // eslint-disable-next-line array-callback-return
      .filter(p => {
        const root = p.value;
        for (const param of root.params) {
          if (param.type === 'ObjectPattern') {
            // console.log(param);
          }
          return param.type !== 'ObjectPattern';
        }
      })
      .replaceWith(p => {
        const root = p.value;
        const firstParam = root.params[0];
        const lastParam = root.params[root.params.length - 1];

        firstParam.name = `{ ${firstParam.name}`;
        lastParam.name = `${lastParam.name} }`;
        return root;
      });
  }

  return newSource.toSource();
};
