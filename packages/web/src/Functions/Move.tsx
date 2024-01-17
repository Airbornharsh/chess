import { Board } from '../types/type'

export const MovePiece = (
  type: 'w' | 'b',
  moveUpdate: () => void,
  turn: 'w' | 'b',
  setTurn: (turn: 'w' | 'b') => void,
  board: Board,
  setBoard: (board: Board) => void,
  selectedPiece: { x: number; y: number } | null,
  active: { x: number; y: number }[],
  killSuggestion: { x: number; y: number }[],
  empty: () => void,
  getLocation: (x: number, y: number) => string,
  timerMessage: (message: string) => void,
  x: number,
  y: number,
) => {
  console.log(type, turn)
  if (type !== turn) return
  if (!selectedPiece) return
  if (
    !active.find((a) => a.x === x && a.y === y) &&
    !killSuggestion.find((a) => a.x === x && a.y === y)
  ) {
    empty()
    return
  }
  const newBoard = { ...board }
  const piece = newBoard[`${selectedPiece?.x}`][selectedPiece?.y]
  if (!selectedPiece) return
  if (active.find((a) => a.x === x && a.y === y))
    timerMessage(
      `Moved from ${getLocation(
        selectedPiece.x,
        selectedPiece.y,
      )} to ${getLocation(x, y)}`,
    )
  else
    timerMessage(
      `Moved from ${getLocation(
        selectedPiece.x,
        selectedPiece.y,
      )} to ${getLocation(x, y)} and Killed ${newBoard[`${x}`][y]}`,
    )
  newBoard[`${selectedPiece?.x}`][selectedPiece?.y] = ''
  newBoard[`${x}`][y] = piece
  setBoard(newBoard)
  empty()
  setTurn(turn === 'w' ? 'b' : 'w')
  moveUpdate()
}
