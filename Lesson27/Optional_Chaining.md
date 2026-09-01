# Optional Chaining 

Optional chaining (`?.`) is a feature in JavaScript that allows you to *safely* access deeply nested properties of an object without having to explicitly check if each intermediate property exists. If a reference is null or undefined, optional chaining short-circuits and returns undefined, preventing runtime errors.

## Key Points

### Purpose: 
To simplify access to nested properties and methods, reducing the need for repetitive checks.

### Behavior: 
If the value before the ?. is null or undefined, it stops and returns undefined immediately.

### Usage: 
For accessing properties, calling methods, and accessing array elements.


```
let result = object?.property;
let result = object?.[property];
let result = object?.method();
let result = data?.person?.address?.street?.name;
```


## Combining with Nullish Coalescing
Optional chaining can be combined with the nullish coalescing operator (??) to provide default values:

```
let user = {
  profile: null
};

let userName = user?.profile?.name ?? 'Guest';
console.log(userName); // Output: 'Guest'

```
If user.profile is `null`, `user?.profile?.name` returns `undefined`, and the nullish coalescing operator provides 'Guest' as the default value.

