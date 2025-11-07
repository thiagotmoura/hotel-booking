import { createError, defineEventHandler, H3Event } from 'h3'

export default defineEventHandler((event: H3Event) => {
  const hotels = [
    {
      id: 1,
      name: 'Hotel Copacabana Palace',
      price: 420,
      rating: 4.8,
      description: 'Luxo à beira-mar com spa e restaurante premiado.',
      amenities: ['Wi-Fi', 'Piscina', 'Spa', 'Café da manhã']
    },
    {
      id: 2,
      name: 'Hotel Salvador Mar',
      price: 280,
      rating: 4.4,
      description: 'Vista para o mar e localização central.',
      amenities: ['Wi-Fi', 'Estacionamento', 'Academia']
    },
    {
      id: 3,
      name: 'Hotel Ipanema Luxo',
      price: 350,
      rating: 4.6,
      description: 'Design moderno e atendimento exclusivo.',
      amenities: ['Wi-Fi', 'Piscina', 'Bar rooftop']
    }
  ]

  const id = event.context.params?.id
  console.log('ID recebido na API:', id)
  
  if (!id) {
    throw createError({
      statusCode: 400,
      statusMessage: 'ID do hotel não fornecido'
    })
  }
  
  const hotel = hotels.find(h => h.id === parseInt(id))
  
  if (!hotel) {
    throw createError({ 
      statusCode: 404, 
      statusMessage: 'Hotel não encontrado' 
    })
  }

  return hotel
})
