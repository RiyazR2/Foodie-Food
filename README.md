# FoodieFinder AI 🍽️🤖

**AI-Powered Restaurant Discovery Platform**

[Live Demo](https://foodiefinderr2.netlify.app/)

[![React](https://img.shields.io/badge/React-18-blue)](https://reactjs.org/)
[![Groq AI](https://img.shields.io/badge/Groq-AI-orange)](https://groq.com/)
[![Redux](https://img.shields.io/badge/Redux-Toolkit-purple)](https://redux-toolkit.js.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-cyan)](https://tailwindcss.com/)

## Table of Contents

- [Overview](#overview)
- [AI Features](#ai-features)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Usage](#usage)
- [Folder Structure](#folder-structure)
- [API Reference](#api-reference)
- [Developer](#developer)
- [License](#license)

## Overview

**FoodieFinder AI** is an intelligent restaurant discovery platform that combines real-time Swiggy data with AI-powered insights. Built with React and powered by Groq's LLM, it offers natural language search, personalized recommendations, and smart recipe generation.

This project showcases modern web development practices including React 18, Redux Toolkit, Tailwind CSS, and AI integration for a next-generation food ordering experience.

## 🤖 AI Features

### ✅ **Implemented**

1. **AI Restaurant Insights** 🎯
   - Click "AI Insights" on any restaurant card
   - Get personalized recommendations, must-try dishes, peak hours, and budget tips
   - Powered by Groq's Llama 3.3 70B model

### 🚧 **Coming Soon**

2. **Smart Restaurant Search** 🔍
   - Natural language queries like "budget biryani under ₹200"
   - LLM-powered query parsing and intelligent filtering

3. **Fridge-to-Recipe Generator** 🧊
   - Enter ingredients you have at home
   - AI generates complete recipes with steps

## Features

- **Real-Time Restaurant Data**: Fetches live data from Swiggy API
- **AI-Powered Insights**: Intelligent restaurant recommendations using Groq AI
- **Smart Search**: Natural language search with LLM function calling (coming soon)
- **Location-Based**: Multi-city support (Mumbai, Pune, Delhi, Bangalore, etc.)
- **Cart Management**: Redux-powered shopping cart with persistent state
- **Responsive Design**: Modern glassmorphic UI optimized for all devices
- **Live Menu**: Browse restaurant menus with smooth accordion animations

## Tech Stack

- **Frontend**:
  - **React 18**: Modern UI with hooks, Suspense, and lazy loading
  - **Redux Toolkit**: State management for cart and user preferences
  - **Tailwind CSS**: Utility-first styling with custom glassmorphic design
  - **React Router**: Client-side routing
- **AI & LLM**:
  - **Groq SDK**: Fast LLM inference with Llama 3.3 70B model
  - **Function Calling**: Structured JSON responses for search parsing
- **Build Tool**:
  - **Parcel**: Zero-config bundler for fast builds
- **External APIs**:
  - **Swiggy API**: Real-time restaurant data (proxied via Express/Netlify Functions)
  - **Groq API**: AI-powered insights and natural language processing

## Installation

### Prerequisites

- **Node.js**: Make sure you have Node.js installed. You can download it from [here](https://nodejs.org/).
- **npm**: Node Package Manager comes with Node.js. If not, you can install it manually.

### Steps to Install

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/RiyazR2/Foodie-Food.git
   cd Foodie-Food
   ```

2. **Install Dependencies**:

   ```bash
   npm install
   ```

3. **Setup Environment Variables**:
   - Copy `.env.example` to `.env`:
     ```bash
     cp .env.example .env
     ```
   - Get your **FREE** Groq API key from: https://console.groq.com/keys
   - Update `.env` with your key:
     ```env
     REACT_APP_GROQ_API_KEY=your_groq_api_key_here
     ```

4. **Start the Development Server**:

   ```bash
   npm start
   ```

   The app will open at `http://localhost:1234`

5. **Build for Production** (optional):

   ```bash
   npm run build
   ```

   npm start

   The app will be available at http://localhost:1234 in your web browser.

## Usage

After starting the development server:

- Search for Recipes: Use the search bar to type keywords like "pasta" or "chicken" to find related recipes.
- View Recipe Details: Click on a recipe to view its ingredients, cooking instructions, and other details.

- Folder Structure
  - /public: Contains static files, including index.html, which is the main entry point for the app.
  - /src: The main source code for the application, including:
  - components/: Reusable React components such as Header, RecipeCard, and Footer.
  - pages/: Different page components, including the main search and recipe detail pages.
  - assets/: Images, icons, and other static resources.
  - App.js: Main component that ties the different parts of the application together.
  - index.js: Entry point to render the app.
- API Reference
  Foodie Food uses an external recipe API to gather recipe information. Below is a brief overview of how the API is used:

- Search Endpoint: The application sends a GET request to the API with a query parameter to retrieve matching recipes.
- Recipe Details: Recipe details, including ingredients and cooking steps, are fetched based on a unique recipe ID.
- For API setup, ensure you have obtained an API key and configured it properly within the codebase. Replace placeholders in the src/api/config.js file with your actual API key.

# Contributing

We welcome contributions to enhance Foodie Food! To contribute:

# Fork the repository.

- Create a new branch (git checkout -b feature-name).
- Make changes and commit (git commit -m 'Add new feature').
- Push the branch (git push origin feature-name).
- Create a Pull Request on GitHub.
- License
  This project is licensed under the MIT License. See the LICENSE file for details.

# Contact

If you have any questions or suggestions, feel free to reach out!

## GitHub: RiyazR2

[Live Demo](https://foodiefinderr2.netlify.app/): Foodie Food

Thank you for checking out Foodie Food! Your feedback is greatly appreciated, and happy cooking!
