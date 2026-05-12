/* 
Topic: JavaScript Basics

Focus: Variables, data types, arithmetic, strings, random numbers, template literals, increments
*/

// Instructions: Complete each exercise below by writing your code where indicated.

// 1. Declare variables firstNumber=5 and secondNumber=3 and log their sum.
// CODE HERE
 const firstNumber = 5;
 const secondNumber = 3;
 const sumEx1 = firstNumber + secondNumber;

 console.log('Ex.1: ', sumEx1);


// 2. Declare variables learnerName and learnerAge. Log a greeting: "Hello! I am (learnerName) and I am (learnerAge) years old."
// CODE HERE
let learnerName = "Enes";
const learnerAge = "26";
// Template literals 
console.log(`Ex.2 : Hello! I am ${learnerName} and I am ${learnerAge} years old.`)
console.log("Ex.2 : Hello! I am " + learnerName + " and I am " + learnerAge + " years old.")

// 3. Declare variables leftIntegerOperand=10 and rightIntegerOperand=4. Log the result of leftIntegerOperand-rightIntegerOperand, leftIntegerOperand*rightIntegerOperand, and leftIntegerOperand/rightIntegerOperand.
// CODE HERE
const leftIntegerOperand = 10;
const rightIntegerOperand = 4;

console.log('Ex.3 Beginning ------------------');
console.log('Difference result', leftIntegerOperand - rightIntegerOperand);
console.log('Multiplication result', leftIntegerOperand * rightIntegerOperand);
console.log('Division result', leftIntegerOperand / rightIntegerOperand);
console.log('Ex.3 End ------------------');

// 4. Use template literals to log: "My name is (learnerName). I like JS." (reuse learnerName from exercise 2, or declare it again with the same value for a standalone answer).
// CODE HERE

// We assigne a new value to an existing variable
learnerName = "Büşra";
console.log('Ex4: My name is ' + learnerName + '. I like JS.');

// 5. Declare a string secretPasswordString = "securePass". Log the length of secretPasswordString.
// CODE HERE

const secretPasswordString = "securePass";
console.log("Ex.5 : the length of the password", secretPasswordString.length)

// 6. Assign "hello world" to lowercasePhrase, convert lowercasePhrase to uppercase, and log the result.
// CODE HERE

const lowercasePhrase = "hello world"
console.log('Ex:6 uppercase', lowercasePhrase.toUpperCase() );

// 7. Declare helloToken = "Hello" and worldToken = "World". Concatenate them with a space in between and log the result.
// CODE HERE
const helloToken = "Hello";
const worldToken = "World";
console.log("Ex7:", helloToken + " " + worldToken);
console.log("Ex7:", `${helloToken} ${worldToken}`);


// 8. Declare sampleNumberForTypeof = 42. Log the type of sampleNumberForTypeof using typeof.
// CODE HERE

const sampleNumberForTypeof = 42;
console.log(`Ex:8 type is`, typeof sampleNumberForTypeof);

// 9. Declare numericValue = 100, convert numericValue to a string, and log the result.
// CODE HERE
const numericValue = 100;
const stringValue = `${numericValue}`;
console.log(`Ex:9 type is`, typeof stringValue );
console.log(typeof numericValue.toString());
console.log(typeof String(numericValue));
console.log(typeof(numericValue + ""));
console.log(typeof ("" + numericValue));

// 10. Declare stringFiftySource = "50", convert it to a number into parsedNumberFifty, and log the type of parsedNumberFifty to confirm the conversion.
// CODE HERE
const stringFiftySource = "50320";
const parsedNumberFifty = Number(stringFiftySource);
console.log("Ex.10", typeof parsedNumberFifty, parsedNumberFifty);
console.log("Ex.10", typeof parseInt('ffc0cb', 16), parseInt('ffc0cb', 16));


