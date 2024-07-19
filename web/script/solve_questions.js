const soruDersi = localStorage.getItem('soruDersi');
const soruAdedi = localStorage.getItem('soruAdedi');
const user = localStorage.getItem('username');

let correct_answer = '';
let correct_answers = 0;
let wrong_answers = 0;
let total_questions = 0;
let score = 0;

let counter = 1;

let nextBtn = document.getElementById('nextBtn');
let previousBtn = document.getElementById('prevBtn');
nextBtn.innerText = 'İleri';
prevBtn.innerText = 'Geri';

// veri tabanından istenen dersin sorularını istenen adette çek ve questions id içine yazdır.
let questions_ids = [];
let current_question = 0;

async function getQuestions() {
    try {
        const response = await fetch(`http://localhost:8000/questions/category/${soruDersi}/${soruAdedi}`);
        if (!response.ok) {
            throw new Error('Sorular bulunamadı');
        }
        const questions = await response.json();
        
         // Gelen verileri questions_ids array'ine ekle
         questions_ids = questions.map(question => question.soru_id);
    

        console.log('questions_ids:', questions_ids);
        console.log('current_question:', questions_ids[current_question]);

        getQuestionById(questions_ids[current_question]);

    } catch (error) {
        console.error('Hata:', error);
        document.getElementById('questionResult').innerText = error.message;
    }
}
getQuestions();



// -veri tabanından id'ye göre soru çekilecek
async function getQuestionById(soruId) {
    try {
        const response = await fetch(`http://localhost:8000/questions/${soruId}`);
        if (!response.ok) {
            throw new Error('Soru bulunamadı');
        }
        const question = await response.json();

        console.log('question:', question);

        correct_answer = question.correct_answer;
        console.log('correct_answer:', correct_answer);

        displayQuestion(question);

    } catch (error) {
        console.error('Hata:', error);
        document.getElementById('questionResult').innerText = error.message;
    }
}

//ileri ok tuşuna basıldığında bir sonraki soru ekana yazdırılacak

function nextQuestion() {
    
    if (counter + 1 == questions_ids.length) {
        nextBtn.innerText = 'Bitir';
        
    }
    if (counter < questions_ids.length) {

        current_question++;
        counter++;
        getQuestionById(questions_ids[current_question]);
    } else {
        // sınav bittiğinde user_answers listesini kontrol et ardından doğru ve yanlış sayılarını belirle sonra veri tabanına güncelleme yap
        finishExam();

    }
}

function finishExam() {
    handle_user_answers();
    display_stats();

    alert('Sınav bitti!');
    // burada ana sayfaya yönlendiren bir buton oluştur.
    
    hiddenButton.click();



    console.log('Doğru cevap sayısı:', correct_answers);
    console.log('Yanlış cevap sayısı:', wrong_answers);
    console.log('Toplam soru sayısı:', total_questions);
    console.log('Skor:', score);

    update_user_stats(total_questions, correct_answers, wrong_answers, score, user);
}

function goto_main_menu() {
    window.location.href = '/web/main.html';
}

const modal = document.getElementById("myModal");
const openModalBtn = document.getElementById("openModalBtn");
const closeModalSpan = document.getElementsByClassName("close")[0];
const hiddenButton = document.getElementById('hiddenButton');

// Modal'ı açan fonksiyon
openModalBtn.onclick = function() {
    display_stats();
    modal.style.display = "block";
}

// Modal'ı kapatan fonksiyon
closeModalSpan.onclick = function() {
    modal.style.display = "none";
}

// Modal dışında bir yere tıklanınca modal'ı kapatma
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

function display_stats() {
    const stats = {
        correct_answers: correct_answers,
        wrong_answers: wrong_answers,
        total_questions: total_questions,
        score: score
    };

    const statsList = document.getElementById('statsList');
    statsList.innerHTML = `
        <li>Correct Questions: ${stats.correct_answers}</li>
        <li>Wrong Questions: ${stats.wrong_answers}</li>
        <li>Total Questions Solved: ${stats.total_questions}</li>
        <li>Score: ${stats.score}</li>
    `;
}

//geri ok tuşuna basıldığında bir önceki soru ekrana yazdırılacak

function previousQuestion() {
    counter--;
    if (counter < questions_ids.length) {
        nextBtn.innerText = 'İleri';
    }
    if (current_question > 0) {
        current_question--;
        getQuestionById(questions_ids[current_question]);
    } else {
        alert('Bu ilk soru!');
    }
}

// -sorular ekrana yazdırılacak
function displayQuestion(question) {
    const questionContainer = document.getElementById('question');
    questionContainer.innerHTML = `
        <div class="">
        <h2>${counter}. Soru</h2>
        <br>
        <img src="./uploads/${question.image_file_name}" 
             alt="Soru resmi" 
             onerror="this.onerror=null; this.src='path/to/error/image.jpg'; this.alt='Resim yüklenemedi';"
             style="width: 100%; height: auto;">
    </div>
    `;
}


// -kullanıcın işaretlediği cevaplar alınacak kaydedilecek sınav bittiğinde kontrol edilip doğru ve yanlış scor sayısı belirlenecek. Bunun için bir veri tipi oluşturulacak her sorunun id'si, sorunun correct_answer bilgisi ve kullanıcın işaretlediği cevaplar bu veri tipine kaydedilecek ve bu veri tipini tutacak bir liste oluşturulacak. En sonda bu liste ile doğru ve yanlış sayısı belirlenecek

let user_answers = [
    // örnek
    // {
    //     question_id: 1,
    //     correct_answer: "A",
    //     user_answer: "B"
    // },
    // {
    //     question_id: 2,
    //     correct_answer: "C",
    //     user_answer: "C"
    // }
];

document.querySelectorAll(".btn").forEach(button => {
    button.addEventListener('click', function(event) {
        handle_answer(event);
    });
});

function handle_answer(event) {
    let question_id = questions_ids[current_question];
    let user_answer = event.target.innerText;
    let buttonId = event.target.id;

    switch (buttonId) {
        case 'optionA':
            saveAnswer(question_id, correct_answer, user_answer);
            break;
        case 'optionB':
            saveAnswer(question_id, correct_answer, user_answer);
            break;
        case 'optionC':
            saveAnswer(question_id, correct_answer, user_answer);
            break;
        case 'optionD':
            saveAnswer(question_id, correct_answer, user_answer);
            break;
        case 'optionE':
            saveAnswer(question_id, correct_answer, user_answer);
            break;
        default:
            break;
    }
}

function saveAnswer(question_id, correct_answer, user_answer) {
    user_answers.push({
        question_id: question_id,
        correct_answer: correct_answer,
        user_answer: user_answer
    });
    console.log('user_answers:', user_answers);
}

function getLatestAnswers(answers) {
    const answerMap = answers.reduce((acc, answer) => {
        acc[answer.question_id] = answer;
        return acc;
    }, {});

    return Object.values(answerMap);
}

function handle_user_answers() {
    
    getLatestAnswers(user_answers).forEach(answer => {
        if (answer.correct_answer === answer.user_answer) {
            correct_answers++;
            score += 3;
        } else {
            wrong_answers++;
            score -= -1;
        }
        total_questions++;
    });

    console.log('correct_answers:', correct_answers);
    console.log('wrong_answers:', wrong_answers);
    console.log('total_questions:', total_questions);
    console.log('score:', score);

}

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

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
};