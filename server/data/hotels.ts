import { Hotel } from './types'
import { commonRoomAmenities, hotelAmenities } from './amenities'

export const hotels: Hotel[] = [
  {
    id: 1,
    name: 'Grand Plaza Hotel',
    description: 'Hotel luxuoso no coração da cidade com vista panorâmica',
    rating: 5,
    mainImage: 'https://images.unsplash.com/photo-1566073771259-6a8506099945',
    images: [
      'https://images.unsplash.com/photo-1566073771259-6a8506099945',
      'https://images.unsplash.com/photo-1582719508461-905c673771fd',
      'https://images.unsplash.com/photo-1578683010236-d716f9a3f461'
    ],
    address: {
      street: 'Avenida Paulista',
      number: '1000',
      neighborhood: 'Bela Vista',
      city: 'São Paulo',
      state: 'SP',
      country: 'Brasil',
      zipCode: '01310-100',
      coordinates: {
        latitude: -23.5631940,
        longitude: -46.6565270
      }
    },
    amenities: [
      hotelAmenities[0], // Piscina
      hotelAmenities[1], // Academia
      hotelAmenities[2], // Café da manhã
      hotelAmenities[3], // Estacionamento
      hotelAmenities[6], // Restaurante
      hotelAmenities[7], // Bar
      hotelAmenities[8], // Concierge
      hotelAmenities[9]  // Wi-Fi
    ],
    rooms: [
      {
        id: 1,
        name: 'Quarto Standard',
        description: 'Quarto confortável com 25m²',
        category: 'standard',
        capacity: 2,
        price: 350,
        beds: [
          { type: 'queen', quantity: 1 }
        ],
        amenities: [
          commonRoomAmenities[0], // Banheiro
          commonRoomAmenities[1], // TV
          commonRoomAmenities[2], // Ar condicionado
          commonRoomAmenities[8]  // Frigobar
        ],
        images: [
          'https://images.unsplash.com/photo-1631049307264-da0ec9d70304',
          'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85'
        ]
      },
      {
        id: 2,
        name: 'Quarto Superior',
        description: 'Quarto espaçoso com 35m² e vista para a cidade',
        category: 'superior',
        capacity: 3,
        price: 550,
        beds: [
          { type: 'king', quantity: 1 },
          { type: 'single', quantity: 1 }
        ],
        amenities: [
          ...commonRoomAmenities.slice(0, 5), // Primeiros 5 amenities
          commonRoomAmenities[7] // Área de estar
        ],
        images: [
          'https://images.unsplash.com/photo-1590490360182-c33d57733427',
          'https://images.unsplash.com/photo-1566665797739-1674de7a421a'
        ]
      },
      {
        id: 3,
        name: 'Suíte Luxo',
        description: 'Suíte luxuosa com 50m², vista panorâmica e serviços exclusivos',
        category: 'deluxe',
        capacity: 4,
        price: 950,
        beds: [
          { type: 'king', quantity: 1 },
          { type: 'sofa_bed', quantity: 1 }
        ],
        amenities: commonRoomAmenities, // Todas as amenidades
        images: [
          'https://images.unsplash.com/photo-1578683010236-d716f9a3f461',
          'https://images.unsplash.com/photo-1631049552057-403cdb8f0658'
        ]
      }
    ]
  },
  {
    id: 2,
    name: 'Copacabana Palace',
    description: 'Hotel histórico à beira-mar com serviço de excelência',
    rating: 5,
    mainImage: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4',
    images: [
      'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4',
      'https://images.unsplash.com/photo-1584132967334-10e028bd69f7',
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b'
    ],
    address: {
      street: 'Avenida Atlântica',
      number: '1702',
      neighborhood: 'Copacabana',
      city: 'Rio de Janeiro',
      state: 'RJ',
      country: 'Brasil',
      zipCode: '22021-001',
      coordinates: {
        latitude: -22.9671390,
        longitude: -43.1773880
      }
    },
    amenities: hotelAmenities, // Todas as amenidades do hotel
    rooms: [
      {
        id: 4,
        name: 'Quarto Superior Vista Mar',
        description: 'Quarto com 40m² e vista para o mar de Copacabana',
        category: 'superior',
        capacity: 2,
        price: 1200,
        beds: [
          { type: 'king', quantity: 1 }
        ],
        amenities: [
          ...commonRoomAmenities.slice(0, 8) // Primeiros 8 amenities
        ],
        images: [
          'https://images.unsplash.com/photo-1611892440504-42a792e24d32',
          'https://images.unsplash.com/photo-1618773928121-c32242e63f39'
        ]
      },
      {
        id: 5,
        name: 'Suíte Executiva',
        description: 'Suíte com 60m², varanda e vista para o mar',
        category: 'executive',
        capacity: 3,
        price: 1800,
        beds: [
          { type: 'king', quantity: 1 },
          { type: 'sofa_bed', quantity: 1 }
        ],
        amenities: [
          ...commonRoomAmenities.slice(0, 10) // Primeiros 10 amenities
        ],
        images: [
          'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b',
          'https://images.unsplash.com/photo-1609949434123-10c3d4f7997e'
        ]
      },
      {
        id: 6,
        name: 'Suíte Presidencial',
        description: 'Suíte de luxo com 120m², decoração exclusiva e serviços premium',
        category: 'presidential',
        capacity: 4,
        price: 5000,
        beds: [
          { type: 'king', quantity: 2 },
          { type: 'sofa_bed', quantity: 1 }
        ],
        amenities: commonRoomAmenities, // Todas as amenidades
        images: [
          'https://images.unsplash.com/photo-1616594039964-ae9021a400a0',
          'https://images.unsplash.com/photo-1578683010236-d716f9a3f461'
        ]
      }
    ]
  },
  {
    id: 3,
    name: 'Pousada Vila das Flores',
    description: 'Pousada charmosa em meio à natureza com jardins deslumbrantes',
    rating: 4.5,
    mainImage: 'https://images.unsplash.com/photo-1587381420270-3e1a5b9e6904',
    images: [
      'https://images.unsplash.com/photo-1587381420270-3e1a5b9e6904',
      'https://images.unsplash.com/photo-1582719508461-905c673771fd',
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b'
    ],
    address: {
      street: 'Rua das Flores',
      number: '45',
      neighborhood: 'Gramado',
      city: 'Gramado',
      state: 'RS',
      country: 'Brasil',
      zipCode: '95670-000',
      coordinates: {
        latitude: -29.3747,
        longitude: -50.8765
      }
    },
    amenities: [
      hotelAmenities[2], // Café da manhã
      hotelAmenities[3], // Estacionamento
      hotelAmenities[9]  // Wi-Fi
    ],
    rooms: [
      {
        id: 7,
        name: 'Chalé Standard',
        description: 'Chalé aconchegante com 30m² e varanda',
        category: 'standard',
        capacity: 2,
        price: 450,
        beds: [
          { type: 'queen', quantity: 1 }
        ],
        amenities: [
          commonRoomAmenities[0], // Banheiro
          commonRoomAmenities[1], // TV
          commonRoomAmenities[2], // Ar condicionado
          commonRoomAmenities[9]  // Aquecedor
        ],
        images: [
          'https://images.unsplash.com/photo-1587381420270-3e1a5b9e6904',
          'https://images.unsplash.com/photo-1631049307264-da0ec9d70304'
        ]
      }
    ]
  },
  {
    id: 4,
    name: 'Resort Praia do Forte',
    description: 'Resort all-inclusive com infraestrutura completa de lazer',
    rating: 4.8,
    mainImage: 'https://images.unsplash.com/photo-1582719508461-905c673771fd',
    images: [
      'https://images.unsplash.com/photo-1582719508461-905c673771fd',
      'https://images.unsplash.com/photo-1584132967334-10e028bd69f7',
      'https://images.unsplash.com/photo-1578683010236-d716f9a3f461'
    ],
    address: {
      street: 'Avenida do Farol',
      number: '2500',
      neighborhood: 'Praia do Forte',
      city: 'Mata de São João',
      state: 'BA',
      country: 'Brasil',
      zipCode: '48280-000',
      coordinates: {
        latitude: -12.5714,
        longitude: -38.0486
      }
    },
    amenities: hotelAmenities,
    rooms: [
      {
        id: 8,
        name: 'Bangalô Premium',
        description: 'Bangalô de 45m² com vista para o mar',
        category: 'premium',
        capacity: 3,
        price: 1500,
        beds: [
          { type: 'king', quantity: 1 },
          { type: 'single', quantity: 1 }
        ],
        amenities: commonRoomAmenities,
        images: [
          'https://images.unsplash.com/photo-1578683010236-d716f9a3f461',
          'https://images.unsplash.com/photo-1582719508461-905c673771fd'
        ]
      }
    ]
  },
  {
    id: 5,
    name: 'Hotel Boutique Santa Teresa',
    description: 'Hotel boutique em casarão histórico com vista para a cidade',
    rating: 4.7,
    mainImage: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791',
    images: [
      'https://images.unsplash.com/photo-1564501049412-61c2a3083791',
      'https://images.unsplash.com/photo-1578683010236-d716f9a3f461'
    ],
    address: {
      street: 'Rua Almirante Alexandrino',
      number: '660',
      neighborhood: 'Santa Teresa',
      city: 'Rio de Janeiro',
      state: 'RJ',
      country: 'Brasil',
      zipCode: '20241-260',
      coordinates: {
        latitude: -22.9346,
        longitude: -43.1857
      }
    },
    amenities: [
      hotelAmenities[2], // Café da manhã
      hotelAmenities[6], // Restaurante
      hotelAmenities[7], // Bar
      hotelAmenities[9]  // Wi-Fi
    ],
    rooms: [
      {
        id: 9,
        name: 'Suite Vista Cidade',
        description: 'Suíte com 40m² e vista panorâmica do Rio',
        category: 'suite',
        capacity: 2,
        price: 800,
        beds: [
          { type: 'king', quantity: 1 }
        ],
        amenities: [
          ...commonRoomAmenities.slice(0, 6)
        ],
        images: [
          'https://images.unsplash.com/photo-1566665797739-1674de7a421a',
          'https://images.unsplash.com/photo-1564501049412-61c2a3083791'
        ]
      }
    ]
  },
  {
    id: 6,
    name: 'Amazon Jungle Lodge',
    description: 'Lodge sustentável em meio à floresta amazônica',
    rating: 4.6,
    mainImage: 'https://images.unsplash.com/photo-1544124094-8aea5b49ff6d',
    images: [
      'https://images.unsplash.com/photo-1544124094-8aea5b49ff6d',
      'https://images.unsplash.com/photo-1587381420270-3e1a5b9e6904'
    ],
    address: {
      street: 'Rio Negro',
      number: 'S/N',
      neighborhood: 'Floresta Amazônica',
      city: 'Manaus',
      state: 'AM',
      country: 'Brasil',
      zipCode: '69000-000',
      coordinates: {
        latitude: -3.0749,
        longitude: -60.0397
      }
    },
    amenities: [
      hotelAmenities[2], // Café da manhã
      hotelAmenities[5], // Transfer
      hotelAmenities[9]  // Wi-Fi
    ],
    rooms: [
      {
        id: 10,
        name: 'Bangalô Selva',
        description: 'Bangalô sustentável de 35m² integrado à natureza',
        category: 'eco',
        capacity: 2,
        price: 900,
        beds: [
          { type: 'queen', quantity: 1 }
        ],
        amenities: [
          commonRoomAmenities[0], // Banheiro
          commonRoomAmenities[1], // TV
          commonRoomAmenities[2]  // Ar condicionado
        ],
        images: [
          'https://images.unsplash.com/photo-1544124094-8aea5b49ff6d',
          'https://images.unsplash.com/photo-1587381420270-3e1a5b9e6904'
        ]
      }
    ]
  },
  {
    id: 7,
    name: 'Pousada do Quilombo',
    description: 'Pousada histórica em antiga fazenda com culinária tradicional',
    rating: 4.5,
    mainImage: 'https://images.unsplash.com/photo-1584132915807-fd1f5fbc078f',
    images: [
      'https://images.unsplash.com/photo-1584132915807-fd1f5fbc078f',
      'https://images.unsplash.com/photo-1587381420270-3e1a5b9e6904'
    ],
    address: {
      street: 'Estrada do Quilombo',
      number: 'Km 5',
      neighborhood: 'Zona Rural',
      city: 'Tiradentes',
      state: 'MG',
      country: 'Brasil',
      zipCode: '36325-000',
      coordinates: {
        latitude: -21.1106,
        longitude: -44.1718
      }
    },
    amenities: [
      hotelAmenities[2], // Café da manhã
      hotelAmenities[3], // Estacionamento
      hotelAmenities[6], // Restaurante
      hotelAmenities[9]  // Wi-Fi
    ],
    rooms: [
      {
        id: 11,
        name: 'Suíte Colonial',
        description: 'Suíte de 40m² com decoração colonial',
        category: 'historic',
        capacity: 2,
        price: 550,
        beds: [
          { type: 'queen', quantity: 1 }
        ],
        amenities: [
          ...commonRoomAmenities.slice(0, 5)
        ],
        images: [
          'https://images.unsplash.com/photo-1584132915807-fd1f5fbc078f',
          'https://images.unsplash.com/photo-1631049307264-da0ec9d70304'
        ]
      }
    ]
  },
  {
    id: 8,
    name: 'Beach Park Resort',
    description: 'Resort integrado ao maior parque aquático da América Latina',
    rating: 4.9,
    mainImage: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d',
    images: [
      'https://images.unsplash.com/photo-1571896349842-33c89424de2d',
      'https://images.unsplash.com/photo-1584132967334-10e028bd69f7'
    ],
    address: {
      street: 'Rua Porto das Dunas',
      number: '2734',
      neighborhood: 'Porto das Dunas',
      city: 'Aquiraz',
      state: 'CE',
      country: 'Brasil',
      zipCode: '61700-000',
      coordinates: {
        latitude: -3.8147,
        longitude: -38.3894
      }
    },
    amenities: hotelAmenities,
    rooms: [
      {
        id: 12,
        name: 'Suíte Premium Vista Mar',
        description: 'Suíte de 55m² com vista para o mar',
        category: 'premium',
        capacity: 4,
        price: 1800,
        beds: [
          { type: 'king', quantity: 1 },
          { type: 'sofa_bed', quantity: 1 }
        ],
        amenities: commonRoomAmenities,
        images: [
          'https://images.unsplash.com/photo-1571896349842-33c89424de2d',
          'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b'
        ]
      }
    ]
  },
  {
    id: 9,
    name: 'Pousada Pantanal Lodge',
    description: 'Lodge exclusivo para observação da fauna pantaneira',
    rating: 4.7,
    mainImage: 'https://images.unsplash.com/photo-1544124094-8aea5b49ff6d',
    images: [
      'https://images.unsplash.com/photo-1544124094-8aea5b49ff6d',
      'https://images.unsplash.com/photo-1587381420270-3e1a5b9e6904'
    ],
    address: {
      street: 'Rodovia Transpantaneira',
      number: 'Km 132',
      neighborhood: 'Pantanal',
      city: 'Poconé',
      state: 'MT',
      country: 'Brasil',
      zipCode: '78175-000',
      coordinates: {
        latitude: -16.6139,
        longitude: -56.7759
      }
    },
    amenities: [
      hotelAmenities[2], // Café da manhã
      hotelAmenities[5], // Transfer
      hotelAmenities[6], // Restaurante
      hotelAmenities[9]  // Wi-Fi
    ],
    rooms: [
      {
        id: 13,
        name: 'Chalé Pantaneiro',
        description: 'Chalé de 40m² com varanda e rede',
        category: 'eco',
        capacity: 2,
        price: 750,
        beds: [
          { type: 'queen', quantity: 1 }
        ],
        amenities: [
          ...commonRoomAmenities.slice(0, 7)
        ],
        images: [
          'https://images.unsplash.com/photo-1544124094-8aea5b49ff6d',
          'https://images.unsplash.com/photo-1587381420270-3e1a5b9e6904'
        ]
      }
    ]
  },
  {
    id: 10,
    name: 'Hotel Design & Arts',
    description: 'Hotel boutique com galeria de arte contemporânea',
    rating: 4.6,
    mainImage: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461',
    images: [
      'https://images.unsplash.com/photo-1578683010236-d716f9a3f461',
      'https://images.unsplash.com/photo-1582719508461-905c673771fd'
    ],
    address: {
      street: 'Rua Gonçalo de Carvalho',
      number: '230',
      neighborhood: 'Floresta',
      city: 'Porto Alegre',
      state: 'RS',
      country: 'Brasil',
      zipCode: '90035-170',
      coordinates: {
        latitude: -30.0277,
        longitude: -51.2287
      }
    },
    amenities: [
      hotelAmenities[2], // Café da manhã
      hotelAmenities[7], // Bar
      hotelAmenities[8], // Concierge
      hotelAmenities[9]  // Wi-Fi
    ],
    rooms: [
      {
        id: 14,
        name: 'Suíte Art Déco',
        description: 'Suíte de 45m² com design exclusivo',
        category: 'boutique',
        capacity: 2,
        price: 680,
        beds: [
          { type: 'king', quantity: 1 }
        ],
        amenities: [
          ...commonRoomAmenities.slice(0, 8)
        ],
        images: [
          'https://images.unsplash.com/photo-1578683010236-d716f9a3f461',
          'https://images.unsplash.com/photo-1582719508461-905c673771fd'
        ]
      }
    ]
  },
  {
    id: 11,
    name: 'Ski Mountain Resort',
    description: 'Resort de montanha com pista de ski indoor',
    rating: 4.8,
    mainImage: 'https://images.unsplash.com/photo-1548802673-380ab8ebc7b7',
    images: [
      'https://images.unsplash.com/photo-1548802673-380ab8ebc7b7',
      'https://images.unsplash.com/photo-1578645510447-e20b4311e3ce'
    ],
    address: {
      street: 'Avenida das Araucárias',
      number: '800',
      neighborhood: 'Vale dos Pinheiros',
      city: 'Campos do Jordão',
      state: 'SP',
      country: 'Brasil',
      zipCode: '12460-000',
      coordinates: {
        latitude: -22.7374,
        longitude: -45.5866
      }
    },
    amenities: [
      ...hotelAmenities.slice(0, 8)
    ],
    rooms: [
      {
        id: 15,
        name: 'Suíte Montanha',
        description: 'Suíte de 50m² com lareira e vista para a montanha',
        category: 'luxury',
        capacity: 2,
        price: 1200,
        beds: [
          { type: 'king', quantity: 1 }
        ],
        amenities: [
          ...commonRoomAmenities.slice(0, 9),
          commonRoomAmenities[9] // Aquecedor
        ],
        images: [
          'https://images.unsplash.com/photo-1548802673-380ab8ebc7b7',
          'https://images.unsplash.com/photo-1578645510447-e20b4311e3ce'
        ]
      }
    ]
  },
  {
    id: 12,
    name: 'Pousada Solar das Andorinhas',
    description: 'Pousada histórica em fazenda de café do século XIX',
    rating: 4.5,
    mainImage: 'https://images.unsplash.com/photo-1584132915807-fd1f5fbc078f',
    images: [
      'https://images.unsplash.com/photo-1584132915807-fd1f5fbc078f',
      'https://images.unsplash.com/photo-1587381420270-3e1a5b9e6904'
    ],
    address: {
      street: 'Estrada da Fazenda',
      number: 'Km 3',
      neighborhood: 'Zona Rural',
      city: 'Bananal',
      state: 'SP',
      country: 'Brasil',
      zipCode: '12850-000',
      coordinates: {
        latitude: -22.6815,
        longitude: -44.3281
      }
    },
    amenities: [
      hotelAmenities[2], // Café da manhã
      hotelAmenities[3], // Estacionamento
      hotelAmenities[6], // Restaurante
      hotelAmenities[9]  // Wi-Fi
    ],
    rooms: [
      {
        id: 16,
        name: 'Suíte Barão do Café',
        description: 'Suíte de 45m² em casarão histórico',
        category: 'historic',
        capacity: 2,
        price: 480,
        beds: [
          { type: 'queen', quantity: 1 }
        ],
        amenities: [
          ...commonRoomAmenities.slice(0, 6)
        ],
        images: [
          'https://images.unsplash.com/photo-1584132915807-fd1f5fbc078f',
          'https://images.unsplash.com/photo-1587381420270-3e1a5b9e6904'
        ]
      }
    ]
  },
  {
    id: 13,
    name: 'Thermas Resort',
    description: 'Resort com águas termais e spa completo',
    rating: 4.7,
    mainImage: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d',
    images: [
      'https://images.unsplash.com/photo-1571896349842-33c89424de2d',
      'https://images.unsplash.com/photo-1584132967334-10e028bd69f7'
    ],
    address: {
      street: 'Rodovia das Águas',
      number: '1500',
      neighborhood: 'Águas Termais',
      city: 'Caldas Novas',
      state: 'GO',
      country: 'Brasil',
      zipCode: '75690-000',
      coordinates: {
        latitude: -17.7447,
        longitude: -48.6247
      }
    },
    amenities: hotelAmenities,
    rooms: [
      {
        id: 17,
        name: 'Suíte Wellness',
        description: 'Suíte de 60m² com hidromassagem privativa',
        category: 'spa',
        capacity: 2,
        price: 890,
        beds: [
          { type: 'king', quantity: 1 }
        ],
        amenities: commonRoomAmenities,
        images: [
          'https://images.unsplash.com/photo-1571896349842-33c89424de2d',
          'https://images.unsplash.com/photo-1584132967334-10e028bd69f7'
        ]
      }
    ]
  },
  {
    id: 14,
    name: 'Búzios Beach Resort',
    description: 'Resort à beira-mar com vista para as ilhas',
    rating: 4.6,
    mainImage: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4',
    images: [
      'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4',
      'https://images.unsplash.com/photo-1584132967334-10e028bd69f7'
    ],
    address: {
      street: 'Avenida José Bento Ribeiro Dantas',
      number: '2000',
      neighborhood: 'Manguinhos',
      city: 'Armação dos Búzios',
      state: 'RJ',
      country: 'Brasil',
      zipCode: '28950-000',
      coordinates: {
        latitude: -22.7472,
        longitude: -41.8867
      }
    },
    amenities: [
      ...hotelAmenities.slice(0, 8)
    ],
    rooms: [
      {
        id: 18,
        name: 'Suíte Oceano',
        description: 'Suíte de 55m² com varanda frente ao mar',
        category: 'premium',
        capacity: 3,
        price: 1500,
        beds: [
          { type: 'king', quantity: 1 },
          { type: 'single', quantity: 1 }
        ],
        amenities: [
          ...commonRoomAmenities.slice(0, 9)
        ],
        images: [
          'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4',
          'https://images.unsplash.com/photo-1584132967334-10e028bd69f7'
        ]
      }
    ]
  },
  {
    id: 15,
    name: 'Velinn Caravela',
    description: 'Hotel boutique com arquitetura colonial portuguesa',
    rating: 4.5,
    mainImage: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791',
    images: [
      'https://images.unsplash.com/photo-1564501049412-61c2a3083791',
      'https://images.unsplash.com/photo-1584132967334-10e028bd69f7'
    ],
    address: {
      street: 'Rua do Porto',
      number: '128',
      neighborhood: 'Centro Histórico',
      city: 'Paraty',
      state: 'RJ',
      country: 'Brasil',
      zipCode: '23970-000',
      coordinates: {
        latitude: -23.2178,
        longitude: -44.7126
      }
    },
    amenities: [
      hotelAmenities[2], // Café da manhã
      hotelAmenities[7], // Bar
      hotelAmenities[8], // Concierge
      hotelAmenities[9]  // Wi-Fi
    ],
    rooms: [
      {
        id: 19,
        name: 'Suíte Histórica',
        description: 'Suíte de 40m² em casarão tombado',
        category: 'historic',
        capacity: 2,
        price: 600,
        beds: [
          { type: 'queen', quantity: 1 }
        ],
        amenities: [
          ...commonRoomAmenities.slice(0, 7)
        ],
        images: [
          'https://images.unsplash.com/photo-1564501049412-61c2a3083791',
          'https://images.unsplash.com/photo-1584132967334-10e028bd69f7'
        ]
      }
    ]
  },
  {
    id: 16,
    name: 'Serra Verde Express Hotel',
    description: 'Hotel histórico integrado à estação ferroviária',
    rating: 4.4,
    mainImage: 'https://images.unsplash.com/photo-1566073771259-6a8506099945',
    images: [
      'https://images.unsplash.com/photo-1566073771259-6a8506099945',
      'https://images.unsplash.com/photo-1582719508461-905c673771fd'
    ],
    address: {
      street: 'Avenida Coronel Dutton',
      number: '76',
      neighborhood: 'Centro',
      city: 'Morretes',
      state: 'PR',
      country: 'Brasil',
      zipCode: '83350-000',
      coordinates: {
        latitude: -25.4805,
        longitude: -48.8352
      }
    },
    amenities: [
      hotelAmenities[2], // Café da manhã
      hotelAmenities[3], // Estacionamento
      hotelAmenities[6], // Restaurante
      hotelAmenities[9]  // Wi-Fi
    ],
    rooms: [
      {
        id: 20,
        name: 'Suíte Ferroviária',
        description: 'Suíte de 35m² com vista para a estação',
        category: 'historic',
        capacity: 2,
        price: 420,
        beds: [
          { type: 'queen', quantity: 1 }
        ],
        amenities: [
          ...commonRoomAmenities.slice(0, 6)
        ],
        images: [
          'https://images.unsplash.com/photo-1566073771259-6a8506099945',
          'https://images.unsplash.com/photo-1582719508461-905c673771fd'
        ]
      }
    ]
  },
  {
    id: 17,
    name: 'Tropical Manaus Resort',
    description: 'Resort urbano com marina privativa',
    rating: 4.6,
    mainImage: 'https://images.unsplash.com/photo-1584132967334-10e028bd69f7',
    images: [
      'https://images.unsplash.com/photo-1584132967334-10e028bd69f7',
      'https://images.unsplash.com/photo-1571896349842-33c89424de2d'
    ],
    address: {
      street: 'Avenida Coronel Teixeira',
      number: '1320',
      neighborhood: 'Ponta Negra',
      city: 'Manaus',
      state: 'AM',
      country: 'Brasil',
      zipCode: '69037-000',
      coordinates: {
        latitude: -3.0583,
        longitude: -60.1097
      }
    },
    amenities: hotelAmenities,
    rooms: [
      {
        id: 21,
        name: 'Suíte Marina',
        description: 'Suíte de 45m² com vista para o Rio Negro',
        category: 'luxury',
        capacity: 2,
        price: 850,
        beds: [
          { type: 'king', quantity: 1 }
        ],
        amenities: [
          ...commonRoomAmenities.slice(0, 8)
        ],
        images: [
          'https://images.unsplash.com/photo-1584132967334-10e028bd69f7',
          'https://images.unsplash.com/photo-1571896349842-33c89424de2d'
        ]
      }
    ]
  },
  {
    id: 18,
    name: 'Ponta dos Ganchos Resort',
    description: 'Resort exclusivo em península particular',
    rating: 4.9,
    mainImage: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d',
    images: [
      'https://images.unsplash.com/photo-1571896349842-33c89424de2d',
      'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4'
    ],
    address: {
      street: 'Rua Eupídio Alves do Nascimento',
      number: '104',
      neighborhood: 'Ganchos de Fora',
      city: 'Governador Celso Ramos',
      state: 'SC',
      country: 'Brasil',
      zipCode: '88190-000',
      coordinates: {
        latitude: -27.3183,
        longitude: -48.5547
      }
    },
    amenities: hotelAmenities,
    rooms: [
      {
        id: 22,
        name: 'Vila Esmeralda',
        description: 'Vila de 100m² com piscina privativa',
        category: 'luxury',
        capacity: 2,
        price: 3800,
        beds: [
          { type: 'king', quantity: 1 }
        ],
        amenities: commonRoomAmenities,
        images: [
          'https://images.unsplash.com/photo-1571896349842-33c89424de2d',
          'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4'
        ]
      }
    ]
  },
  {
    id: 19,
    name: 'Unique Garden Hotel & Spa',
    description: 'Hotel spa em meio a jardins botânicos',
    rating: 4.7,
    mainImage: 'https://images.unsplash.com/photo-1587381420270-3e1a5b9e6904',
    images: [
      'https://images.unsplash.com/photo-1587381420270-3e1a5b9e6904',
      'https://images.unsplash.com/photo-1584132967334-10e028bd69f7'
    ],
    address: {
      street: 'Estrada do Capivari',
      number: '4000',
      neighborhood: 'Mairiporã',
      city: 'São Paulo',
      state: 'SP',
      country: 'Brasil',
      zipCode: '07600-000',
      coordinates: {
        latitude: -23.3219,
        longitude: -46.5897
      }
    },
    amenities: [
      ...hotelAmenities.slice(0, 7)
    ],
    rooms: [
      {
        id: 23,
        name: 'Suíte Jardim',
        description: 'Suíte de 55m² com terraço privativo',
        category: 'spa',
        capacity: 2,
        price: 1400,
        beds: [
          { type: 'king', quantity: 1 }
        ],
        amenities: [
          ...commonRoomAmenities.slice(0, 9)
        ],
        images: [
          'https://images.unsplash.com/photo-1587381420270-3e1a5b9e6904',
          'https://images.unsplash.com/photo-1584132967334-10e028bd69f7'
        ]
      }
    ]
  },
  {
    id: 20,
    name: 'Botanique Hotel & Spa',
    description: 'Hotel de luxo integrado à natureza',
    rating: 4.8,
    mainImage: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791',
    images: [
      'https://images.unsplash.com/photo-1564501049412-61c2a3083791',
      'https://images.unsplash.com/photo-1587381420270-3e1a5b9e6904'
    ],
    address: {
      street: 'Rua Emílio Lang Junior',
      number: '1700',
      neighborhood: 'Vila Capivari',
      city: 'Campos do Jordão',
      state: 'SP',
      country: 'Brasil',
      zipCode: '12460-000',
      coordinates: {
        latitude: -22.7374,
        longitude: -45.5866
      }
    },
    amenities: hotelAmenities,
    rooms: [
      {
        id: 24,
        name: 'Villa Mantiqueira',
        description: 'Villa de 120m² com lareira e ofurô',
        category: 'luxury',
        capacity: 2,
        price: 2800,
        beds: [
          { type: 'king', quantity: 1 }
        ],
        amenities: commonRoomAmenities,
        images: [
          'https://images.unsplash.com/photo-1564501049412-61c2a3083791',
          'https://images.unsplash.com/photo-1587381420270-3e1a5b9e6904'
        ]
      }
    ]
  },
  {
    id: 21,
    name: 'Kenoa Resort',
    description: 'Eco-resort exclusivo à beira-mar',
    rating: 4.9,
    mainImage: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4',
    images: [
      'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4',
      'https://images.unsplash.com/photo-1571896349842-33c89424de2d'
    ],
    address: {
      street: 'Rua Escritor Jorge de Lima',
      number: '58',
      neighborhood: 'Barra de São Miguel',
      city: 'Maceió',
      state: 'AL',
      country: 'Brasil',
      zipCode: '57180-000',
      coordinates: {
        latitude: -9.8308,
        longitude: -35.9063
      }
    },
    amenities: hotelAmenities,
    rooms: [
      {
        id: 25,
        name: 'Villa Kenoa',
        description: 'Villa de 90m² com piscina infinita privativa',
        category: 'luxury',
        capacity: 2,
        price: 3200,
        beds: [
          { type: 'king', quantity: 1 }
        ],
        amenities: commonRoomAmenities,
        images: [
          'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4',
          'https://images.unsplash.com/photo-1571896349842-33c89424de2d'
        ]
      }
    ]
  },
  {
    id: 22,
    name: 'DPNY Beach Hotel',
    description: 'Hotel boutique pé na areia',
    rating: 4.7,
    mainImage: 'https://images.unsplash.com/photo-1566073771259-6a8506099945',
    images: [
      'https://images.unsplash.com/photo-1566073771259-6a8506099945',
      'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4'
    ],
    address: {
      street: 'Av. Beira Mar',
      number: '4800',
      neighborhood: 'Praia do Curral',
      city: 'Ilhabela',
      state: 'SP',
      country: 'Brasil',
      zipCode: '11630-000',
      coordinates: {
        latitude: -23.7785,
        longitude: -45.3547
      }
    },
    amenities: [
      ...hotelAmenities.slice(0, 8)
    ],
    rooms: [
      {
        id: 26,
        name: 'Suíte Ocean Front',
        description: 'Suíte de 65m² com vista panorâmica do mar',
        category: 'luxury',
        capacity: 2,
        price: 1900,
        beds: [
          { type: 'king', quantity: 1 }
        ],
        amenities: [
          ...commonRoomAmenities.slice(0, 9)
        ],
        images: [
          'https://images.unsplash.com/photo-1566073771259-6a8506099945',
          'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4'
        ]
      }
    ]
  },
  {
    id: 23,
    name: 'Vila Galé Eco Resort do Cabo',
    description: 'Resort all-inclusive em reserva natural',
    rating: 4.6,
    mainImage: 'https://images.unsplash.com/photo-1584132967334-10e028bd69f7',
    images: [
      'https://images.unsplash.com/photo-1584132967334-10e028bd69f7',
      'https://images.unsplash.com/photo-1571896349842-33c89424de2d'
    ],
    address: {
      street: 'Av. Beira Mar',
      number: '750',
      neighborhood: 'Cabo de Santo Agostinho',
      city: 'Cabo de Santo Agostinho',
      state: 'PE',
      country: 'Brasil',
      zipCode: '54590-000',
      coordinates: {
        latitude: -8.2891,
        longitude: -35.0314
      }
    },
    amenities: hotelAmenities,
    rooms: [
      {
        id: 27,
        name: 'Apartamento Superior',
        description: 'Apartamento de 42m² com varanda',
        category: 'superior',
        capacity: 3,
        price: 980,
        beds: [
          { type: 'king', quantity: 1 },
          { type: 'single', quantity: 1 }
        ],
        amenities: [
          ...commonRoomAmenities.slice(0, 8)
        ],
        images: [
          'https://images.unsplash.com/photo-1584132967334-10e028bd69f7',
          'https://images.unsplash.com/photo-1571896349842-33c89424de2d'
        ]
      }
    ]
  },
  {
    id: 24,
    name: 'Fasano Angra dos Reis',
    description: 'Resort de luxo com marina própria',
    rating: 4.9,
    mainImage: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d',
    images: [
      'https://images.unsplash.com/photo-1571896349842-33c89424de2d',
      'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4'
    ],
    address: {
      street: 'Rod. Governador Mario Covas',
      number: 'Km 512',
      neighborhood: 'Porto Frade',
      city: 'Angra dos Reis',
      state: 'RJ',
      country: 'Brasil',
      zipCode: '23946-015',
      coordinates: {
        latitude: -22.9847,
        longitude: -44.3897
      }
    },
    amenities: hotelAmenities,
    rooms: [
      {
        id: 28,
        name: 'Suíte Deluxe Ocean Front',
        description: 'Suíte de 80m² com vista para o mar',
        category: 'deluxe',
        capacity: 3,
        price: 2800,
        beds: [
          { type: 'king', quantity: 1 },
          { type: 'single', quantity: 1 }
        ],
        amenities: commonRoomAmenities,
        images: [
          'https://images.unsplash.com/photo-1571896349842-33c89424de2d',
          'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4'
        ]
      }
    ]
  },
  {
    id: 25,
    name: 'Villas de Trancoso',
    description: 'Hotel boutique em meio ao verde',
    rating: 4.8,
    mainImage: 'https://images.unsplash.com/photo-1587381420270-3e1a5b9e6904',
    images: [
      'https://images.unsplash.com/photo-1587381420270-3e1a5b9e6904',
      'https://images.unsplash.com/photo-1584132967334-10e028bd69f7'
    ],
    address: {
      street: 'Estrada de Trancoso',
      number: 'Km 18',
      neighborhood: 'Trancoso',
      city: 'Porto Seguro',
      state: 'BA',
      country: 'Brasil',
      zipCode: '45810-000',
      coordinates: {
        latitude: -16.5927,
        longitude: -39.1044
      }
    },
    amenities: [
      ...hotelAmenities.slice(0, 8)
    ],
    rooms: [
      {
        id: 29,
        name: 'Villa Trancoso',
        description: 'Villa de 70m² com jardim privativo',
        category: 'luxury',
        capacity: 2,
        price: 1800,
        beds: [
          { type: 'king', quantity: 1 }
        ],
        amenities: [
          ...commonRoomAmenities.slice(0, 9)
        ],
        images: [
          'https://images.unsplash.com/photo-1587381420270-3e1a5b9e6904',
          'https://images.unsplash.com/photo-1584132967334-10e028bd69f7'
        ]
      }
    ]
  },
  {
    id: 26,
    name: 'Tauá Resort & Convention Caeté',
    description: 'Resort com parque aquático e centro de convenções',
    rating: 4.5,
    mainImage: 'https://images.unsplash.com/photo-1584132967334-10e028bd69f7',
    images: [
      'https://images.unsplash.com/photo-1584132967334-10e028bd69f7',
      'https://images.unsplash.com/photo-1571896349842-33c89424de2d'
    ],
    address: {
      street: 'Rodovia MG 435',
      number: 'Km 45',
      neighborhood: 'Centro',
      city: 'Caeté',
      state: 'MG',
      country: 'Brasil',
      zipCode: '34800-000',
      coordinates: {
        latitude: -19.8826,
        longitude: -43.6704
      }
    },
    amenities: hotelAmenities,
    rooms: [
      {
        id: 30,
        name: 'Apartamento Premium',
        description: 'Apartamento de 48m² com varanda',
        category: 'premium',
        capacity: 4,
        price: 750,
        beds: [
          { type: 'queen', quantity: 2 }
        ],
        amenities: [
          ...commonRoomAmenities.slice(0, 8)
        ],
        images: [
          'https://images.unsplash.com/photo-1584132967334-10e028bd69f7',
          'https://images.unsplash.com/photo-1571896349842-33c89424de2d'
        ]
      }
    ]
  },
  {
    id: 27,
    name: 'Hotel das Cataratas',
    description: 'Hotel histórico dentro do Parque Nacional do Iguaçu',
    rating: 4.9,
    mainImage: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791',
    images: [
      'https://images.unsplash.com/photo-1564501049412-61c2a3083791',
      'https://images.unsplash.com/photo-1584132967334-10e028bd69f7'
    ],
    address: {
      street: 'Rodovia BR 469',
      number: 'Km 32',
      neighborhood: 'Parque Nacional',
      city: 'Foz do Iguaçu',
      state: 'PR',
      country: 'Brasil',
      zipCode: '85855-750',
      coordinates: {
        latitude: -25.6953,
        longitude: -54.4367
      }
    },
    amenities: hotelAmenities,
    rooms: [
      {
        id: 31,
        name: 'Suíte Cataratas',
        description: 'Suíte de 72m² com vista para as cataratas',
        category: 'deluxe',
        capacity: 3,
        price: 2400,
        beds: [
          { type: 'king', quantity: 1 },
          { type: 'single', quantity: 1 }
        ],
        amenities: commonRoomAmenities,
        images: [
          'https://images.unsplash.com/photo-1564501049412-61c2a3083791',
          'https://images.unsplash.com/photo-1584132967334-10e028bd69f7'
        ]
      }
    ]
  },
  {
    id: 28,
    name: 'Royal Tulip Brasília Alvorada',
    description: 'Hotel de luxo às margens do Lago Paranoá',
    rating: 4.7,
    mainImage: 'https://images.unsplash.com/photo-1566073771259-6a8506099945',
    images: [
      'https://images.unsplash.com/photo-1566073771259-6a8506099945',
      'https://images.unsplash.com/photo-1582719508461-905c673771fd'
    ],
    address: {
      street: 'SHTN Trecho 1',
      number: 'Lote 1B',
      neighborhood: 'Asa Norte',
      city: 'Brasília',
      state: 'DF',
      country: 'Brasil',
      zipCode: '70800-200',
      coordinates: {
        latitude: -15.7892,
        longitude: -47.8751
      }
    },
    amenities: [
      ...hotelAmenities.slice(0, 8)
    ],
    rooms: [
      {
        id: 32,
        name: 'Suíte Executiva',
        description: 'Suíte de 55m² com vista para o lago',
        category: 'executive',
        capacity: 2,
        price: 1200,
        beds: [
          { type: 'king', quantity: 1 }
        ],
        amenities: [
          ...commonRoomAmenities.slice(0, 9)
        ],
        images: [
          'https://images.unsplash.com/photo-1566073771259-6a8506099945',
          'https://images.unsplash.com/photo-1582719508461-905c673771fd'
        ]
      }
    ]
  },
  {
    id: 29,
    name: 'Carmel Charme Resort',
    description: 'Resort boutique à beira-mar',
    rating: 4.8,
    mainImage: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4',
    images: [
      'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4',
      'https://images.unsplash.com/photo-1584132967334-10e028bd69f7'
    ],
    address: {
      street: 'Rua Barão de Aquiraz',
      number: '3677',
      neighborhood: 'Praia de Águas Belas',
      city: 'Aquiraz',
      state: 'CE',
      country: 'Brasil',
      zipCode: '61700-000',
      coordinates: {
        latitude: -3.9013,
        longitude: -38.3894
      }
    },
    amenities: hotelAmenities,
    rooms: [
      {
        id: 33,
        name: 'Bangalô Frente Mar',
        description: 'Bangalô de 75m² com vista para o mar',
        category: 'luxury',
        capacity: 2,
        price: 2200,
        beds: [
          { type: 'king', quantity: 1 }
        ],
        amenities: commonRoomAmenities,
        images: [
          'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4',
          'https://images.unsplash.com/photo-1584132967334-10e028bd69f7'
        ]
      }
    ]
  },
  {
    id: 30,
    name: 'Six Senses Botanique',
    description: 'Hotel de luxo sustentável na Serra da Mantiqueira',
    rating: 4.9,
    mainImage: 'https://images.unsplash.com/photo-1587381420270-3e1a5b9e6904',
    images: [
      'https://images.unsplash.com/photo-1587381420270-3e1a5b9e6904',
      'https://images.unsplash.com/photo-1584132967334-10e028bd69f7'
    ],
    address: {
      street: 'Rua Elídio Gonçalves da Silva',
      number: '4000',
      neighborhood: 'Bairro dos Mellos',
      city: 'São Bento do Sapucaí',
      state: 'SP',
      country: 'Brasil',
      zipCode: '12490-000',
      coordinates: {
        latitude: -22.6841,
        longitude: -45.6847
      }
    },
    amenities: hotelAmenities,
    rooms: [
      {
        id: 34,
        name: 'Villa Botanique',
        description: 'Villa de 145m² com vista para a montanha',
        category: 'luxury',
        capacity: 2,
        price: 4500,
        beds: [
          { type: 'king', quantity: 1 }
        ],
        amenities: commonRoomAmenities,
        images: [
          'https://images.unsplash.com/photo-1587381420270-3e1a5b9e6904',
          'https://images.unsplash.com/photo-1584132967334-10e028bd69f7'
        ]
      }
    ]
  }
]