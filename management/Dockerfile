# Stage 1: Build Vue frontend
FROM node:20-alpine AS frontend-builder

WORKDIR /app/frontend
COPY management/frontend/package.json management/frontend/package-lock.json* ./
RUN npm install
COPY management/frontend/ .
RUN npm run build

# Stage 2: Python backend + static files
FROM python:3.13-slim

# Install adb for ADB-over-TCP
RUN apt-get update && \
    apt-get install -y --no-install-recommends android-tools-adb && \
    rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY management/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY management/*.py ./
COPY management/routers/ ./routers/
COPY management/services/ ./services/
COPY management/models/ ./models/
COPY --from=frontend-builder /app/frontend/dist ./static

RUN mkdir -p /app/uploads

EXPOSE 8080

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8080"]
