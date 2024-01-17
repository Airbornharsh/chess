import { Router } from 'express'
import GameRouter from './Game'
import { AuthMiddleware } from '../middlewares/AuthMiddleware'

const UserRouter = (router: Router) => {
  const user = Router()

  router.use('/user', AuthMiddleware, user)

  user.get('/', (req, res) => {
    res.send('User API!')
  })

  GameRouter(user)
}

export default UserRouter
