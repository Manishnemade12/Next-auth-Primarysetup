# 📘 Next.js Project Starter with NextAuth, Custom useFetch Hook, and Database Connection

This repository provides a comprehensive starter template for a **Next.js** project with the following features:

✅ **NextAuth.js** for authentication  
✅ **Custom `useFetch` Hook** for API calls  
✅ **MongoDB Database Connection** with Mongoose  
✅ **API Routes Setup** for authentication and CRUD operations  
✅ **Folder Structure** for scalability and best practices  

---

## 🚀 Getting Started

### 1. **Clone the Repository**
```bash
git clone https://github.com/Manishnemade12/Next-auth-Primarysetup.git
cd Next-auth-Primarysetup
```

### 2. **Install Dependencies**
```bash
npm install
# or
yarn install
```

---

## ⚙️ Project Structure
```
├── components/         # Reusable components
├── hooks/              # Custom React hooks (useFetch)
├── lib/                # Utility functions (DB connection)
├── models/             # Mongoose models
├── pages/              # Next.js pages & API routes
│   ├── api/            # Backend API routes
│   │   └── auth/       # NextAuth config
│   └── auth/           # Signin & Signup pages
├── public/             # Static files
├── styles/             # Global & component styles
├── .env.local          # Environment variables
└── README.md           # Project documentation
```

---

## 🔑 Environment Variables (`.env.local`)
Create a `.env.local` file in the root directory and add:
```env
MONGODB_URI=your_mongodb_connection_string
NEXTAUTH_SECRET=your_nextauth_secret
NEXTAUTH_URL=http://localhost:3000
```

---

## 🔐 Authentication Setup (NextAuth.js)
- Supports email and credential-based login.  
- Easy session management with `useSession` hook.

Example usage:
```js
import { useSession, signIn, signOut } from 'next-auth/react';

export default function Home() {
  const { data: session } = useSession();

  return session ? (
    <>
      <p>Welcome, {session.user.email}</p>
      <button onClick={() => signOut()}>Sign out</button>
    </>
  ) : (
    <button onClick={() => signIn()}>Sign in</button>
  );
}
```

---

## 🌐 Database Connection (MongoDB + Mongoose)
Connection handled via `lib/mongoose.js`:
```js
import mongoose from 'mongoose';

export const mongooseConnect = async () => {
  if (mongoose.connection.readyState >= 1) return;
  await mongoose.connect(process.env.MONGODB_URI);
};
```

---

## 🪝 Custom `useFetch` Hook
Simplifies API calls with loading and error states:
```js
import { useState, useEffect } from 'react';

export const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then(setData)
      .catch(setError)
      .finally(() => setLoading(false));
  }, [url]);

  return { data, loading, error };
};
```

---

## 🚦 Running the Project
Start the development server:
```bash
npm run dev
```
Visit `http://localhost:3000` to see the project in action.

---

## 📄 API Routes Overview
- **POST `/api/auth/signup`** - User registration  
- **POST `/api/auth/signin`** - User login  
- **GET `/api/user/profile`** - Fetch user profile  

---

## 🧪 Testing the Setup
- ✅ Sign up a new user via `/auth/signup`  
- ✅ Sign in via `/auth/signin`  
- ✅ Check session persistence  
- ✅ Make secure API calls with `useFetch`  

---

## 💪 Contributing
Feel free to fork, submit issues, and send pull requests! 😎

---

## 📝 License
This project is licensed under the MIT License.

---

## 🙌 Acknowledgments
- [Next.js Docs](https://nextjs.org/docs)  
- [NextAuth.js Docs](https://next-auth.js.org/)  
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)  
- [Vercel Deployment](https://vercel.com/)  

---

## 🚀 Ready to build? Happy coding! 🚀

