import { Injectable, signal } from '@angular/core';

export interface Property {
  id: number;
  title: string;
  address: string;
  price: number;
  type: 'sale' | 'rent';
  bedrooms: number;
  bathrooms: number;
  parkingSpots: number;
  area: number;
  imageUrl: string;
  furnished: boolean;
  petFriendly: boolean;
}

@Injectable({ providedIn: 'root' })
export class PropertiesService {
  public readonly searchQuery = signal('');
  public readonly propertyType = signal<'all' | 'sale' | 'rent'>('all');
  public readonly furnished = signal(false);
  public readonly petFriendly = signal(false);
  public readonly parkingSpot = signal(false);

  public readonly properties: Property[] = [
    {
      id: 1,
      title: 'Modern Apartment with Ocean View',
      address: 'Barra da Tijuca, Rio de Janeiro',
      price: 850000,
      type: 'sale',
      bedrooms: 3,
      bathrooms: 2,
      parkingSpots: 2,
      area: 120,
      imageUrl: 'https://picsum.photos/seed/apartment1/600/400',
      furnished: true,
      petFriendly: false,
    },
    {
      id: 2,
      title: 'Cozy Studio Near Metro',
      address: 'Vila Madalena, São Paulo',
      price: 2500,
      type: 'rent',
      bedrooms: 1,
      bathrooms: 1,
      parkingSpots: 0,
      area: 45,
      imageUrl: 'https://picsum.photos/seed/studio2/600/400',
      furnished: true,
      petFriendly: true,
    },
    {
      id: 3,
      title: 'Spacious Family House',
      address: 'Alphaville, Barueri',
      price: 1200000,
      type: 'sale',
      bedrooms: 4,
      bathrooms: 3,
      parkingSpots: 3,
      area: 250,
      imageUrl: 'https://picsum.photos/seed/house3/600/400',
      furnished: false,
      petFriendly: true,
    },
    {
      id: 4,
      title: 'Penthouse with Rooftop',
      address: 'Itaim Bibi, São Paulo',
      price: 8000,
      type: 'rent',
      bedrooms: 2,
      bathrooms: 2,
      parkingSpots: 2,
      area: 95,
      imageUrl: 'https://picsum.photos/seed/penthouse4/600/400',
      furnished: true,
      petFriendly: false,
    },
    {
      id: 5,
      title: 'Beachfront Condo',
      address: 'Copacabana, Rio de Janeiro',
      price: 670000,
      type: 'sale',
      bedrooms: 2,
      bathrooms: 1,
      parkingSpots: 1,
      area: 75,
      imageUrl: 'https://picsum.photos/seed/condo5/600/400',
      furnished: false,
      petFriendly: false,
    },
    {
      id: 6,
      title: 'Garden Loft Pet Friendly',
      address: 'Pinheiros, São Paulo',
      price: 3200,
      type: 'rent',
      bedrooms: 1,
      bathrooms: 1,
      parkingSpots: 1,
      area: 60,
      imageUrl: 'https://picsum.photos/seed/loft6/600/400',
      furnished: true,
      petFriendly: true,
    },
  ];

  public get filteredProperties(): Property[] {
    return this.properties.filter((p) => {
      if (this.propertyType() !== 'all' && p.type !== this.propertyType()) return false;
      if (this.furnished() && !p.furnished) return false;
      if (this.petFriendly() && !p.petFriendly) return false;
      if (this.parkingSpot() && p.parkingSpots === 0) return false;
      if (this.searchQuery()) {
        const q = this.searchQuery().toLowerCase();
        if (!p.title.toLowerCase().includes(q) && !p.address.toLowerCase().includes(q)) return false;
      }
      return true;
    });
  }

  public formatPrice(price: number, type: 'sale' | 'rent'): string {
    const formatted = price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    return type === 'rent' ? `${formatted}/mês` : formatted;
  }
}
