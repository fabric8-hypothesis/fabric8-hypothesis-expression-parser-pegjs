"use strict"
const peg = require("pegjs")
const parse = require("../dest/grammar").parse

describe('Testing syntactically correct expressions.', () => {

    test('WHEN a <= 90 or r == 90 THEN x <= 1 and x < 4', () => {
      
      let inputText = "WHEN a <= 90 or r == 90 THEN x <= 1 and x < 4"

      expect(parse(inputText)).toEqual({ predicate:
        { statement:
           [ { lhs: 'a', op: '<=', rhs: { Number: 90 } },
             'or',
             { lhs: 'r', op: '==', rhs: { Number: 90 } }] },
          output:
        { statement:
           [ { lhs: 'x', op: '<=', rhs: { Number: 1 } },
             'and',
             { lhs: 'x', op: '<', rhs: { Number: 4 } }] } });
    });

    test('WHEN a < 4 or xyz == 67 THEN x == 34 and x < 4', () => {
      
      let inputText = "WHEN a < 4 or xyz == 67 THEN x == 34 and x < 4"

      expect(parse(inputText)).toEqual({ predicate:
        { statement:
           [ { lhs: 'a', op: '<', rhs: { Number: 4 } },
             'or',
             { lhs: 'xyz', op: '==', rhs: { Number: 67 } }] },
          output:
        { statement:
           [ { lhs: 'x', op: '==', rhs: { Number: 34 } },
             'and',
             { lhs: 'x', op: '<', rhs: { Number: 4 } }] } });
    });

    test('WHEN a < 4 or xyz == 67 and abc > 7 THEN x < 4', () => {
      
      let inputText = "WHEN a < 4 or xyz == 67 and abc > 7 THEN x < 4"

      expect(parse(inputText)).toEqual({ predicate:
        { statement:
           [ { lhs: 'a', op: '<', rhs: { Number: 4 } },
              'or',
             { lhs: 'xyz', op: '==', rhs: { Number: 67 } },
              'and',
             { lhs: 'abc', op: '>', rhs: { Number: 7 } }] },
          output:
        { statement:
           [{ lhs: 'x', op: '<', rhs: { Number: 4 } }] } });
    });

    test('a <= 80', () => {
      let inputText = "a <= 80"
      expect(parse(inputText)).toEqual({ statement:
        [{ lhs: 'a', op: '<=', rhs: { Number: 80 }}]
      });
    });

    test('true', () => {
      let inputText = "true"
      expect(parse(inputText)).toEqual({ statement:
        [true]
      });
    });

    test('false', () => {
      let inputText = "false";
      expect(parse(inputText)).toEqual({ statement:
        [false] 
      });
    });

    test('673', () => {
      let inputText = "673";
      expect(parse(inputText)).toEqual({ statement:
        [{ Number : 673}]
      });
    });

    test('-73', () => {
      let inputText = "-73";
      expect(parse(inputText)).toEqual({ statement:
        [{ Number : -73}]
      });
    });
  });

describe('Testing syntactically incorrect expressions.', () => {
    test('a = 90', () => {
        let inputText = "a = 90"
        expect(parse(inputText)).toMatchObject({ name: 'SyntaxError'});
    });

    test('a', () => {
        let inputText = "a"
        expect(parse(inputText)).toMatchObject({ name: 'SyntaxError'});
    });
});