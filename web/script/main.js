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
        const profileInfo = document.getElementById('profileInfo');
        profileInfo.innerHTML = `
            <p><strong>Name:</strong> ${user.name}</p>
            <p><strong>Surname:</strong> ${user.surname}</p>
            <p><strong>Username:</strong> ${user.username}</p>
            <p><strong>Email:</strong> ${user.e_mail}</p>
            <p><strong>Role:</strong> ${user.is_teacher ? 'Teacher' : 'Student'}</p>
        `;

        // Check user role and hide button if user is a student
        const addTestButton = document.getElementById('addTestButton');
        if (!user.is_teacher) { // user.is_teacher is 0 if user is a student
            addTestButton.style.display = 'none'; // Hide the button
        } else {
            addTestButton.style.display = 'block'; // Show the button
        }
    } catch (error) {
        console.error('Error fetching profile:', error);
        alert('An error occurred while fetching the profile.');
    }
}

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
                <h3>id = ${question.soru_id}</h3>
                <h3>${question.alan_bilgisi}</h3>
                <h3>${question.soru_dersi}</h3>
                <p>${question.image_file_name}</p>
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