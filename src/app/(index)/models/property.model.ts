export interface Property {
  id: string;
  idOwner: string;
  name: string;
  address: string;
  price: number;
  codeInternal: string;
  year: number;
  image: string;
  images: PropertyImage[];
}

export interface PropertyImage {
  id: string;
  file: string;
  enabled: boolean;
}

export interface PropertyQuery {
  name?: string;
  address?: string;
  minPrice?: number;
  maxPrice?: number;
}
