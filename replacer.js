const j = require('jscodeshift');

module.exports = (source) => {
  let findPath = arrowFunctionExpression(source);
  if (findPath.__paths.length === 0) {
    findPath = functionExpression(source);
  }
  return findPath
  // eslint-disable-next-line array-callback-return
    .filter(p => {
      const root = p.value;
      for (const param of root.params) {
        return param.type !== 'ObjectPattern' && root.body.type === 'BlockStatement' && !root.body.left;
      }
    })
    .replaceWith(p => {
      const root = p.value;
      root.params.forEach(param => {
        if (param.typeAnnotation) {
          delete param.typeAnnotation;
        }
      });
      const firstParam = root.params[0];
      const lastParam = root.params[root.params.length - 1];

      firstParam.name = `{ ${firstParam.name}`;
      lastParam.name = `${lastParam.name} }`;
      return root;
    });
};

const arrowFunctionExpression = (source) => source.find(j.ArrowFunctionExpression);
const functionExpression = (source) => source.find(j.FunctionExpression);
