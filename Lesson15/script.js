/*
1. Check Password Length
   - Define a function `checkPassword(password)` that checks if `password` length
     is at least 8 characters.
   - If >= 8, log: "Password length is sufficient."
   - Otherwise, log: "Password is too short."
   - Call the function with different passwords and log the result.
*/
function checkPassword(password) {
  const passwordString = String(password);
  // if (typeof password !== 'string') {
  //    console.log('Please provide a string value');
  //    return;
  // }
  if (passwordString.length >= 8) {
    console.log("Password length is sufficient.");
  } else {
    console.log("Password is too short.");
  }
}
checkPassword("123456789");
checkPassword("asdf");
checkPassword(123456789);

/*
2. Uppercase Name
   - Define a function `uppercaseName(name)` that converts a given name to uppercase.
   - Log the uppercase result to the console.
   - Example: "John Doe" -> "JOHN DOE"
*/
function uppercaseName(name) {
  if (typeof name !== "string") {
    console.log("Please provide a string value");
    return;
  }
  console.log(name.toUpperCase());
}
uppercaseName("Oguzhan Demir");
uppercaseName({ name: "Oguzhan Demir" });

/*
3. Lowercase Email
   - Define a function `normalizeEmail(email)` that returns a lowercased version of the email.
   - Log the normalized email to the console.
   - Example: "USER@Example.COM" -> "user@example.com"

*/

function normalizeEmail(email) {
  if (typeof email !== "string") {
    console.log("Please provide a string value");
    return;
  }
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (emailRegex.test(email)) {
    console.log(email.toLowerCase());
  } else {
    console.log(
      "Email address is not valid, please provide a valid email address, e.g. name@domain.com",
    );
  }
}
console.log("Ex. 3:");
normalizeEmail("USER@Example.COM");
normalizeEmail("USERExample.COM");

/*
4. Extract Domain
   - Define a function `getDomain(email)` that uses `slice` or `substring` to
     extract everything after '@'.
   - Log the domain to the console.
   - Example: "user@example.com" -> "example.com"
*/

function getDomain(email) {
  if (typeof email !== "string") {
    console.log("Please provide a string value");
    return;
  }
  // Find index for split
  // split the string
  const index = email.indexOf("@");
  const domain = email.substring(index + 1);
  console.log(domain);

  // Alternative
  // const emailParts = email.split('@');
  // console.log(emailParts[1]);
}

console.log("Ex. 4:");
getDomain("busra@example.com");
getDomain("busra@google.com");
getDomain();

/*
5. Check Substring
   - Define a function `containsWord(sentence, word)` that checks if the `sentence`
     includes `word` (use the .includes() method).
   - If true, log: "<word> found in sentence."
   - Else, log: "<word> not found in sentence."
*/
function containsWord(sentence, word) {
  if (typeof sentence !== "string" || typeof word !== "string") {
    console.log("Please provide a string value for both parameters.");
    return;
  }
  if (sentence.includes(word)) {
    console.log(`${word} found in sentence`);
  } else {
    console.log(`${word} not found in sentence`);
  }
}
console.log("Ex. 5:");
containsWord('ends with ".pdf" using .endsWith().', "with");
containsWord('ends with ".pdf" using .endsWith().', "JS");
containsWord('ends with ".pdf" using .endsWith().');

/*
6. File Extension Check
   - Define a function `checkFileExtension(filename)` that checks if the filename
     ends with ".pdf" using .endsWith().
   - If it does, log: "This is a PDF file."
   - Otherwise, log: "ç"
*/

function checkFileExtension(filename) {
  if (typeof filename !== "string") {
    console.log(`Please provide a string value`);
    return;
  }

  if (filename.toLowerCase().endsWith(`.pdf`)) {
    console.log(`This is a PDF file.`);
  } else {
    console.log(`This is not a PDF file.`);
  }
}
console.log("Ex. 6:");
checkFileExtension(`test.PDF`);
checkFileExtension(`test.jpeg`);

