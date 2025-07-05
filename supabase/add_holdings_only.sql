-- Add holdings for user rcy007@gmail.com to achieve ~$100K net worth
-- This script assumes the user already exists and was created through the app

DO $$
DECLARE
    user_id uuid;
BEGIN
    -- Get the user ID for rcy007@gmail.com
    SELECT id INTO user_id FROM auth.users WHERE email = 'rcy007@gmail.com';
    
    -- Check if user exists
    IF user_id IS NULL THEN
        RAISE EXCEPTION 'User rcy007@gmail.com not found. Please sign up first through the app.';
    END IF;
    
    -- Add holdings for the user
    INSERT INTO public.holdings (user_id, source, symbol, quantity, avg_price, current_price, buy_date)
    VALUES
      -- Tech stocks
      (user_id, 'Manual', 'AAPL', 25, 150.00, 190.50, '2023-06-15'),
      (user_id, 'Manual', 'MSFT', 15, 280.00, 420.75, '2023-08-20'),
      (user_id, 'Manual', 'GOOGL', 8, 120.00, 175.25, '2023-09-10'),
      (user_id, 'Manual', 'NVDA', 12, 400.00, 950.00, '2023-07-05'),
      
      -- Other major stocks
      (user_id, 'Manual', 'TSLA', 20, 180.00, 245.30, '2023-10-12'),
      (user_id, 'Manual', 'AMZN', 10, 130.00, 180.45, '2023-11-08'),
      (user_id, 'Manual', 'META', 15, 200.00, 485.20, '2023-05-22'),
      
      -- Crypto
      (user_id, 'Manual', 'BTC', 0.15, 45000.00, 65000.00, '2023-04-15'),
      (user_id, 'Manual', 'ETH', 1.2, 2800.00, 3500.00, '2023-06-30'),
      
      -- ETFs
      (user_id, 'Manual', 'SPY', 5, 400.00, 520.75, '2023-03-18'),
      (user_id, 'Manual', 'QQQ', 8, 350.00, 445.30, '2023-07-25');

    -- Adding more holdings to reach ~$100K
    INSERT INTO public.holdings (user_id, source, symbol, quantity, avg_price, current_price, buy_date)
    VALUES
      -- Additional tech and growth stocks
      (user_id, 'Manual', 'AMD', 30, 80.00, 160.75, '2023-08-15'),
      (user_id, 'Manual', 'CRM', 20, 200.00, 280.50, '2023-09-20'),
      (user_id, 'Manual', 'NFLX', 12, 300.00, 650.25, '2023-10-05'),
      
      -- Financial and other sectors
      (user_id, 'Manual', 'JPM', 8, 140.00, 195.30, '2023-07-12'),
      (user_id, 'Manual', 'V', 15, 220.00, 275.45, '2023-06-28'),
      (user_id, 'Manual', 'UNH', 5, 450.00, 520.75, '2023-05-10'),
      
      -- More crypto
      (user_id, 'Manual', 'SOL', 25, 80.00, 120.00, '2023-11-15'),
      (user_id, 'Manual', 'ADA', 500, 0.40, 0.65, '2023-08-30');
      
    RAISE NOTICE 'Successfully added holdings for user rcy007@gmail.com (ID: %)', user_id;
END $$; 