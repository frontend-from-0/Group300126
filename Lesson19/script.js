const containerElement = document.getElementById('container');

containerElement.innerHTML = `
<p id="firstParagraph">This is the first paragraph of the container div.<span class="hidden">This is hidden text</span></p>
<p id="secondParagraph">This is the second paragraph of the container div.</p>
<script src="./bad-script.js"></script>
`;

const firstParagraph = document.getElementById('firstParagraph');

console.log('textContent', firstParagraph.textContent);
console.log('innerText', firstParagraph.innerText);

console.log('About to update innerText');
firstParagraph.innerText = 'Some new content. ';

console.log('textContent', firstParagraph.textContent);

console.log(firstParagraph);

console.log(containerElement.getElementsByTagName('p'));

// Add code below
const h1 = document.querySelector('h1');

// I only used setTimeout to make it easier for us to see the change. In real life, we never want to delay action or page load
setTimeout(() => {
  h1.classList.add('headline');
}, 3 * 1000); // 3 seconds

setTimeout(() => {
  h1.classList.remove('headline');
}, 6 * 1000); // 6 seconds

const liElements = document.querySelectorAll('li');

console.log(liElements);

liElements.forEach((li, index) => {
  if (index % 2 === 0) { // 0, 2, 4, 6, 8....
    return li.classList.add('text-secondary');
  }
  return li;
});


const pElements = document.getElementsByTagName(`p`);

// [...arrayReference] - spread operator for copying an array
[...pElements].forEach(p => p.classList.add('text-large'));


console.log(document.getElementsByTagName('img'));
