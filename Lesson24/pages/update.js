const searchParams = new URLSearchParams(window.location.search);

const userId = searchParams.get('userId');

const updateUserForm = document.getElementById('updateUserForm');
const statusMessage = document.getElementById('statusMessage');
const firstNameInput = document.getElementById('firstName')

if (!userId) {
  updateUserForm.classList.add('hidden');
  statusMessage.textContent = 'The user is not found.';
  statusMessage.classList.remove('hidden');
}

fetch(`https://dummyjson.com/users/${userId}`)
  .then((response) => {
    if (!response.ok) {
      throw new Error(`Failed to fetch user with id ${userId}`);
    }
    return response.json();
  })
  .then((user) => {
    firstNameInput.value = user.firstName;
  })
  .catch((error) => {
    statusMessage.textContent = 'An error occured.' + error;
    statusMessage.classList.remove('hidden');
  });


  updateUserForm.addEventListener('submit', (e) => {
    e.preventDefault();
    console.log(e);
  })



