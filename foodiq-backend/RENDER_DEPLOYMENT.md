# Render Deployment Guide - FoodIQ Backend

This guide walks you through deploying the FoodIQ Spring Boot backend to Render as a Web Service connected to Supabase PostgreSQL.

---

## 1. Create a Web Service on Render

1. Log in to [Render Dashboard](https://dashboard.render.com).
2. Click **New +** > **Web Service**.
3. Connect your GitHub repository: `https://github.com/ashish102312/FoodIQ.git`.
4. Configure service settings:
   - **Name**: `foodiq-backend`
   - **Region**: Choose the region closest to your Supabase database instance (e.g. Frankfurt, Oregon, Singapore).
   - **Branch**: `master`
   - **Root Directory**: `foodiq-backend`
   - **Runtime**: `Java` (JDK 17)
   - **Build Command**: `./mvnw clean package -DskipTests`
   - **Start Command**: `java -jar target/foodiq-0.0.1-SNAPSHOT.jar`

---

## 2. Environment Variables

Navigate to the **Environment** tab on your Render Web Service and add the following:

| Key | Value / Example | Description |
|---|---|---|
| `DATABASE_URL` | `jdbc:postgresql://<HOST>:5432/postgres?sslmode=require` | Supabase JDBC Connection URL |
| `DATABASE_USERNAME` | `postgres` | Supabase database username |
| `DATABASE_PASSWORD` | `your_supabase_password` | Supabase database password |
| `PORT` | `8080` | Render assigns this automatically |
| `JWT_SECRET` | `<secure-256-bit-hex-string>` | Secret key for JWT token generation |
| `FRONTEND_URL` | `https://your-frontend.vercel.app` | Deployed frontend URL |

---

## 3. Flyway Database Migrations

- When the backend starts up on Render, Flyway runs automatically and migrates the database schema up to version 8.
- Ensure that the connected Supabase user has permissions to create and alter tables in the `public` schema.

---

## 4. Verification

After deployment completes:
- Check health status: `https://<your-render-service>.onrender.com/actuator/health`
- Check test endpoint: `https://<your-render-service>.onrender.com/api/test`
- Both endpoints should return HTTP 200 with status `UP`.
