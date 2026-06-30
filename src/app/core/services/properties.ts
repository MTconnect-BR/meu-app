import { Injectable, signal, computed, debounced } from '@angular/core';
import { Property, PropertyCategory } from '../models/property.model';

export type { Property, PropertyCategory };

const STORAGE_KEY = 'meu_app_custom_properties';

@Injectable({ providedIn: 'root' })
export class PropertiesService {
  public readonly searchQuery = signal('');
  private readonly _debouncedQuery = debounced(this.searchQuery, 300);
  public readonly propertyType = signal<'all' | 'sale' | 'rent'>('all');
  public readonly selectedTypes = signal<string[]>([]);
  public readonly selectedAmenities = signal<string[]>([]);

  public readonly activeFilterCount = computed(() =>
    this.selectedTypes().length + this.selectedAmenities().length
  );

  private readonly _description = 'Este imóvel impressionante oferece um espaço moderno e confortável com acabamentos de primeira. Localizado em uma área privilegiada com fácil acesso a restaurantes, lojas e transporte público. O imóvel possui amplos cômodos, abundância de luz natural e uma distribuição funcional perfeita para famílias ou profissionais.';

  public readonly mockProperties: Property[] = [
    {
      id: 1,
      title: 'Apartamento Moderno com Vista para o Mar',
      slug: 'venda-apartamento-3-quartos-barra-da-tijuca-rj-120m2-id-1',
      address: 'Barra da Tijuca, Rio de Janeiro',
      neighborhood: 'Barra da Tijuca',
      city: 'Rio de Janeiro',
      state: 'RJ',
      price: 850000,
      type: 'sale',
      category: 'apartment',
      bedrooms: 3,
      bathrooms: 2,
      parkingSpots: 2,
      area: 120,
      imageUrl: 'https://picsum.photos/seed/apt1/600/400',
      images: ['https://picsum.photos/seed/apt1a/800/600', 'https://picsum.photos/seed/apt1b/800/600', 'https://picsum.photos/seed/apt1c/800/600', 'https://picsum.photos/seed/apt1d/800/600'],
      description: this._description,
      furnished: true,
      petFriendly: false,
      lat: -23.0068,
      lng: -43.3654,
    },
    {
      id: 2,
      title: 'Estúdio Acolhedor perto do Metrô',
      slug: 'aluguel-estudio-1-quarto-vila-madalena-sp-45m2-id-2',
      address: 'Vila Madalena, São Paulo',
      neighborhood: 'Vila Madalena',
      city: 'São Paulo',
      state: 'SP',
      price: 2500,
      type: 'rent',
      category: 'apartment',
      bedrooms: 1,
      bathrooms: 1,
      parkingSpots: 0,
      area: 45,
      imageUrl: 'https://picsum.photos/seed/studio2/600/400',
      images: ['https://picsum.photos/seed/studio2a/800/600', 'https://picsum.photos/seed/studio2b/800/600', 'https://picsum.photos/seed/studio2c/800/600'],
      description: this._description,
      furnished: true,
      petFriendly: true,
      lat: -23.5558,
      lng: -46.6918,
    },
    {
      id: 3,
      title: 'Casa Amplia para Família',
      slug: 'venda-casa-4-quartos-alphaville-barueri-250m2-id-3',
      address: 'Alphaville, Barueri',
      neighborhood: 'Alphaville',
      city: 'Barueri',
      state: 'SP',
      price: 1200000,
      type: 'sale',
      category: 'house',
      bedrooms: 4,
      bathrooms: 3,
      parkingSpots: 3,
      area: 250,
      imageUrl: 'https://picsum.photos/seed/house3/600/400',
      images: ['https://picsum.photos/seed/house3a/800/600', 'https://picsum.photos/seed/house3b/800/600', 'https://picsum.photos/seed/house3c/800/600', 'https://picsum.photos/seed/house3d/800/600', 'https://picsum.photos/seed/house3e/800/600'],
      description: this._description,
      furnished: false,
      petFriendly: true,
      lat: -23.4815,
      lng: -46.8537,
    },
    {
      id: 4,
      title: 'Penthouse com Terraço',
      slug: 'aluguel-penthouse-2-quartos-itaim-bibi-sp-95m2-id-4',
      address: 'Itaim Bibi, São Paulo',
      neighborhood: 'Itaim Bibi',
      city: 'São Paulo',
      state: 'SP',
      price: 8000,
      type: 'rent',
      category: 'apartment',
      bedrooms: 2,
      bathrooms: 2,
      parkingSpots: 2,
      area: 95,
      imageUrl: 'https://picsum.photos/seed/penthouse4/600/400',
      images: ['https://picsum.photos/seed/penthouse4a/800/600', 'https://picsum.photos/seed/penthouse4b/800/600', 'https://picsum.photos/seed/penthouse4c/800/600'],
      description: this._description,
      furnished: true,
      petFriendly: false,
      lat: -23.5818,
      lng: -46.6847,
    },
    {
      id: 5,
      title: 'Condomínio na Beira da Praia',
      slug: 'venda-condominio-2-quartos-copacabana-rj-75m2-id-5',
      address: 'Copacabana, Rio de Janeiro',
      neighborhood: 'Copacabana',
      city: 'Rio de Janeiro',
      state: 'RJ',
      price: 670000,
      type: 'sale',
      category: 'condo',
      bedrooms: 2,
      bathrooms: 1,
      parkingSpots: 1,
      area: 75,
      imageUrl: 'https://picsum.photos/seed/condo5/600/400',
      images: ['https://picsum.photos/seed/condo5a/800/600', 'https://picsum.photos/seed/condo5b/800/600', 'https://picsum.photos/seed/condo5c/800/600'],
      description: this._description,
      furnished: false,
      petFriendly: false,
      lat: -22.9711,
      lng: -43.1822,
    },
    {
      id: 6,
      title: 'Loft com Jardim Pet Friendly',
      slug: 'aluguel-loft-1-quarto-pinheiros-sp-60m2-id-6',
      address: 'Pinheiros, São Paulo',
      neighborhood: 'Pinheiros',
      city: 'São Paulo',
      state: 'SP',
      price: 3200,
      type: 'rent',
      category: 'apartment',
      bedrooms: 1,
      bathrooms: 1,
      parkingSpots: 1,
      area: 60,
      imageUrl: 'https://picsum.photos/seed/loft6/600/400',
      images: ['https://picsum.photos/seed/loft6a/800/600', 'https://picsum.photos/seed/loft6b/800/600', 'https://picsum.photos/seed/loft6c/800/600'],
      description: this._description,
      furnished: true,
      petFriendly: true,
      lat: -23.5613,
      lng: -46.6918,
    },
    {
      id: 7,
      title: 'Villa de Luxo com Piscina',
      slug: 'venda-casa-5-quartos-maringa-pr-350m2-id-7',
      address: 'Maringá, Paraná',
      neighborhood: 'Zona Nova',
      city: 'Maringá',
      state: 'PR',
      price: 1800000,
      type: 'sale',
      category: 'house',
      bedrooms: 5,
      bathrooms: 4,
      parkingSpots: 4,
      area: 350,
      imageUrl: 'https://picsum.photos/seed/villa7/600/400',
      images: ['https://picsum.photos/seed/villa7a/800/600', 'https://picsum.photos/seed/villa7b/800/600', 'https://picsum.photos/seed/villa7c/800/600', 'https://picsum.photos/seed/villa7d/800/600'],
      description: this._description,
      furnished: true,
      petFriendly: true,
      lat: -23.421,
      lng: -51.933,
    },
    {
      id: 8,
      title: 'Apartamento Compacto perto da Universidade',
      slug: 'aluguel-apartamento-1-quarto-ufmg-mg-35m2-id-8',
      address: 'Pampulha, Belo Horizonte',
      neighborhood: 'Pampulha',
      city: 'Belo Horizonte',
      state: 'MG',
      price: 1800,
      type: 'rent',
      category: 'apartment',
      bedrooms: 1,
      bathrooms: 1,
      parkingSpots: 0,
      area: 35,
      imageUrl: 'https://picsum.photos/seed/apt8/600/400',
      images: ['https://picsum.photos/seed/apt8a/800/600', 'https://picsum.photos/seed/apt8b/800/600'],
      description: this._description,
      furnished: false,
      petFriendly: false,
      lat: -19.8711,
      lng: -43.9684,
    },
    {
      id: 9,
      title: 'Estúdio no Centro',
      slug: 'venda-estudio-centro-rj-40m2-id-9',
      address: 'Centro, Rio de Janeiro',
      neighborhood: 'Centro',
      city: 'Rio de Janeiro',
      state: 'RJ',
      price: 320000,
      type: 'sale',
      category: 'apartment',
      bedrooms: 1,
      bathrooms: 1,
      parkingSpots: 1,
      area: 40,
      imageUrl: 'https://picsum.photos/seed/loft9/600/400',
      images: ['https://picsum.photos/seed/loft9a/800/600', 'https://picsum.photos/seed/loft9b/800/600', 'https://picsum.photos/seed/loft9c/800/600'],
      description: this._description,
      furnished: true,
      petFriendly: false,
      lat: -22.9068,
      lng: -43.1729,
    },
    {
      id: 10,
      title: 'Casa Familiar com Jardim',
      slug: 'venda-casa-3-quartos-campinas-sp-180m2-id-10',
      address: 'Jardim das Palmeiras, Campinas',
      neighborhood: 'Jardim das Palmeiras',
      city: 'Campinas',
      state: 'SP',
      price: 750000,
      type: 'sale',
      category: 'house',
      bedrooms: 3,
      bathrooms: 2,
      parkingSpots: 2,
      area: 180,
      imageUrl: 'https://picsum.photos/seed/house10/600/400',
      images: ['https://picsum.photos/seed/house10a/800/600', 'https://picsum.photos/seed/house10b/800/600', 'https://picsum.photos/seed/house10c/800/600', 'https://picsum.photos/seed/house10d/800/600'],
      description: this._description,
      furnished: false,
      petFriendly: true,
      lat: -22.8184,
      lng: -47.0647,
    },
    {
      id: 11,
      title: 'Apartamento Moderno no Distrito Empresarial',
      slug: 'aluguel-apartamento-2-quartos-vila-olimpia-sp-80m2-id-11',
      address: 'Vila Olímpia, São Paulo',
      neighborhood: 'Vila Olímpia',
      city: 'São Paulo',
      state: 'SP',
      price: 4500,
      type: 'rent',
      category: 'apartment',
      bedrooms: 2,
      bathrooms: 2,
      parkingSpots: 1,
      area: 80,
      imageUrl: 'https://picsum.photos/seed/flat11/600/400',
      images: ['https://picsum.photos/seed/flat11a/800/600', 'https://picsum.photos/seed/flat11b/800/600', 'https://picsum.photos/seed/flat11c/800/600'],
      description: this._description,
      furnished: true,
      petFriendly: false,
      lat: -23.5958,
      lng: -46.6847,
    },
    {
      id: 12,
      title: 'Casa Colonial Acolhedora',
      slug: 'venda-casa-3-quartos-santa-maria-sc-200m2-id-12',
      address: 'Centro, Santa Maria',
      neighborhood: 'Centro',
      city: 'Santa Maria',
      state: 'SC',
      price: 520000,
      type: 'sale',
      category: 'house',
      bedrooms: 3,
      bathrooms: 2,
      parkingSpots: 2,
      area: 200,
      imageUrl: 'https://picsum.photos/seed/colonial12/600/400',
      images: ['https://picsum.photos/seed/colonial12a/800/600', 'https://picsum.photos/seed/colonial12b/800/600', 'https://picsum.photos/seed/colonial12c/800/600'],
      description: this._description,
      furnished: false,
      petFriendly: true,
      lat: -29.6842,
      lng: -53.8069,
    },
    {
      id: 13,
      title: 'Estúdio na Praia em Florianópolis',
      slug: 'aluguel-estudio-1-quarto-jurerê-sc-50m2-id-13',
      address: 'Jurerê Internacional, Florianópolis',
      neighborhood: 'Jurerê Internacional',
      city: 'Florianópolis',
      state: 'SC',
      price: 3800,
      type: 'rent',
      category: 'apartment',
      bedrooms: 1,
      bathrooms: 1,
      parkingSpots: 1,
      area: 50,
      imageUrl: 'https://picsum.photos/seed/beach13/600/400',
      images: ['https://picsum.photos/seed/beach13a/800/600', 'https://picsum.photos/seed/beach13b/800/600', 'https://picsum.photos/seed/beach13c/800/600'],
      description: this._description,
      furnished: true,
      petFriendly: false,
      lat: -27.4456,
      lng: -48.5012,
    },
    {
      id: 14,
      title: 'Penthouse em Porto Alegre',
      slug: 'venda-penthouse-3-quartos-moinhos-rs-150m2-id-14',
      address: 'Moinhos de Vento, Porto Alegre',
      neighborhood: 'Moinhos de Vento',
      city: 'Porto Alegre',
      state: 'RS',
      price: 980000,
      type: 'sale',
      category: 'apartment',
      bedrooms: 3,
      bathrooms: 3,
      parkingSpots: 2,
      area: 150,
      imageUrl: 'https://picsum.photos/seed/penthouse14/600/400',
      images: ['https://picsum.photos/seed/penthouse14a/800/600', 'https://picsum.photos/seed/penthouse14b/800/600', 'https://picsum.photos/seed/penthouse14c/800/600', 'https://picsum.photos/seed/penthouse14d/800/600'],
      description: this._description,
      furnished: true,
      petFriendly: true,
      lat: -30.0346,
      lng: -51.2177,
    },
    {
      id: 15,
      title: 'Quarto Simples em Casa Compartilhada',
      slug: 'aluguel-quarto-casa-compartilhada-goiania-go-15m2-id-15',
      address: 'Setor Central, Goiânia',
      neighborhood: 'Setor Central',
      city: 'Goiânia',
      state: 'GO',
      price: 800,
      type: 'rent',
      category: 'house',
      bedrooms: 1,
      bathrooms: 1,
      parkingSpots: 0,
      area: 15,
      imageUrl: 'https://picsum.photos/seed/room15/600/400',
      images: ['https://picsum.photos/seed/room15a/800/600', 'https://picsum.photos/seed/room15b/800/600'],
      description: this._description,
      furnished: true,
      petFriendly: false,
      lat: -16.6869,
      lng: -49.2648,
    },
    {
      id: 16,
      title: 'Apartamento em Obra Nova',
      slug: 'venda-apartamento-novo-2-quartos-fortaleza-ce-90m2-id-16',
      address: 'Aldeota, Fortaleza',
      neighborhood: 'Aldeota',
      city: 'Fortaleza',
      state: 'CE',
      price: 480000,
      type: 'sale',
      category: 'apartment',
      bedrooms: 2,
      bathrooms: 2,
      parkingSpots: 1,
      area: 90,
      imageUrl: 'https://picsum.photos/seed/newapt16/600/400',
      images: ['https://picsum.photos/seed/newapt16a/800/600', 'https://picsum.photos/seed/newapt16b/800/600', 'https://picsum.photos/seed/newapt16c/800/600'],
      description: this._description,
      furnished: false,
      petFriendly: true,
      lat: -3.7327,
      lng: -38.5267,
    },
    {
      id: 17,
      title: 'Estúdio perto da Praia em Recife',
      slug: 'aluguel-estudio-1-quarto-boa-viagem-pe-42m2-id-17',
      address: 'Boa Viagem, Recife',
      neighborhood: 'Boa Viagem',
      city: 'Recife',
      state: 'PE',
      price: 2200,
      type: 'rent',
      category: 'apartment',
      bedrooms: 1,
      bathrooms: 1,
      parkingSpots: 1,
      area: 42,
      imageUrl: 'https://picsum.photos/seed/studio17/600/400',
      images: ['https://picsum.photos/seed/studio17a/800/600', 'https://picsum.photos/seed/studio17b/800/600'],
      description: this._description,
      furnished: true,
      petFriendly: false,
      lat: -8.1208,
      lng: -34.8941,
    },
    {
      id: 18,
      title: 'Casa de Campo com Terreno',
      slug: 'venda-casa-4-quartos-gramado-rs-300m2-id-18',
      address: 'Gramado, Rio Grande do Sul',
      neighborhood: 'Centro',
      city: 'Gramado',
      state: 'RS',
      price: 2100000,
      type: 'sale',
      category: 'house',
      bedrooms: 4,
      bathrooms: 3,
      parkingSpots: 3,
      area: 300,
      imageUrl: 'https://picsum.photos/seed/country18/600/400',
      images: ['https://picsum.photos/seed/country18a/800/600', 'https://picsum.photos/seed/country18b/800/600', 'https://picsum.photos/seed/country18c/800/600', 'https://picsum.photos/seed/country18d/800/600'],
      description: this._description,
      furnished: true,
      petFriendly: true,
      lat: -29.3744,
      lng: -50.8767,
    },
    {
      id: 19,
      title: 'Apartamento Minimalista em Brasília',
      slug: 'aluguel-apartamento-2-quartos-asa-norte-df-70m2-id-19',
      address: 'Asa Norte, Brasília',
      neighborhood: 'Asa Norte',
      city: 'Brasília',
      state: 'DF',
      price: 3500,
      type: 'rent',
      category: 'apartment',
      bedrooms: 2,
      bathrooms: 1,
      parkingSpots: 1,
      area: 70,
      imageUrl: 'https://picsum.photos/seed/minimal19/600/400',
      images: ['https://picsum.photos/seed/minimal19a/800/600', 'https://picsum.photos/seed/minimal19b/800/600', 'https://picsum.photos/seed/minimal19c/800/600'],
      description: this._description,
      furnished: false,
      petFriendly: false,
      lat: -15.7939,
      lng: -47.8828,
    },
    {
      id: 20,
      title: 'Condomínio na Beira-mar em Salvador',
      slug: 'venda-condominio-3-quartos-barra-salvador-ba-110m2-id-20',
      address: 'Barra, Salvador',
      neighborhood: 'Barra',
      city: 'Salvador',
      state: 'BA',
      price: 620000,
      type: 'sale',
      category: 'condo',
      bedrooms: 3,
      bathrooms: 2,
      parkingSpots: 2,
      area: 110,
      imageUrl: 'https://picsum.photos/seed/waterfront20/600/400',
      images: ['https://picsum.photos/seed/waterfront20a/800/600', 'https://picsum.photos/seed/waterfront20b/800/600', 'https://picsum.photos/seed/waterfront20c/800/600'],
      description: this._description,
      furnished: false,
      petFriendly: true,
      lat: -12.9714,
      lng: -38.5014,
    },
  ];

