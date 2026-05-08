-- Update foods for Menu 1 (Green Delight)
DELETE FROM foods WHERE menu_id = 1;
INSERT INTO foods (menu_id, name, calories, protein, carbs, fats, fiber, sodium, micronutrients, health_score, category) VALUES
(1, 'Kale & Quinoa Salad', 350, 12.0, 45.0, 15.0, 8.0, 450, 'Vitamin K, Magnesium', 92, 'Salads'),
(1, 'Green Goddess Bowl', 420, 15.0, 50.0, 18.0, 10.0, 380, 'Iron, Folate', 95, 'Salads'),
(1, 'Avocado Zucchini Pasta', 380, 10.0, 40.0, 22.0, 7.0, 320, 'Healthy Fats, Vitamin C', 88, 'Entries'),
(1, 'Chia Seed Pudding', 250, 6.0, 30.0, 12.0, 12.0, 150, 'Omega-3, Fiber', 90, 'Desserts');

-- Update foods for Menu 2 (Fresh & Organic)
DELETE FROM foods WHERE menu_id = 2;
INSERT INTO foods (menu_id, name, calories, protein, carbs, fats, fiber, sodium, micronutrients, health_score, category) VALUES
(2, 'Tuna Salad', 280, 24.0, 10.0, 15.0, 2.0, 550, 'Omega-3, Vitamin B12', 82, 'Quick Snacks'),
(2, 'Chicken & Avocado', 450, 32.0, 12.0, 28.0, 6.0, 480, 'Protein, Healthy Fats', 85, 'Quick Snacks'),
(2, 'Spicy Chicken Wrap', 520, 28.0, 55.0, 18.0, 4.0, 850, 'Protein, Capsaicin', 75, 'Tortilla Wraps'),
(2, 'Hoisin Duck Wrap', 580, 22.0, 65.0, 24.0, 3.0, 950, 'Iron, Zinc', 68, 'Tortilla Wraps'),
(2, 'Orange Juice', 120, 1.0, 28.0, 0.0, 0.5, 5, 'Vitamin C', 70, 'Cold Drinks');

-- Update foods for Menu 3 (Brunch)
DELETE FROM foods WHERE menu_id = 3;
INSERT INTO foods (menu_id, name, calories, protein, carbs, fats, fiber, sodium, micronutrients, health_score, category) VALUES
(3, 'Veggan Brunch', 480, 18.0, 55.0, 22.0, 12.0, 420, 'Plant Protein, Fiber', 94, 'Special Menu'),
(3, 'Omelette', 320, 22.0, 4.0, 24.0, 0.0, 380, 'Choline, B12', 85, 'Brunch'),
(3, 'Gluten Free Pancakes', 450, 12.0, 65.0, 15.0, 5.0, 550, 'Complex Carbs', 78, 'Gluten Free'),
(3, 'Frutal Bowl', 220, 4.0, 45.0, 2.0, 6.0, 20, 'Antioxidants, Vitamin C', 96, 'Brunch');
