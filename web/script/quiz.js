document.addEventListener("DOMContentLoaded", function() {
    // Event listener for updating question categories
    const alanBilgisiSelect = document.getElementById('alan_bilgisi');
    alanBilgisiSelect.addEventListener('change', updateSoruTuru);

    // Event listener for the quiz start button
    const submitBtn = document.getElementById('submitBtn');
    submitBtn.addEventListener('click', function() {
        const soruDersi = document.getElementById('soru_dersi').value;
        const soruAdedi = document.getElementById('soru_adedi').value;

        localStorage.setItem('soruDersi', soruDersi);
        localStorage.setItem('soruAdedi', soruAdedi);

        alert('Soruları çözmeye başlayabilirsiniz!');

        window.location.href = 'http://127.0.0.1:5500/web/solve_questions.html';
    });
});

function updateSoruTuru() {
    const alanBilgisi = document.getElementById('alan_bilgisi').value;
    const soruDersiSelect = document.getElementById('soru_dersi');

    soruDersiSelect.innerHTML = '<option value="" disabled selected>Soru dersi seçiniz</option>';

    if (alanBilgisi === 'TYT') {
        addOptions(soruDersiSelect, [
            { text: 'Türkçe', value: 'turkce_tyt' },
            { text: 'Tarih', value: 'tarih_tyt' },
            { text: 'Coğrafya', value: 'cografya_tyt' },
            { text: 'Din Kültürü', value: 'din_kulturu_tyt' },
            { text: 'Felsefe', value: 'felsefe_tyt' },
            { text: 'Matematik', value: 'matematik_tyt' },
            { text: 'Fizik', value: 'fizik_tyt' },
            { text: 'Kimya', value: 'kimya_tyt' },
            { text: 'Biyoloji', value: 'biyoloji_tyt' }
        ]);
    } else if (alanBilgisi === 'AYT') {
        addOptions(soruDersiSelect, [
            { text: 'Türk Dili ve Edebiyatı', value: 'turk_dili_ve_edebiyati_ayt' },
            { text: 'Tarih', value: 'tarih_ayt' },
            { text: 'Coğrafya', value: 'cografya_ayt' },
            { text: 'Felsefe', value: 'felsefe_ayt' },
            { text: 'Din Kültürü', value: 'din_kulturu_ayt' },
            { text: 'Matematik', value: 'matematik_ayt' },
            { text: 'Fizik', value: 'fizik_ayt' },
            { text: 'Kimya', value: 'kimya_ayt' },
            { text: 'Biyoloji', value: 'biyoloji_ayt' }
        ]);
    }
}

function addOptions(selectElement, options) {
    options.forEach(option => {
        const newOption = document.createElement('option');
        newOption.text = option.text;
        newOption.value = option.value;
        selectElement.appendChild(newOption);
    });
}