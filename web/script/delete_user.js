// script/delete_user.js

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

        // Yeniden kullanıcıları yükle ve tabloyu güncelle
        loadUsers();
    } catch (error) {
        console.error('Error:', error);
        document.getElementById('message').textContent = 'An error occurred while deleting the user.';
    }
}

async function loadUsers() {
    try {
        const response = await fetch('http://localhost:8000/users/');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const users = await response.json();
        const tbody = document.querySelector('#userTableBody');
        tbody.innerHTML = '';

        users.forEach(user => {
            const row = document.createElement('tr');
            row.innerHTML = `<td>${user.username || ''}</td>`;
            tbody.appendChild(row);
        });
    } catch (error) {
        console.error('Error fetching users:', error);
        alert('An error occurred while fetching the user list.');
    }
}

window.onload = loadUsers;
