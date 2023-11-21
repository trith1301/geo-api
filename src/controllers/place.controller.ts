import { NextFunction, Request, Response, Router } from 'express'
import { Place } from '../models/place.model'
import { placeProps } from '../core/constants'
import { PlaceTypes, NumberTypes } from '../core/enums'
import { numberChecker } from '../utils/number-checker.utils'
import { nearbySearch } from '../utils/nearby-search.utils'
import {
  getAll,
  createOne,
  getOneById,
  deleteOneById,
  updateOneById,
} from '../services/place.services'

const router = Router()
const controllerName = 'places'

// Get one by Id
router.get(
  `/${controllerName}/:id`,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = req.params.id

      if (
        numberChecker(id) == NumberTypes.DOUBLE ||
        numberChecker(id) == NumberTypes.NOT_A_NUMBER
      )
        return res.json({
          status: 'failed',
          message: 'invalid id',
          data: null,
        })

      const result = await getOneById(+id)

      return res.json({
        status: 'success',
        message: result.place
          ? ''
          : `could not found any records with id ${id}`,
        data: {
          place: result.place,
        },
      })
    } catch (error) {
      next(error)
    }
  }
)

// Get all
router.get(
  `/${controllerName}`,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await getAll()

      return res.json({
        status: 'success',
        message: result.places.length ? '' : 'could not found any records',
        data: {
          places: result.places,
        },
      })
    } catch (error) {
      next(error)
    }
  }
)

// Create one
router.post(
  `/${controllerName}/create`,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data: Place = req.body
      const isInValidData = !placeProps.every((prop: string) => prop in data)

      if (isInValidData) {
        return res.json({
          status: 'failed',
          message: 'missing or invalid details',
          data: null,
        })
      }

      data.lat = +data.lat
      data.lng = +data.lng

      const result = await createOne(data, true)

      return res.json({
        status: 'success',
        message:
          result.status == 'create_new'
            ? 'created successfully'
            : 'get existing record',
        data: {
          createdPlace: result.createdPlace,
        },
      })
    } catch (error) {
      next(error)
    }
  }
)

// Delete one By Id
router.delete(
  `/${controllerName}/delete/:id`,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = req.params.id

      if (
        numberChecker(id) == NumberTypes.DOUBLE ||
        numberChecker(id) == NumberTypes.NOT_A_NUMBER
      ) {
        return res.json({
          status: 'failed',
          message: 'invalid id',
          data: null,
        })
      }

      const result = await deleteOneById(+id)

      return res.json({
        status: 'success',
        message:
          result.status == 'deleted'
            ? 'deleted successfully'
            : `could not found any records with id ${id}`,
        data: {
          deletedPlace: result.deletedPlace,
        },
      })
    } catch (error) {
      next(error)
    }
  }
)

// Update one By Id
router.put(
  `/${controllerName}/update/:id`,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = req.params.id
      const data = req.body

      if (
        numberChecker(id) == NumberTypes.DOUBLE ||
        numberChecker(id) == NumberTypes.NOT_A_NUMBER
      ) {
        res.json({
          status: 'failed',
          message: 'invalid id',
          data: null,
        })
      }

      if ('lat' in data) data.lat = +data.lat
      if ('lng' in data) data.lng = +data.lng

      const result = await updateOneById(+id, data)

      res.json({
        status: 'success',
        message:
          result.status == 'updated'
            ? 'updated successfully'
            : `could not found any records with id ${id}`,
        data: {
          updatedPlace: result.updatedPlace,
        },
      })
    } catch (error) {
      next(error)
    }
  }
)

// Scanning for nearby places within a specific radius
router.post(
  `/${controllerName}/nearby/:radius`,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const location = req.body.location
      const apiKey = req.body.apiKey
      const radius = req.params.radius

      let data = await nearbySearch(location, radius, apiKey)
      data = data.filter((data) => {
        let isValid = true
        for (const key in data) {
          if (data[key] == 0 || data[key] == '') {
            isValid = false
            break
          }
        }

        return isValid
      })
      const createQueries = data.map((place) => createOne(place as Place, true))
      const createdPlaces = await Promise.all(createQueries)

      res.json({
        status: 'success',
        message: 'scan successfully',
        createPlaces: createdPlaces,
      })
    } catch (error) {
      next(error)
    }
  }
)

export default router