  private _customProperties: Property[] = this._loadFromStorage();

  public get properties(): Property[] {
    return [...this.mockProperties, ...this._customProperties];
  }

  private _nextId(): number {
    const allIds = this.properties.map((p) => p.id);
    return Math.max(0, ...allIds) + 1;
  }

  public create(property: Omit<Property, 'id'>): Property {
    const newProperty: Property = { ...property, id: this._nextId() };
    this._customProperties = [...this._customProperties, newProperty];
    this._saveToStorage();
    return newProperty;
  }

  public update(id: number, changes: Partial<Property>): Property | undefined {
    const idx = this._customProperties.findIndex((p) => p.id === id);
    if (idx !== -1) {
      this._customProperties[idx] = { ...this._customProperties[idx], ...changes, id };
      this._saveToStorage();
      return this._customProperties[idx];
    }
    return undefined;
  }

  public delete(id: number): boolean {
    const before = this._customProperties.length;
    this._customProperties = this._customProperties.filter((p) => p.id !== id);
    if (this._customProperties.length < before) {
      this._saveToStorage();
      return true;
    }
    return false;
  }

  public get forSale(): Property[] {
    return this._applyFilters(this.properties.filter((p) => p.type === 'sale'));
  }

  public get forRent(): Property[] {
    return this._applyFilters(this.properties.filter((p) => p.type === 'rent'));
  }

