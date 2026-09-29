# How to add styles to React application?

1. *Inline Styling*: It's like adding styles directly in your JSX. You use a style attribute with an object where the keys are camelCased versions of the style name. It's super direct but not always the most scalable or maintainable, especially for complex components.

Setup: No extra setup needed. You can use inline styles out of the box with CRA.

2. *CSS Stylesheets*: Good old CSS files. You create a separate .css file and import it into your React component. It keeps your styles organized and separate from your JavaScript, which can be neat and tidy.

Setup: Also supported by default. Just create your .css files and import them into your components.

3. *CSS Modules*: A step up from regular CSS. With CSS Modules, you still write CSS in separate files, but when you import them into your React component, they're scoped to that component only. This means no more worrying about class name conflicts across your app!

Setup: CRA has built-in support for CSS Modules. Just name your stylesheet files as [name].module.css, and you're good to go.

4. *Styled Components*: If you're into the JavaScript-in-CSS vibe, this is for you. Styled components let you write actual CSS in your JavaScript file, using tagged template literals. It's like merging styles and components into one, which can be really powerful for component-based designs.

Setup: You'll need to install the styled-components package. After that, you can start using it in your components directly.
E.g. if you use Material UI, check this guide: https://mui.com/material-ui/getting-started/installation/#with-styled-components


5. *Sass/SCSS*: If you're already using CSS but want more power (like variables, mixins, nesting), Sass or SCSS is a great choice. You write in the Sass syntax, and it compiles down to regular CSS.

Setup: CRA supports Sass/SCSS out of the box. Just install node-sass (if it's not already installed), and you can import .scss or .sass files just like regular CSS.
`npm install sass`

6. *Tailwind CSS*: This is for utility-first fans. You apply pre-defined classes directly in your JSX. It's like having a huge set of utility classes at your disposal for almost every CSS property.

Setup: For Tailwind, you'll need to install it and set it up. This involves installing Tailwind via npm and configuring it, but the Tailwind documentation provides a clear guide for this.


I recommend using https://headlessui.com/ as component library together with TailwindCSS.
And for the icons, I like https://phosphoricons.com/ (https://github.com/phosphor-icons/react)