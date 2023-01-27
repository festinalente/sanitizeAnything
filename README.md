# Sanitize anything 
A small module that checks any data type. It tests it against a validation function. It works recursively on Arrays and Objects to any depth.

The function takes two parameters, the object to be sanitized first, and a second optional function to sanitize the data with. The provided default sanitizes string for dollar signs, curly brackets, equality operators and is intended for use 
sanitizing data to be used in mongoDB. See the second example bellow *pass your own sanitation function*.

This module requires node.js >=17.0.0, because of the use of the "structuredClone" function. You can make it compatible 
with earlier version by using the following outdated method to coerce a clone:

```
const clone = JSON.parse(JSON.stringify(original)) 
```

## Basic usage
```
const dirtyObject = { dirt : '$someData'};
const validate = require('any_object_validator').recursiveSanitation;

// then pass an object to it as such (the function returns a promise):
async () =>{
  const clean = await validate(dirtyObject);
  // clean will look like { dirt : 'someData'};
}
```

## Pass your own sanitation function

The default function sanitizes input for mongoDB, filtering out dollar signs and curly brackets, however you can
pass a different function as a second parameter: 

```
const dirtyObject = { dirt : '$someData'};
const validate = require('any_object_validator').recursiveSanitation;
const customSanitationFn = function (string) {
      const regex = /$/g;
      return string.replace(regex, 'I need dolla-').trim();
    };

// then pass an object to it as such (the function returns a promise):
async () =>{
  const clean = await validate(dirtyObject, customSanitationFn);
  // clean will look like { dirt : 'I need dolla-someData'};
}
```
## Test it on npm: 
https://npm.runkit.com/

*Choose node version >= 17* 

Paste the following into the console: 

```
const dirtyObject = { dirt : '$someData'};
const validate = require('any_object_validator').recursiveSanitation;
return validate(dirtyObject).then((result) => console.log(result));
```
