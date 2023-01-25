/**
 * @function recursiveSanitation "recursive validation"
 * @param {!*} originalEl Takes anything
 * @param {function=} customSanitationFn An optional function for
 * sanitizing strings that takes a string, sanitizes it, then
 * return the resulting string.
 * @function customSanitationFn
 * @param {string} string as a parameter for custom sanitation function.
 * @returns {promise} With any string sanitized for some characters.
 * @todo Add an option to pass one or more sanitation functions.
 */
const recursiveSanitation = (originalEl, customSanitationFn) => {
  // simple mongoDB sanitation default
  const standardSanitation = customSanitationFn || function (string) {
    const regex = /\$|{|}|==|===|\([()]/g;
    return string.replace(regex, '').trim();
  };

  const promise = new Promise((resolve, reject) => {
    function sanitize (original) {
      let clone = structuredClone(original);
      if (typeof clone === 'string') {
        clone = standardSanitation(original);
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

module.exports = { recursiveSanitation };