/*
7. Compare Numbers (if-else)
   - Define a function `compareNumbers(a, b)` that:
     - Logs "a is bigger" if a > b
     - Logs "b is bigger" if b > a
     - Logs "Numbers are equal" if they are the same
*/
function compareNumbers(a, b) {
  if (a > b) {
    console.log("a is bigger");
  } else if (b > a) {
    console.log("b is bigger");
  } else {
    console.log("Numbers are equal");
  }
}
console.log("Ex. 7:");
compareNumbers(3, 2);
/*
8. (Palindrome Check) Compare Strings (case-insensitive)
   - Define a function `areEqualIgnoreCase(str1, str2)` that converts both strings
     to lowercase and checks if they are the same using ===.
   - If equal, log: "Strings are equal."
   - Otherwise, log: "Strings are not equal."
   - Call the function with pairs like ("Hello", "hello") and ("cat", "dog").
*/
function areEqualIgnoreCase(str1, str2) {
  if (typeof str1 !== "string" || typeof str2 !== "string") {
    console.log(`Please provide a string value for both parameters.`);
    return;
  }
  str1 = str1.toLowerCase();
  str2 = str2.toLowerCase();
  if (str1 === str2) {
    console.log("Strings are equal.");
  } else {
    console.log("Strings are not equal.");
  }
}
console.log("Ex. 8:");
areEqualIgnoreCase("Hello", "hello");
areEqualIgnoreCase("cat", "dog");
/*
9. String Truncation
   - Define a function `truncateString(text, maxLength)` that uses slice() to
     cut the string to `maxLength` characters, then appends "..." if it was too long.
   - Log the final truncated string.
*/

function truncateString(text, maxLength) {
  let exmp9 = text.slice(0, maxLength) + "...";
  console.log(exmp9);
}
console.log("Ex. 9:");
truncateString("test", 3);
/*
10. Check Even or Odd (if-else)
   - Define a function `evenOrOdd(number)` that:
     - Logs "Even" if the number is even
     - Logs "Odd" if the number is odd
*/
function evenOrOdd(number) {
  if (typeof number !== "number") {
    console.log("Please enter a valid number");
    return;
  }
  if (number % 2 === 0) {
    console.log("Even");
  } else {
    console.log("Odd");
  }
}
console.log("Ex. 10:");
evenOrOdd(4);
evenOrOdd(7);
/*
11. URL Protocol Checker
   - Define a function `checkProtocol(url)` that converts the URL to lowercase
     and checks if it starts with "https" using .startsWith().
   - Log "Secure connection" if true, otherwise "Unsecure connection".
*/
function checkProtocol(url) {
  url = url.toLowerCase();
  if (url.startsWith("https")) {
    console.log("Secure connection");
  } else {
    console.log("Unsecure connection");
  }
}
console.log("Ex. 11:");
checkProtocol("google.com");
checkProtocol("https://www.youtube.com/");
/*
12. Switch: Day of the Week
   - Define a function `getDayOfWeek(num)` that uses a switch statement:
     1 -> "Monday"
     2 -> "Tuesday"
     ...
     7 -> "Sunday"
     - Log the matched day or "Invalid day" if out of range.
*/
function getDayOfWeek(num) {
  const weekDayNumber = parseInt(num);
  switch (weekDayNumber) {
    case 1:
      return "Monday";
    case 2:
      return "Tuesday";
    case 3:
      return "Wednesday";
    case 4:
      return "Thursday";
    case 5:
      return "Friday";
    case 6:
      return "Saturday";
    case 7:
      return "Sunday";
    default:
      return "Invalid Day";
  }
}
console.log("Ex.12:");
console.log(getDayOfWeek(2));
console.log(getDayOfWeek(5));
console.log(getDayOfWeek(new Date().getDay()));

console.log(
  new Date(),
  new Date().getDay(),
  new Date().getDate(),
  new Date().getMonth(),
  new Date().getFullYear(),
);

