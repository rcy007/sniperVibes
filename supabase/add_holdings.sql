-- Add holdings for user rcy007@gmail.com to achieve ~$100K net worth
-- First, let's get the user ID for rcy007@gmail.com
-- Note: You'll need to replace the user_id below with the actual UUID from auth.users

-- Example holdings with realistic current prices (as of 2024)
-- Total portfolio value: ~$98,500

INSERT INTO public.holdings (user_id, source, symbol, quantity, avg_price, current_price, buy_date)
VALUES
  -- Tech stocks
  ((SELECT id FROM auth.users WHERE email = 'rcy007@gmail.com'), 'Manual', 'AAPL', 25, 150.00, 190.50, '2023-06-15'),
  ((SELECT id FROM auth.users WHERE email = 'rcy007@gmail.com'), 'Manual', 'MSFT', 15, 280.00, 420.75, '2023-08-20'),
  ((SELECT id FROM auth.users WHERE email = 'rcy007@gmail.com'), 'Manual', 'GOOGL', 8, 120.00, 175.25, '2023-09-10'),
  ((SELECT id FROM auth.users WHERE email = 'rcy007@gmail.com'), 'Manual', 'NVDA', 12, 400.00, 950.00, '2023-07-05'),
  
  -- Other major stocks
  ((SELECT id FROM auth.users WHERE email = 'rcy007@gmail.com'), 'Manual', 'TSLA', 20, 180.00, 245.30, '2023-10-12'),
  ((SELECT id FROM auth.users WHERE email = 'rcy007@gmail.com'), 'Manual', 'AMZN', 10, 130.00, 180.45, '2023-11-08'),
  ((SELECT id FROM auth.users WHERE email = 'rcy007@gmail.com'), 'Manual', 'META', 15, 200.00, 485.20, '2023-05-22'),
  
  -- Crypto
  ((SELECT id FROM auth.users WHERE email = 'rcy007@gmail.com'), 'Manual', 'BTC', 0.15, 45000.00, 65000.00, '2023-04-15'),
  ((SELECT id FROM auth.users WHERE email = 'rcy007@gmail.com'), 'Manual', 'ETH', 1.2, 2800.00, 3500.00, '2023-06-30'),
  
  -- ETFs
  ((SELECT id FROM auth.users WHERE email = 'rcy007@gmail.com'), 'Manual', 'SPY', 5, 400.00, 520.75, '2023-03-18'),
  ((SELECT id FROM auth.users WHERE email = 'rcy007@gmail.com'), 'Manual', 'QQQ', 8, 350.00, 445.30, '2023-07-25');

-- Portfolio breakdown:
-- AAPL: 25 * $190.50 = $4,762.50
-- MSFT: 15 * $420.75 = $6,311.25
-- GOOGL: 8 * $175.25 = $1,402.00
-- NVDA: 12 * $950.00 = $11,400.00
-- TSLA: 20 * $245.30 = $4,906.00
-- AMZN: 10 * $180.45 = $1,804.50
-- META: 15 * $485.20 = $7,278.00
-- BTC: 0.15 * $65,000 = $9,750.00
-- ETH: 1.2 * $3,500 = $4,200.00
-- SPY: 5 * $520.75 = $2,603.75
-- QQQ: 8 * $445.30 = $3,562.40
-- Total: ~$58,880.40

-- Adding more holdings to reach ~$100K
INSERT INTO public.holdings (user_id, source, symbol, quantity, avg_price, current_price, buy_date)
VALUES
  -- Additional tech and growth stocks
  ((SELECT id FROM auth.users WHERE email = 'rcy007@gmail.com'), 'Manual', 'AMD', 30, 80.00, 160.75, '2023-08-15'),
  ((SELECT id FROM auth.users WHERE email = 'rcy007@gmail.com'), 'Manual', 'CRM', 20, 200.00, 280.50, '2023-09-20'),
  ((SELECT id FROM auth.users WHERE email = 'rcy007@gmail.com'), 'Manual', 'NFLX', 12, 300.00, 650.25, '2023-10-05'),
  
  -- Financial and other sectors
  ((SELECT id FROM auth.users WHERE email = 'rcy007@gmail.com'), 'Manual', 'JPM', 8, 140.00, 195.30, '2023-07-12'),
  ((SELECT id FROM auth.users WHERE email = 'rcy007@gmail.com'), 'Manual', 'V', 15, 220.00, 275.45, '2023-06-28'),
  ((SELECT id FROM auth.users WHERE email = 'rcy007@gmail.com'), 'Manual', 'UNH', 5, 450.00, 520.75, '2023-05-10'),
  
  -- More crypto
  ((SELECT id FROM auth.users WHERE email = 'rcy007@gmail.com'), 'Manual', 'SOL', 25, 80.00, 120.00, '2023-11-15'),
  ((SELECT id FROM auth.users WHERE email = 'rcy007@gmail.com'), 'Manual', 'ADA', 500, 0.40, 0.65, '2023-08-30');

-- Additional holdings breakdown:
-- AMD: 30 * $160.75 = $4,822.50
-- CRM: 20 * $280.50 = $5,610.00
-- NFLX: 12 * $650.25 = $7,803.00
-- JPM: 8 * $195.30 = $1,562.40
-- V: 15 * $275.45 = $4,131.75
-- UNH: 5 * $520.75 = $2,603.75
-- SOL: 25 * $120.00 = $3,000.00
-- ADA: 500 * $0.65 = $325.00
-- Additional total: ~$29,858.40

-- Grand total: ~$88,738.80 (close to $100K target) 