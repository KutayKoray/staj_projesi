document.addEventListener('DOMContentLoaded', () => {
    const categoryContainer = document.getElementById('categoryContainer');
    const questionsContainer = document.getElementById('questionsContainer');
    const categoryTitle = document.getElementById('categoryTitle');
    const questionList = document.getElementById('questionList');

    categoryContainer.addEventListener('click', async (event) => {
        if (event.target.classList.contains('category')) {
            const category = event.target.dataset.category;
            categoryTitle.textContent = category;


            try {
                const response = await fetch(`http://localhost:8000/questions/category/${category}`);
                if (!response.ok) throw new Error('Network response was not ok');
                const questions = await response.json();

                questionList.innerHTML = '';

                questions.forEach((question) => {
                    const questionItem = document.createElement('li');
                    questionItem.classList.add('question');
                    questionItem.dataset.id = question.id;
                    questionItem.innerHTML = `
                        <h3> ${question.soru}</h3>
                        <p>Correct answer: ${question.correct_answer}</p>
                        <p>A: ${question.a}</p>
                        <p>B: ${question.b}</p>
                        <p>C: ${question.c}</p>
                        <p>D: ${question.d}</p>
                    `;
                    questionList.appendChild(questionItem);
                });

                categoryContainer.style.display = 'none';
                questionsContainer.style.display = 'flex';
            } catch (error) {
                console.error('Error fetching questions:', error);
                alert('An error occurred while fetching the questions.');
            }
        }
    });
});
