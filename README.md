# AI Cooking Assistant

An AI-powered Cooking Assistant that helps generate recipes based on provided ingredients. Built with **React** for the frontend and **Node.js (Express)** for the backend, it utilizes the **flax-community/t5-recipe-generation** model from Hugging Face to generate recipes dynamically.

## 🌟 Features

- Generate recipes based on user-input ingredients
- Provides step-by-step cooking instructions
- AI-powered ingredient suggestions
- Built using **React (Frontend)** and **Node.js (Backend)**
- Utilizes **Hugging Face's T5 Recipe Generation Model**

## 🚀 Tech Stack

- **Frontend:** React.js, TypeScript
- **Backend:** Node.js, Express.js
- **AI Model:** [flax-community/t5-recipe-generation](https://router.huggingface.co/hf-inference/models/flax-community/t5-recipe-generation)
- **Hosting:** Local development setup

## 📂 Project Structure

```
📦 AI Cooking Assistant
├── 📁 Backends
│   ├── Script.js  (Backend API using Node.js & Express)
│   ├── .env       (Environment Variables for API Keys)
│   ├── package.json
│   ├── server.js  (Entry point for backend server)
├── 📁 Frontend
│   ├── src
│   │   ├── App.tsx (Main React Component)
│   │   ├── components
│   ├── package.json
│   ├── .env        (Environment Variables for Frontend)
├── README.md
```

## 🔧 Installation & Setup

### 1️⃣ Clone the Repository

```sh
git clone https://github.com/Harry101969/aicookingassist.git
cd aicookingassist
```

### 2️⃣ Backend Setup (Node.js + Express)

1. Navigate to the `Backend` folder:
   ```sh
   cd Backends
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Create a **.env** file in the `Backend` folder and add:
   ```env
   HUGGINGFACE_API=your_huggingface_api_key_here
   PORT=8000
   ```
4. Start the backend server:
   ```sh
   node Script.js
   ```
   The backend should now be running at **http://localhost:8000**

### 3️⃣ Frontend Setup (React + TypeScript)

1. Navigate to the `Frontend` folder:
   ```sh
   cd ../Frontend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the frontend development server:
   ```sh
   npm run dev
   ```
   The frontend should now be running at **http://localhost:5173**

## 🎯 API Endpoints

### **1. Generate Recipe**

**Endpoint:** `POST /generate-recipe`

- **Request Body:**
  ```json
  {
    "ingredients": ["tomato", "onion", "cheese"]
  }
  ```
- **Response:**
  ```json
  {
    "name": "Recipe with tomato, onion, cheese",
    "cookingTime": 30,
    "servings": 4,
    "ingredients": ["tomato", "onion", "cheese", "Salt and pepper to taste"],
    "instructions": ["Step 1: ...", "Step 2: ..."]
  }
  ```

### **2. Health Check**

**Endpoint:** `GET /health`

- **Response:**
  ```json
  {
    "status": "healthy"
  }
  ```

## 🛠 Troubleshooting

- **CORS Issue?** Ensure the frontend correctly points to the backend (`VITE_BACKEND_URL`).
- **API Not Working?** Check if the Hugging Face API key is correctly set in `.env`.
- **Port Conflicts?** Change `PORT` in `.env` files if needed.

## 📜 License

This project is open-source and free to use.

---

**Author:** [Harry101969](https://github.com/Harry101969) 🚀
