import * as assert from 'assert';

function getArray(length){
  let arr = [];
  for(let i = 1; i < length + 1; i++){
    arr.push(add(i));
  }
  return arr;
}

const add = x => y => x + y;

suite('Array of functions', function() {
  suite('Sum closure', function() {
    const add3 = add(3);
    test('Return a function', function() {
      assert.strictEqual(typeof  add3, 'function');
    });
    test('Sum correctly', function() {
      assert.strictEqual(add3(0), 3);
      assert.strictEqual(add3(false), 3);
      assert.strictEqual(add3(''), '3');
      assert.notStrictEqual(add3(''), 3);
      assert.strictEqual(add3(2), 5);
    });
  });

  suite('Array of 5 add', function(){
    const length = 5;
    const arr = getArray(length);

    test('Is an array', function() {
      assert.strictEqual(arr instanceof Array, true);
    });

    test('Is an array of functions', function() {
      arr.map(func => {
        assert.strictEqual(typeof func, 'function');
      });
    });

    test('Its length is 5', function() {
      assert.strictEqual(arr.length, length);
    });

    test('Is an array of adder functions', function() {
      arr.map( (addX, i) => {
        assert.strictEqual(addX(length), ++i + length);
      });
    });

  });

});
