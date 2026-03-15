# Spotify-like Music Streaming Web Application

A full-stack MERN application with a modern dark UI inspired by Spotify.

## Prerequisites

- Node.js (v16+)
- MongoDB (Running locally on `mongodb://127.0.0.1:27017/music-app` or use MongoDB Atlas)

## Project Structure

- `/backend` - Node.js + Express.js API
- `/frontend` - React.js + Vite + Tailwind CSS

## Setup Instructions

### 1. Database Setup

Make sure your MongoDB instance is running locally. If you're using MongoDB Compass, connect to `mongodb://localhost:27017`.
Alternatively, you can create a `.env` file in the `/backend` directory:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
```

### 2. Backend Setup

Open a terminal and navigate to the backend directory:
```bash
cd backend
npm install
```

Seed the database with sample data (Songs, Artists, Albums):
```bash
npm run seed
```

Start the backend server:
```bash
npm run dev
```
The API will be available at `http://localhost:5000`.

### 3. Frontend Setup

Open a new terminal and navigate to the frontend directory:
```bash
cd frontend
npm install
```

Start the React development server:
```bash
npm run dev
```
The frontend will be available at `http://localhost:3000`.

## Features
- Modern dark theme UI with Tailwind CSS.
- Audio playback using the HTML5 Audio API via React Context.
- Progress bar seeking, volume control, next/prev/shuffle/repeat.
- Search songs dynamically.
- Filter by languages (Tamil/English).
- Responsive layout with Sidebar and Music Player.
