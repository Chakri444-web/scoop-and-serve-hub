export interface IceCream {
  id: string;
  name: string;
  description: string | null;
  price: number;
  image_url: string | null;
  stock: number;
  category: string | null;
  featured: boolean;
  created_at: string;
  updated_at: string;
}

export interface CartItem {
  icecream: IceCream;
  quantity: number;
}

export interface Order {
  id: string;
  user_id: string | null;
  full_name: string;
  email: string;
  address: string;
  phone: string | null;
  total_amount: number;
  status: string;
  created_at: string;
}

export interface OrderItem {
  id: string;
  order_id: string;
  icecream_id: string | null;
  icecream_name: string;
  quantity: number;
  price: number;
  created_at: string;
}

export interface Profile {
  id: string;
  email: string;
  full_name: string | null;
  avatar_url: string | null;
  created_at: string;
}
