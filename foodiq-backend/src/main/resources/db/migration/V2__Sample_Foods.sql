INSERT INTO foods (name, protein, carbs, fat, calories, type) VALUES
('Chicken Biryani', 15.0, 45.0, 12.0, 350.0, 'NON_VEG'),
('Paneer Tikka', 18.0, 10.0, 22.0, 320.0, 'VEG'),
('Grilled Chicken Salad', 30.0, 5.0, 10.0, 240.0, 'NON_VEG'),
('Dal Tadka', 6.0, 20.0, 8.0, 180.0, 'VEG'),
('Butter Chicken', 20.0, 12.0, 25.0, 400.0, 'NON_VEG'),
('Masala Dosa', 4.0, 45.0, 15.0, 300.0, 'VEG'),
('Egg Curry', 12.0, 8.0, 15.0, 250.0, 'NON_VEG'),
('Mixed Vegetable Curry', 4.0, 15.0, 10.0, 160.0, 'VEG'),
('Tandoori Roti', 3.0, 25.0, 1.0, 120.0, 'VEG'),
('Gulab Jamun', 2.0, 40.0, 15.0, 300.0, 'VEG')
ON CONFLICT DO NOTHING;
