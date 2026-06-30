export type PropertyCategory = 'apartment' | 'house' | 'condo' | 'land';

export interface Property {
  id: number;
  title: string;
  slug: string;
  address: string;
  neighborhood: string;
  city: string;
  state: string;
  price: number;
  type: 'sale' | 'rent';
  category: PropertyCategory;
  bedrooms: number;
  bathrooms: number;
  parkingSpots: number;
  area: number;
  imageUrl: string;
  images: string[];
  description: string;
  furnished: boolean;
  petFriendly: boolean;
  lat: number;
  lng: number;
}
