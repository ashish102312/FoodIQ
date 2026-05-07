-- Large Food Dataset for FoodIQ (V3)
-- Categories: Indian Main Course, Snacks, Gym/High Protein, Beverages, Desserts, Fast Food

INSERT INTO foods (name, protein, carbs, fat, calories, type) VALUES
-- Indian Mains
('Mutton Rogan Josh', 25.0, 8.0, 18.0, 320.0, 'NON_VEG'),
('Chicken Tikka Masala', 22.0, 10.0, 15.0, 300.0, 'NON_VEG'),
('Palak Paneer', 12.0, 8.0, 18.0, 240.0, 'VEG'),
('Chole Bhature', 8.0, 60.0, 25.0, 450.0, 'VEG'),
('Prawn Curry', 18.0, 6.0, 12.0, 210.0, 'NON_VEG'),
('Baingan Bharta', 3.0, 12.0, 9.0, 140.0, 'VEG'),
('Aloo Gobi', 4.0, 22.0, 10.0, 190.0, 'VEG'),
('Rajma Chawal', 12.0, 55.0, 8.0, 340.0, 'VEG'),
('Fish Moilee', 20.0, 5.0, 15.0, 230.0, 'NON_VEG'),
('Hyderabadi Dum Biryani', 14.0, 50.0, 14.0, 380.0, 'NON_VEG'),

-- Gym / High Protein
('Whey Protein Shake', 25.0, 3.0, 2.0, 130.0, 'VEG'),
('Grilled Salmon', 25.0, 0.0, 13.0, 220.0, 'NON_VEG'),
('Boiled Eggs (2)', 12.0, 1.0, 10.0, 140.0, 'NON_VEG'),
('Steamed Chicken Breast', 31.0, 0.0, 3.5, 165.0, 'NON_VEG'),
('Quinoa Salad', 8.0, 35.0, 6.0, 220.0, 'VEG'),
('Peanut Butter (2 tbsp)', 8.0, 6.0, 16.0, 190.0, 'VEG'),
('Greek Yogurt', 10.0, 4.0, 5.0, 100.0, 'VEG'),
('Tofu Scramble', 14.0, 5.0, 9.0, 160.0, 'VEG'),
('Chickpea Salad', 12.0, 40.0, 5.0, 250.0, 'VEG'),
('Lean Beef Steak', 26.0, 0.0, 12.0, 210.0, 'NON_VEG'),

-- Cafe / Breakfast
('Avocado Toast', 6.0, 28.0, 15.0, 280.0, 'VEG'),
('Eggs Benedict', 18.0, 30.0, 25.0, 420.0, 'NON_VEG'),
('Pancake with Syrup', 6.0, 65.0, 12.0, 380.0, 'VEG'),
('Fruit Smoothie bowl', 4.0, 55.0, 5.0, 280.0, 'VEG'),
('Croissant', 5.0, 32.0, 18.0, 310.0, 'VEG'),
('Oatmeal with Nuts', 10.0, 45.0, 12.0, 320.0, 'VEG'),
('Club Sandwich', 18.0, 35.0, 15.0, 350.0, 'NON_VEG'),
('Veggie Omelette', 14.0, 4.0, 15.0, 210.0, 'NON_VEG'),

-- Fast Food
('Chicken Zinger Burger', 18.0, 45.0, 22.0, 450.0, 'NON_VEG'),
('Margherita Pizza Slice', 8.0, 35.0, 12.0, 280.0, 'VEG'),
('French Fries (Large)', 4.0, 60.0, 25.0, 480.0, 'VEG'),
('Paneer Wrap', 12.0, 40.0, 18.0, 370.0, 'VEG'),
('Beef Burger', 22.0, 40.0, 28.0, 510.0, 'NON_VEG'),
('Chicken Nuggets (6)', 14.0, 18.0, 20.0, 290.0, 'NON_VEG'),

-- Beverages
('Cold Coffee', 4.0, 35.0, 12.0, 260.0, 'VEG'),
('Masala Chai', 2.0, 15.0, 5.0, 110.0, 'VEG'),
('Fresh Lime Soda', 0.0, 25.0, 0.0, 100.0, 'VEG'),
('Mango Lassi', 5.0, 45.0, 8.0, 270.0, 'VEG'),
('Green Tea', 0.0, 0.0, 0.0, 0.0, 'VEG'),

-- Desserts
('Chocolate Brownie', 4.0, 45.0, 22.0, 390.0, 'VEG'),
('Rasmalai', 6.0, 35.0, 12.0, 270.0, 'VEG'),
('Cheesecake Slice', 7.0, 40.0, 28.0, 440.0, 'VEG'),
('Ice Cream Scoop', 3.0, 25.0, 10.0, 200.0, 'VEG')
ON CONFLICT DO NOTHING;
