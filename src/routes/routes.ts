import { Router } from 'express'

import placeController from '../controllers/place.controller'

const api = Router().use(placeController)

export default Router().use('/api', api)
