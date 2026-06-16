  /* Programming paradigms
  OOP - Object Oriented programming
  FP - Functional programming

  OOP:  state is usually stored in objects and can be modified through methods 
  FP: state is immutable, and functions are designed to transform data rather than mutate it
  
  OOP: classes encapsulates related data and behavior
  FP: problems are broken down into smaller, composable functions that can be combined to solve larger problems.

*/

// Real life situation: we have multiple users on our website, and we want to store their information in a way that is easy to access and modify. Different users have different roles, and we want to be able to easily change their roles. We also need to make sure that all users have the same properties.

const user1 = {
  username: 'John',
  email: 'john@gmail.com',
  role: 'user'
};

const user2 = {
  username: 'Jane',
  email: 'jane@gmail.com'
}

const user3 = {
  name: 'Adam',
  email: 'adam@gmail.com'
}
