# What is JavaScript?
JavaScript is a dynamic, lightweight, and versatile programming language primarily used for web development. It's a core technology of the World Wide Web, alongside HTML and CSS, and is supported by 99% of websites for client-side functionality.

**HTML is the skeleton, CSS is the skin and clothes, and JavaScript is the brain that lets the body move and react.**

JavaScript has numerous applications beyond basic web interactivity:
- Web Applications: Creating robust, interactive web applications.
- Mobile App Development: Building cross-platform mobile applications.
- Game Development: Creating both 2D and 3D games for web browsers.
- Server-Side Development: With platforms like Node.js, JavaScript can be used for server-side programming.
- Desktop Applications: Frameworks like Electron allow for desktop app development using web technologies.

JavaScript's versatility, extensive ecosystem of libraries and frameworks, and continuous evolution have solidified its position as a fundamental language in modern web development.

# How does JS work?

JavaScript code execution is a complex process that involves several stages.

## Execution Context
When you run JavaScript code, the engine creates an Execution Context. This is the environment in which your code is executed. 
There are two types of Execution Contexts:
- Global Execution Context (GEC): Created for code that's not inside any function.
- Function Execution Context (FEC): Created each time a function is called.

## Execution Process
The execution of JavaScript code happens in two main phases:

#### Creation Phase
1. Memory Allocation: The engine allocates memory for variables and functions.
2. Hoisting: Variables are initialized with undefined, while function declarations are fully stored. 
3. Scope Chain Setup: The engine sets up the scope chain for the execution context.

#### Execution Phase
1. Code Execution: The engine executes the code line by line.
2. Variable Assignment: Variables are assigned their actual values.
3. Function Invocation: When a function is called, a new Function Execution Context is created.


## JavaScript Engine
The JavaScript engine is responsible for executing JavaScript code. Here's how it works:
1. Parsing: The engine reads the code and creates an Abstract Syntax Tree (AST).
2. Compilation: The AST is compiled into bytecode.
3. Execution: The bytecode is executed.
4. Optimization: The engine continuously optimizes the code during execution using Just-In-Time (JIT) compilation.

## Call Stack
The Call Stack keeps track of the execution contexts:
1. The Global Execution Context is pushed onto the stack first.
2. When a function is called, its Execution Context is pushed on top of the stack.
3. When a function completes, its context is popped off the stack.
4. This follows the Last-In-First-Out (LIFO) principle.

## Memory Management
JavaScript uses two main types of memory:
1. Call Stack: For storing primitive values and function calls.
2. Heap: For storing complex objects and dynamically allocated memory.


## Event Loop and Asynchronous Operations
While JavaScript is single-threaded, it can handle asynchronous operations through:
1. Web APIs: Provided by the browser for tasks like DOM manipulation and network requests.
2. Callback Queue: Stores callback functions from asynchronous operations.
3. Event Loop: Checks if the Call Stack is empty and moves callbacks from the queue to the stack.


