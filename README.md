# React + `Vite`


#### Problem 1


> react-dom-client.development.js:5842 Uncaught Error: Too many re-renders. React limits the number of renders to prevent an infinite loop.


#### Solution 1

The error occurs because the state update functions (setError) are being called directly within the component's render logic, causing the component to re-render continuously. To fix this, you should move the validation logic into the handleSubmit function, which is called when the form is submitted.

```javascript

const handleSubmit = (e) => {
    e.preventDefault()

    if (!username || !email || !password || !confirmPassword) {
        setError("Please fill in all fields")
        return
    }
}
```


#### Problem 2

Error message

```javascript
'__dirname' is not defined. eslint([object Object])
```

Location: 

```javascript
'@': path.resolve(__dirname, './src'),
```

#### Solution 2

The error occurs because `__dirname` is a Node.js global variable that's not available in ES modules by default. In the `Vite` config file, which uses ES module syntax (import/export), we need to import and use `__dirname` differently.


The error occurs because the `__dirname` variable is not defined in the current scope. To fix this, you can import the `path` module and use the `__filename` and `__dirname` variables to get the directory name of the current file.

```javascript
import path from 'path'

const __filename = fileURLToPath(import.meta.url)

const __dirname = path.dirname(__filename)
```

Here's the fix:



First, we need to import `path` and get the directory name using `import.meta.url`. Add these imports at the top of the file:

```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
```

This fix:
1. Imports the necessary `path` and `url` modules
2. Uses `fileURLToPath` to convert the module's URL to a file path
3. Gets the directory name using `path.dirname()`

The rest of your configuration can remain the same, but now `__dirname` will be properly defined and work as expected in your path resolutions.

This solution is the standard way to handle directory paths in ES modules, as they don't have access to the CommonJS `__dirname` global variable by default.


#### Problem 3

Error message

```javascript
    Unnecessary escape character: \(.
```

Location:

```javascript
phoneNumber: Yup.string()
    .trim()
    .matches(
        /^[\d\s\-\+\(\)]+$/,
        'Phone number can only contain numbers, spaces, and dashes'
    )
    .test('valid-length', 'Phone number must be between 10-15 digits', (value) => {
        if (!value) return false
        const digitsOnly = value.replace(/[\s\-\+\(\)]/g, '')
        return digitsOnly.length >= 10 && digitsOnly.length <= 15
    })
    .required('Phone number is required'),
```

#### Solution 3

In JavaScript regular expressions, parentheses ( and ) don't need to be escaped when they're inside a character class [...].

Removed the backslashes before ( and ) in both regex patterns
Also removed the unnecessary escape before + (the plus sign doesn't need escaping in a character class either)


```javascript
phoneNumber: Yup.string()
    .trim()
    .matches(
        /^[\d\s\-+()]+$/,
        'Phone number can only contain numbers, spaces, and dashes'
    )
    .test('valid-length', 'Phone number must be between 10-15 digits', (value) => {
        if (!value) return false
        const digitsOnly = value.replace(/[\s\-+()]/g, '')
        return digitsOnly.length >= 10 && digitsOnly.length <= 15
    })
    .required('Phone number is required'),
```

#### Problem 4

Error message

```javascript
    Unexpected lexical declaration in case block.
```

Location:

```javascript
    // User already exists - set field-specific error if possible
    const message = data.message || 'An account with this email or phone number already exists'
```

#### Solution 4

The error occurs because you're declaring a const directly in a case block without wrapping it in braces. JavaScript requires lexical declarations (const, let, class) in case blocks to be enclosed in a block scope.

```javascript
case 409: {
    // User already exists - set field-specific error if possible
    const message = data.message || 'An account with this email or phone number already exists'
    if (message.toLowerCase().includes('email')) {
        setFieldError('email', 'This email is already registered')
    } else if (message.toLowerCase().includes('phone')) {
        setFieldError('phoneNumber', 'This phone number is already registered')
    } else {
        setApiError(message)
    }
    break
}
```
