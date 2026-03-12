FROM python:3.13-slim

WORKDIR /app
COPY server.py .
COPY webrtc_viewer.html .
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

EXPOSE 8765

CMD ["python", "server.py"]
