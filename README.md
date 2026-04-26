# 🥗 FoodIQ - Personalized Nutrition Intelligence

FoodIQ is an AI-driven, full-stack web application designed to help you make smarter, healthier dietary choices effortlessly. By combining a modern, aesthetically pleasing frontend with a robust Spring Boot backend, FoodIQ empowers users to scan restaurant menus, instantly extract food details, and track daily nutritional macros. 

---

## ✨ Features

- **📸 Smart Menu Scanner**: Snap a picture of any menu and instantly extract food items with their nutritional breakdown using AI (Google Cloud Vision API integration).
- **📊 Macro & Intake Tracking**: Log your daily protein, carbs, and calories to ensure you stay on track with your fitness goals.
- **🚨 Smart Allergy Alerts**: Automatically flags menu items that conflict with your personalized allergy profile (e.g., nuts, dairy).
- **💡 Dietary Recommendations**: Get intelligent, real-time suggestions on what to eat based on your remaining daily macro goals and your preferred diet (Veg/Non-Veg).
- **📈 Interactive Dashboard**: Visualize your weekly caloric intake and protein score with beautiful, interactive charts.
- **🔐 Secure Authentication**: JWT-based stateless authentication system protecting user data.

---

## 🛠️ Tech Stack

### Frontend
- **React (Vite)**: Lightning-fast development and optimized build.
- **Tailwind CSS v4**: For a beautiful, responsive, and modern UI.
- **React Router**: Seamless Single Page Application (SPA) navigation.
- **Chart.js & React-Chartjs-2**: Dynamic data visualization.
- **Lucide React**: Crisp, modern iconography.

### Backend
- **Spring Boot (Java 17)**: High-performance, production-ready backend framework.
- **PostgreSQL**: Reliable relational database mapping complex user intakes and food properties.
- **Spring Data JPA**: Efficient database access and schema management.
- **Spring Security & JJWT**: Securing REST APIs using JWT tokens.

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- Java 17
- Maven
- PostgreSQL running locally on port 5432.

### 1. Database Setup
Ensure PostgreSQL is running and create a database named `foodiq`. The application is configured to connect using the default credentials (`postgres`/`postgres`). You can modify this in `application.properties`.

### 2. Run the Backend
```bash
cd foodiq-backend
mvn spring-boot:run
```
*The backend API will be available at `http://localhost:8080`.*

### 3. Run the Frontend
```bash
cd foodiq-frontend
npm install
npm run dev
```
*The frontend application will be available at `http://localhost:5173`.*

---

## 📸 Screenshots & Flow
1. **Landing Page**: Start your journey with a clean, engaging welcome screen.
2. **Scanner (Guest/Logged-in)**: Upload menu images and view detected items.
3. **Dashboard**: Track your progress over time with dynamic line charts.

---

**Made with ❤️ for smarter eating.**
