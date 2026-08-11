/* 
CRUD - set of basic operations or functions that are commonly used in the context of database management and web applications to manage and manipulate data.
C - create - POST method (has request body to transfer data)
R - read - GET method (cannot have request body to send data to the server)
U - update - PUT / PATCH method (have request body to transfer data)
D - delete - DELETE method
Status codes
HTTP status codes are three-digit numbers that the server sends in response to a client's request made to a web server. They provide information about the outcome of the request, whether it was successful, encountered an error, or requires further action. HTTP status codes are grouped into several ranges, each indicating a different category of response. 
100...199 - Informational Responses
200...299 - Successful Responses (200 OK, 201 Created, 204 No content)
300..399 - redirection (301 Moved Permanently, or 307 Temporary Redirect)
400...499 - Errors (400 Bad Request, 401 Unauthorized, 403 Forbidden, 404 Not Found)
500...599 - Service error (500 Internal Server Error, 502 Bad Gateway, 503 Service Unavailable)
*/

const fetchBtn = document.getElementById('fetchUsersButton');
const container = document.getElementById('container');
const statusMessage = document.getElementById('statusMessage');

fetchBtn.addEventListener('click', () => {
  statusMessage.classList.add('hidden');
  fetch('https://dummyjson.com/users')
    .then((response) => {
      if (!response.ok) {
        throw new Error('Failed to fetch users');
      }
      return response.json();
    })
    .then((data) => {
      data.users.map((user) => createUserCard(user));
    })
    .catch((error) => {
      statusMessage.textContent = 'An error occured.' + error;
      statusMessage.classList.remove('hidden');
    });
});

function createUserCard(user) {
  const userCard = document.createElement('li');
  userCard.classList.add('card');

  const title = document.createElement('h2');
  title.classList.add('card-title');
  title.textContent = user.firstName + ' ' + user.lastName;

  const cardBody = document.createElement('p');
  cardBody.classList.add('card-body');
  cardBody.textContent = 'Date of birth: ' + user.birthDate;

  const updateBtn = document.createElement('a');
  updateBtn.textContent = 'Update User';
  updateBtn.setAttribute('href', `./pages/update.html?userId=${user.id}`);
  updateBtn.classList.add('button', 'button--success');

  const deleteBtn = document.createElement('button');
  deleteBtn.textContent = 'Delete User';
  deleteBtn.classList.add('button', 'button--danger');
  deleteBtn.addEventListener('click', () => deleteUser(user.id));
    // deleteBtn.addEventListener('click', function () { deleteUser(user.id)});
    // deleteBtn.addEventListener('click', deleteUser);


  userCard.appendChild(title);
  userCard.appendChild(cardBody);
  userCard.appendChild(updateBtn);
  userCard.appendChild(deleteBtn);

  container.appendChild(userCard);
}

function deleteUser(userId) {
  statusMessage.classList.add('hidden');

  fetch(`https://dummyjson.com/users/${userId}`, {
    method: 'DELETE',
  })
    .then((response) => {
        
      if (!response.ok) {
        throw new Error(`Failed to delete user ${userId}`);
      }
      console.log(`User ${userId} deleted successfully.`);
    })
    .catch((error) => {
      statusMessage.textContent = 'An error occured.' + error;
      statusMessage.classList.remove('hidden');
    });
}
