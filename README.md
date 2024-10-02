# Foodie Food 🍽️

[Live Demo](https://foodiefinderr2.netlify.app/)

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Usage](#usage)
- [Folder Structure](#folder-structure)
- [API Reference](#api-reference)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## Overview

Foodie Food is a recipe discovery web application designed to help food lovers easily search, browse, and save their favorite recipes. The project aims to provide an intuitive and responsive interface for users to explore a variety of recipes, from quick snacks to gourmet dishes, making cooking more enjoyable.

This project is built using modern web technologies such as ReactJS, Tailwind CSS, and leverages an external recipe API to provide a comprehensive and up-to-date collection of recipes.

## Features

- **Search Recipes**: Users can search for recipes by keywords, allowing them to quickly find recipes of interest.
- **Recipe Details**: Each recipe includes a detailed description, ingredient list, and cooking instructions.
- **Responsive Design**: The application is fully responsive, ensuring a seamless experience across desktops, tablets, and mobile devices.
<!-- - **Favorites List**: Users can save their favorite recipes for easy access. -->
- **API Integration**: The app fetches data from an external recipe API to deliver the latest and diverse recipe options.

## Tech Stack

- **Frontend**:
  - **ReactJS**: Used for building user interfaces and handling dynamic content.
  - **JavaScript**: Core scripting language for functionality.
  - **Tailwind CSS**: Used for fast and responsive styling of the UI.
- **Build Tool**:
  - **Parcel**: Bundler used to compile and serve the code during development and production.
- **External API**:
  - Integrated with a third-party API to fetch the latest recipe data.

## Installation

### Prerequisites

- **Node.js**: Make sure you have Node.js installed. You can download it from [here](https://nodejs.org/).
- **npm**: Node Package Manager comes with Node.js. If not, you can install it manually.

### Steps to Install

1. **Clone the Repository**: Clone the project repository from GitHub:
   ```bash
   git clone https://github.com/RiyazR2/Foodie-Food.git
   ```
2. Navigate to Project Directory:
   cd Foodie-Food

3. Install Dependencies: Install all necessary dependencies using npm:
   npm install

4. Start the Development Server: Run the following command to start the local development server:
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

<!-- ### Explanation:

- **Overview**: Provides a clear summary of what the project is.
- **Features**: Lists all the functionalities for users to understand what the app offers.
- **Tech Stack**: Details the tools and technologies used, making it easy for others to understand the technical aspects.
- **Installation & Usage**: Step-by-step guide for beginners on how to set up and use the project.
- **Folder Structure**: Helps new contributors navigate the codebase.
- **API Reference**: A brief explanation of how API integration works and where to configure it.
- **Contributing, License, Contact**: Encourages community involvement and provides necessary legal and contact information.

This README will help anyone understand your project and contribute to it effectively. -->
