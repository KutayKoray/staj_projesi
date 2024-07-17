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

document.getElementById('submitBtn').addEventListener('click', async function (e) {
    e.preventDefault();

    try {
        var formData = new FormData();
        var fileField = document.querySelector('input[type="file"]');

        formData.append('dosya_yukle', fileField.files[0]);

        // Dosya yükleme işlemi için fetch
        const uploadResponse = await fetch('http://localhost:8000/upload_file', {
            method: 'POST',
            body: formData
        });

        if (!uploadResponse.ok) {
            const errorText = await uploadResponse.text();
            throw new Error(`Dosya yükleme hatası: ${errorText}`);
        }

        console.log('Dosya başarıyla yüklendi.');

        var alanBilgisi = document.getElementById('alan_bilgisi').value;
        var soruTuru = document.getElementById('soru_turu').value;
        var soruDersi = document.getElementById('soru_dersi').value;
        var dogru_cevap = document.getElementById('dogru_cevap').value;

        var data = {
            alan_bilgisi: alanBilgisi,
            soru_turu: soruTuru,
            soru_dersi: soruDersi,
            correct_answer: dogru_cevap,
            image_file_name: fileField.files[0].name
        };

        // Yeni soru eklemek için fetch
        const questionsResponse = await fetch('http://localhost:8000/questions/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (!questionsResponse.ok) {
            const errorData = await questionsResponse.json();
            throw new Error(`Soru eklerken hata: ${errorData.detail}`);
        }

        console.log('Soru başarıyla eklendi:', data);

    } catch (error) {
        console.error('Hata:', error);
        alert('Bir hata oluştu. Lütfen tekrar deneyin.');
    }
});
