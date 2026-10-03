export type ProductRecord = {
  name: string;
  slug: string;
  category: string;
  description: string;
  price: number;
  original_price?: number;
  rating?: number;
  stock?: number;
  featured?: boolean;
  status: 'draft' | 'published' | 'archived';
  tags: string[];
  variant_name?: string;
  authorized_to_sell: boolean;
};
