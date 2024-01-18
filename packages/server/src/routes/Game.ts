import {
  CancelGameHandler,
  CreateGameHandler,
  ExistsGameHandler,
  // GetGameHandler,
  JoinGameHandler,
  MovePieceHandler,
} from '../controllers/GameController'
import { Router } from 'express'

const GameRouter = (router: Router) => {
  const game = Router()

  router.use('/game', game)

  game.post('/create', CreateGameHandler)
  game.post('/join', JoinGameHandler)
  game.post('/move', MovePieceHandler)
  game.get('/exists', ExistsGameHandler)
  game.post('/cancel', CancelGameHandler)
  // game.get('/:inviteCode', JoinGameHandler)
}

export default GameRouter
