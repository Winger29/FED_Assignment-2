document.addEventListener('DOMContentLoaded', function () {

    // Register form submission
    document.getElementById('registerForm').addEventListener('submit', async function(event) {
        event.preventDefault(); 

        console.log('Submit button clicked, form validation started');

        const username = document.getElementById('registerUsername').value;
        const password = document.getElementById('registerPassword').value;
        const confirmPassword = document.getElementById('confirmPassword').value;


        // Validation checks
        if (password !== confirmPassword) {
            alert('Passwords do not match!');
            return;
        }

        if (!username || !password) {
            alert('Please fill in all fields');
            return;
        }

        console.log("Form validated, proceeding to register user");

        try {
            await registerUser(username, password);
            document.getElementById('registerForm').reset();
        } catch (error) {
            console.error("Error during registration:", error);
        }
    });

    async function registerUser(username, password) {
        const apiUrl = 'https://cors-anywhere.herokuapp.com/https://fedassignment2-4024.restdb.io/rest/webuser'; 
        const apiKey = 'a71926925440ffe9fad56d54b3257a1478eac'; 


        const userData = {
            "Username": username,  
            "Password": password    
        };

        console.log("Sending user data to RESTdb:", userData);

        // fetches url then sends the data to the database
        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-apikey': apiKey
                },
                body: JSON.stringify(userData) 
            });

            const data = await response.json();

            console.log('User registered:', data);

            if (data._id) {
                alert('Registration successful!');
                showLoginForm();  
            } else {
                alert('An error occurred. Please try again.');
            }
        } catch (error) {
            console.error('Error during API request:', error);
            alert('An error occurred. Please try again.');
        }
    }

});


// login portion 
document.addEventListener('DOMContentLoaded', function () {
    // Login form submission
    document.getElementById('loginform').addEventListener('submit', async function(event) {
        event.preventDefault(); 

        const username = document.getElementById('usernameinput').value;
        const password = document.getElementById('InputPassword1').value;

        // Validation checks
        if (!username || !password) {
            alert('Please fill in both fields');
            return;
        }

        try {
            const isValid = await validateLogin(username, password);
            if (isValid) {
                alert('Login successful!, you will be redirected to home page shortly');
                window.location.href = 'home.html';
            } else {
                alert('Invalid username or password');
            }
        } catch (error) {
            console.error("Error during login:", error);
            alert('An error occurred. Please try again.');
        }
    });

    async function validateLogin(username, password) {
        const apiUrl = 'https://cors-anywhere.herokuapp.com/https://fedassignment2-4024.restdb.io/rest/webuser'; 
        const apiKey = 'a71926925440ffe9fad56d54b3257a1478eac'; 

        // fetches the data then checks if the username and password matches
        try {
            const response = await fetch(apiUrl, {
                method: 'GET',  
                headers: {
                    'Content-Type': 'application/json',
                    'x-apikey': apiKey
                }
            });

            const users = await response.json();
            
            const user = users.find(user => user.Username === username && user.Password === password);

            return user ? true : false; 

        } catch (error) {
            console.error('Error during API request:', error);
            throw new Error('Login failed');
        }
    }
});
