/**
 * @function reqVal "request validation"
 * @param {!*} el, element to test, accepts any type.
 * @param {!string} the expected type (e.g. 'string', or 'boolean').
 * @param {!number} the expected maximum length.
 * @description This tests whether a parameter contains parentheses, is the correct
 * type and isn't over a certain lengh. It has basic validation for code ($, {}). It resolves a promise and simply strips code.
 * @todo possibly add a minimum length parameter to further
 */
const reqVal = function (el, expectedType, expectedLength) {
  const promise = new Promise((resolve, reject) => {
    // content
    try {
      if (expectedType !== 'object') {
        const regex = /\$|{|}|\([()]/g;
        const rep = el.replace(regex, '');
        resolve(rep);
      }
      // string
      if (el.length > expectedLength) {
        const err = new Error(`User input is longer than expected at ${el.toString()}`);
        reject(err);
      }
      // typeof
      if (typeof (el) !== expectedType) {
        const err = new Error(`Argument ${el} must be a ${expectedType}`);
        reject(err);
      }
    } catch (err) {
      reject(err);
    }
  });
  return promise;
};

/**
 * @function recursiveSanitation "recursive validation"
 * @param {!*} originalEl Takes anything
 * @returns {promise} With any string sanitized for some characters.
 * @todo Add an option to pass one or more sanitation functions. 
 */
const recursiveSanitation = (originalEl) => {
  const promise = new Promise((resolve, reject) => {
    const regex = /\$|{|}|==|===|\([()]/g;
    function sanitize (original) {
      let clone = structuredClone(original);
      if (typeof clone === 'string') {
        clone = original.replace(regex, '').trim();
      } else if (clone instanceof Array) {
        for (let i = 0; i < clone.length; i++) {
          clone[i] = sanitize(clone[i]);
        }
      } else if (clone instanceof Object) {
        for (const key of Object.keys(clone)) {
          clone[key] = sanitize(clone[key]);
        }
      }
      return clone;
    }
    resolve(sanitize(originalEl));
  });
  return promise;
};

module.exports = { reqVal, recursiveSanitation };
