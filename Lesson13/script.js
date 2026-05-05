// Single line comment!

/* 
Multi
line 
comments
 */

// The old way - do not use it any more!!!
var myVariable = 'Something'; // A variable called myVariable should have value of type string 'Something'

// Const is used to create variables that  do not change value (almost never)
const anotherVariable = 'Some static variable that never* changes';

// Let is used to create variables that change values
let someOtherVariable = `This is a variable that can easily change values. ${myVariable}`;

/**
 *
 * If the color of text is blue  => keyword (reserved word by JS)
 * If the color of text is green => comment
 * If the color is white => ist's something that we created ourselves (potentially)
 * If the color is orange => this is a value (?)
 */

const age = 30;
const showDialog = false;
let greeting; // value of greeting is undefined
console.log('greeting is', greeting);

console.log('someOtherVariable is', someOtherVariable);
someOtherVariable = null;
console.log('someOtherVariable is', someOtherVariable);

/**
 * Object
 * {
 *  key: value,
 *  key: value,
 * }
 * Array 
 * [value, value, value]
 * 
 */


const person1 = {
  name: 'Anna',
  age: 30,
  isMarried: true,
  address: {
    line1: 'Some street',
    country: 'Sweden',
    postalCode: '123 23',
  },
};

const person2 = {
  name: 'John',
  age: 30,
  isMarried: true,
};

// BAD EXAMPLE:
const person3 = [
  'John', // 0
  30, // 1
  true, // 2
  {
    line1: 'Some street',
    country: 'Sweden',
    postalCode: '123 23',
  }, // 3
];


let student = "jane"
console.log(
  'Type of student is', typeof student
)

const countries = ['Germany', 'Sweden', 'Turkey']
console.log(
    'Type of Countries is', typeof countries, 'Is array?', Array.isArray(countries)
);

const numbers = [20, 25, 28]
console.log(
    'Type of numbers is', typeof numbers, 'Is array?', Array.isArray(numbers)
);

const car = {
    brand: 'Volvo',
    model: 'XC90',
    year: 2020,
}
console.log(
    'Type of car is', typeof car, 'Is array?', Array.isArray(car)
);

const isPassed = true;
console.log(
    'Type of isPassed is', typeof isPassed
);

const userInfo = {
  name: "Berk",
  age:28, 
  isActive:true
};

console.log("Type of userInfo is", typeof userInfo)


const timeout = 1000 * 60 * 15;