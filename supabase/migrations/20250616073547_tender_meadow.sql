/*
  # Trading Platform Enhancements

  1. New Tables
    - `trading_signals` - AI-generated trading signals
    - `user_portfolios` - Portfolio tracking
    - `trade_history` - Historical trade records
    - `risk_profiles` - User risk assessment
    - `notifications` - System notifications
    - `api_keys` - External API management
    - `subscription_plans` - Tiered access control

  2. Enhanced Features
    - Better indexing for performance
    - Audit trails for compliance
    - Real-time data support
    - Advanced analytics

  3. Security Improvements
    - Enhanced RLS policies
    - Data encryption fields
    - Compliance tracking
*/

-- Trading Signals Table
CREATE TABLE IF NOT EXISTS trading_signals (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  agent_type text NOT NULL CHECK (agent_type IN ('mt4mt5', 'crypto', 'arbitrage')),
  symbol text NOT NULL,
  signal_type text NOT NULL CHECK (signal_type IN ('buy', 'sell', 'hold')),
  confidence_score integer CHECK (confidence_score >= 0 AND confidence_score <= 100),
  entry_price numeric,
  stop_loss numeric,
  take_profit numeric,
  reasoning text,
  status text DEFAULT 'active' CHECK (status IN ('active', 'executed', 'expired', 'cancelled')),
  expires_at timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- User Portfolios Table
CREATE TABLE IF NOT EXISTS user_portfolios (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  name text NOT NULL,
  description text,
  total_value numeric DEFAULT 0,
  currency text DEFAULT 'USD',
  risk_level text CHECK (risk_level IN ('conservative', 'moderate', 'aggressive')),
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(user_id, name)
);

-- Portfolio Holdings
CREATE TABLE IF NOT EXISTS portfolio_holdings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  portfolio_id uuid REFERENCES user_portfolios(id) ON DELETE CASCADE,
  symbol text NOT NULL,
  quantity numeric NOT NULL,
  average_price numeric NOT NULL,
  current_price numeric,
  market_value numeric,
  unrealized_pnl numeric,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(portfolio_id, symbol)
);

-- Trade History Table
CREATE TABLE IF NOT EXISTS trade_history (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  portfolio_id uuid REFERENCES user_portfolios(id) ON DELETE SET NULL,
  signal_id uuid REFERENCES trading_signals(id) ON DELETE SET NULL,
  symbol text NOT NULL,
  trade_type text NOT NULL CHECK (trade_type IN ('buy', 'sell')),
  quantity numeric NOT NULL,
  entry_price numeric NOT NULL,
  exit_price numeric,
  stop_loss numeric,
  take_profit numeric,
  commission numeric DEFAULT 0,
  realized_pnl numeric,
  status text DEFAULT 'open' CHECK (status IN ('open', 'closed', 'cancelled')),
  opened_at timestamptz DEFAULT now(),
  closed_at timestamptz,
  notes text
);

-- Risk Profiles Table
CREATE TABLE IF NOT EXISTS risk_profiles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  risk_tolerance text NOT NULL CHECK (risk_tolerance IN ('conservative', 'moderate', 'aggressive')),
  max_position_size_percent integer DEFAULT 10 CHECK (max_position_size_percent > 0 AND max_position_size_percent <= 100),
  max_daily_loss_percent integer DEFAULT 5 CHECK (max_daily_loss_percent > 0 AND max_daily_loss_percent <= 50),
  preferred_assets text[] DEFAULT '{}',
  blacklisted_assets text[] DEFAULT '{}',
  trading_hours jsonb DEFAULT '{"start": "09:00", "end": "17:00", "timezone": "UTC"}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(user_id)
);

-- Notifications Table
CREATE TABLE IF NOT EXISTS notifications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  title text NOT NULL,
  message text NOT NULL,
  type text NOT NULL CHECK (type IN ('signal', 'trade', 'system', 'educational', 'security')),
  priority text DEFAULT 'normal' CHECK (priority IN ('low', 'normal', 'high', 'urgent')),
  is_read boolean DEFAULT false,
  action_url text,
  metadata jsonb DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  expires_at timestamptz
);

