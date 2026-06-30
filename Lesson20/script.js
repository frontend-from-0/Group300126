// 1. Select element
// 2. Add event listener with suitable event type
// 3. Do something (e.g. modify the appearance)

const dateInput = document.getElementById('date');
const selectedDateText = document.getElementById('selected-date');
const timeButtons = document.getElementsByClassName('slot');
const selectedTimeText = document.getElementById('selected-time');
const submitButton = document.getElementById('confirm');
const form = document.getElementById('booking-form');
const formContent = document.getElementById('form-content');
const confirmation = document.getElementById('confirmation-message');
const data = { date: '', time: '' };

dateInput.addEventListener('change', function () {
  let dateValue = dateInput.value;
  const selectedDate = new Date(dateValue).toLocaleDateString('en-GB');

  console.log(`DateInput Value, ${dateInput.value}, ${typeof dateInput.value}`);

  if (!selectedDate || selectedDate === 'Invalid Date') {
    selectedDateText.textContent = '-';
    data.date = '';
  } else {
    selectedDateText.textContent = selectedDate;
    data.date = selectedDate;
  }
  allowSubmit();
});

console.log(timeButtons);

const timeButtonsArray = [...timeButtons];
timeButtonsArray.forEach((button) => {
  button.addEventListener('click', function () {
    const selectedTime = button.textContent;

    if (typeof selectedTime === 'string') {
      selectedTimeText.textContent = selectedTime;
      data.time = selectedTime;
    }

    allowSubmit();
  });
});

function allowSubmit() {
  if (data.time && data.date) {
    submitButton.disabled = false;
  } else {
    submitButton.disabled = true;
  }
}

form.addEventListener('submit', function (event) {
  event.preventDefault();
  console.log(event);
  formContent.classList.add('hidden');
  confirmation.classList.remove('hidden');
});
