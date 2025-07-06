-- ---------------------------------------------------------------------------
-- Seed auth users referenced by sample holdings rows
-- ---------------------------------------------------------------------------

-- Note: User rcy007@gmail.com should be created via the Supabase Auth API
-- Run 'node create-user.js' after database reset to create the user with password 123456

-- ---------------------------------------------------------------------------
-- Seed holdings for rcy007@gmail.com (~$100K portfolio)
-- ---------------------------------------------------------------------------

-- Clear existing holdings for rcy007@gmail.com (in case of re-seeding)
DELETE FROM public.holdings WHERE user_email = 'rcy007@gmail.com';

-- Add holdings for rcy007@gmail.com (~$100K portfolio)
INSERT INTO public.holdings (user_email, source, symbol, quantity, avg_price, buy_date)
VALUES
  -- Tech stocks
  ('rcy007@gmail.com', 'Seed', 'AAPL', 25, 150.00, '2023-06-15'),
  ('rcy007@gmail.com', 'Seed', 'MSFT', 15, 280.00, '2023-08-20'),
  ('rcy007@gmail.com', 'Seed', 'GOOGL', 8, 120.00, '2023-09-10'),
  ('rcy007@gmail.com', 'Seed', 'NVDA', 12, 400.00, '2023-07-05'),
  
  -- Other major stocks
  ('rcy007@gmail.com', 'Seed', 'TSLA', 20, 180.00, '2023-10-12'),
  ('rcy007@gmail.com', 'Seed', 'AMZN', 10, 130.00, '2023-11-08'),
  ('rcy007@gmail.com', 'Seed', 'META', 15, 200.00, '2023-05-22'),
  
  -- Crypto
  ('rcy007@gmail.com', 'Seed', 'BTC', 0.15, 45000.00, '2023-04-15'),
  ('rcy007@gmail.com', 'Seed', 'ETH', 1.2, 2800.00, '2023-06-30'),
  
  -- ETFs
  ('rcy007@gmail.com', 'Seed', 'SPY', 5, 400.00, '2023-03-18'),
  ('rcy007@gmail.com', 'Seed', 'QQQ', 8, 350.00, '2023-07-25'),

  -- Additional tech and growth stocks
  ('rcy007@gmail.com', 'Seed', 'AMD', 30, 80.00, '2023-08-15'),
  ('rcy007@gmail.com', 'Seed', 'CRM', 20, 200.00, '2023-09-20'),
  ('rcy007@gmail.com', 'Seed', 'NFLX', 12, 300.00, '2023-10-05'),
  
  -- Financial and other sectors
  ('rcy007@gmail.com', 'Seed', 'JPM', 8, 140.00, '2023-07-12'),
  ('rcy007@gmail.com', 'Seed', 'V', 15, 220.00, '2023-06-28'),
  ('rcy007@gmail.com', 'Seed', 'UNH', 5, 450.00, '2023-05-10'),
  
  -- More crypto
  ('rcy007@gmail.com', 'Seed', 'SOL', 25, 80.00, '2023-11-15'),
  ('rcy007@gmail.com', 'Seed', 'ADA', 500, 0.40, '2023-08-30');

-- Successfully seeded holdings for user rcy007@gmail.com 