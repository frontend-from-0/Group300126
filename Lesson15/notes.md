## Functions

Functions are one of the fundamental building blocks of the language. They are reusable blocks of code that can be executed when needed. Functions encapsulate a set of statements and can be called or invoked to perform a specific task or calculation. 

### Anonymos Function Declaration 
function (parameter1, parameter2) {
  return parameter1 * parameter2;
};

### Named function (multiplyTwoNumbers is a pure function):
function multiplyTwoNumbers (parameter1, parameter2) {
  return parameter1 * parameter2;
}
const result = multiplyTwoNumbers(10, 40); // 400
console.log(result) // 400
multiplyTwoNumbers(1, 40); // 40

### Function Expression
const sumOfTwoNumbers = function (parameter1, parameter2) {
  return parameter1 + parameter2;
};

sumOfTwoNumbers(10, 15);

### Arrow Function (introduced in ECMAScript 6 OR ES6)
Anonymus arrow function

() => console.log('Hello world'); // single line anonymus arrow function

() => {
  console.log('Hello world');
}; // multi-line anonymus arrow function

### Single line arrow function experession
const greet = (name) =>  'Hello '+ name;
greet('John');

### Multi line arrow function experession
const greet = (name) => {
  return 'Hello ' + name;
};

greet('John');

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
const today = 'Wednesday';
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

const grade = 71;
if (grade > 70) {
 console.log('Good')
} else if (grade > 60) {
 console.log('Acceptable')
} else if (grade > 50) {
 console.log('Pass');
} else {
 console.log('Below acceptable rate'); // 0 -50 including
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
