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
