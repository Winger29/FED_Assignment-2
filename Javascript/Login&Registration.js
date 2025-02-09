document.getElementById('registerForm').addEventListener('submit', function(event) {
    event.preventDefault(); 

    const username = document.getElementById('registerUsername').value;
    const password = document.getElementById('registerPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    // Check if passwords match
    if (password !== confirmPassword) {
        alert('Passwords do not match!');
        return;
    }

    // Check if fields are empty
    if (username && password) {
        registerUser(username, password);
    } else {
        alert('Please fill in all fields');
    }
});

// Function to register user in RESTdb
function registerUser(username, password) {
    const apiUrl = 'https://fedassignment2-4024.restdb.io/rest/webuser'; 
    const apiKey = 'a71926925440ffe9fad56d54b3257a1478eac'; 

    const userData = {
        username: username,
        password: password
    };

    // Send the data to RESTdb
    fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'x-apikey': apiKey
        },
        body: JSON.stringify(userData)
    })
    .then(response => response.json())
    .then(data => {
        console.log('User registered:', data);
        if (data._id) {
            alert('Registration successful!');
            showLoginForm(); 
        } else {
            alert('An error occurred. Please try again.');
        }
    })
    .catch(error => {
        console.error('Error registering user:', error);
        alert('An error occurred. Please try again.');
    });
}