// 11. Declare randomNumber as a random integer between 0 and 10 (inclusive) and log it.
// CODE HERE
const randomNumber = Math.floor(Math.random() * (29 - 12 + 1)) + 12;
// const getRandomNumber = () => Math.floor(Math.random() * 11);
console.log("Ex.11", randomNumber);
// console.log("Ex.11 function", getRandomNumber(), getRandomNumber(),getRandomNumber());

// 12. Declare decimalToFloor=3.7 and decimalToCeil=3.2. Round decimalToFloor down using Math.floor and decimalToCeil up using Math.ceil; log both results.
// CODE HERE

const decimalToFloor = 3.7;
const decimalToCeil = 3.2;
console.log("Ex.12 floor", Math.floor(decimalToFloor));
console.log("Ex.12 ceil", Math.ceil(decimalToCeil));

// 13. Declare a boolean variable enrolledInCourse = true. Log it.
// CODE HERE

const enrolledInCourse = true;
console.log("Ex.13 : ", enrolledInCourse);

// 14. Initialize ticketCounter = 0, then increment it by 1 using ticketCounter++ and log ticketCounter.
// CODE HERE
let ticketCounter = 0;
console.log("Ex.14 : ",ticketCounter++);
console.log("Ex.14 : ", ticketCounter);

// 15. Initialize gameScorePoints = 10, add 5 to it using gameScorePoints += 5, then log gameScorePoints.
// CODE HERE
let gameScorePoints = 10;
gameScorePoints += 5;
console.log("Ex.15 : ", gameScorePoints);
// 16. Declare residentName="Alice", residentAge=30, residentCity="Paris". Log "Alice (30) lives in Paris" using template literals.
// CODE HERE

const residentName="Alice";
const residentAge=30;
const residentCity="Paris";

console.log(`Èx.16:`, 
`\"${residentName} (${residentAge}) lives in ${residentCity}\"`);

// 17. Declare variables bundlePartOne=5, bundlePartTwo=10, bundlePartThree=15. Log their total sum.
// CODE HERE
const bundlePartOne=5;
const bundlePartTwo=10;
const bundlePartThree=15;

console.log("Total sum: ", bundlePartOne+bundlePartTwo+bundlePartThree);
console.log(`Total sum: ${bundlePartOne+bundlePartTwo+bundlePartThree}`);

// 18. Declare divisionDividendAmount=10 and divisionDivisorAmount=3. Log the quotient as divisionQuotient and the subtraction difference (divisionDividendAmount - divisionDivisorAmount) as subtractionDifference.
// CODE HERE

// 19. Declare applicantFirstName and applicantLastName. Create applicantFullName by concatenating them with a space and log applicantFullName.
// CODE HERE

// 20. Declare productFactorSeven=7 and productFactorTwo=2. Log the product of productFactorSeven and productFactorTwo.
// CODE HERE

// 21. Log the value of Math.PI.
// CODE HERE

// 22. Declare demonstrationCounter=0. Increment it using three different methods (e.g., demonstrationCounter++, demonstrationCounter+=1, demonstrationCounter=demonstrationCounter+1) and log the result each time.
// CODE HERE

// 23. Declare baselineCelsiusTemp=20. Increase it by 5 and log the result.
// CODE HERE

// 24. Declare valueForPrefixIncrement=6. Increment it using the prefix ++ operator and log both the expression result and the variable after the update, as appropriate for prefix ++.
// CODE HERE

// 25. Declare valueForPostfixIncrement=8. Increment it using the postfix ++ operator and log both the expression result and the variable after the update, as appropriate for postfix ++.
// CODE HERE

// 26. Declare valueBeforeDoubleStep=-3. Increment it by 1 using prefix ++, then multiply the result by 2 and log the final value.
// CODE HERE

// 27. Declare prefixBaseValue=2 and addedNeighborValue=3. Increment prefixBaseValue using the prefix ++ operator, then add addedNeighborValue to the result and log it.
// CODE HERE
