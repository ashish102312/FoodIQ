-- First, drop dependencies if any
DROP TABLE IF EXISTS food_ingredients CASCADE;
DROP TABLE IF EXISTS intakes CASCADE;
DROP TABLE IF EXISTS intake_history CASCADE;
DROP TABLE IF EXISTS foods CASCADE;
DROP TABLE IF EXISTS menus CASCADE;

-- Create menus table
CREATE TABLE menus (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    keyword VARCHAR(255) NOT NULL
);

-- Create foods table
CREATE TABLE foods (
    id BIGSERIAL PRIMARY KEY,
    menu_id BIGINT REFERENCES menus(id),
    name VARCHAR(255) NOT NULL,
    calories INTEGER DEFAULT 0,
    protein FLOAT DEFAULT 0,
    carbs FLOAT DEFAULT 0,
    fats FLOAT DEFAULT 0,
    fiber FLOAT DEFAULT 0,
    sugar FLOAT DEFAULT 0,
    sodium FLOAT DEFAULT 0,
    cholesterol FLOAT DEFAULT 0,
    micronutrients TEXT,
    health_score INTEGER DEFAULT 0,
    category VARCHAR(100)
);

-- Create intake_history table
CREATE TABLE intake_history (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT REFERENCES users(id),
    food_id BIGINT REFERENCES foods(id),
    quantity FLOAT DEFAULT 1,
    consumed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Seed Menus
INSERT INTO menus (name, keyword) VALUES ('Green Delight & Salads', 'GREEN DELIGHT');
INSERT INTO menus (name, keyword) VALUES ('Fresh & Organic Wraps', 'Fresh & Organic');
INSERT INTO menus (name, keyword) VALUES ('Brunch & Special Menu', 'Brunch');

-- Seed Foods for Menu 1 (Green Delight)
INSERT INTO foods (menu_id, name, calories, protein, carbs, fats, fiber, micronutrients, health_score, category) 
VALUES (1, 'Chicken Avocado Salad', 450, 35, 20, 18, 8, 'Vitamin K, Vitamin E, Potassium', 88, 'SALADS');
INSERT INTO foods (menu_id, name, calories, protein, carbs, fats, fiber, micronutrients, health_score, category) 
VALUES (1, 'Quinoa Greek Salad', 380, 12, 45, 15, 6, 'Magnesium, Iron, Vitamin C', 92, 'SALADS');
INSERT INTO foods (menu_id, name, calories, protein, carbs, fats, fiber, micronutrients, health_score, category) 
VALUES (1, 'Berry Blast Smoothie Bowl', 320, 8, 60, 5, 10, 'Antioxidants, Vitamin C', 85, 'DESSERTS');

-- Seed Foods for Menu 2 (Fresh & Organic)
INSERT INTO foods (menu_id, name, calories, protein, carbs, fats, fiber, micronutrients, health_score, category) 
VALUES (2, 'Turkey Pesto Wrap', 520, 42, 35, 22, 4, 'B Vitamins, Zinc', 82, 'Tortilla Wraps');
INSERT INTO foods (menu_id, name, calories, protein, carbs, fats, fiber, micronutrients, health_score, category) 
VALUES (2, 'Lentil Veggie Wrap', 410, 18, 55, 12, 12, 'Fiber, Iron, Folate', 90, 'Tortilla Wraps');
INSERT INTO foods (menu_id, name, calories, protein, carbs, fats, fiber, micronutrients, health_score, category) 
VALUES (2, 'Roasted Chickpeas', 180, 9, 25, 6, 8, 'Manganese, Copper', 87, 'Quick Snacks');

-- Seed Foods for Menu 3 (Brunch)
INSERT INTO foods (menu_id, name, calories, protein, carbs, fats, fiber, micronutrients, health_score, category) 
VALUES (3, 'Eggs Benedict', 650, 28, 40, 45, 2, 'Vitamin B12, Choline', 65, 'Brunch');
INSERT INTO foods (menu_id, name, calories, protein, carbs, fats, fiber, micronutrients, health_score, category) 
VALUES (3, 'Gluten Free Pancakes', 480, 10, 75, 15, 5, 'Vitamin D, Calcium', 70, 'Gluten Free');
INSERT INTO foods (menu_id, name, calories, protein, carbs, fats, fiber, micronutrients, health_score, category) 
VALUES (3, 'Smoked Salmon Bagel', 550, 32, 50, 22, 3, 'Omega-3, Vitamin D', 84, 'Special Menu');
