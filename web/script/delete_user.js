async function deleteUser() {
    const username = document.getElementById('username').value;

    try {
        const response = await fetch(`http://localhost:8000/users/${username}`, {
            method: 'DELETE'
        });

        const messageDiv = document.getElementById('message');
        messageDiv.innerHTML = '';

        if (!response.ok) {
            const errorData = await response.json();
            messageDiv.textContent = `Error: ${errorData.detail}`;
            return;
        }

        const result = await response.json();
        messageDiv.textContent = result.message;
    } catch (error) {
        console.error('Error:', error);
        document.getElementById('message').textContent = 'An error occurred while deleting the user.';
    }
}