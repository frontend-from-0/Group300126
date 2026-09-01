# Default Parameters

Default parameters allow you to specify default values for function parameters. If no argument is provided for a parameter when the function is called, the default value is used. This feature simplifies function definitions and makes code more readable and robust by handling cases where some arguments might be omitted.

## Key Points
### Purpose: 
To provide default values for function parameters if no argument is passed.

### Behavior: 
If an argument is undefined, the default value is used. Other falsy values like null, 0, false, or an empty string will not trigger the default value.

### Syntax: 
Default parameters are defined in the function signature.

```
function functionName(parameter1 = defaultValue1, parameter2 = defaultValue2) {
  // function body
}
```

```
function greet(name = 'Guest') {
  return `Hello, ${name}!`;
}

console.log(greet('Alice')); // Output: Hello, Alice!
console.log(greet()); // Output: Hello, Guest!

```