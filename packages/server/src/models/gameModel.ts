import { Schema, model } from 'mongoose'

const GameSchema = new Schema({
  players: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Player',
      default: [],
    },
  ],
  inviteCode: {
    type: String,
    required: true,
  },
  turn: {
    type: String,
    required: true,
    default: 'white',
  },
  winner: {
    type: Schema.Types.ObjectId,
    ref: 'Player',
    default: null,
  },
  losser: {
    type: Schema.Types.ObjectId,
    ref: 'Player',
    default: null,
  },
  whitePlayer: {
    type: Schema.Types.ObjectId,
    ref: 'Player',
    default: null,
  },
  blackPlayer: {
    type: Schema.Types.ObjectId,
    ref: 'Player',
    default: null,
  },
  moves: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Move',
      default: [],
    },
  ],
  gameStates: [
    {
      type: Schema.Types.ObjectId,
      ref: 'GameState',
      default: [],
    },
  ],
  latestGameStateIndex: {
    type: Number,
    required: true,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

const GameModel = model('Game', GameSchema)

export default GameModel
