ALTER TABLE foods ADD COLUMN net_weight DOUBLE PRECISION DEFAULT 100.0;

-- Update Menu 1 (Salads / Greens)
UPDATE foods SET net_weight = 300.0 WHERE name = 'Kale & Quinoa Salad';
UPDATE foods SET net_weight = 350.0 WHERE name = 'Green Goddess Bowl';
UPDATE foods SET net_weight = 320.0 WHERE name = 'Avocado Zucchini Pasta';
UPDATE foods SET net_weight = 150.0 WHERE name = 'Chia Seed Pudding';

-- Update Menu 2 (Quick Snacks / Wraps)
UPDATE foods SET net_weight = 200.0 WHERE name = 'Tuna Salad';
UPDATE foods SET net_weight = 250.0 WHERE name = 'Chicken & Avocado';
UPDATE foods SET net_weight = 220.0 WHERE name = 'Spicy Chicken Wrap';
UPDATE foods SET net_weight = 240.0 WHERE name = 'Hoisin Duck Wrap';
UPDATE foods SET net_weight = 250.0 WHERE name = 'Orange Juice';

-- Update Menu 3 (Brunch)
UPDATE foods SET net_weight = 400.0 WHERE name = 'Veggan Brunch';
UPDATE foods SET net_weight = 180.0 WHERE name = 'Omelette';
UPDATE foods SET net_weight = 280.0 WHERE name = 'Gluten Free Pancakes';
UPDATE foods SET net_weight = 200.0 WHERE name = 'Frutal Bowl';
