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
            document.getElementById('questionsContainer').innerHTML = '<h2>Yanlış yapılan soru bulunmamaktadır.</h2>';
            return;
        }

        const container = document.getElementById('questionsContainer');
        container.innerHTML = '<h2>Yanlış yapılan sorular</h2>';
        
        for (const questionId of wrongQuestions) {
            const questionResponse = await fetch(`http://localhost:8000/questions/${questionId}`);
            if (!questionResponse.ok) {
                throw new Error('Soru bulunamadı');
            }

            const question = await questionResponse.json();

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