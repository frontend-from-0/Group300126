# Destructuring

Destructuring is a JavaScript feature that lets you **unpack** values from arrays or properties from objects into separate variables — in one line. Instead of writing `arr[0]`, `arr[1]`, `obj.name` over and over, you pull everything out at once.

**Think of it like unpacking a suitcase:** you open it once and take out each item directly, instead of reaching in one item at a time.

---

## Array Destructuring

Use **square brackets** `[ ]` on the left side of `=`.

### Basic Example

```js
const numbers = ['hello', null, true, undefined, function () { console.log('hello'); }];

// Without destructuring
const first = numbers[0];
const second = numbers[1];
const third = numbers[2];

// With destructuring
const [a, b, c] = numbers;
// a = 'hello', b = null, c = true
```

The order matters: the **first variable** gets the **first element**, the second gets the second, and so on.

### Skipping Elements

Leave an empty slot with a comma to skip a value you do not need.

```js
const [first, , , fourth] = [0, 1, 2, 3];

console.log(first);  // 0
console.log(fourth); // 3
// second and third are skipped
```

### Rest Parameters (`...rest`)

Use `...` to collect **everything left over** into a new array.

```js
const [first, second, ...remainingElements] = numbers;

console.log(first);                 // 'hello'
console.log(second);                // null
console.log(remainingElements);     // [true, undefined, [Function]]
```

`...remainingElements` must be the **last** item in the destructuring pattern.

### Default Values

If an element is `undefined` (or missing), you can provide a fallback.

```js
const [x = 10, y = 20] = [5];
// x = 5  (element exists)
// y = 20 (second element is undefined, so default is used)

const [name = 'Guest'] = [];
// name = 'Guest'
```

---

## Object Destructuring

Use **curly braces** `{ }` on the left side of `=`.

### Basic Example

```js
const person = {
  name: 'Alice',
  age: 30,
  job: 'Engineer',
  isStudent: true
};

// Without destructuring
const name = person.name;
const age = person.age;
const job = person.job;

// With destructuring
const { name, age, job } = person;
// name = 'Alice', age = 30, job = 'Engineer'
```

Variable names must **match property names** (unless you rename them — see below).

### Renaming Variables

Use `propertyName: newVariableName` when you want a different variable name.

```js
const { name: personName, age: personAge } = person;

console.log(personName); // 'Alice'
console.log(personAge);  // 30
// `name` and `age` are NOT created — only personName and personAge
```

### Default Values

If a property is missing or `undefined`, use a default.

```js
const { name, country = 'Sweden' } = person;

console.log(name);    // 'Alice'
console.log(country); // 'Sweden' (property does not exist on person)
```

You can combine renaming and defaults:

```js
const { job: role = 'Unemployed' } = person;
// role = 'Engineer'
```

### Nested Objects

Destructure inner properties by mirroring the object shape.

```js
const personWithContactInfo = {
  name: 'Dave',
  age: 32,
  contact: {
    email: 'dave@example.com',
    phone: '123456789',
    address: {
      line1: 'Kungstagatan 1',
      postcode: '444222'
    }
  }
};

// Pull nested values in one step
const {
  name,
  contact: { email, phone },
  contact: {
    address: { line1, postcode }
  }
} = personWithContactInfo;

console.log(name);      // 'Dave'
console.log(email);     // 'dave@example.com'
console.log(line1);     // 'Kungstagatan 1'
console.log(postcode);  // '444222'
```

You can also rename while nesting:

```js
const {
  contact: { email: userEmail }
} = personWithContactInfo;
```

### Rest Properties (`...rest`)

Collect all **remaining properties** into a new object.

```js
const { name, age, ...otherInfo } = person;

console.log(name);      // 'Alice'
console.log(age);       // 30
console.log(otherInfo); // { job: 'Engineer', isStudent: true }
```

Like arrays, `...otherInfo` must be **last** in the pattern.

---

## Quick Reference

| What you have | Syntax | Example |
|---|---|---|
| Array | `[a, b] = arr` | `const [x, y] = [1, 2]` |
| Skip array item | empty comma | `const [a, , c] = arr` |
| Rest of array | `...rest` | `const [a, ...rest] = arr` |
| Object | `{ a, b } = obj` | `const { name, age } = person` |
| Rename | `{ a: b } = obj` | `const { name: n } = person` |
| Default | `{ a = 1 } = obj` | `const { city = 'N/A' } = person` |
| Nested | `{ a: { b } } = obj` | `const { contact: { email } } = person` |
| Rest of object | `...rest` | `const { name, ...rest } = person` |

---

## Key Points

### Purpose
To write shorter, clearer code when pulling values out of arrays and objects.

### Arrays vs Objects
- **Arrays** → use `[ ]` — order matters.
- **Objects** → use `{ }` — match property names (or rename them).

### Rest (`...`)
Works in both arrays and objects. It gathers everything **left over** into a new array or object.

### Defaults
Use `= value` when a slot might be missing or `undefined`. Works well with optional chaining (`?.`) and nullish coalescing (`??`) from the other lessons in this module.
