export interface Place {
  id: number
  lat: number
  lng: number
  place_id: string
  name: string
  address: string
  status: string
  place_types: string[]
  create_time: Date | null
  update_time: Date | null
}
