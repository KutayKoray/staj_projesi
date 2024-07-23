document.getElementById('registerBtn').addEventListener('click', () => {
    window.location.href = 'http://localhost:8080/web/register.html';
});

const loginForm = document.getElementById('login-form');

        loginForm.addEventListener('submit', async (event) => {
            event.preventDefault();

            const formData = new FormData(loginForm);
            const username = formData.get('username');
            const password = formData.get('password');

            const response = await fetch('http://localhost:8000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, password })
            });

            const data = await response.json();
        
            if (response.status == 200) {
                alert('Login successful');
                localStorage.setItem('username', username);
                window.location.href = 'http://localhost:8080/web/main.html';
            } else {
                alert('Login failed');
            }
        });

