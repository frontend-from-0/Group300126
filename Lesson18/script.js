/*
===========================================================
  SHOPPING CART APPLICATION
===========================================================
In this project, you'll create a simple Shopping Cart to
simulate adding items, removing items, calculating totals,
and applying discounts.

You'll practice:
1. Classes and objects
2. Encapsulation and abstraction
3. Methods (functions inside a class)
4. Arrays and basic array methods (push, filter, find)
5. Conditional statements (if-else)

Below is a step-by-step guide with comments explaining
each part. You can test each step by running the code in
Node.js or a browser console.
*/

/*
-----------------------------------------------------------
  STEP 1: Create the ShoppingCart Class
-----------------------------------------------------------
1. Define a `ShoppingCart` class.
2. Add a constructor that initializes an empty private 
   array `#items` to store the cart items.
3. Add a `viewCart` method to display all items in the cart.
*/

class ShoppingCart {
  // Private values
  #items;

  // Instantiation method - constructor
  constructor() {
    this.#items = [];
  }

  // Methods
  viewCart() {
    console.log('------- Viewing the cart -------');
    if (this.#items.length > 0) {
      for (const item of this.#items) {
        console.log(
          `Current item - name: ${item.name}, price: ${item.price.amout} ${item.price.currency}, quantity ${item.quantity}`,
        );
      }
    } else {
      console.log(`The cart is empty.`);
    }
    console.log('--------------');

  }

  // If you define Item class for creating items, then modify addItem to accept one parameter (object) instead of 3.
  addItem(name, price, quantity) {
    for (const item of this.#items) {
      if (item.name === name) {
        console.log(
          `Item ${name} already exists, incrementing quantity by ${quantity}`,
        );
        item.quantity += quantity;
        return;
      }
    }
    console.log(`Adding a new item ${name} to the cart.`);
    this.#items.push({ name, price, quantity });
  }

  removeItem(name) {
    for (let i = 0; i < this.#items.length; i++) {
      if (this.#items[i].name === name) {
        console.log(`Found item ${name}, removing from the cart...`)
        this.#items.splice(i, 1);
        return;
      }
    }
    console.log(`Item ${name} is not found in the cart`)
  }
}

const cart = new ShoppingCart();
cart.viewCart();

cart.addItem('laptop', { amount: 1000.5, currency: 'EUR' }, 1);
cart.addItem('phone', { amount: 500, currency: 'EUR' }, 2);
cart.addItem('laptop', { amount: 1000.5, currency: 'EUR' }, 2);
cart.viewCart();

cart.items.splice(1, 2);

cart.removeItem('laptop');
cart.removeItem('apples');



cart.viewCart();

/*
-----------------------------------------------------------
  STEP 2: Add Items to the Cart
-----------------------------------------------------------
1. Create an `addItem` method in the `ShoppingCart` class.
2. The method should:
   - Accept `name`, `price`, and `quantity` as parameters.
   - Check if the item already exists in the cart.
     - If it exists, increase the quantity.
     - Otherwise, add the new item to the `#items` array.
*/

/*
-----------------------------------------------------------
  STEP 3: Remove Items from the Cart
-----------------------------------------------------------
1. Add a `removeItem` method to the `ShoppingCart` class.
2. The method should:
   - Accept the `name` of the item to remove.
   - Remove the item from the `#items` array if it exists.
*/

/*
-----------------------------------------------------------
  STEP 4: Calculate the Total Cost
-----------------------------------------------------------
1. Add a `getTotal` method to the `ShoppingCart` class.
2. The method should:
   - Calculate and return the total cost of all items in 
     the cart.
*/

/*
-----------------------------------------------------------
  STEP 5: Apply a Discount
-----------------------------------------------------------
1. Add an `applyDiscount` method to the `ShoppingCart` class.
2. The method should:
   - Accept a discount code (e.g., 'SAVE10', 'SAVE20').
   - Apply a percentage discount to the total cost if the 
     code is valid.
3. Use an object to store discount codes and their values.
*/
