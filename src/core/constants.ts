import { Location } from './types'

// {10.772621574518942, 106.69801135672672} is BenThanh market
export const seedingPlace: Location = {
  lat: 10.772621574518942,
  lng: 106.69801135672672,
}

export const seedingRadius: string = '15'

export const placeProps = [
  'lat',
  'lng',
  'place_id',
  'name',
  'status',
  'place_types',
]
