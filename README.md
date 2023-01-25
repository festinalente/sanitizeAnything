# Sanitize anything. 
A small module that checks any data type. It tests it against a validation function. It works recursively on Arrays and Objects to any depth.

The provided default sanitizes string for dollar signs, curly brackets, equality operators and is intended for use 
sanitizing data to be used in mongoDB. Other functions can be provided as second parameter. 



