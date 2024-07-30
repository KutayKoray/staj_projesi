async function loadQuestions() {
    try {
        const response = await fetch('http://localhost:8000/questions/');
        if (!response.ok) {
            throw new Error('Failed to fetch questions');
        }
        const questions = await response.json();
        
        const tableBody = document.getElementById('questionTableBody');
        tableBody.innerHTML = '';
        
        questions.forEach(question => {
            const row = document.createElement('tr');
            
            row.innerHTML = `
                <td>${question.soru_id}</td>
                <td>${question.alan_bilgisi}</td>
                <td>${question.soru_dersi}</td>
                <td>${question.image_file_name}</td>
                <td>${question.correct_answer}</td>
            `;
            
            tableBody.appendChild(row);
        });
    } catch (error) {
        console.error('Error loading questions:', error);
        alert('Sorular yüklenirken bir hata oluştu.');
    }
}

function deleteQuestion() {
    const questionId = document.getElementById('questionId').value;
    const message = document.getElementById('message');
    
    fetch(`http://localhost:8000/questions/${questionId}/delete`, {
        method: 'DELETE',
    })
    .then(response => {
        if (response.status === 501) {
            throw new Error('DELETE method not supported for this endpoint.');
        }
        if (!response.ok) {
            throw new Error('Soru silinirken bir hata oluştu.');
        }
        return response.json();
    })
    .then(data => {
        message.textContent = 'Soru başarıyla silindi.';
        message.className = 'alert alert-success show';
        loadQuestions();
    })
    .catch(error => {
        message.textContent = error.message;
        message.className = 'alert alert-danger show';
    });
}

function deleteAllQuestions() {
    const message = document.getElementById('message');
    
    fetch('http://localhost:8000/questions/delete_all_questions', {
        method: 'DELETE',
    })
    .then(response => {
        if (response.status === 501) {
            throw new Error('DELETE method not supported for this endpoint.');
        }
        if (!response.ok) {
            throw new Error('Sorular silinirken bir hata oluştu.');
        }
        return response.json();
    })
    .then(data => {
        message.textContent = 'Tüm sorular başarıyla silindi.';
        message.className = 'alert alert-success show';
        loadQuestions();
    })
    .catch(error => {
        message.textContent = error.message;
        message.className = 'alert alert-danger show';
    });
}

window.onload = function() {
    loadQuestions();
};