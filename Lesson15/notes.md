In JavaScript, a *string* is a sequence of characters used to represent text. Strings are one of the primitive data types in JavaScript and are immutable, meaning once a string is created, it cannot be changed. However, you can create new strings based on operations performed on existing ones. JavaScript provides a variety of methods to manipulate strings, making it easier to work with text.

See more information about different methods available in JS for String object: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String


## Functions

Functions are one of the fundamental building blocks of the language. They are reusable blocks of code that can be executed when needed. Functions encapsulate a set of statements and can be called or invoked to perform a specific task or calculation. 

### Anonymos Function Declaration 
function (parameter1, parameter2) {
  return parameter1 * parameter2;
};

### Named function:
function multiplyTwoNumbers (parameter1, parameter2) {
  return parameter1 * parameter2;
}
multiplyTwoNumbers(10, 40); // 400
multiplyTwoNumbers(1, 40); // 40

### Function Expression
const sumOfTwoNumbers = function (parameter1, parameter2) {
  return parameter1 + parameter2;
};

sumOfTwoNumbers(10, 15);

### Arrow Function (introduced in ECMAScript 6 OR ES6)
Anonymus arrow function

() => {
  console.log('Hello world');
};

### Single line arrow function experession
const greet = (name) =>  'Hello '+ name;
greet('John');

### Multi line arrow function experession
const greet = () => {
  return 'Hello world';
};

greet();

### IIFE (Immediately Invoked Function Expression)
(function multiplyTwoNumbers(parameter1, parameter2) {
	console.log('Hello');
	return parameter1 * parameter2;
})();


## Conditional statements (if...else, switch)

Conditional statements in JavaScript are used to make decisions and execute different blocks of code based on certain conditions. They allow you to control the flow of your program and determine which code should be executed depending on whether a condition evaluates to true or false.

### if Statement

if (condition) {

}
#### Same line if condition:
if (today === 'Wednesday') console.log('Join the lesson');

#### if ... else Statement
if (condition) {
 ... some code
} else if (another condtion) {
 ... some code
} else if (another condtion) {
 ... some code
} else {
 ... some code
}

### Switch statement
switch (day) {
  case 'Monday':  // this means that day === 'Monday'
   console.log('It\'s Monday'); 
   break;
  case 'Tuesday':
    console.log('It\'s Tuesday');
    break; // Use break key word if you don't use return key word in the statement;
    .... cases for other days of the week
  default:
    console.log('Unknow day');
    break;
}
