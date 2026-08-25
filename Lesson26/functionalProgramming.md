Functional programming is a programming paradigm that treats computation as the evaluation of mathematical functions and avoids changing state and mutable data. One of the core concepts of functional programming is working with higher-order functions, which can take other functions as arguments or return them as results.

JavaScript provides several higher-order functions, such as .map() and .filter(), which are commonly used in functional programming. In this lesson, we'll explore these methods and understand how they can be used to manipulate arrays.

Here are some key concepts and techniques of functional programming in JavaScript:

1. **First-Class Functions**: In JavaScript, functions are first-class citizens, meaning they can be assigned to variables, passed as arguments to other functions, and returned from functions. This allows you to create higher-order functions, which are functions that operate on other functions.

```
const add = (a, b) => a + b;
const multiply = (a, b) => a * b;

const operation = add;
console.log(operation(2, 3)); // Output: 5
```

2. **Pure Functions**: Pure functions are functions that produce the same output for the same inputs and have no side effects. They do not modify external state and do not rely on mutable data. Pure functions are predictable and easier to reason about, which makes testing and debugging simpler.
```
const square = (num) => num * num;

const pureFunction = (arr) => arr.map(square);
const inputArray = [1, 2, 3];
console.log(pureFunction(inputArray)); // Output: [1, 4, 9]
```

3. **Immutability**: In functional programming, data is treated as immutable. This means that once a piece of data is created, it cannot be changed. Instead, you create new data structures when you need to make changes. This prevents unexpected side effects and simplifies parallel and concurrent programming.
```
const originalArray = [1, 2, 3];
const newArray = [...originalArray, 4]; // Create a new array with the new element
console.log(originalArray); // Output: [1, 2, 3]
console.log(newArray);      // Output: [1, 2, 3, 4]
```

4. **Higher-Order Functions**: These are functions that take one or more functions as arguments or return a function as their result. Examples include `map`, `filter`, and `reduce`. They enable you to abstract away common patterns of behavior and promote reusable code.
```
const numbers = [1, 2, 3, 4, 5];

const doubled = numbers.map((num) => num * 2);
const evenNumbers = numbers.filter((num) => num % 2 === 0);
const sum = numbers.reduce((acc, num) => acc + num, 0);

console.log(doubled);    // Output: [2, 4, 6, 8, 10]
console.log(evenNumbers); // Output: [2, 4]
console.log(sum);         // Output: 15
```

5. **Map, Filter, and Reduce**: These are higher-order functions that are commonly used in functional programming. 
   - `map` applies a given function to each element of an array and returns a new array with the results.
   - `filter` creates a new array with all elements that pass a certain test function.
   - `reduce` iterates through an array and accumulates a single value by repeatedly applying a combining function.

See the section above for the example.

6. **Recursion**: Functional programming encourages the use of recursion for solving problems. Recursion involves a function calling itself with modified arguments until a base case is reached.

```
const factorial = (n) => {
  if (n === 0 || n === 1) {
    return 1;
  } else {
    return n * factorial(n - 1);
  }
};

console.log(factorial(5)); // Output: 120
```

7. **Closures**: Closures occur when a function is defined within another function and retains access to the outer function's variables even after the outer function has finished executing. Closures are a powerful tool in functional programming.
```
const outerFunction = (x) => {
  const innerFunction = (y) => {
    return x + y;
  };
  return innerFunction;
};

const addFive = outerFunction(5);
console.log(addFive(3)); // Output: 8
```

8. **Immutable Data Structures**: Libraries like Immutable.js or using the spread operator (`...`) can be used to create immutable data structures, preventing accidental modifications.
```
const originalObj = { name: 'John', age: 30 };
const updatedObj = { ...originalObj, age: 31 }; // Create a new object with updated property

console.log(originalObj); // Output: { name: 'John', age: 30 }
console.log(updatedObj);   // Output: { name: 'John', age: 31 }
```

9. **Function Composition**: This involves combining multiple functions to create more complex functions. Composing functions allows you to build up your program's logic in a modular and reusable way.
```
const add = (a, b) => a + b;
const multiplyByTwo = (num) => num * 2;
const subtractTen = (num) => num - 10;

const composedFunction = (num) => subtractTen(multiplyByTwo(add(num, 5)));

console.log(composedFunction(7)); // Output: 14
```

10. **Currying**: Currying is the process of converting a function that takes multiple arguments into a series of functions that take one argument each. This can help with function composition and partial application.

```
const add = (a) => (b) => a + b;
const addFive = add(5);

console.log(addFive(3)); // Output: 8
```
