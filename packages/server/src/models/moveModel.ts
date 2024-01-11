import { Schema, model } from 'mongoose'

const moveSchema = new Schema({
  from: {
    type: String,
    required: true,
  },
  to: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
  previousMove: {
    type: Schema.Types.ObjectId,
    ref: 'Move',
    default: null,
  },
  gameId: {
    type: Schema.Types.ObjectId,
    ref: 'Game',
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

const MoveModel = model('Move', moveSchema)

export default MoveModel
