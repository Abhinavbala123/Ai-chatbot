# AI Chatbot

A **full-stack AI chatbot** inspired by OpenAI's ChatGPT, built to provide intelligent conversational interactions using modern web technologies and AI APIs.

---

## Table of Contents

- [Features](#features)  
- [Tech Stack](#tech-stack)  
- [Architecture & Workflow](#architecture--workflow)  
- [Installation](#installation)  
- [Usage](#usage)  
- [Contributing](#contributing)  

 


---

## Features
- Conversational AI capable of understanding natural language queries.  
- Context-aware responses for meaningful conversation.  
- Clean and responsive **React frontend**.  
- **Node.js + Express backend** handling requests and API integration.  
- **MongoDB database** for storing user sessions and chat history.  
- Supports multiple users with session management.  
- Fully deployable as a web application.  

---

## Tech Stack
**Frontend:** React, Tailwind CSS, HTML5, JavaScript  
**Backend:** Node.js, Express.js  
**Database:** MongoDB with Mongoose ORM  
**AI Integration:** OpenAI API (GPT models)  
**Version Control:** Git & GitHub  

---

## Architecture & Workflow
1. **Frontend**  
   - React handles UI components, chat input/output, and user interactions.  
   - Fetch sends API requests to the backend server.  

2. **Backend**  
   - Express.js routes manage API requests from the frontend.  
   - Connects to OpenAI API to generate AI responses.  
   - Stores chat sessions and user history in MongoDB.  

3. **Database**  
   - MongoDB stores user sessions and conversation history.  
   - Ensures persistent and multi-session support.  

4. **Workflow**  
User Input -> React Frontend -> Axios Request -> Express Backend
-> OpenAI API Call -> Response -> MongoDB Storage -> React Display


---

## Installation

**Clone the repository:**
```bash
git clone https://github.com/yourusername/chatgpt-clone.git
cd chatgpt-clone


## Installation

**Clone the repository:**

git clone https://github.com/yourusername/chatgpt-clone.git
cd chatgpt-clone

cd backend
npm install

cd ../frontend
npm install

OPENAI_API_KEY=your_openai_api_key
MONGO_URI=your_mongodb_connection_string
PORT=5000

# Start backend
cd backend
npm run dev

# Start frontend
cd ../frontend
npm start


