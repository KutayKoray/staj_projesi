// Profil dropdown fonksiyonelliği
document.addEventListener('DOMContentLoaded', function() {
    var dropdownToggle = document.querySelector('.dropdown-toggle');
    dropdownToggle.addEventListener('click', function() {
        this.classList.toggle('show');
    });
});

// Sidebar toggle fonksiyonelliği (mobil görünüm için)
function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    sidebar.classList.toggle('show');
}

// Sayfa yüklendiğinde çalışac  ak kod
window.addEventListener('DOMContentLoaded', (event) => {
    // Aktif menü öğesini vurgulama
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach((link) => {
        link.addEventListener('click', function() {
            navLinks.forEach((el) => el.classList.remove('active'));
            this.classList.add('active');
        });
    });
});

async function fetchProfile() {
    const username = localStorage.getItem('username');
    try {
        const response = await fetch("http://localhost:8000/users/" + username, {
            method: 'GET',
            credentials: 'include'
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const user = await response.json();
        const profileInfo = document.getElementById('username');
        profileInfo.innerHTML = `
            <p><strong></strong> ${user.username}</p>
        `;

        const addTestButton = document.getElementById('addTestButton');
        if (!user.is_teacher) {
            addTestButton.style.display = 'none';
        } else {
            addTestButton.style.display = 'block';
        }
    } catch (error) {
        console.error('Error fetching profile:', error);
        alert('An error occurred while fetching the profile.');
    }
}

window.onload = async function() {
    await fetchProfile();
};


document.getElementById('scoreBoardButton').addEventListener('click', function() {
    const page = '/web/score_board.html';
    window.location.href = page;
});

document.getElementById('soruCozButton').addEventListener('click', function() {
    const page = '/web/quiz.html';
    window.location.href = page;
});

document.getElementById('addTestButton').addEventListener('click', function() {
    const page = '/web/add_test.html';
    window.location.href = page;
});

document.getElementById('Logout').addEventListener('click', function() {
    localStorage.removeItem('username');
    localStorage.removeItem('soruAdedi');
    localStorage.removeItem('soruDersi');
    window.location.href = '/web/login.html';
});

document.getElementById('Profil').addEventListener('click', function() {
    const page = '/web/user_profile.html';
    window.location.href = page;
});

