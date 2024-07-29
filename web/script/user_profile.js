async function fetchProfile() {
    const username = localStorage.getItem('username');
    try {
        const response = await fetch(`http://localhost:8000/users/${username}`, {
            method: 'GET',
            credentials: 'include'
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const user = await response.json();

        const profile_username = document.getElementById('profile_username');
        profile_username.innerHTML = user.username;

        const profileInfo = document.getElementById('profileInfo');
        profileInfo.innerHTML = `
            <p><strong>Username:</strong> ${user.username}</p>
            <p><strong>Name:</strong> ${user.name}</p>
            <p><strong>Surname:</strong> ${user.surname}</p>
            <p><strong>Role:</strong> ${user.is_teacher ? 'Teacher' : 'Student'}</p>
            <p><strong>Email:</strong> ${user.e_mail}</p>
        `;
    } catch (error) {
        console.error('Error fetching profile:', error);
        alert('An error occurred while fetching the profile.');
    }
}

async function loadWrongQuestions() {
    const username = localStorage.getItem('username');
    try {
        const response = await fetch(`http://localhost:8000/users/${username}`, {
            method: 'GET',
            credentials: 'include'
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const user = await response.json();
        const wrongQuestions = user.wrong_questions || [];

        if (wrongQuestions.length === 0) {
            document.getElementById('questionsList').innerHTML = '<h2>Yanlış yapılan soru bulunmamaktadır.</h2>';
            return;
        }

        const container = document.getElementById('questionsList');
        
        for (const questionId of wrongQuestions) {
            const questionResponse = await fetch(`http://localhost:8000/questions/${questionId}`);
            if (!questionResponse.ok) {
                throw new Error('Soru bulunamadı');
            }

            const question = await questionResponse.json();

            const card = document.createElement('div');
            card.className = 'question-card';
            
            card.innerHTML = `
                <div style="border: 3px solid #ccc; padding: 10px; border-radius: 10px; margin-bottom: 10px;">
                    <h3>id = ${question.soru_id}</h3>
                    <p>${question.alan_bilgisi}</p>
                    <p>${question.soru_dersi}</p>
                    <p>Doğru Cevap: ${question.correct_answer}</p>
                </div>
            `;
            
            container.appendChild(card);
        }
    } catch (error) {
        console.error('Error loading wrong questions:', error);
        alert('Yanlış sorular yüklenirken bir hata oluştu.');
    }
}

window.onload = async function() {
    await fetchProfile();
    await loadWrongQuestions();
};


document.addEventListener('DOMContentLoaded', function() {
    const toggleButton = document.getElementById('toggleQuestions');
    const questionsList = document.getElementById('questionsList');

    toggleButton.addEventListener('click', function() {
        questionsList.classList.toggle('hidden');
        
        if (questionsList.classList.contains('hidden')) {
            toggleButton.textContent = 'Yanlış Sorularım';
        } else {
            toggleButton.textContent = 'Yanlış Soruları Gizle';
        }
    });
});