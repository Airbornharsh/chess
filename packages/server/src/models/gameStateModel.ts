import { Schema, model } from 'mongoose'

const GameStateSchema = new Schema({
  index: {
    type: Number,
    required: true,
  },
  gameId: {
    type: Schema.Types.ObjectId,
    ref: 'Game',
    required: true,
  },
  board: {
    1: [
      {
        type: String,
        default: '',
      },
    ],
    2: [
      {
        type: String,
        default: '',
      },
    ],
    3: [
      {
        type: String,
        default: '',
      },
    ],
    4: [
      {
        type: String,
        default: '',
      },
    ],
    5: [
      {
        type: String,
        default: '',
      },
    ],
    6: [
      {
        type: String,
        default: '',
      },
    ],
    7: [
      {
        type: String,
        default: '',
      },
    ],
    8: [
      {
        type: String,
        default: '',
      },
    ],
  },
})

const GameStateModel = model('GameState', GameStateSchema)

export default GameStateModel
