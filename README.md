

# 🚀 BuildProof

**Show your work. Prove your skills. Get noticed.**

---

## 📖 About the Project

BuildProof is a platform designed to help users showcase their real skills through projects instead of just resumes.

The idea is simple:
instead of saying *“I know this”*, users can actually **prove it by building and sharing projects**.

It helps students and developers create a strong, practical portfolio that others can trust and explore.

---

## ✨ What It Does

* Lets users upload and showcase their projects
* Highlights real skills through practical work
* Helps build a strong developer portfolio
* Makes it easier for others to explore and verify projects
* Clean and simple user experience

---

## 🛠️ Built With

* **React (Vite)** for frontend
* **Tailwind CSS** for styling
* **Firebase** for backend

  * Authentication
  * Firestore Database
  * Hosting

---

## 📂 Project Structure

```bash id="bp123"
BuildProof/
│
├── src/
│   ├── components/     # Reusable UI components
│   ├── pages/          # Main pages
│   ├── firebase/       # Firebase configuration
│   ├── utils/          # Helper functions
│
├── public/
├── package.json
└── vite.config.js
```

---

## ⚙️ Getting Started

### 1. Clone the project

```bash id="bp234"
git clone https://github.com/dharshuvani13-source/buildproof.git
cd buildproof
```

---

### 2. Install dependencies

```bash id="bp345"
npm install
```

---

### 3. Setup Firebase

Create a Firebase project and enable:

* Authentication
* Firestore

Add your config:

```js id="bp456"
// src/firebase/config.js
const firebaseConfig = {
  apiKey:"YOUR_API_KEY",
  authDomain:"YOUR_DOMAIN",
  projectId:"YOUR_PROJECT_ID",
  appId:"YOUR_APP_ID"
};
```

---

### 4. Run the app

```bash id="bp567"
npm run dev
```

Open:
👉 https://buildproof-f6428.web.app/

---

## 🚀 Deployment

```bash id="bp678"
npm run build
firebase login
firebase init
firebase deploy
```

---

## 🎯 Why BuildProof

Resumes can say anything.
BuildProof focuses on **real proof of skills**, making it easier for others to trust what you can actually do.

---

## 🔮 Future Improvements

* Project verification system
* AI-based skill analysis
* Public profiles with rankings
* Collaboration features

---

## 🤝 Contributing

Contributions are welcome.
Feel free to improve features or UI.

---

## 👨‍💻 Author

**Dharshini**

* GitHub: [https://github.com/dharshuvani13-source](https://github.com/dharshuvani13-source)

---

## ⭐ Support

If you like this project, give it a ⭐ on GitHub!

