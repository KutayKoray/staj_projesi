document.addEventListener('DOMContentLoaded', function() {
    const registerButton = document.getElementById('registerButton');
    registerForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const formData = new FormData(registerForm);

        const data = {
            name: formData.get('name'),
            surname: formData.get('surname'),
            username: formData.get('username'),
            password: formData.get('password'),
            e_mail: formData.get('e_mail'),
            is_teacher: formData.get('role') === 'teacher',
            is_student: formData.get('role') === 'student'
        };

        try {
            const response = await fetch('http://localhost:8000/register/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            const responseData = await response.json();

            if (response.ok) {
                alert('User registered successfully!');
                window.location.href = 'http://localhost:5500/web/login.html';
            } else {
                alert(`Error: ${responseData.detail}`);
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred while registering the user.');
        }
    });
});
