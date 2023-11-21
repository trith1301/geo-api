import dotenv from 'dotenv'
import { Location } from '../core/types'
import { PlaceTypes } from '../core/enums'

dotenv.config()

const nearbySearchAPIUrl = process.env.NEARBY_SEARCH_API_URL
const nearbySearchFakeAPIUrl = process.env.NEARBY_SEARCH_FAKE_API_URL

const placeDetailAPIUrl = process.env.PLACE_DETAIL_API_URL
const placeDetailFakeAPIUrl = process.env.PLACE_DETAIL_FAKE_API_URL

export const nearbySearch = async (
  center: Location,
  radius: string,
  apiKey: string
) => {
  // Nearby searching
  const nearbySearchQueries = []
  for (const placeType in PlaceTypes) {
    nearbySearchQueries.push(
      fetch(
        `${nearbySearchAPIUrl}?api_key=${apiKey}&location=${center.lat},${
          center.lng
        }&input=${PlaceTypes[placeType]
          .split(' ')
          .join('%20')}&radius=${radius}`
      ).then((res) => res.json())
    )

    // Fake calls
    // nearbySearchQueries.push(
    //   fetch(nearbySearchFakeAPIUrl).then((res) => res.json())
    // )
  }
  const nearbySearchRawData = await Promise.all(nearbySearchQueries)
  const nearbySearchData = []
  nearbySearchRawData.forEach((raw) => {
    nearbySearchData.push(...raw.predictions)
  })

  // Get Places details
  const placeDetailsQueries = nearbySearchData.map((nearbySearchData) => {
    return fetch(
      `${placeDetailAPIUrl}?api_key=${apiKey}&place_id=${nearbySearchData.place_id}`
    ).then((res) => res.json())

    // Fake calls
    // return fetch(placeDetailFakeAPIUrl).then((res) => res.json())
  })
  const placeDetailRawData = await Promise.all(placeDetailsQueries)
  const placeDetailData = placeDetailRawData.map((raw: any) => {
    return {
      lat: raw?.result?.geometry?.location?.lat ?? 0,
      lng: raw?.result?.geometry?.location?.lng ?? 0,
      place_id: raw?.result?.place_id ?? '',
      name: raw?.result?.name ?? '',
      address: raw?.result?.formatted_address ?? '',
      status: 'pending',
      place_types: raw?.result?.types ?? [''],
    }
  })

  return placeDetailData
}
