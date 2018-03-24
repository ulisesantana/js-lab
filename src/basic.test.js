import * as assert from 'assert';

suite('Basic tests', () => {
  test('Green test', () => {
    assert.equal('1', true);
    assert.notDeepStrictEqual(1, true);
    assert.deepStrictEqual(true, true);
  });

  test('Spread operator', () => {
    let a = {
      meh: 'meh'
    };
    let b = {
      meh: 35,
      num: 42
    };

    let c = {...a, ...b};
    assert.deepStrictEqual(c.hasOwnProperty('meh'), true);
    assert.deepStrictEqual(c.hasOwnProperty('num'), true);
    assert.deepStrictEqual(c.meh, 35);
  })
});
