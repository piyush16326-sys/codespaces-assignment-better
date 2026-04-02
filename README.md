# 🧠 TaskAI – AI-Powered Task Manager (Full Stack)

TaskAI is a full-stack web application that intelligently manages tasks using **AI-based classification**. It combines a **Flask + Prisma backend** with a **React frontend dashboard** to deliver a modern, responsive, and smart task management experience.

---

## 🚀 Features

### 🔹 Core Functionality

* ➕ Add tasks with AI-powered categorization
* 📋 View all tasks in a clean dashboard
* 🗑️ Delete tasks instantly
* 🧠 Automatic classification using AI

### 🔹 Smart UI (Frontend)
* 🎨 Color-coded category badges
* ⚡ Real-time “Analyzing...” state

### 🔹 Backend Intelligence

* 🤖 Uses Hugging Face zero-shot classification
* 🗄️ Prisma ORM with MySQL
* 🌐 REST API with Flask
* 🔄 Auto DB connection handling

---

## 🛠️ Tech Stack

### Frontend

* React (Hooks)
* Fetch API
* Custom inline styling

### Backend

* Flask (Python)
* Prisma ORM
* MySQL Database
* Hugging Face Inference API (`facebook/bart-large-mnli`)

---

## 📁 Project Structure

```id="projstruct001"
.
├── backend/
│   ├── app.py
│   ├── prisma/
│   ├── .env
│   └── requirements.txt
│
├── frontend/
│   ├── src/
│   │   ├── App.js
│   │   └── index.js
│   ├── public/
│   └── package.json
│
└── README.md
```

---

## ⚙️ Setup Instructions

## 🔧 Backend Setup (Flask + Prisma)

### 1️⃣ Navigate to backend

```bash id="b1"
cd backend
```

### 2️⃣ Create virtual environment

```bash id="b2"
python -m venv venv
source venv/bin/activate      # Mac/Linux
venv\Scripts\activate         # Windows
```

### 3️⃣ Install dependencies

```bash id="b3"
pip install -r requirements.txt
```

### 4️⃣ Setup environment variables

Create `.env` file:

```env id="b4"
HF_TOKEN=your_huggingface_api_token
DATABASE_URL="mysql://USER:PASSWORD@HOST:PORT/DATABASE"
```

### 5️⃣ Setup Prisma

```bash id="b5"
npx prisma generate
npx prisma migrate dev
```

### 6️⃣ Run backend server

```bash id="b6"
python app.py
```

Backend runs at:

```
http://127.0.0.1:5000
```

---

## 🎨 Frontend Setup (React)

### 1️⃣ Navigate to frontend

```bash id="f1"
cd frontend
```

### 2️⃣ Install dependencies

```bash id="f2"
npm install
```

### 3️⃣ Start React app

```bash id="f3"
npm start
```

Frontend runs at:

```
http://localhost:3000
```

---

## 🔗 API Endpoints

| Method | Endpoint         | Description     |
| ------ | ---------------- | --------------- |
| GET    | `/api/tasks`     | Fetch all tasks |
| POST   | `/api/tasks`     | Create new task |
| DELETE | `/api/tasks/:id` | Delete a task   |

---

## 🤖 AI Categorization

* Model: `facebook/bart-large-mnli`
* Type: Zero-shot classification
* Labels used:

  * `work`
  * `home`
  * `urgent`
  * `coding`

If AI fails → fallback category: `general`

---

## ▶️ How to Run the Project (Step-by-Step)

Follow these steps in order to start the full TaskAI application:

---

### 1️⃣ Start MySQL Server

Make sure your MySQL database is running:

```bash
sudo service mysql start
```

> ⚠️ Ensure your database credentials in `.env` are correct before proceeding.

---

### 2️⃣ Start Backend (Flask API)

Navigate to the backend folder:

```bash
cd backend
```

Activate virtual environment:

```bash
source venv/bin/activate      # Mac/Linux
venv\Scripts\activate         # Windows
```

Run the Flask server:

```bash
python app.py
```

> ✅ Backend will run at: `http://127.0.0.1:5000`

---

### 3️⃣ Start Frontend (React App)

Open a new terminal and navigate to frontend:

```bash
cd frontend
```

Install dependencies (if not already):

```bash
npm install
```

Start the React app:

```bash
npm start
```

> ✅ Frontend will run at: `http://localhost:3000`

---

### ✅ You're Ready!

* Open your browser at: **http://localhost:3000**
* Start adding tasks with AI 🚀

---

### ⚠️ Troubleshooting

* If backend fails → check `.env` and database connection
* If frontend can't fetch → ensure backend is running
* If Prisma errors → run:

  ```bash
  npx prisma generate
  npx prisma migrate dev
  ```

---

## 📸 UI Overview

* Sidebar navigation (Dashboard-style)
* Input card for task creation
* Badge-based classification

---

## ⚠️ Important Notes

* Backend must be running before frontend
* CORS is enabled for development (`*`)
* AI request timeout: **15 seconds**
* Ensure valid Hugging Face API token

---

## 🧩 Future Enhancements

* ✏️ Edit/update tasks
* 🔐 Authentication system
* 📊 Analytics dashboard
* 📅 Due dates & reminders
* 🌙 Dark mode
* ☁️ Deployment (Docker / Cloud)

---

## 👨‍💻 Author

Full-stack AI project combining modern frontend and backend technologies to demonstrate intelligent task automation.

---

## 📄 License

This project is open-source and available under the **MIT License**.

<img src="https://lens.usercontent.google.com/banana?agsi=CmdnbG9iYWw6OjAwMDA1NWNmZWM3MDAyNmQ6MDAwMDAwZWI6MToxNjU5MjU3ZDJhODdjNmYyOjAwMDA1NWNmZWM3MDAyNmQ6MDAwMDAxN2M3MDQwMzM2ODowMDA2NGU3MmFmOWZjNDFmEAI="/>
