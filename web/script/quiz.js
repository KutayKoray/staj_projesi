document.addEventListener('DOMContentLoaded', () => {
    const categoryContainer = document.getElementById('categoryContainer');
    const questionsContainer = document.getElementById('questionsContainer');
    const categoryTitle = document.getElementById('categoryTitle');
    const questionList = document.getElementById('questionList');

    let currentQuestionIndex = 0;
    let score = 0;
    let timer;
    const QUESTION_TIME = 30; // saniye cinsinden
    const CORRECT_ANSWER_POINTS = 10;
    let questions = [];
    let user = localStorage.getItem('username');
    let totalQuestions = 0;
    let correctAnswers = 0;
    let wrongAnswers = 0;

    categoryContainer.addEventListener('click', async (event) => {
        if (event.target.classList.contains('category')) {
            const category = event.target.dataset.category;
            categoryTitle.textContent = category;

            try {
                const response = await fetch(`http://localhost:8000/questions/category/${category}`);
                if (!response.ok) throw new Error('Network response was not ok');
                questions = await response.json();

                categoryContainer.style.display = 'none';
                questionsContainer.style.display = 'flex';

                currentQuestionIndex = getRandomInt(questions.length);
                score = 0;
                showQuestion();
            } catch (error) {
                console.error('Error fetching questions:', error);
                alert('An error occurred while fetching the questions.');
            }
        }
    });

    function getRandomInt(max) {
        return Math.floor(Math.random() * max);
    }

    function showQuestion() {
        totalQuestions++;
        if (currentQuestionIndex >= questions.length) {
            endQuiz();
            return;
        }

        const question = questions[currentQuestionIndex];
        questionList.innerHTML = '';

        const questionItem = document.createElement('div');
        questionItem.classList.add('question');
        questionItem.dataset.id = question.id;
        questionItem.innerHTML = `
            <h3>${question.soru}</h3>
            <button onclick="checkAnswer('A')">A: ${question.a}</button>
            <button onclick="checkAnswer('B')">B: ${question.b}</button>
            <button onclick="checkAnswer('C')">C: ${question.c}</button>
            <button onclick="checkAnswer('D')">D: ${question.d}</button>
            <div id="timer">Kalan Süre: ${QUESTION_TIME}</div>
        `;
        questionList.appendChild(questionItem);

        startTimer();
    }

    function startTimer() {
        let timeLeft = QUESTION_TIME;
        clearInterval(timer);
        timer = setInterval(() => {
            timeLeft--;
            document.getElementById('timer').textContent = `Kalan Süre: ${timeLeft}`;
            if (timeLeft <= 0) {
                clearInterval(timer);
                alert('Süre doldu!');
                endQuiz();
            }
        }, 1000);
    }

    window.checkAnswer = function(selectedAnswer) {
        clearInterval(timer);
        const currentQuestion = questions[currentQuestionIndex];
        if (selectedAnswer === currentQuestion.correct_answer) {
            score += CORRECT_ANSWER_POINTS;
            alert('Doğru cevap!');
            currentQuestionIndex = getRandomInt(questions.length);
            showQuestion();
        } else {
            alert('Yanlış cevap. Quiz bitti.'); 
            endQuiz();
        }
    }

    function endQuiz() {
        correctAnswers = score / CORRECT_ANSWER_POINTS;
        wrongAnswers = totalQuestions - correctAnswers;

        questionList.innerHTML = `
            <h2>Quiz Bitti!</h2>
            <p id="score">Toplam Puanınız: ${score}  - ${user}</p>
        `;

        update_user_stats(totalQuestions, correctAnswers, wrongAnswers, score, user);

        // Quiz bittiğinde kategori seçimine dönme seçeneği ekleyebilirsiniz
        const restartButton = document.createElement('button');
        restartButton.textContent = 'Yeni Kategori Seç';
        restartButton.onclick = () => {
            categoryContainer.style.display = 'flex';
            questionsContainer.style.display = 'none';
        };
        questionList.appendChild(restartButton);
    }
});

function update_user_stats(totalQuestions, correctAnswers, wrongAnswers, score, user) {
    fetch(`http://localhost:8000/users/${user}/score`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            total_question: totalQuestions,
            correct_answer: correctAnswers,
            wrong_answer: wrongAnswers,
            score: score
        }),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        console.log('Kullanıcı istatistikleri güncellendi:', data.new_stats);
        alert(`Skorunuz güncellendi! Yeni skorunuz: ${data.new_stats.score}`);
    })
    .catch((error) => {
        console.error('Error updating user stats:', error);
        alert('Kullanıcı istatistikleri güncellenirken bir hata oluştu.');
    });
}