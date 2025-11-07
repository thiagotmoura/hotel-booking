import { defineEventHandler } from 'h3'
import { hotels } from '../data/hotels'

export default defineEventHandler(() => {
  return hotels
})
