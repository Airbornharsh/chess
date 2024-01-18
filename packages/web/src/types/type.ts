export type Board = {
  [key: string]: [
    string,
    string,
    string,
    string,
    string,
    string,
    string,
    string,
  ]
  8: [string, string, string, string, string, string, string, string]
  7: [string, string, string, string, string, string, string, string]
  6: [string, string, string, string, string, string, string, string]
  5: [string, string, string, string, string, string, string, string]
  4: [string, string, string, string, string, string, string, string]
  3: [string, string, string, string, string, string, string, string]
  2: [string, string, string, string, string, string, string, string]
  1: [string, string, string, string, string, string, string, string]
}

export type SelectedPiece = {
  x: number
  y: number
}

export type ActivePiece = {
  x: number
  y: number
}

export type PlayerColor = 'w' | 'b'

export type BoardPieceProps = {
  type: 'w' | 'b'
  turn: 'w' | 'b'
  x: number
  y: number
  piece: string
  selectedPiece: { x: number; y: number } | null
  setSelectedPieceFn: (x: number, y: number) => void
  active: boolean | undefined
  killSuggestion: boolean | undefined
  movePiece: (x: number, y: number) => void
}

export type GameData = {
  _id: string
  players: string[]
  inviteCode: string
  turn: 'white' | 'black'
  winner: string | null
  losser: string | null
  whitePlayer: string
  blackPlayer: string
  moves: string[]
  gameState: string[]
  latestGamStateIndex: number
  createdAt: string
}

export type Userdata = {
  _id: string
  email: string
  name: string
  uid: string
  avatar: string
  games: string[]
  wins: string[]
  loses: string[]
  createdAt: string
  updatedAt: string
}

export const PiecesIcons: {
  [key: string]: {
    [key: string]: string
  }
} = {
  w: {
    p: '♟︎',
    r: '♜',
    h: '♞',
    b: '♝',
    q: '♛',
    k: '♚',
  },
  b: {
    p: '♙',
    r: '♖',
    h: '♘',
    b: '♗',
    q: '♕',
    k: '♔',
  },
}

export type CheckPieces = {
  [key: string]: string[]
  p: string[]
  r: string[]
  h: string[]
  b: string[]
  q: string[]
  k: string[]
}
