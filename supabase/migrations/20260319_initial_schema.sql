-- Enums
CREATE TYPE stamp_category_enum AS ENUM ('polymer', 'pre_ink', 'self_ink');
CREATE TYPE delivery_type_enum AS ENUM ('pickup', 'delivery');
CREATE TYPE order_status_enum AS ENUM (
  'new', 'in_progress', 'proof_sent', 'approved',
  'paid', 'shipped', 'delivered', 'cancelled'
);

-- Orders table
CREATE TABLE orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_number text UNIQUE NOT NULL,
  customer_name text NOT NULL CHECK (char_length(customer_name) > 0),
  customer_phone text NOT NULL CHECK (char_length(customer_phone) >= 10),
  customer_email text,
  stamp_category stamp_category_enum NOT NULL,
  stamp_type text NOT NULL CHECK (char_length(stamp_type) > 0),
  stamp_text text NOT NULL CHECK (char_length(stamp_text) > 0),
  quantity integer NOT NULL DEFAULT 1 CHECK (quantity > 0),
  delivery_type delivery_type_enum NOT NULL,
  delivery_address text CHECK (
    delivery_type = 'pickup' OR (delivery_type = 'delivery' AND delivery_address IS NOT NULL AND char_length(delivery_address) > 0)
  ),
  status order_status_enum NOT NULL DEFAULT 'new',
  amount numeric CHECK (amount IS NULL OR amount > 0),
  notes text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Indexes
CREATE INDEX idx_orders_status ON orders (status);
CREATE INDEX idx_orders_created_at ON orders (created_at DESC);
CREATE INDEX idx_orders_customer_phone ON orders (customer_phone);

-- Order number sequence and trigger
CREATE SEQUENCE order_number_seq START 1;

CREATE OR REPLACE FUNCTION generate_order_number()
RETURNS TRIGGER AS $$
BEGIN
  NEW.order_number := 'PM-' || to_char(now(), 'YYYYMMDD') || '-' || lpad(nextval('order_number_seq')::text, 4, '0');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_order_number
  BEFORE INSERT ON orders
  FOR EACH ROW EXECUTE FUNCTION generate_order_number();

-- Updated at trigger
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER orders_updated_at
  BEFORE UPDATE ON orders
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- Status transition validation
CREATE OR REPLACE FUNCTION validate_status_transition()
RETURNS TRIGGER AS $$
BEGIN
  IF OLD.status = NEW.status THEN RETURN NEW; END IF;
  IF OLD.status = 'delivered' OR OLD.status = 'cancelled' THEN
    RAISE EXCEPTION 'Cannot change status from %', OLD.status;
  END IF;
  IF NEW.status = 'cancelled' AND OLD.status NOT IN ('new','in_progress','proof_sent','approved','paid') THEN
    RAISE EXCEPTION 'Cannot cancel order in status %', OLD.status;
  END IF;
  IF NEW.status != 'cancelled' THEN
    CASE OLD.status
      WHEN 'new' THEN IF NEW.status != 'in_progress' THEN RAISE EXCEPTION 'Invalid transition'; END IF;
      WHEN 'in_progress' THEN IF NEW.status != 'proof_sent' THEN RAISE EXCEPTION 'Invalid transition'; END IF;
      WHEN 'proof_sent' THEN IF NEW.status != 'approved' THEN RAISE EXCEPTION 'Invalid transition'; END IF;
      WHEN 'approved' THEN IF NEW.status != 'paid' THEN RAISE EXCEPTION 'Invalid transition'; END IF;
      WHEN 'paid' THEN IF NEW.status != 'shipped' THEN RAISE EXCEPTION 'Invalid transition'; END IF;
      WHEN 'shipped' THEN IF NEW.status != 'delivered' THEN RAISE EXCEPTION 'Invalid transition'; END IF;
      ELSE RAISE EXCEPTION 'Invalid transition from %', OLD.status;
    END CASE;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER validate_order_status
  BEFORE UPDATE OF status ON orders
  FOR EACH ROW EXECUTE FUNCTION validate_status_transition();

-- Row Level Security
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Owner can view all orders"
  ON orders FOR SELECT TO authenticated USING (true);

CREATE POLICY "Owner can update orders"
  ON orders FOR UPDATE TO authenticated USING (true) WITH CHECK (true);

-- Rate limiting table
CREATE TABLE order_rate_limits (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  ip_address text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX idx_rate_limits_ip_created ON order_rate_limits (ip_address, created_at);

ALTER TABLE order_rate_limits ENABLE ROW LEVEL SECURITY;
