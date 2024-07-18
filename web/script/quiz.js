function updateSoruTuru() {
    var alanBilgisi = document.getElementById('alan_bilgisi').value;
    var soruDersiSelect = document.getElementById('soru_dersi');

    soruDersiSelect.innerHTML = '<option value="" disabled selected>Soru dersi seçiniz</option>';

    if (alanBilgisi === 'TYT') {
        soruDersiSelect.options.add(new Option('Türkçe', 'turkce_tyt'));
        soruDersiSelect.options.add(new Option('Tarih', 'tarih_tyt'));
        soruDersiSelect.options.add(new Option('Coğrafya', 'cografya_tyt'));
        soruDersiSelect.options.add(new Option('Din Kültürü', 'din_kulturu_tyt'));
        soruDersiSelect.options.add(new Option('Felsefe', 'felsefe_tyt'));
        soruDersiSelect.options.add(new Option('Matematik', 'matematik_tyt'));
        soruDersiSelect.options.add(new Option('Fizik', 'fizik_tyt'));
        soruDersiSelect.options.add(new Option('Kimya', 'kimya_tyt'));
        soruDersiSelect.options.add(new Option('Biyoloji', 'biyoloji_tyt'));

    } else if (alanBilgisi === 'AYT') {
        soruDersiSelect.options.add(new Option('Türk Dili ve Edebiyatı', 'turk_dili_ve_edebiyati_ayt'));
        soruDersiSelect.options.add(new Option('Tarih', 'tarih_ayt'));
        soruDersiSelect.options.add(new Option('Coğrafya', 'cografya_ayt'));
        soruDersiSelect.options.add(new Option('Felsefe', 'felsefe_ayt'));
        soruDersiSelect.options.add(new Option('Din Kültürü', 'din_kulturu_ayt'));
        soruDersiSelect.options.add(new Option('Tarih', 'tarih_ayt'));
        soruDersiSelect.options.add(new Option('Coğrafya', 'cografya_ayt'));
        soruDersiSelect.options.add(new Option('Felsefe', 'felsefe_ayt'));
        soruDersiSelect.options.add(new Option('Din Kültürü', 'din_kulturu_ayt'));
        soruDersiSelect.options.add(new Option('Matematik', 'matematik_ayt'));
        soruDersiSelect.options.add(new Option('Fizik', 'fizik_ayt'));
        soruDersiSelect.options.add(new Option('Kimya', 'kimya_ayt'));
        soruDersiSelect.options.add(new Option('Biyoloji', 'biyoloji_ayt'));

    }
}

    const button = document.getElementById('submitBtn');

    button.addEventListener('click', () => {
        // sayfaya yönlendirmeden kullanıcın seçtiği kategorileri local storage'a kaydedebilirim
        const soruDersi = document.getElementById('soru_dersi').value;
        const soruAdedi = document.getElementById('soru_adedi').value;

        localStorage.setItem('soruDersi', soruDersi);
        localStorage.setItem('soruAdedi', soruAdedi);

        alert('Soruları çözmeye başlayabilirsiniz!');

        const page = '/web/solve_questions.html';
        window.location.href = page;
    });