/*
13. Repeat a String
   - Define a function `repeatWord(word, times)` that uses the .repeat() method
     to repeat `word` `times` times.
   - Log the repeated result.
*/
function repeatWord(word, times) {
  if (typeof word !== "string" || typeof times !== "number") {
    console.log("Please provide a string and a number.");
    return;
  }
  word = word.repeat(times);
  console.log(word);
}
console.log("Ex. 13:");
repeatWord("Test ", 3);
/*
14. Replace Substring
   - Define a function `censorWord(sentence, target)` that replaces `target`
     with "****" (use .replaceAll() or multiple .replace()).
   - Log the censored sentence.
*/
function censorWord(sentence, target) {
  if (typeof sentence !== "string" || typeof target !== "string") {
    console.log("Please provide string values for both parameters.");
    return;
  }
  let censoredSentence = sentence.replaceAll(target, "****");
  console.log(censoredSentence);
}
console.log("Ex. 14:");
censorWord("This is secret message.", "message");
/*
15. Check First Character (if-else)
   - Define a function `startsWithA(str)` that checks if the string starts with 'A'
     (use .charAt(0) or [0]).
   - Log "Starts with A" or "Does not start with A".
*/
function startsWithA(str) {
  if (str.charAt(0) === "A") {
    console.log("Starts with A");
  } else {
    console.log("Does not start with A");
  }
}
console.log("Ex. 15:");
startsWithA("Atest");
startsWithA("Btest");
/*
16. Slice Last N Characters
   - Define a function `sliceLastN(text, n)` that uses .slice(-n) to extract
     the last `n` characters of `text`.
   - Log the result.
*/
function sliceLastN(text, n) {
  if (typeof text !== "string" || typeof n !== "number") {
    console.log("Please provide a string value and a valid number.");
    return;
  } else if (n <= 0) {
    console.log("Please provide just a positive number");
    return;
  }
  text = text.slice(-n);
  console.log(text);
}
console.log("Ex. 16:");
sliceLastN("This is a test message", 1);
sliceLastN("This is a test message", 0);
/*
17. Switch: Grade Checker
   - Define a function `gradeChecker(score)` that uses a switch (or if-else chain):
     90+ -> "A"
     80-89 -> "B"
     70-79 -> "C"
     60-69 -> "D"
     below 60 -> "F"
   - Log the grade.
*/
function gradeChecker(score) {
  if (typeof score !== "number") {
    console.log("Please provide a number value.");
    return;
  } else if (score > 100 || score < 0) {
    console.log("Grade value cannot be higher than 100 and lower than 0.");
    return;
  }
  switch (true) {
    case score >= 90:
      return console.log("A");
    case 79 < score && score < 90:
      return console.log("B");
    case 69 < score && score < 80:
      return console.log("C");
    case 59 < score && score < 70:
      return console.log("D");
    case score <= 60:
      return console.log("F");
  }
}
console.log("Ex. 17:");
gradeChecker(85);
gradeChecker(105);

