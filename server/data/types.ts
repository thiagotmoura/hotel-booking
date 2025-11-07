export interface RoomAmenity {
  icon: string
  name: string
  description?: string
}

export interface Room {
  id: number
  name: string
  category: string
  description: string
  price: number
  capacity: number
  beds: {
    type: 'king' | 'queen' | 'single' | 'double' | 'sofa_bed'
    quantity: number
  }[]
  amenities: RoomAmenity[]
  images: string[]
}

export interface Address {
  street: string
  number: string
  neighborhood: string
  city: string
  state: string
  country: string
  zipCode: string
  coordinates: {
    latitude: number
    longitude: number
  }
}

export interface Hotel {
  id: number
  name: string
  rating: number
  description: string
  mainImage: string
  address: Address
  images: string[]
  amenities: RoomAmenity[]
  rooms: Room[]
}