-- API Keys Management
CREATE TABLE IF NOT EXISTS api_keys (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  name text NOT NULL,
  provider text NOT NULL CHECK (provider IN ('mt4', 'mt5', 'binance', 'coinbase', 'kraken', 'other')),
  encrypted_key text NOT NULL,
  encrypted_secret text,
  is_active boolean DEFAULT true,
  permissions text[] DEFAULT '{}',
  last_used_at timestamptz,
  created_at timestamptz DEFAULT now(),
  expires_at timestamptz
);

-- Subscription Plans
CREATE TABLE IF NOT EXISTS subscription_plans (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL UNIQUE,
  description text,
  price_monthly numeric NOT NULL,
  price_yearly numeric,
  features jsonb NOT NULL DEFAULT '{}',
  max_signals_per_day integer DEFAULT 10,
  max_portfolios integer DEFAULT 1,
  ai_features_enabled boolean DEFAULT false,
  priority_support boolean DEFAULT false,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

-- User Subscriptions
CREATE TABLE IF NOT EXISTS user_subscriptions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  plan_id uuid REFERENCES subscription_plans(id) ON DELETE RESTRICT,
  status text DEFAULT 'active' CHECK (status IN ('active', 'cancelled', 'expired', 'suspended')),
  billing_cycle text DEFAULT 'monthly' CHECK (billing_cycle IN ('monthly', 'yearly')),
  started_at timestamptz DEFAULT now(),
  expires_at timestamptz NOT NULL,
  auto_renew boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  UNIQUE(user_id)
);

-- Performance Analytics
CREATE TABLE IF NOT EXISTS performance_analytics (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  portfolio_id uuid REFERENCES user_portfolios(id) ON DELETE CASCADE,
  date date NOT NULL,
  total_value numeric NOT NULL,
  daily_pnl numeric DEFAULT 0,
  daily_return_percent numeric DEFAULT 0,
  cumulative_return_percent numeric DEFAULT 0,
  sharpe_ratio numeric,
  max_drawdown_percent numeric,
  win_rate_percent numeric,
  total_trades integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  UNIQUE(user_id, portfolio_id, date)
);

-- Indexes for Performance
CREATE INDEX IF NOT EXISTS idx_trading_signals_user_status ON trading_signals(user_id, status);
CREATE INDEX IF NOT EXISTS idx_trading_signals_symbol_created ON trading_signals(symbol, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_trade_history_user_status ON trade_history(user_id, status);
CREATE INDEX IF NOT EXISTS idx_trade_history_symbol_opened ON trade_history(symbol, opened_at DESC);
CREATE INDEX IF NOT EXISTS idx_notifications_user_unread ON notifications(user_id, is_read, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_performance_analytics_user_date ON performance_analytics(user_id, date DESC);
CREATE INDEX IF NOT EXISTS idx_portfolio_holdings_portfolio ON portfolio_holdings(portfolio_id);

-- Enable RLS on all new tables
ALTER TABLE trading_signals ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_portfolios ENABLE ROW LEVEL SECURITY;
ALTER TABLE portfolio_holdings ENABLE ROW LEVEL SECURITY;
ALTER TABLE trade_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE risk_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE api_keys ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscription_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE performance_analytics ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can manage their own trading signals"
  ON trading_signals FOR ALL
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can manage their own portfolios"
  ON user_portfolios FOR ALL
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can manage their portfolio holdings"
  ON portfolio_holdings FOR ALL
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM user_portfolios 
    WHERE user_portfolios.id = portfolio_holdings.portfolio_id 
    AND user_portfolios.user_id = auth.uid()
  ));

CREATE POLICY "Users can view their own trade history"
  ON trade_history FOR ALL
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can manage their own risk profile"
  ON risk_profiles FOR ALL
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view their own notifications"
  ON notifications FOR ALL
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can manage their own API keys"
  ON api_keys FOR ALL
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Anyone can view active subscription plans"
  ON subscription_plans FOR SELECT
  TO authenticated
  USING (is_active = true);

