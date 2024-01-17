import {
  CreateGameHandler,
  GetGameHandler,
  JoinGameHandler,
  MovePieceHandler,
} from '../controllers/GameController'
import { Router } from 'express'

const GameRouter = (router: Router) => {
  const game = Router()

  router.use('/game', game)

  game.get('/:inviteCode', GetGameHandler)
  game.post('/create', CreateGameHandler)
  game.post('/join', JoinGameHandler)
  game.post('/move', MovePieceHandler)
}

export default GameRouter
