# React + Vite



#### Problem 1: 


> react-dom-client.development.js:5842 Uncaught Error: Too many re-renders. React limits the number of renders to prevent an infinite loop.


#### Solution

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