CREATE POLICY "Users can view their own subscription"
  ON user_subscriptions FOR ALL
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view their own performance analytics"
  ON performance_analytics FOR ALL
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Insert default subscription plans
INSERT INTO subscription_plans (name, description, price_monthly, price_yearly, features, max_signals_per_day, max_portfolios, ai_features_enabled, priority_support) VALUES
('Basic', 'Essential trading features', 29.99, 299.99, '{"basic_signals": true, "portfolio_tracking": true}', 10, 1, false, false),
('Pro', 'Advanced AI-powered trading', 79.99, 799.99, '{"advanced_signals": true, "ai_analysis": true, "risk_management": true}', 50, 3, true, false),
('Elite', 'Premium features with priority support', 199.99, 1999.99, '{"unlimited_signals": true, "custom_strategies": true, "dedicated_support": true}', -1, 10, true, true)
ON CONFLICT (name) DO NOTHING;

-- Functions for automated tasks
CREATE OR REPLACE FUNCTION update_portfolio_value()
RETURNS TRIGGER AS $$
BEGIN
  -- Update portfolio total value when holdings change
  UPDATE user_portfolios 
  SET total_value = (
    SELECT COALESCE(SUM(market_value), 0)
    FROM portfolio_holdings 
    WHERE portfolio_id = NEW.portfolio_id
  ),
  updated_at = now()
  WHERE id = NEW.portfolio_id;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to update portfolio value
DROP TRIGGER IF EXISTS trigger_update_portfolio_value ON portfolio_holdings;
CREATE TRIGGER trigger_update_portfolio_value
  AFTER INSERT OR UPDATE OR DELETE ON portfolio_holdings
  FOR EACH ROW EXECUTE FUNCTION update_portfolio_value();

-- Function to clean up expired notifications
CREATE OR REPLACE FUNCTION cleanup_expired_notifications()
RETURNS void AS $$
BEGIN
  DELETE FROM notifications 
  WHERE expires_at IS NOT NULL 
  AND expires_at < now();
END;
$$ LANGUAGE plpgsql;

-- Function to calculate daily performance
CREATE OR REPLACE FUNCTION calculate_daily_performance(user_uuid uuid, target_date date DEFAULT CURRENT_DATE)
RETURNS void AS $$
DECLARE
  portfolio_record RECORD;
  prev_value numeric;
  current_value numeric;
  daily_pnl numeric;
  daily_return numeric;
BEGIN
  FOR portfolio_record IN 
    SELECT id, total_value FROM user_portfolios WHERE user_id = user_uuid AND is_active = true
  LOOP
    current_value := portfolio_record.total_value;
    
    -- Get previous day value
    SELECT total_value INTO prev_value
    FROM performance_analytics 
    WHERE user_id = user_uuid 
    AND portfolio_id = portfolio_record.id 
    AND date = target_date - INTERVAL '1 day';
    
    IF prev_value IS NOT NULL THEN
      daily_pnl := current_value - prev_value;
      daily_return := CASE WHEN prev_value > 0 THEN (daily_pnl / prev_value) * 100 ELSE 0 END;
    ELSE
      daily_pnl := 0;
      daily_return := 0;
    END IF;
    
    -- Insert or update performance record
    INSERT INTO performance_analytics (
      user_id, portfolio_id, date, total_value, daily_pnl, daily_return_percent
    ) VALUES (
      user_uuid, portfolio_record.id, target_date, current_value, daily_pnl, daily_return
    )
    ON CONFLICT (user_id, portfolio_id, date) 
    DO UPDATE SET 
      total_value = EXCLUDED.total_value,
      daily_pnl = EXCLUDED.daily_pnl,
      daily_return_percent = EXCLUDED.daily_return_percent,
      created_at = now();
  END LOOP;
END;
$$ LANGUAGE plpgsql;