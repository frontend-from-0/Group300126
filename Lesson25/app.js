// const getPostsAndComments = async () => {
//   try {
    
//     const response = await fetch(
//       'https://jsonplaceholder.typicode.com/posts/1',
//     );
//     if (!response.ok){
//       throw new Error("Failed to fetch post")
//     }
//     const post = await response.json();
//     console.log(post);

//     const commentsResponse = await fetch(
//       `https://jsonplaceholder.typicode.com/comments?postId=${post.id}`,
//     );
//     if (!commentsResponse.ok){
//       throw new Error("Failed to fetch comments")
//     }
//     const comments = await commentsResponse.json();
//     console.log(comments);
//   } catch (error) {
//     console.error(error);
//   }
// };

// getPostsAndComments()


const getPostsAndCommentsV2 = async () => {
  try {

    const [postResponse, commentsResponse] = await Promise.all([fetch(
      'https://jsonplaceholder.typicode.com/posts/1',
    ), fetch(
      `https://jsonplaceholder.typicode.com/comments?postId=1`,
    )]);

    if (!postResponse.ok) {
      throw new Error('Could not fetch the post');
    }

    if (!commentsResponse.ok) {
      throw new Error('Could not fetch comments for post wiht id 1');
    }


    const [post, comments] = await Promise.all([postResponse.json(), commentsResponse.json()]);

    console.log( post, comments);
    
  } catch (error) {
    console.error(error);
  }
};

getPostsAndCommentsV2()