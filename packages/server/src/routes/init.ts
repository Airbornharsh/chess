import { Router } from 'express'
import AuthRouter from './Auth'
import UserRouter from './User'

export const RouterInit = (router: Router) => {
  router.get('/', (req, res) => {
    res.send('API! From Chess App')
  })

  AuthRouter(router)
  UserRouter(router)
}
