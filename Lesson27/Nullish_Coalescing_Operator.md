# Nullish Coalescing Operator (`??`)

The nullish coalescing operator (`??`) is a feature in JavaScript that provides a way to handle null or undefined values. It allows you to specify a default value that should be used if the value on the left side of the operator is null or undefined.


## Key Points
### Purpose: 
To provide a default value when dealing with potentially null or undefined values.

### Behavior: 
The operator only checks for null or undefined. Other falsy values like 0, false, NaN, or an empty string ("") will not trigger the default value.


```
let result = value ?? defaultValue;
```
