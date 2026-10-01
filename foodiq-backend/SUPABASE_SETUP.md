# Supabase Setup Guide - FoodIQ Backend

This document details how to configure Supabase PostgreSQL for the FoodIQ Spring Boot application.

---

## 1. Obtain Connection Details from Supabase

1. Open your project on [Supabase Dashboard](https://supabase.com/dashboard).
2. Go to **Project Settings** > **Database**.
3. Locate the **Connection parameters**:
   - **Host**: `db.<project-ref>.supabase.co`
   - **Port**: `5432` (or `6543` for connection pooling)
   - **Database**: `postgres`
   - **User**: `postgres`
   - **Password**: Your database password

---

## 2. Compose the JDBC Connection String

Spring Boot and JDBC require the connection string format:

```text
jdbc:postgresql://<HOST>:5432/postgres?sslmode=require
```

Example:
```text
jdbc:postgresql://db.abcdefghijklmnopqrst.supabase.co:5432/postgres?sslmode=require
```

> **Note**: Always append `?sslmode=require` because Supabase requires encrypted SSL connections.

---

## 3. Flyway Migrations on Supabase

When FoodIQ starts, Flyway runs the following migration sequence automatically on the Supabase database:

1. `V1__Initial_Schema.sql`: Creates initial tables (`users`, `user_allergies`, `foods`, `intakes`, etc.).
2. `V2__Sample_Foods.sql` - `V4__Global_Cuisines.sql`: Seeds preliminary nutritional items.
3. `V6__Refactored_Schema.sql`: Refactors schema with `menus`, updated `foods`, and `intake_history`.
4. `V7__Update_Food_Data.sql`: Updates macro profiles.
5. `V8__Add_Weight_To_Foods.sql`: Adds `net_weight` column for normalized macro tracking.

No manual schema execution is necessary in the Supabase SQL editor.
