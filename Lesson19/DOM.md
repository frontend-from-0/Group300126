
# DOM (Document Object Model)

The `DOM (Document Object Model)` is a programming interface for web documents.

- **Learn More**: [DOM Data Types](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Introduction#fundamental_data_types)
- **Further Reading**: [HTML DOM API](https://developer.mozilla.org/en-US/docs/Web/API/HTML_DOM_API)

---

## Methods for finding elements
1. getElementById - returns an element by its unique ID attribute.

```const element = document.getElementById("elementId");```


2. getElementsByClassName - returns a collection of elements that have a specific class name.

```const elements = document.getElementsByClassName("className");```


3. getElementsByTagName - returns a collection of elements with a specific HTML tag name.

```const elements = document.getElementsByTagName("tagName");```


4. querySelector - returns the first element that matches a given CSS selector.

```const element = document.querySelector("#id");```


5. querySelectorAll - returns a static NodeList(*) of all elements that match a given CSS selector.

```const elements = document.querySelectorAll(".className .anotherClassName");```


6. getElementsByName - returns a collection of elements with a specific name attribute (typically used with form elements when an element has "name" atrribute).

```const elements = document.getElementsByName("elementName");```

7. closest - returns the closest ancestor element that matches a given CSS selector. It starts with the element itself and then traverses up the DOM tree.

```const closestElement = element.closest("CSS selector");```

8. parentNode - returns the parent element of a specified element.

```const parentElement = element.parentNode;```

9. children - returns a live HTMLCollection of child elements of a specified element.

```const childElements = parentElement.children;```


10. previousElementSibling - returns the previous sibling element of a specified element.

```const prevSibling = element.previousElementSibling;```

11. nextElementSibling - returns the next sibling element of a specified element.

```const nextSibling = element.nextElementSibling;```

## NodeList
A NodeList is a collection of DOM elements returned by certain DOM traversal and query methods in JavaScript. It represents a list of nodes (elements) that are linked together in the order they appear in the DOM tree. A NodeList is not an array, although it may resemble one in some ways. It is a "live" collection, meaning it is automatically updated when the DOM changes.

Although a NodeList may resemble an array, it does not have all the properties and methods of an array. For example, **you cannot use array methods like push, pop, or forEach directly on a NodeList**.

## Methods for modifying elements:

1. innerHTML - (DANGEROUS, use textContent or innerText instead) sets or gets the HTML content (including tags) within an element.

```
const element = document.getElementById("exampleElement");
element.innerHTML = "<p>This is a new paragraph.</p>";
```

2. textContent - sets or gets the text content of an element, excluding any HTML tags.
```
const element = document.getElementById("exampleElement");
element.textContent = "This is some new text.";
```

3. setAttribute - sets the value of an attribute for an element.
```
const element = document.getElementById("exampleElement");
element.setAttribute("attributeName", "attributeValue");

```

4. removeAttribute - removes an attribute from an element.
```
const element = document.getElementById("exampleElement");
element.removeAttribute("attributeName");
```

5. classList - provides access to the class names of an element, allowing you to add, remove, or toggle classes.
```
  const element = document.getElementById("exampleElement");
  element.classList.add("newClass");
  element.classList.remove("oldClass");
  element.classList.toggle("active");
```

6. style - used to directly set the CSS styles for an element.
```
  const element = document.getElementById("exampleElement");
  element.style.color = "red";
  element.style.fontSize = "20px";
```

7. appendChild - appends a new child element to an existing element.
```
  const parentElement = document.getElementById("parent");
  const newElement = document.createElement("div");
  parentElement.appendChild(newElement);
```


8. removeChild - removes a child element from its parent.
```
  const parentElement = document.getElementById("parent");
  const childElement = document.getElementById("child");
  parentElement.removeChild(childElement);
```

9. replaceChild - replaces an existing child element with a new one.
```
  const parentElement = document.getElementById("parent");
  const oldChild = document.getElementById("oldChild");
  const newChild = document.createElement("div");
  parentElement.replaceChild(newChild, oldChild);
```

10. cloneNode - creates a copy of an element, optionally including its children.
```
  const originalElement = document.getElementById("original");
  const clonedElement = originalElement.cloneNode(true); // Set to true to include children, false to only clone the element.
``` 

## Responding to user input/action

```
element.addEventListener("click", function(event) {
  // Your logic here
});
```

### Possible events:
click, mouseover, mouseout,  submit (used for Forms), scroll, etc.
Oftenly used for inputs: keydown, keyup, change, focus, blur (opposite to focus)

## innerHTML vs textContent vs innerText

All three can read or update what appears inside an element, but they behave differently:

| | `innerHTML` | `textContent` | `innerText` |
|---|---|---|---|
| **Returns / sets** | HTML markup (tags included) | All plain text in the element | Only **visible** plain text |
| **Parses HTML tags** | Yes — tags are interpreted as HTML | No — tags are treated as plain text | No — tags are treated as plain text |
| **Hidden content** (`display: none`, etc.) | Included in the DOM | Included | Excluded |
| **`<script>` / `<style>` content** | Included | Included | Usually excluded from visible output |
| **Security** | Risky with untrusted input (can inject HTML/scripts) | Safer for user-generated text | Safer for user-generated text |
| **Performance (reading)** | Fast | Fast | Slower — may trigger layout/reflow |
| **Best for** | Inserting HTML structure you control | Setting or reading all text content | Reading text as the user sees it on screen |

**Rule of thumb:** use `textContent` for most text updates in JavaScript. Use `innerHTML` only when you intentionally need to add HTML. Use `innerText` when you specifically care about visible, rendered text.