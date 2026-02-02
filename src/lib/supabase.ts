import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Product = {
  id: string;
  name: string;
  category: 'steel_doors' | 'upvc_doors' | 'upvc_windows';
  description: string;
  features: string[];
  image_url: string | null;
  price_range: string | null;
  is_featured: boolean;
  created_at: string;
};

export type Inquiry = {
  id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  product_interest: string | null;
  status: 'new' | 'contacted' | 'completed';
  created_at: string;
};

export type Testimonial = {
  id: string;
  customer_name: string;
  content: string;
  rating: number;
  location: string | null;
  created_at: string;
};
