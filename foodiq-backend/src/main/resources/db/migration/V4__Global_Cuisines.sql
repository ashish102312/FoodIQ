-- Global Cuisines Dataset for FoodIQ (V4)
-- Categories: Chinese, Italian, Mexican, Middle Eastern, Health/Salads

INSERT INTO foods (name, protein, carbs, fat, calories, type) VALUES
-- Chinese
('Kung Pao Chicken', 22.0, 15.0, 18.0, 310.0, 'NON_VEG'),
('Veg Manchurian', 5.0, 35.0, 15.0, 290.0, 'VEG'),
('Hakka Noodles', 6.0, 60.0, 12.0, 380.0, 'VEG'),
('Chicken Sweet Corn Soup', 12.0, 10.0, 4.0, 120.0, 'NON_VEG'),
('Spring Rolls (2)', 4.0, 25.0, 12.0, 220.0, 'VEG'),
('Dim Sums (Veg)', 3.0, 20.0, 2.0, 110.0, 'VEG'),
('Chilli Garlic Fried Rice', 5.0, 65.0, 10.0, 370.0, 'VEG'),

-- Italian
('Pasta Carbonara', 18.0, 65.0, 30.0, 590.0, 'NON_VEG'),
('Lasagna (Meat)', 25.0, 45.0, 22.0, 480.0, 'NON_VEG'),
('Mushroom Risotto', 8.0, 55.0, 15.0, 390.0, 'VEG'),
('Garlic Bread with Cheese', 6.0, 30.0, 18.0, 310.0, 'VEG'),
('Bruschetta', 3.0, 20.0, 8.0, 160.0, 'VEG'),
('Penne Arrabbiata', 7.0, 60.0, 12.0, 380.0, 'VEG'),

-- Mexican
('Chicken Tacos (3)', 24.0, 35.0, 18.0, 400.0, 'NON_VEG'),
('Veggie Burrito', 12.0, 75.0, 15.0, 480.0, 'VEG'),
('Nachos with Salsa', 5.0, 55.0, 25.0, 470.0, 'VEG'),
('Cheese Quesadilla', 14.0, 40.0, 22.0, 420.0, 'VEG'),
('Chicken Enchiladas', 20.0, 45.0, 18.0, 420.0, 'NON_VEG'),

-- Middle Eastern
('Chicken Shawarma Wrap', 22.0, 45.0, 18.0, 430.0, 'NON_VEG'),
('Falafel Plate (4 pcs)', 10.0, 35.0, 15.0, 320.0, 'VEG'),
('Hummus with Pita', 8.0, 45.0, 12.0, 330.0, 'VEG'),
('Tabbouleh Salad', 3.0, 15.0, 10.0, 160.0, 'VEG'),
('Lamb Kebab', 24.0, 4.0, 20.0, 290.0, 'NON_VEG'),

-- Health / Salads / Bowls
('Caesar Salad with Chicken', 28.0, 12.0, 25.0, 390.0, 'NON_VEG'),
('Tuna Poke Bowl', 26.0, 45.0, 12.0, 390.0, 'NON_VEG'),
('Mediterranean Salad', 6.0, 15.0, 12.0, 190.0, 'VEG'),
('Lentil Soup', 12.0, 35.0, 4.0, 220.0, 'VEG'),
('Grilled Veggie Plate', 4.0, 18.0, 8.0, 160.0, 'VEG'),
('Power Protein Bowl', 35.0, 30.0, 12.0, 420.0, 'NON_VEG')
ON CONFLICT DO NOTHING;
