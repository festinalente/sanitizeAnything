const reqVal = require('./reqVal.js');
const assert = require('assert');
const testFullObject = {
  objectLeaks: { test: 'object leak' },
  arrayOfNumbers: [0, 1, 2, 3],
  arrayOfStrings: ['a', 'b', 'c', 'd'],
  extraArray: ['is the error in arrays? '],
  another: [0],
  arrayOfObjects: [
    { string: 'a', number: 1, array: ['string in nested'] },
    { string: 'b', number: 2, array: ['string in nested 1'] }],
  topLevelvalidated: {
    string: 'string in Object',
    number: 1,
    arrayOfLengthOne: ['arrayOfLengthOneContent'],
    arrayTest: [{ nested: '${stringInObjectInArrayInObject} ===!' }, 'abc', 1000],
    boolean: true
  },
  topLevelString: 'top level string',
  topLevelNumber: 1,
  topLevelBoolean: true
};

const testFullObjectCorrect = {
  objectLeaks: { test: 'object leak' },
  arrayOfNumbers: [0, 1, 2, 3],
  arrayOfStrings: ['a', 'b', 'c', 'd'],
  extraArray: ['is the error in arrays?'],
  another: [0],
  arrayOfObjects: [
    { string: 'a', number: 1, array: ['string in nested'] },
    { string: 'b', number: 2, array: ['string in nested 1'] }],
  topLevelvalidated: {
    string: 'string in Object',
    number: 1,
    arrayOfLengthOne: ['arrayOfLengthOneContent'],
    arrayTest: [{ nested: 'stringInObjectInArrayInObject =!'}, 'abc', 1000],
    boolean: true
  },
  topLevelString: 'top level string',
  topLevelNumber: 1,
  topLevelBoolean: true
};

// N.b. I'm not a hacker, other tests might be required:
const testSanitation = {
  testString: '{ $where: function() { return (this.entity == “Milk”) }}'
};
const deFanged = {
  testString: 'where: function  return (this.entity  “Milk”)'
};

describe ('Test request validator', async () => {
  it (`Tests sanitation`, async () => {
    const validated = await reqVal.recursiveSanitation(testSanitation);
    assert.deepEqual(validated, deFanged);
  });
  it (`Tests top level String`, async () => {
    const validated = await reqVal.recursiveSanitation(testFullObject.topLevelString);
    assert.strictEqual(testFullObject.topLevelString, validated);
  });
  
  it (`Tests top level Number`, async () => {
    const validated = await reqVal.recursiveSanitation(testFullObject.topLevelNumber);
    assert.strictEqual(testFullObject.topLevelNumber, validated);
  });
  
  it (`Tests top level Boolean`, async () => {
    const validated = await reqVal.recursiveSanitation(testFullObject.topLevelBoolean);
    assert.strictEqual(testFullObject.topLevelBoolean, validated);
  });
  
  it (`Test top level array of object`, async () => {
    const validated = await reqVal.recursiveSanitation(testFullObject.arrayOfObjects);
    assert.deepEqual(testFullObject.arrayOfObjects, validated);
  });
  
  it (`Test top level array of strings`, async () => {
    const validated = await reqVal.recursiveSanitation(testFullObject.arrayOfStrings);
    assert.deepEqual(testFullObject.arrayOfStrings, validated);
  });
  
  it (`Test top level array of numbers`, async () => {
    const validated = await reqVal.recursiveSanitation(testFullObject.arrayOfNumbers);
    assert.deepEqual(testFullObject.arrayOfNumbers, validated);
  });
  
  it (`Tests object with all data types and nested data`, async () => {
    const validated = await reqVal.recursiveSanitation(testFullObject);
    assert.deepEqual(testFullObjectCorrect, validated);
  });
  
});
