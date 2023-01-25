# Sanitize anything 
A small module that checks any data type. It tests it against a validation function. It works recursively on Arrays and Objects to any depth.

The provided default sanitizes string for dollar signs, curly brackets, equality operators and is intended for use 
sanitizing data to be used in mongoDB. Other functions can be provided as second parameter. 

## Basic usage
```
const dirtyObject = { dirt : $someData};
const validate = require('any_object_validator').recursiveSanitation;

// then pass an object to it as such (the function returns a promise):
async () =>{
  const clean = await validate(dirtyObject);
  // clean will look like { dirt : someData};
}
```

## Pass your own sanitation function
The default function sanitizes input for mongoDB, filtering out dollar signs and curly brackets, however you can
pass a different function as a second parameter: 

```
const dirtyObject = { dirt : $someData};
const validate = require('any_object_validator').recursiveSanitation;
const customSanitationFn = function (string) {
      const regex = /$/g;
      return string.replace(regex, 'I need dolla-').trim();
    };

// then pass an object to it as such (the function returns a promise):
async () =>{
  const clean = await validate(dirtyObject, customSanitationFn);
  // clean will look like { dirt : I need dolla-someData};
}
```