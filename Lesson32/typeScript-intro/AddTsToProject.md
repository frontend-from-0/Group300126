To add TS to an existing project created with create-react-app, you need to do the following:

1. First, you need to add TypeScript and the type definitions for React and ReactDOM to your project. Run the following command in your project directory:

```bash
npm install --save-dev typescript @types/react @types/node
```

2. Create a TypeScript Configuration File
Create a `tsconfig.json`` file in the root of your project. Just create a file with .ts or .tsx extension (e.g. page.tsx), then run the dev server.


Alternatively, you can manually create this file with custom configurations. Here's an example of a basic tsconfig.json:


```json
{
  "compilerOptions": {
    "target": "es5",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "noFallthroughCasesInSwitch": true,
    "module": "esnext",
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx"
  },
  "include": ["src"]
}
```

3. Rename Files
Next, rename any file to be converted to TypeScript with the .tsx extension (if it contains JSX) or .ts if it doesn't. For example, rename App.jsx to App.tsx and index.js to index.ts.

You might need to update your code to fix any type errors TypeScript finds. Common updates include:
- Adding type annotations to variables, function parameters, and return types.
- Updating imports and exports to be TypeScript compliant.
- Resolving any other type errors highlighted by TypeScript.