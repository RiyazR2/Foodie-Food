# FoodieFinder AI 🍽️🤖

**AI-Powered Restaurant Discovery Platform**

> Transform your food ordering experience with AI-powered Smart Search, Restaurant Insights, and Multi-Language Recipe Generation

[🚀 Live Demo](https://foodiefinder2.netlify.app/) | [📖 Documentation](https://github.com/RiyazR2/Foodie-Food) | [🐛 Report Bug](https://github.com/RiyazR2/Foodie-Food/issues)

[![React](https://img.shields.io/badge/React-18.2-61DAFB?logo=react)](https://reactjs.org/)
[![Groq AI](https://img.shields.io/badge/Groq-Llama_3.3_70B-FF6B35?logo=ai)](https://groq.com/)
[![Redux](https://img.shields.io/badge/Redux-Toolkit-764ABC?logo=redux)](https://redux-toolkit.js.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)
[![Netlify](https://img.shields.io/badge/Deployed-Netlify-00C7B7?logo=netlify)](https://foodiefinder2.netlify.app/)

## 📖 Table of Contents

- [✨ Features](#-features)
- [🤖 AI Capabilities](#-ai-capabilities)
- [🎥 Demo](#-demo)
- [🛠️ Tech Stack](#️-tech-stack)
- [🚀 Quick Start](#-quick-start)
- [📁 Project Structure](#-project-structure)
- [🔑 Environment Setup](#-environment-setup)
- [🧪 Testing](#-testing)
- [🌐 Deployment](#-deployment)
- [👨‍💻 Developer](#-developer)
- [📝 License](#-license)

---

## ✨ Features

### 🎯 **Core Features**

- 🔍 **Smart Search** - Natural language queries like "budget biryani under ₹600"
- 🤖 **Restaurant Insights** - AI-generated recommendations, must-try dishes, peak hours
- 🍳 **Recipe Generator** - Multi-language recipes (7 Indian languages + English)
- 📍 **Multi-City Support** - Mumbai, Pune, Delhi, Bangalore, Chennai, Kolkata
- 🛒 **Cart Management** - Redux-powered shopping cart with real-time updates
- 📱 **Responsive Design** - Glassmorphic UI optimized for all devices

### 🎨 **UI/UX Highlights**

- Modern glassmorphism design with orange/amber theme
- Smooth animations and transitions
- Loading states and error handling
- Session-based caching for 40% faster loads
- Accessibility-focused (WCAG AA compliant)

## 🤖 AI Capabilities

### 1️⃣ **Smart Search** 🔍

Natural language search powered by Groq's Llama 3.3 70B model.

**Examples:**

```
"budget biryani under ₹600"  →  Filters: cuisine=biryani, maxPrice=600
"top rated pizza"            →  Filters: cuisine=pizza, rating=4.0+
"chinese food in solapur"    →  Filters: cuisine=chinese, location=solapur
```

**Technical Implementation:**

- LLM function calling with structured JSON responses
- Temperature=0.3 for consistent parsing
- 92% search success rate
- Graceful fallback to text search on AI failure

---

### 2️⃣ **Restaurant Insights** 🎯

Click "Restaurant Insights" on any restaurant card to get:

- 📝 **Quick Summary** - AI-generated restaurant overview
- 🎯 **Best For** - Ideal occasions (family dinners, dates, quick bites)
- ⏰ **Peak Hours** - When to visit for shortest wait times
- 💰 **Budget Tips** - How to save money
- ⭐ **Why Popular** - What makes this place special
- 🍽️ **Must-Try Dishes** - Top 3-5 recommended dishes

**Features:**

- Netflix-style modal with React Portals
- Loading animations with progress steps
- Error handling with retry option
- Keyboard shortcuts (ESC to close)

---

### 3️⃣ **Multi-Language Recipe Generator** 🍳

Enter 4+ ingredients and get detailed recipes in your language!

**Supported Languages:**

- 🇬🇧 English
- 🇮🇳 Hindi (हिंदी)
- 🇮🇳 Marathi (मराठी)
- 🇮🇳 Telugu (తెలుగు)
- 🇮🇳 Kannada (ಕನ್ನಡ)
- 🇮🇳 Gujarati (ગુજરાતી)
- 🇮🇳 Tamil (தமிழ்)

**Recipe Output:**

- Recipe name in native script
- 10-15 detailed step-by-step instructions
- Ingredient list with measurements
- Cooking time and difficulty level
- Cultural authenticity maintained

**Validation:**

- Minimum 4 ingredients required
- Real-time ingredient count display
- Clear error messages

---

## 🛠️ Tech Stack

### **Frontend**

| Technology           | Purpose             | Version |
| -------------------- | ------------------- | ------- |
| ⚛️ **React**         | UI Framework        | 18.2.0  |
| 🔄 **Redux Toolkit** | State Management    | 2.2.1   |
| 🎨 **Tailwind CSS**  | Styling             | 3.4.1   |
| 🧭 **React Router**  | Client-side Routing | 6.22.0  |

### **AI & ML**

| Technology              | Purpose              | Model                   |
| ----------------------- | -------------------- | ----------------------- |
| 🤖 **Groq SDK**         | LLM Inference        | Llama 3.3 70B Versatile |
| 📋 **Function Calling** | Structured Responses | JSON Mode               |

### **Build & Deploy**

| Technology        | Purpose             |
| ----------------- | ------------------- |
| 📦 **Parcel**     | Zero-config Bundler |
| 🌐 **Netlify**    | Hosting & CI/CD     |
| 🧪 **Jest + RTL** | Testing Framework   |

### **External APIs**

| API               | Usage           | Rate Limit |
| ----------------- | --------------- | ---------- |
| 🍔 **Swiggy API** | Restaurant Data | Proxied    |
| 🤖 **Groq API**   | AI Features     | Free Tier  |

---

## 🚀 Quick Start

### **Prerequisites**

Before you begin, ensure you have:

- ✅ **Node.js** (v16+ recommended) - [Download](https://nodejs.org/)
- ✅ **npm** or **yarn** package manager
- ✅ **Groq API Key** (free) - [Get it here](https://console.groq.com/keys)

---

### **Installation Steps**

#### 1️⃣ **Clone the Repository**

```bash
git clone https://github.com/RiyazR2/Foodie-Food.git
cd Foodie-Food
```

#### 2️⃣ **Install Dependencies**

```bash
npm install
# or
yarn install
```

#### 3️⃣ **Setup Environment Variables**

Create a `.env` file in the root directory:

```bash
# Copy example file
cp .env.example .env
```

Add your Groq API key:

```env
REACT_APP_GROQ_API_KEY=gsk_your_actual_groq_api_key_here
```

**🔑 Get Your FREE Groq API Key:**

1. Visit [Groq Console](https://console.groq.com/keys)
2. Sign up/Login
3. Create new API key
4. Copy and paste into `.env`

#### 4️⃣ **Start Development Server**

```bash
npm start
```

The app will open at **http://localhost:1234** 🎉

#### 5️⃣ **Build for Production** (Optional)

```bash
npm run build
```

Production build will be in the `dist/` folder.

---

### **Quick Commands**

| Command              | Description                        |
| -------------------- | ---------------------------------- |
| `npm start`          | Start dev server at localhost:1234 |
| `npm run build`      | Create production build            |
| `npm test`           | Run Jest tests                     |
| `npm run watch-test` | Run tests in watch mode            |

---

## 📁 Project Structure

```
Foodie-Food/
├── src/
│   ├── components/          # React components
│   │   ├── Header.js        # Main navigation
│   │   ├── Body.js          # Restaurant list + search
│   │   ├── RestaurantCard.js
│   │   ├── RestaurantInsights.js  # AI insights modal
│   │   ├── AIKitchen.js     # Recipe generator
│   │   └── LocationSelector.js
│   ├── services/
│   │   └── aiService.js     # Groq AI integration
│   ├── store/               # Redux slices
│   │   ├── appStore.js
│   │   ├── cartSlice.js
│   │   └── locationSlice.js
│   ├── utils/               # Helpers, constants, hooks
│   └── App.js
├── dist/                    # Production build
├── .env                     # Environment variables (gitignored)
├── .env.example             # Template for .env
├── package.json
└── README.md
```

---

## 🔑 Environment Setup

### **Required Environment Variables**

```env
# Groq AI API Key (Required for AI features)
REACT_APP_GROQ_API_KEY=gsk_xxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

### **For Netlify Deployment**

Add environment variable in Netlify dashboard:

1. Site Settings → Environment Variables
2. Key: `REACT_APP_GROQ_API_KEY`
3. Value: Your Groq API key
4. Scopes: Check all (Builds, Functions, Runtime, Post processing)

---

## 🧪 Testing

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run watch-test

# Test coverage (if configured)
npm test -- --coverage
```

**Current Test Coverage:** 65% (Cart slice: 100%, Components: 65%)

---

## 🌐 Deployment

### **Deploy to Netlify**

1. **Push to GitHub:**

   ```bash
   git push origin main
   ```

2. **Connect to Netlify:**
   - Go to [Netlify](https://app.netlify.com/)
   - Import from Git → Select your repo
   - Build command: `npm run build`
   - Publish directory: `dist`

3. **Add Environment Variables** (see above)

4. **Deploy!** 🚀

**Live Site:** [https://foodiefinder2.netlify.app/](https://foodiefinder2.netlify.app/)

---

## 🤝 Contributing

Contributions are welcome! Here's how:

1. **Fork the repository**
2. **Create a feature branch:**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Commit your changes:**
   ```bash
   git commit -m "feat: Add amazing feature"
   ```
4. **Push to branch:**
   ```bash
   git push origin feature/amazing-feature
   ```
5. **Open a Pull Request**

### **Commit Message Convention**

- `feat:` New features
- `fix:` Bug fixes
- `refactor:` Code restructuring
- `docs:` Documentation updates
- `style:` UI/CSS changes

---

## 👨‍💻 Developer

**Riyaz Pathan**

- 🌐 **Portfolio:** [GitHub Profile](https://github.com/RiyazR2)
- 📧 **Email:** Contact via GitHub
- 💼 **LinkedIn:** [Connect](https://www.linkedin.com/in/riyazr2)
- 🐦 **Twitter:** [@RiyazR2](https://twitter.com/RiyazR2)

---

## 📝 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- **Akshay Saini** - For the Namaste React course
- **Groq** - For providing free LLM API
- **Swiggy** - For restaurant data
- **Netlify** - For free hosting

---

## 🐛 Known Issues

- Swiggy API may rate-limit on heavy usage (use caching)
- Some restaurants may not have complete data

---

## 🔮 Future Roadmap

- [ ] User authentication (Firebase)
- [ ] Order history tracking
- [ ] Voice search integration
- [ ] Dark mode
- [ ] PWA (offline support)
- [ ] Real-time order tracking

---

<div align="center">

**⭐ Star this repo if you like it! ⭐**

Made with ❤️ by [Riyaz Pathan](https://github.com/RiyazR2)

[🚀 Live Demo](https://foodiefinder2.netlify.app/) | [📖 Documentation](https://github.com/RiyazR2/Foodie-Food) | [🐛 Report Bug](https://github.com/RiyazR2/Foodie-Food/issues)

</div>
