/*
  # Initial Schema for Ctrl + Alt + Garage

  1. Core Tables
    - `customers` - Customer information
    - `leads` - Lead tracking and management
    - `quotes` - Quote generation and tracking
    - `appointments` - Scheduling and appointments
    - `technicians` - Technician information and skills
    - `inventory_items` - Inventory management
    
  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
*/

-- Create customers table
CREATE TABLE IF NOT EXISTS customers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz DEFAULT now(),
  email text UNIQUE NOT NULL,
  name text NOT NULL,
  phone text NOT NULL,
  address text NOT NULL,
  city text NOT NULL,
  state text NOT NULL,
  zip text NOT NULL,
  notes text
);

-- Create leads table
CREATE TABLE IF NOT EXISTS leads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz DEFAULT now(),
  customer_id uuid REFERENCES customers(id),
  status text NOT NULL,
  source text NOT NULL,
  service_type text NOT NULL,
  door_type text,
  door_size text,
  notes text,
  expected_value numeric,
  assigned_to uuid
);

-- Create quotes table
CREATE TABLE IF NOT EXISTS quotes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz DEFAULT now(),
  lead_id uuid REFERENCES leads(id),
  amount numeric NOT NULL,
  status text NOT NULL,
  valid_until timestamptz NOT NULL,
  items jsonb NOT NULL,
  notes text
);

-- Create technicians table
CREATE TABLE IF NOT EXISTS technicians (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  skills text[] NOT NULL,
  status text NOT NULL,
  current_location jsonb
);

-- Create appointments table
CREATE TABLE IF NOT EXISTS appointments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz DEFAULT now(),
  customer_id uuid REFERENCES customers(id),
  lead_id uuid REFERENCES leads(id),
  technician_id uuid REFERENCES technicians(id),
  start_time timestamptz NOT NULL,
  end_time timestamptz NOT NULL,
  status text NOT NULL,
  service_type text NOT NULL,
  notes text,
  location text NOT NULL
);

-- Create inventory items table
CREATE TABLE IF NOT EXISTS inventory_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz DEFAULT now(),
  name text NOT NULL,
  sku text UNIQUE NOT NULL,
  category text NOT NULL,
  quantity integer NOT NULL DEFAULT 0,
  unit_price numeric NOT NULL,
  location text NOT NULL,
  reorder_point integer NOT NULL DEFAULT 5,
  supplier_id uuid
);

-- Enable Row Level Security
ALTER TABLE customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE quotes ENABLE ROW LEVEL SECURITY;
ALTER TABLE technicians ENABLE ROW LEVEL SECURITY;
ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE inventory_items ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Authenticated users can read customers"
  ON customers
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert customers"
  ON customers
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update customers"
  ON customers
  FOR UPDATE
  TO authenticated
  USING (true);

-- Similar policies for other tables
CREATE POLICY "Authenticated users can read leads"
  ON leads
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert leads"
  ON leads
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update leads"
  ON leads
  FOR UPDATE
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can read quotes"
  ON quotes
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert quotes"
  ON quotes
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update quotes"
  ON quotes
  FOR UPDATE
  TO authenticated
  USING (true);

-- Add indices for performance
CREATE INDEX customers_email_idx ON customers(email);
CREATE INDEX leads_customer_id_idx ON leads(customer_id);
CREATE INDEX quotes_lead_id_idx ON quotes(lead_id);
CREATE INDEX appointments_technician_id_idx ON appointments(technician_id);
CREATE INDEX appointments_start_time_idx ON appointments(start_time);