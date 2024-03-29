import { Schema, model } from 'mongoose'

const PlayerSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  uid: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: false,
  },
  phoneNumber: {
    type: String,
    default: '',
  },
  avatar: {
    type: String,
    default: '',
  },
  bio: {
    type: String,
    default: '',
  },
  games: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Game',
      default: [],
    },
  ],
  wins: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Game',
      default: [],
    },
  ],
  loses: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Game',
      default: [],
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
})

const PlayerModel = model('Player', PlayerSchema)

export default PlayerModel
