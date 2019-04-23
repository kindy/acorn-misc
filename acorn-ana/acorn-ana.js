import {readFileSync} from 'fs';
import {parse} from 'acorn';
import {simple} from 'acorn-walk';
import {prettyPrint} from 'recast';

const acornSrc = readFileSync(require.resolve('acorn'), 'utf8');


const ast = parse(acornSrc);

const methods = [];

simple(ast, {
  AssignmentExpression(node) {
    let prop;
    if (node.left.type === 'MemberExpression' &&
      node.right.type === 'FunctionExpression' &&
      (prop = node.left.property).name &&
      prop.name.match(/^parse[A-Z]/)
    ) {
      const childs = [];

      simple(node.right, {
        CallExpression(node) {
          let prop;
          if (node.callee.type === 'MemberExpression' &&
            (prop = node.callee.property).name &&
            prop.name.match(/^parse[A-Z]/)
          ) {
            childs.push([node.start, `this.${prop.name}()`]);

          } else if (node.callee.type === 'MemberExpression' &&
            node.callee.object.type === 'ThisExpression' &&
            node.callee.property.name === 'finishNode'
          ) {
            childs.push([node.start, `(${/* node.arguments[1].value || */ prettyPrint(node.arguments[1]).code})`]);
          }
        },
      });

      methods.push({
        name: prop.name,
        childs,
      });
    }
  },

});

let dot = false;

const typeIdx = process.argv.findIndex(x => x === '-t');
if (typeIdx !== -1) {
  dot = process.argv[typeIdx + 1] === 'dot';
}

if (dot) {
  makeDot(methods);
} else {
  makeClass(methods);
}


function makeClass(methods) {
  console.log(`
class Parser {
${
  methods.map(({name, childs}) => {
    const exps = childs.sort((a, b) => a[0] - b[0]).map(x => x[1]);

    return `  ${name}() {
${
  exps.map(exp => `    ${exp};`).join('\n')
}
  }
`;

  }).join('\n')
}
}
`);

}


/**
 * ref: https://gist.github.com/tylerneylon/c0cdccdbf2c6a2cb4bdb
 */
function makeDot(methods) {
  console.log(`
strict digraph {
  node [shape=box color=\"#FFFFFF\" fontname=\"courier\" fontsize=12];
  edge [color=\"#CCCCCC\" arrowsize=0.8];

${
  methods.reduce((memo, {name, childs}) => {
    childs.forEach(([_, exp]) => {
      let m = exp.match(/^this\.([^()]+).+$/);
      if (m) {
        memo.push(`  ${name} -> ${m[1]}`);
      }
    });

    return memo;
  }, []).join('\n')
}

}

`);

}