export interface Property {
  idOwner: string;
  name: string;
  address: string;
  price: number;
  image: string;
}

export interface PropertyQuery {
  name?: string;
  address?: string;
  minPrice?: number;
  maxPrice?: number;
}