/*
18. Character Replacement
   - Define a function `replaceCharacter(str, oldChar, newChar)` that uses .replaceAll()
     (or a loop) to swap all occurrences of oldChar with newChar.
   - Log the result.
*/
function replaceCharacter(str, oldChar, newChar) {
  if (
    typeof str !== "string" ||
    typeof oldChar !== "string" ||
    typeof newChar !== "string"
  ) {
    console.log("Please just provide string value");
  }
  let newStr = str.replaceAll(oldChar, newChar);
  console.log(newStr);
}
console.log("Ex. 18:");
replaceCharacter("This is a test message", "test", "important");
/*
19. Capitalize First Letter
   - Define a function `capitalizeFirst(text)` that:
     - Uses charAt(0) (or [0]) and toUpperCase() for the first character
     - Uses slice(1) for the rest of the string (unchanged)
     - Returns or logs the combined result
   - Example: "hello world" -> "Hello world"
   - Log the result for at least two different strings.
*/
function capitalizeFirst(text) {
  text = text.charAt(0).toUpperCase() + text.slice(1);
  console.log(text);
}
console.log("Ex. 19:");
capitalizeFirst("hello world");
capitalizeFirst("tEST MESSAGE");
/*
20. Switch: Traffic Light
   - Define a function `trafficLight(color)` that uses a switch statement:
     - "red" -> log: "Stop"
     - "yellow" -> log: "Caution"
     - "green" -> log: "Go"
     - anything else -> "Invalid color"
*/
function trafficLight(color) {
  if (typeof color !== "string") {
    console.log("Please provide a string");
    return;
  }
  if (color === "red") {
    console.log("Stop");
  } else if (color === "yellow") {
    console.log("Caution");
  } else if (color === "green") {
    console.log("Go");
  } else {
    console.log("Invalid color");
  }
}
console.log("Ex. 20:");
trafficLight("red");
trafficLight("yellow");
trafficLight("green");
trafficLight("test");
trafficLight(5432);
/*
21. Check String Length (if-else)
   - Define a function `isLongString(str)` that checks if the string length
     is more than 10.
   - Log "Long string" or "Short string".
*/
function isLongString(str) {
  if (typeof str !== "string") {
    console.log("Please provide a string value");
    return;
  }
  if (str.length > 10) {
    console.log("Long string");
  } else if (str.length === 10) {
    console.log("Equal string");
  } else {
    console.log("Short string");
  }
}
console.log("Ex. 21:");
isLongString("trafficLig");
isLongString("test");
isLongString("capitalizeFirst");
/*
22. Convert to Lowercase Then Check
   - Define a function `isSpam(text)` that converts the text to lowercase
     and checks if it includes "spam".
   - If it does, log "This text is spam."
   - Otherwise, log "This text is not spam."
*/
function isSpam(text) {
  const lowerCaseWord = text.toLowerCase();
  if (lowerCaseWord.includes("spam")) {
    console.log("This text is spam.");
  } else {
    console.log("This is not spam");
  }
}
console.log("Ex. 22:");
isSpam("Buy cheap SPAM now!");
isSpam("Hello SpAm filter");
isSpam("I love coding");
/*
23. Two-Part Initials
   - Define a function `getTwoPartInitials(fullName)` for names with exactly two words
     separated by one space (e.g. "John Doe").
   - Use split(" ") once, then charAt(0) on each part (index 0 and 1 only).
   - Uppercase each letter and log in the form "J.D."
   - Do not use loops; assume exactly two words.
*/
function getTwoPartInitials(fullName) {
  const seperatedWord = fullName.split(" ");
  const firstLetter = seperatedWord[0].charAt(0).toUpperCase();
  const secondLetter = seperatedWord[1].charAt(0).toUpperCase();
  console.log(`${firstLetter}.${secondLetter}.`);
}
console.log("Ex. 23:");
getTwoPartInitials("John Doe");
getTwoPartInitials("mustafa kemal");
/*
24. Switch: Month to Season
   - Define a function `getSeason(monthNum)` (1-12). Use switch or if-else:
     - 12, 1, 2  -> "Winter"
     - 3, 4, 5   -> "Spring"
     - 6, 7, 8   -> "Summer"
     - 9, 10, 11 -> "Autumn"
   - Log the season or "Invalid month" if out of range.
*/
function getSeason(monthNum) {
  switch (monthNum) {
    case 12:
    case 1:
    case 2:
      return "Winter";

    case 3:
    case 4:
    case 5:
      return "Spring";

    case 6:
    case 7:
    case 8:
      return "Summer";

    case 9:
    case 10:
    case 11:
      return "Autumn";

    default:
      return "Invalid month";
  }
}
console.log("Ex. 24:");
console.log(getSeason(12));
console.log(getSeason(4));
console.log(getSeason(8));
console.log(getSeason(15));
/*
  ****

I thought we could use this as well***<

function getSeason(monthNum) {
if ([12, 1, 2].includes(monthNum)) return "Winter";
  if ([3, 4, 5].includes(monthNum)) return "Spring";
  if ([6, 7, 8].includes(monthNum)) return "Summer";
  if ([9, 10, 11].includes(monthNum)) return "Autumn";
  else{
  return "Invalid month";
}
}
  **** 
*/
/*
25. Check If String Contains Number
   - Define a function `containsNumber(str)` that uses a string method such as
     .match(/\d/) or a similar check for any digit (no loops).
   - If a digit is found, log: "Contains number"
   - Otherwise, log: "No number found"
   - Test with strings like "hello", "room 5", and "abc123".
*/
function containsNumber(str) {
  const testStringMethod = str.match(/\d/);
  if (testStringMethod) {
    console.log("Contains number");
  } else {
    console.log("No number found");
  }
}
console.log("Ex. 25:");
containsNumber("hello");
containsNumber("room 5");
containsNumber("abc123");

