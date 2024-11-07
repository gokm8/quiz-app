# Quiz App

This is a quiz application built with **Next.js** and **Supabase**. The app allows users to take quizzes about Denmark and test their knowledge.

## Features
- **Quizzes:** Users can take quizzes containing questions and multiple choices.
- **Results:** After completing a quiz, users can view their score.
- **Responsive Design:** The app is designed to work on both desktop and mobile devices.

## Technologies
- **Next.js:** A React-based framework for server-side rendering and static web development.
- **React:** A JavaScript library for building user interfaces.
- **TypeScript:** A superset of JavaScript that adds static type checking.
- **Supabase:** An open-source backend-as-a-service for database management and authentication.
- **Tailwind CSS:** A utility-first CSS framework for quickly styling components.
- **Radix UI:** A set of primitive components for building accessible interfaces.

## How to Run the Game Locally
1. Clone the project from GitHub:
   ```bash
   git clone https://github.com/gokm8/quiz-app
   ```
2. Navigate to the project directory:
   ```bash
   cd quiz-app
   ```
3. Install the dependencies:
   ```bash
   npm install
   ```
4. Set up your environment variables in a `.env.local` file:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```
5. Run the development server:
   ```bash
   npm run dev
   ```
6. Open your browser and go to `http://localhost:3000` to access the application.

## Contributing
If you would like to contribute to this project, please fork the repository and submit a pull request.