FROM python:3.9-slim

WORKDIR /web

COPY ./ ./web

VOLUME ["/uploads"]

EXPOSE 8080

CMD ["python", "-m", "http.server", "8080", "--bind", "0.0.0.0"]