/*
26. Pad a String
   - Define a function `padString(str, maxLength)` that if str.length < maxLength,
     uses .padEnd() or .padStart() to make the string reach maxLength with '*'.
   - Log the padded string.
*/
function padString(str, maxLength) {
  if (str.length < maxLength) {
    const sonucLast1 = str.padEnd(maxLength, "*");
    console.log(sonucLast1);
  } else {
    console.log(str);
  }
}
console.log("Ex. 26:");
padString("test", 8);
padString("testMessage", 3);
padString("test", 4);
/*
27. If-Else: Voting Eligibility
   - Define a function `canVote(age)` that logs:
     - "Can vote" if age >= 18
     - "Too young to vote" otherwise
*/
function canVote(age) {
  if (typeof age !== "number") {
    console.log("Please provide a number value");
    return;
  }
  if (age >= 18) {
    console.log("Can vote");
  } else {
    console.log("Too young to vote");
  }
}
console.log("Ex. 27:");
canVote(6);
canVote(25);
canVote("test");
/*
28. Reverse a String
   - Define a function `reverseString(text)` that reverses the entire string using
     split(""), reverse(), and join("") (no for/while loops).
   - Log the result.
   - Example: "hello" -> "olleh"
*/
function reverseString(text) {
  const exmp28 = text.split("").reverse().join("");
  console.log(exmp28);
}
console.log("Ex. 28:");
reverseString("hello");
/*
29. Check Substring Position
   - Define a function `findWordPosition(sentence, word)` that uses .indexOf(word)
     to find the starting index. If not found, return -1.
   - Log the index or log "Not found" if it's -1.
*/
function findWordPosition(sentence, word) {
  if (typeof sentence !== "string" || typeof word !== "string") {
    console.log("Please provide a string value");
    return;
  }
  const exmp29 = sentence.indexOf(word);
  if (exmp29 === -1) {
    console.log("Not found");
    return;
  } else {
    console.log(exmp29);
  }
}
console.log("Ex. 29:");
findWordPosition("This is a test message", "is");
findWordPosition("This is a test message", "test");
findWordPosition("This is a test message", "word");
/*
30. Switch: Simple Calculator
   - Define a function `calculate(a, operator, b)` that uses switch to handle:
     - "+" -> a + b
     - "-" -> a - b
     - "*" -> a * b
     - "/" -> a / b
     - Otherwise -> "Invalid operator"
   - Log the result.
*/
function calculate(a, operator, b) {
  if (typeof operator !== "string") {
    console.log("Please provide a string value");
    return;
  }
  switch (operator) {
    case "+":
      return a + b;
    case "-":
      return a - b;
    case "*":
      return a * b;
    case "/":
      return a / b;
    default:
      return "Invalid operator";
  }
}
console.log("Ex. 30:");
console.log(calculate(1, "+", 4));
console.log(calculate(1, "-", 4));
console.log(calculate(1, "*", 4));
console.log(calculate(1, "/", 4));