  public readonly filteredProperties = computed(() => this._applyFilters(this.properties));

  public getById(id: number): Property | undefined {
    return this.properties.find((p) => p.id === id);
  }

  public getBySlug(slug: string): Property | undefined {
    return this.properties.find((p) => p.slug === slug);
  }

  public getSimilar(property: Property, limit = 5): Property[] {
    return this.properties
      .filter((p) => p.id !== property.id && p.type === property.type)
      .slice(0, limit);
  }

  public formatPrice(price: number, type: 'sale' | 'rent'): string {
    const formatted = price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    return type === 'rent' ? `${formatted}/mês` : formatted;
  }

  private _applyFilters(properties: Property[]): Property[] {
    const q = this._debouncedQuery.value().toLowerCase();
    const selectedTypes = this.selectedTypes();
    const selectedAmenities = this.selectedAmenities();
    const statusFilter = this.propertyType();
    return properties.filter((p) => {
      if (statusFilter !== 'all' && p.type !== statusFilter) return false;
      if (selectedTypes.length > 0 && !selectedTypes.includes(p.category)) return false;
      if (selectedAmenities.includes('furnished') && !p.furnished) return false;
      if (selectedAmenities.includes('petFriendly') && !p.petFriendly) return false;
      if (selectedAmenities.includes('parking') && p.parkingSpots === 0) return false;
      if (q) {
        if (!p.title.toLowerCase().includes(q) && !p.address.toLowerCase().includes(q)) return false;
      }
      return true;
    });
  }

  private _loadFromStorage(): Property[] {
    if (typeof window === 'undefined') return [];
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  }

  private _saveToStorage(): void {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this._customProperties));
    } catch {
      // storage full or unavailable
    }
  }
}
