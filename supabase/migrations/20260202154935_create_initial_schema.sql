/*
  # CN Doors and Windows - Initial Schema

  ## New Tables
  
  ### products
  - `id` (uuid, primary key) - Unique identifier for each product
  - `name` (text) - Product name
  - `category` (text) - Product category (steel_doors, upvc_doors, upvc_windows)
  - `description` (text) - Detailed product description
  - `features` (text[]) - Array of product features
  - `image_url` (text) - Product image URL
  - `price_range` (text) - Price range or starting price
  - `is_featured` (boolean) - Whether to feature on homepage
  - `created_at` (timestamptz) - Creation timestamp
  
  ### inquiries
  - `id` (uuid, primary key) - Unique identifier for each inquiry
  - `name` (text) - Customer name
  - `email` (text) - Customer email
  - `phone` (text) - Customer phone number
  - `message` (text) - Inquiry message
  - `product_interest` (text) - Product category of interest
  - `status` (text) - Inquiry status (new, contacted, completed)
  - `created_at` (timestamptz) - Creation timestamp
  
  ### testimonials
  - `id` (uuid, primary key) - Unique identifier for each testimonial
  - `customer_name` (text) - Customer name
  - `content` (text) - Testimonial content
  - `rating` (int) - Rating out of 5
  - `location` (text) - Customer location
  - `created_at` (timestamptz) - Creation timestamp

  ## Security
  - Enable RLS on all tables
  - Products and testimonials are publicly readable
  - Inquiries can only be inserted by public, read by authenticated users
*/

-- Create products table
CREATE TABLE IF NOT EXISTS products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  category text NOT NULL CHECK (category IN ('steel_doors', 'upvc_doors', 'upvc_windows')),
  description text NOT NULL,
  features text[] DEFAULT '{}',
  image_url text,
  price_range text,
  is_featured boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- Create inquiries table
CREATE TABLE IF NOT EXISTS inquiries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  message text NOT NULL,
  product_interest text,
  status text DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'completed')),
  created_at timestamptz DEFAULT now()
);

-- Create testimonials table
CREATE TABLE IF NOT EXISTS testimonials (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_name text NOT NULL,
  content text NOT NULL,
  rating int NOT NULL CHECK (rating >= 1 AND rating <= 5),
  location text,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;

-- Products policies (public read)
CREATE POLICY "Products are publicly readable"
  ON products FOR SELECT
  TO anon
  USING (true);

-- Inquiries policies (public insert, authenticated read)
CREATE POLICY "Anyone can submit inquiries"
  ON inquiries FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Authenticated users can read inquiries"
  ON inquiries FOR SELECT
  TO authenticated
  USING (true);

-- Testimonials policies (public read)
CREATE POLICY "Testimonials are publicly readable"
  ON testimonials FOR SELECT
  TO anon
  USING (true);

-- Insert sample products
INSERT INTO products (name, category, description, features, image_url, price_range, is_featured) VALUES
  (
    'Premium Steel Security Door',
    'steel_doors',
    'Heavy-duty steel door with advanced security features, perfect for main entrances.',
    ARRAY['16-gauge steel construction', 'Multi-point locking system', 'Weather resistant coating', 'Customizable design options', '10-year warranty'],
    'https://images.pexels.com/photos/277559/pexels-photo-277559.jpeg?auto=compress&cs=tinysrgb&w=800',
    'Starting from ₹25,000',
    true
  ),
  (
    'Modern Steel Entry Door',
    'steel_doors',
    'Sleek and contemporary steel door design for modern homes and offices.',
    ARRAY['Powder-coated finish', 'Energy efficient', 'Sound insulation', 'Easy maintenance', '5-year warranty'],
    'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=800',
    'Starting from ₹20,000',
    false
  ),
  (
    'UPVC French Doors',
    'upvc_doors',
    'Elegant double-panel UPVC doors bringing natural light into your space.',
    ARRAY['Double glazed glass', 'Thermal insulation', 'Low maintenance', 'Weather proof seals', '15-year warranty'],
    'https://images.pexels.com/photos/1643389/pexels-photo-1643389.jpeg?auto=compress&cs=tinysrgb&w=800',
    'Starting from ₹35,000',
    true
  ),
  (
    'UPVC Sliding Door',
    'upvc_doors',
    'Space-saving sliding door system with smooth operation.',
    ARRAY['Multi-chamber profile', 'Stainless steel rollers', 'Anti-dust brush', 'Mosquito mesh option', '12-year warranty'],
    'https://images.pexels.com/photos/534172/pexels-photo-534172.jpeg?auto=compress&cs=tinysrgb&w=800',
    'Starting from ₹30,000',
    false
  ),
  (
    'UPVC Casement Window',
    'upvc_windows',
    'Classic side-hung windows offering excellent ventilation and views.',
    ARRAY['Multi-point locking', 'Double glazed option', 'Tilt and turn mechanism', 'UV resistant', '15-year warranty'],
    'https://images.pexels.com/photos/2724749/pexels-photo-2724749.jpeg?auto=compress&cs=tinysrgb&w=800',
    'Starting from ₹8,000',
    true
  ),
  (
    'UPVC Sliding Window',
    'upvc_windows',
    'Horizontal sliding windows perfect for modern architecture.',
    ARRAY['Smooth operation', 'Space efficient', 'Weather sealing', 'Easy to clean', '12-year warranty'],
    'https://images.pexels.com/photos/1080696/pexels-photo-1080696.jpeg?auto=compress&cs=tinysrgb&w=800',
    'Starting from ₹7,000',
    false
  );

-- Insert sample testimonials
INSERT INTO testimonials (customer_name, content, rating, location) VALUES
  (
    'Rajesh Kumar',
    'Excellent quality steel doors! The installation team was professional and completed the work on time. Very satisfied with the security features.',
    5,
    'Mumbai'
  ),
  (
    'Priya Sharma',
    'The UPVC windows have made a huge difference in reducing outside noise. Great product quality and reasonable pricing.',
    5,
    'Pune'
  ),
  (
    'Amit Patel',
    'Professional service from start to finish. The UPVC doors look amazing and the thermal insulation is excellent.',
    4,
    'Ahmedabad'
  );