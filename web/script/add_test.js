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
        soruDersiSelect.options.add(new Option('Matematik', 'matematik_ayt'));
        soruDersiSelect.options.add(new Option('Fizik', 'fizik_ayt'));
        soruDersiSelect.options.add(new Option('Kimya', 'kimya_ayt'));
        soruDersiSelect.options.add(new Option('Biyoloji', 'biyoloji_ayt'));
    }
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

        // Soru eklemek için gerekli bilgileri al
        var alanBilgisi = document.getElementById('alan_bilgisi').value;
        var soruDersi = document.getElementById('soru_dersi').value;
        var dogru_cevap = document.getElementById('dogru_cevap').value;

        // Sorunun id'sini almak için bir istek yap
        const questionIdResponse = await fetch('http://localhost:8000/questions/get_next_id/next_id');
        if (!questionIdResponse.ok) {
            throw new Error('Sorunun ID’si alınamadı.');
        }
        const { next_id } = await questionIdResponse.json();

        // Görselin yeni adını oluştur
        const imageFileName = `question_${next_id}.png`;

        // Yeni soru eklemek için veriyi hazırlayın
        var data = {
            alan_bilgisi: alanBilgisi,
            soru_dersi: soruDersi,
            correct_answer: dogru_cevap,
            image_file_name: imageFileName
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