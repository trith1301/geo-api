import prisma from '../../prisma/prisma-client'
import { Place } from '../models/place.model'
import { Location } from '../core/types'

type GetOneByIdReturn = {
  place: Place
}
export const getOneById = async (id: number): Promise<GetOneByIdReturn> => {
  const place: Place = await prisma.place.findFirst({
    where: {
      id: id,
    },
  })

  return { place: place }
}

type GetAllReturn = {
  places: Place[]
}
export const getAll = async (): Promise<GetAllReturn> => {
  const places: Place[] = await prisma.place.findMany({
    orderBy: {
      id: 'asc',
    },
  })

  return {
    places: places,
  }
}

type CreateOneReturn = {
  status: 'get_existing' | 'create_new'
  createdPlace: Place
}
export const createOne = async (
  data: Place,
  checkExists: boolean
): Promise<CreateOneReturn> => {
  if (checkExists) {
    const existingPlace: Place = await prisma.place.findFirst({
      where: {
        AND: [
          { lat: data.lat },
          { lng: data.lng },
          { place_id: data.place_id },
        ],
      },
    })

    if (existingPlace)
      return {
        status: 'get_existing',
        createdPlace: existingPlace,
      }
  }

  const createdPlace: Place = await prisma.place.create({
    data: data,
  })

  return {
    status: 'create_new',
    createdPlace: createdPlace,
  }
}

type DeleteOneByIdReturn = {
  status: 'not_found' | 'deleted'
  deletedPlace: any
}
export const deleteOneById = async (
  id: number
): Promise<DeleteOneByIdReturn> => {
  const existingPlace: Place = await prisma.place.findFirst({
    where: {
      id: id,
    },
  })

  if (!existingPlace) {
    return {
      status: 'not_found',
      deletedPlace: null,
    }
  }

  const place: Place = await prisma.place.delete({
    where: {
      id: id,
    },
  })

  return {
    status: 'deleted',
    deletedPlace: place,
  }
}

type UpdateOneByIdReturn = {
  status: 'not_found' | 'updated'
  updatedPlace: any
}
export const updateOneById = async (
  id: number,
  data: any
): Promise<UpdateOneByIdReturn> => {
  const existingPlace: Place = await prisma.place.findFirst({
    where: {
      id: id,
    },
  })

  if (!existingPlace) {
    return {
      status: 'not_found',
      updatedPlace: null,
    }
  }

  const _data = {}
  for (const key in data) {
    if (key != 'id') {
      _data[key] = data[key]
    }
  }

  const place: Place = await prisma.place.update({
    where: {
      id: id,
    },
    data: { ..._data },
  })

  return {
    status: 'updated',
    updatedPlace: place,
  }
}
