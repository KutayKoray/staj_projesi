<<<<<<< HEAD
async function deleteUser() {
    const username = document.getElementById('username').value;

    try {
        const response = await fetch(`http://localhost:8000/users/${username}`, {
=======
async function loadUsers() {
    try {
        const response = await fetch('http://localhost:8000/users/');
        if (!response.ok) {
            throw new Error('Kullanıcılar yüklenirken bir hata oluştu.');
        }
        const users = await response.json();
        const userTableBody = document.getElementById('userTableBody');
        userTableBody.innerHTML = '';

        users.forEach(user => {
            const row = document.createElement('tr');
            const cell = document.createElement('td');
            cell.textContent = user.username;
            row.appendChild(cell);
            userTableBody.appendChild(row);
        });
    } catch (error) {
        console.error('Error:', error);
        document.getElementById('message').textContent = 'Kullanıcılar yüklenirken bir hata oluştu.';
        document.getElementById('message').className = 'alert alert-danger show';
    }
}

async function deleteUser() {
    const username = document.getElementById('username').value;
    if (!username) {
        document.getElementById('message').textContent = 'Kullanıcı adı girilmedi.';
        return;
    }

    try {
        const response = await fetch(`http://localhost:8000/users/${username}/delete`, {
>>>>>>> releaseV1
            method: 'DELETE'
        });

        const messageDiv = document.getElementById('message');
        messageDiv.innerHTML = '';

        if (!response.ok) {
            const errorData = await response.json();
<<<<<<< HEAD
            messageDiv.textContent = `Error: ${errorData.detail}`;
=======
            messageDiv.textContent = `Hata: ${errorData.detail}`;
            messageDiv.className = 'alert alert-danger show';
>>>>>>> releaseV1
            return;
        }

        const result = await response.json();
        messageDiv.textContent = result.message;
<<<<<<< HEAD
    } catch (error) {
        console.error('Error:', error);
        document.getElementById('message').textContent = 'An error occurred while deleting the user.';
    }
}
=======
        messageDiv.className = 'alert alert-success show';

        loadUsers();
    } catch (error) {
        console.error('Error:', error);
        document.getElementById('message').textContent = 'Kullanıcı silinirken bir hata oluştu.';
        document.getElementById('message').className = 'alert alert-danger show';
    }
}

async function deleteAllUsers() {
    try {
        const response = await fetch('http://localhost:8000/users/delete_all_users', {
            method: 'DELETE',
        });

        if (!response.ok) {
            const errorData = await response.json();
            document.getElementById('message').textContent = `Error: ${errorData.detail}`;
            return;
        }

        const result = await response.json();
        document.getElementById('message').textContent = result.message;

        loadUsers();
    } catch (error) {
        console.error('Error:', error);
        document.getElementById('message').textContent = 'An error occurred while deleting all users.';
    }
}

window.onload = loadUsers;
>>>>>>> releaseV1
