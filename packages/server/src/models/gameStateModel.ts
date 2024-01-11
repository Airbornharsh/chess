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
        color: {
          type: String,
        },
        piece: {
          type: String,
        },
        position: {
          type: String,
        },
        default: [{}, {}, {}, {}, {}, {}, {}, {}],
      },
    ],
    2: [
      {
        color: {
          type: String,
        },
        piece: {
          type: String,
        },
        position: {
          type: String,
        },
        default: [{}, {}, {}, {}, {}, {}, {}, {}],
      },
    ],
    3: [
      {
        color: {
          type: String,
        },
        piece: {
          type: String,
        },
        position: {
          type: String,
        },
        default: [{}, {}, {}, {}, {}, {}, {}, {}],
      },
    ],
    4: [
      {
        color: {
          type: String,
        },
        piece: {
          type: String,
        },
        position: {
          type: String,
        },
        default: [{}, {}, {}, {}, {}, {}, {}, {}],
      },
    ],
    5: [
      {
        color: {
          type: String,
        },
        piece: {
          type: String,
        },
        position: {
          type: String,
        },
        default: [{}, {}, {}, {}, {}, {}, {}, {}],
      },
    ],
    6: [
      {
        color: {
          type: String,
        },
        piece: {
          type: String,
        },
        position: {
          type: String,
        },
        default: [{}, {}, {}, {}, {}, {}, {}, {}],
      },
    ],
    7: [
      {
        color: {
          type: String,
        },
        piece: {
          type: String,
        },
        position: {
          type: String,
        },
        default: [{}, {}, {}, {}, {}, {}, {}, {}],
      },
    ],
    8: [
      {
        color: {
          type: String,
        },
        piece: {
          type: String,
        },
        position: {
          type: String,
        },
        default: [{}, {}, {}, {}, {}, {}, {}, {}],
      },
    ],
  },
})

const GameStateModel = model('GameState', GameStateSchema)

export default GameStateModel
