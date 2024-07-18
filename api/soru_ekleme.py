import requests

url = "http://localhost:8000/questions/"

questions = [
    {
        "alan_bilgisi": "TYT",
        "soru_dersi": "turkce_tyt",
        "correct_answer": "B",
        "image_file_name": "question1.png"
    },
    {
        "alan_bilgisi": "TYT",
        "soru_dersi": "turkce_tyt",
        "correct_answer": "A",
        "image_file_name": "question2.png"
    },
    {
        "alan_bilgisi": "TYT",
        "soru_dersi": "turkce_tyt",
        "correct_answer": "C",
        "image_file_name": "question3.png"
    },
    {
        "alan_bilgisi": "TYT",
        "soru_dersi": "turkce_tyt",
        "correct_answer": "D",
        "image_file_name": "question4.png"
    },
    {
        "alan_bilgisi": "TYT",
        "soru_dersi": "turkce_tyt",
        "correct_answer": "A",
        "image_file_name": "question5.png"
    },
    {
        "alan_bilgisi": "TYT",
        "soru_dersi": "turkce_tyt",
        "correct_answer": "B",
        "image_file_name": "question6.png"
    },
    {
        "alan_bilgisi": "TYT",
        "soru_dersi": "turkce_tyt",
        "correct_answer": "C",
        "image_file_name": "question7.png"
    },
    {
        "alan_bilgisi": "TYT",
        "soru_dersi": "turkce_tyt",
        "correct_answer": "D",
        "image_file_name": "question8.png"
    },
    {
        "alan_bilgisi": "TYT",
        "soru_dersi": "turkce_tyt",
        "correct_answer": "A",
        "image_file_name": "question9.png"
    },
    {
        "alan_bilgisi": "TYT",
        "soru_dersi": "turkce_tyt",
        "correct_answer": "B",
        "image_file_name": "question10.png"
    }
]

for question in questions:
    response = requests.post(url, json=question)
    print(response.status_code, response.json())
