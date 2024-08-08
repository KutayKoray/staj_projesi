<<<<<<< HEAD
=======
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

>>>>>>> releaseV1
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
<<<<<<< HEAD
        const profileInfo = document.getElementById('profileInfo');
        profileInfo.innerHTML = `
            <p><strong>Name:</strong> ${user.name}</p>
            <p><strong>Surname:</strong> ${user.surname}</p>
            <p><strong>Username:</strong> ${user.username}</p>
            <p><strong>Email:</strong> ${user.e_mail}</p>
            <p><strong>Role:</strong> ${user.is_teacher ? 'Teacher' : 'Student'}</p>
        `;
=======
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
>>>>>>> releaseV1
    } catch (error) {
        console.error('Error fetching profile:', error);
        alert('An error occurred while fetching the profile.');
    }
}

<<<<<<< HEAD

document.getElementById('questionForm').addEventListener('submit', async function(event) {
    event.preventDefault();

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
    if (!user.is_teacher) {
        document.getElementById('message').textContent = 'Sadece öğretmenler soru ekleyebilir!';
        return;
    }
    } catch (error) {
        console.error('Error fetching user:', error);
        alert('Kullanıcı bilgileri alınırken bir hata oluştu.');
        return;
    }
    
    
    const formData = new FormData(event.target);
    const data = {
        soru_turu: formData.get('soru_turu'),
        soru: formData.get('soru'),
        a: formData.get('a'),
        b: formData.get('b'),
        c: formData.get('c'),
        d: formData.get('d'),
        correct_answer: formData.get('correct_answer')
    };
    
    try {
        const response = await fetch('http://localhost:8000/questions/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        
        const result = await response.json();
        
        if (response.ok) {
            document.getElementById('message').textContent = 'Soru başarıyla eklendi!';
            loadQuestions();
        } else {
            document.getElementById('message').textContent = 'Soru eklenirken bir hata oluştu: ' + result.detail;
        }
    } catch (error) {
        console.error('Error adding question:', error);
        alert('Soru eklenirken bir hata oluştu.');
    }
});

async function loadQuestions() {
    try {
        const response = await fetch('http://localhost:8000/questions/');
        const questions = await response.json();
        
        const container = document.getElementById('questionsContainer');
        container.innerHTML = '<h2>Veritabanındaki Sorular</h2>';
        
        questions.forEach(question => {
            const card = document.createElement('div');
            card.className = 'question-card';
            
            card.innerHTML = `
                <h3>${question.soru_turu}</h3>
                <h3>${question.soru}</h3>
                <p>A: ${question.a}</p>
                <p>B: ${question.b}</p>
                <p>C: ${question.c}</p>
                <p>D: ${question.d}</p>
                <p>Doğru Cevap: ${question.correct_answer}</p>
            `;
            
            container.appendChild(card);
        });
    } catch (error) {
        console.error('Error loading questions:', error);
        alert('Sorular yüklenirken bir hata oluştu.');
    }
}

window.onload = async function() {
    await fetchProfile();
    await loadQuestions();
};


document.getElementById('soruCozButton').addEventListener('click', function() {
    const page = '/web/quiz.html';
    window.location.href = page;
});
=======
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

>>>>>>> releaseV1
