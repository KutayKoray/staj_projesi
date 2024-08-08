FROM python:3.12.1

WORKDIR /app

COPY ./ ./

RUN pip install --no-cache-dir -r requirements.txt

VOLUME ["/uploads", "/quiz.db"]

EXPOSE 8000

RUN chmod 777 main.py

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]