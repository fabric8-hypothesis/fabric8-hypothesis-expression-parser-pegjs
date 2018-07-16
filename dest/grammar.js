"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pegjs_1 = require("pegjs");
const grammar = `

start = HypothesisExpression

HypothesisExpression \"hypothesisexpression\"
  = Statement / Expression

Expression \"expression\"
  = _ \"WHEN\" _ predicate:Statement _ \"THEN\" _ output:Statement _ {
  		return {
        	predicate : predicate,
            output : output
        }
  }

Statement \"statement\"
  = head:AtomicExpression tail:(_ Conjunction _ AtomicExpression)* {
      return { statement : tail.reduce(function(result, element) {
        	result.push(element[1], element[3])
            return result
        }, [head])}
    }

AtomicExpression \"atomicExpression\"
  = i:Integer { return { Number: i} } / \"true\"i { return true } / \"false\"i { return false } 
	/ _ lhs:Identifier _ op:("<="/">="/"<"/">"/"==") _  rhs:AtomicExpression {
    	return {
        	lhs : lhs,
            op : op,
            rhs : rhs
        }
    }

Conjunction \"conjunction\"
  = \"and\"i / \"or\"i

Identifier \"identifier\"
  = [A-Za-z]+ {return text()}

Integer \"integer\"
  = _ [-+]?[0-9]+ { return parseInt(text(), 10); }

_ \"whitespace\"
  = [ \\t\\n\\r]*
`;
let parser = pegjs_1.generate(grammar);
function parse(text) {
    try {
        return parser.parse(text);
    }
    catch (e) {
        return e;
    }
}
exports.parse = parse;
