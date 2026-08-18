// 1. Convert the function below into asyncrounous function using async/await and try/catch syntax.
function fetchPosts() {
  fetch('https://jsonplaceholder.typicode.com/posts')
    .then((response) => response.json())
    .then((posts) => console.log(posts))
    .catch((error) => console.error(error));
}

async function fetchPosts() {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts');

    if (!response.ok) {
      throw new Error('Failed to fetch posts');
    }
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// 2. Convert the function below into asyncrounous function using async/await and try/catch syntax.
let fetchData = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('Data fetched successfully!');
    }, 2000);
  });
};

const getResult = async () => {
  try {
    const result = await fetchData();
    console.log(result, Date.now());
  } catch (error) {
    console.error(error);
  }
};

getResult();

// 3. Convert the function below into asyncrounous function using async/await and try/catch syntax.
const fetchUsers = async () => {
  const response = await fetch('https://jsonplaceholder.typicode.com/users');
  const data = await response.json();
  console.log(data);
  return data;
};

// fetchUsers()
//   .then((users) => console.log('Total users:', users.length))
//   .catch((error) => console.error(error));

async function logTotalUsers() {
  try {
    const users = await fetchUsers();
    console.log('Total users:', users.length);
  } catch (error) {
    console.error(error);
  }
}

logTotalUsers();

// useEffect(() => {
//   async function getSomething() {
//     const response = await fetch('https://jsonplaceholder.typicode.com/users');
//   }
//   getSomething();
// });

// 4. Convert the function below into asyncrounous function using async/await and try/catch syntax.
const fetchUserData = async () => {
  try {
    const response = await fetch(
      'https://jsonplaceholder.typicode.com/users/1',
    );
    const user = await response.json();
    return user;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

// fetchUserData()
//   .then((user) => console.log('User data:', user))
//   .catch((error) => console.error('Error:', error));

async function logUserData() {
  try {
    const user = await fetchUserData();
    console.log('User data:', user);
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}

logUserData();

// 5. Convert the function below into asyncrounous function using async/await and try/catch syntax.
const getPostsAndComments = async () => {
  try {
    const response = await fetch(
      'https://jsonplaceholder.typicode.com/posts/1',
    );
    if (!response.ok) {
      throw new Error('Failed to fetch post');
    }
    const post = await response.json();
    console.log(post);

    const commentsResponse = await fetch(
      `https://jsonplaceholder.typicode.com/comments?postId=${post.id}`,
    );
    if (!commentsResponse.ok) {
      throw new Error('Failed to fetch comments');
    }
    const comments = await commentsResponse.json();
    console.log(comments);
  } catch (error) {
    console.error(error);
  }
};

getPostsAndComments();

// const getPostsAndCommentsV2 = async () => {
//   try {

//     const [postResponse, commentsResponse] = await Promise.all([fetch(
//       'https://jsonplaceholder.typicode.com/posts/1',
//     ), fetch(
//       `https://jsonplaceholder.typicode.com/comments?postId=1`,
//     )]);

//     if (!postResponse.ok) {
//       throw new Error('Could not fetch the post');
//     }

//     if (!commentsResponse.ok) {
//       throw new Error('Could not fetch comments for post wiht id 1');
//     }

//     const [post, comments] = await Promise.all([postResponse.json(), commentsResponse.json()]);

//     console.log( post, comments);

//   } catch (error) {
//     console.error(error);
//   }
// };

// getPostsAndCommentsV2()

// 6.Convert the function below into asyncrounous function using async/await and try/catch syntax.

const fetchWithTimeout = (url, timeout) => {
  return new Promise((resolve, reject) => {
    setTimeout(async () => {
      try {
        const response = await fetch(url);

        resolve(response.json());
      } catch (error) {
        reject(error);
      }
    }, timeout);
  });
};

const fetchPosts = async () => {
  try {
    const result = await fetchWithTimeout(
      'https://jsonplaceholder.typicode.com/posts',
      2000,
    );
    console.log(result);
  } catch (error) {
    console.error(error);
  }
};

fetchPosts()