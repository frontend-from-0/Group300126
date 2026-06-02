/* 
For loop
The for loop is the most common loop and is used when the number of iterations is known before the loop starts.
*/
for (let i = 0; i < 5; i++) {
  console.log('For loop iteration:', i);
}

/* 
While Loop
The while loop is used when the number of iterations is not known and the loop needs to continue until a certain condition is met.
*/
let j = 0;
while (j < 5) {
    console.log('While loop iteration:', j);
    j++;
}

/*
Do-While Loop
The do-while loop is similar to the while loop, except that it executes the code block once before checking the condition, ensuring that the code block is executed at least once.
 */

let k = 0;
do {
    console.log('Do-while loop iteration:', k);
    k++;
} while (k < 5);

/*
For...In Loop
The for...in loop is used to iterate over the properties of an object (the keys) in an arbitrary order.
*/

const person = { firstName: "John", lastName: "Doe", age: 25 };
for (const key in person) {
    console.log(`${key}: ${person[key]}`);
}

/*
For...Of Loop
The for...of loop is used to iterate over iterable objects such as Arrays, Strings, Maps, NodeLists, and more. It retrieves values directly from the collection, rather than the array indices.
*/

const colors = ['red', 'green', 'blue'];
for (const color of colors) {
    console.log(color);
}
