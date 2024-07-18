const soruDersi = localStorage.getItem('soruDersi');
const soruAdedi = localStorage.getItem('soruAdedi');

let correct_answers = 0;
let wrong_answers = 0;
let total_questions = 0;
let score = 0;

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
        
         // current_question'a ilk sorunun ID'sini ata
         current_question = questions_ids[0];

        console.log('questions_ids:', questions_ids);
        console.log('current_question:', current_question);

        getQuestionById(current_question);

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

    } catch (error) {
        console.error('Hata:', error);
        document.getElementById('questionResult').innerText = error.message;
    }
}



// -sorular ekrana yazdırılacak



// -kullanıcın işaretlediği cevaplar alınacak kaydedilecek sınav bittiğinde kontrol edilip doğru ve yanlış scor sayısı belirlenecek. Bunun için bir veri tipi oluşturulacak her sorunun id'si, sorunun correct_answer bilgisi ve kullanıcın işaretlediği cevaplar bu veri tipine kaydedilecek ve bu veri tipini tutacak bir liste oluşturulacak. En sonda bu liste ile doğru ve yanlış sayısı belirlenecek.
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