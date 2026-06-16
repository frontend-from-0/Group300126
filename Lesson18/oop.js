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

class User {
  constructor (username, email) {
    if (typeof username !== 'string' || username.length < 2) {
      throw Error('Invalid username provided')
    }
    if (typeof email !== 'string' || email.length < 5) {
      throw Error('Invalid email provided')
    }
    this.username = username;
    this.email = email;
    this.role = 'user';
  }

  describe () {
    console.log(this.username, this.email, this.role);
  }
}

class AdminUser extends User {
  constructor (username, email) {
    super(username, email);
    this.role = 'admin';
  }


  describe () {
    console.log('Describing admin user:', this.role);
  }
}

const user4 = new User('jane', 'john@gmail.com');
const user5 = new User('asds', 'jane@gmail.com');
const user6 = new AdminUser('asdsa', 'mary@gmail.com');


user4.username = ' ';
user4.describe();
user5.describe();
user6.describe()
