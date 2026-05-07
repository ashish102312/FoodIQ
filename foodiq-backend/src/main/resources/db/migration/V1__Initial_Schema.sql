-- Initial Schema for FoodIQ

CREATE TABLE IF NOT EXISTS users (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    goal_protein DOUBLE PRECISION,
    preference VARCHAR(50),
    role VARCHAR(50) NOT NULL DEFAULT 'USER',
    created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS user_allergies (
    user_id BIGINT NOT NULL,
    allergy VARCHAR(255),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS foods (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    protein DOUBLE PRECISION,
    carbs DOUBLE PRECISION,
    fat DOUBLE PRECISION,
    calories DOUBLE PRECISION,
    type VARCHAR(50) NOT NULL,
    created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS food_ingredients (
    food_id BIGINT NOT NULL,
    ingredient VARCHAR(255),
    FOREIGN KEY (food_id) REFERENCES foods(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS intakes (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL,
    food_id BIGINT NOT NULL,
    quantity DOUBLE PRECISION NOT NULL,
    consumed_at TIMESTAMP WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (food_id) REFERENCES foods(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS scan_history (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT,
    raw_text TEXT,
    scan_time_ms BIGINT,
    food_count INTEGER,
    created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_foods_name ON foods(name);
CREATE INDEX IF NOT EXISTS idx_intakes_user_id ON intakes(user_id);
CREATE INDEX IF NOT EXISTS idx_scan_history_user_id ON scan_history(user_id);
