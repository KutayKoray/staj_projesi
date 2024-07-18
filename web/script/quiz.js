function updateSoruTuru() {
    var alanBilgisi = document.getElementById('alan_bilgisi').value;
    var soruTuruSelect = document.getElementById('soru_turu');
    var soruDersiSelect = document.getElementById('soru_dersi');

    soruTuruSelect.innerHTML = '<option value="" disabled selected>Soru türü seçiniz</option>';
    soruDersiSelect.innerHTML = '<option value="" disabled selected>Soru dersi seçiniz</option>';

    if (alanBilgisi === 'TYT') {
        soruTuruSelect.options.add(new Option('Türkçe', 'turkce_tyt'));
        soruTuruSelect.options.add(new Option('Sosyal Bilimler', 'sosyal_bilimler_tyt'));
        soruTuruSelect.options.add(new Option('Matematik', 'matematik_tyt'));
        soruTuruSelect.options.add(new Option('Fen Bilimleri', 'fen_bilimleri_tyt'));
    } else if (alanBilgisi === 'AYT') {
        soruTuruSelect.options.add(new Option('Türk Dili ve Sosyal Bilimleri', 'turk_dili_ve_sosyal_bilimleri_ayt'));
        soruTuruSelect.options.add(new Option('Sosyal Bilimler', 'sosyal_bilimler_ayt'));
        soruTuruSelect.options.add(new Option('Matematik', 'matematik_ayt'));
        soruTuruSelect.options.add(new Option('Fen Bilimleri', 'fen_bilimleri_ayt'));
    }

    soruTuruSelect.addEventListener('change', function() {
        var soruTuru = soruTuruSelect.value;
        soruDersiSelect.innerHTML = '<option value="" disabled selected>Soru dersi seçiniz</option>';
        
        if (soruTuru === 'turkce_tyt') {
            soruDersiSelect.options.add(new Option('Türkçe', 'turkce_tyt'));
        } else if (soruTuru === 'sosyal_bilimler_tyt') {
            soruDersiSelect.options.add(new Option('Tarih', 'tarih_tyt'));
            soruDersiSelect.options.add(new Option('Coğrafya', 'cografya_tyt'));
            soruDersiSelect.options.add(new Option('Din Kültürü', 'din_kulturu_tyt'));
            soruDersiSelect.options.add(new Option('Felsefe', 'felsefe_tyt'));
        }
        else if (soruTuru === 'matematik_tyt') {
            soruDersiSelect.options.add(new Option('Matematik', 'matematik_tyt'));
        }
        else if (soruTuru === 'fen_bilimleri_tyt') {
            soruDersiSelect.options.add(new Option('Fizik', 'fizik_tyt'));
            soruDersiSelect.options.add(new Option('Kimya', 'kimya_tyt'));
            soruDersiSelect.options.add(new Option('Biyoloji', 'biyoloji_tyt'));
        }
        else if (soruTuru === 'turk_dili_ve_sosyal_bilimleri_ayt') {
            soruDersiSelect.options.add(new Option('Türk Dili ve Edebiyatı', 'turk_dili_ve_edebiyati_ayt'));
            soruDersiSelect.options.add(new Option('Tarih', 'tarih_ayt'));
            soruDersiSelect.options.add(new Option('Coğrafya', 'cografya_ayt'));
            soruDersiSelect.options.add(new Option('Felsefe', 'felsefe_ayt'));
            soruDersiSelect.options.add(new Option('Din Kültürü', 'din_kulturu_ayt'));
        }
        else if (soruTuru === 'sosyal_bilimler_ayt') {
            soruDersiSelect.options.add(new Option('Tarih', 'tarih_ayt'));
            soruDersiSelect.options.add(new Option('Coğrafya', 'cografya_ayt'));
            soruDersiSelect.options.add(new Option('Felsefe', 'felsefe_ayt'));
            soruDersiSelect.options.add(new Option('Din Kültürü', 'din_kulturu_ayt'));
        }
        else if (soruTuru === 'matematik_ayt') {
            soruDersiSelect.options.add(new Option('Matematik', 'matematik_ayt'));
        }
        else if (soruTuru === 'fen_bilimleri_ayt') {
            soruDersiSelect.options.add(new Option('Fizik', 'fizik_ayt'));
            soruDersiSelect.options.add(new Option('Kimya', 'kimya_ayt'));
            soruDersiSelect.options.add(new Option('Biyoloji', 'biyoloji_ayt'));
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const button = document.getElementById('submitBtn');

    button.addEventListener('click', () => {
    // butona basıldınğında soru çözme sayfasına yönlendirme yapılacak
    
    });


// bu fonksiyonu diğer sayfaya taşıyabiliriz
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
// bu fonksiyonu diğer sayfaya taşıyabiliriz
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}});