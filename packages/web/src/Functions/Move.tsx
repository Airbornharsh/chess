import { Board } from '../types/type'
import Check from './Check'
// import Check from './Check'

export const MovePiece = async (
  type: 'w' | 'b',
  moveUpdate: (from: string, to: string) => Promise<boolean>,
  turn: 'w' | 'b',
  setTurn: (turn: 'w' | 'b') => void,
  board: Board,
  setBoard: (board: Board) => void,
  check: boolean,
  checkMate: boolean,
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
  const killedPiece = newBoard[`${x}`][y]
  const tempTurn = turn
  if (!selectedPiece) return
  newBoard[`${selectedPiece?.x}`][selectedPiece?.y] = ''
  newBoard[`${x}`][y] = piece
  empty()
  setTurn(turn === 'w' ? 'b' : 'w')
  setBoard(newBoard)

  const tempCheck = Check(turn, newBoard)
  if (tempCheck.check && !tempCheck.checkMate) {
    timerMessage('Try to save your king')
    newBoard[`${selectedPiece?.x}`][selectedPiece?.y] = piece
    newBoard[`${x}`][y] = killedPiece
    setBoard(newBoard)
    setTurn(tempTurn)
    return
  } else if (tempCheck.checkMate) {
    timerMessage('Check Mate')
    newBoard[`${selectedPiece?.x}`][selectedPiece?.y] = piece
    newBoard[`${x}`][y] = killedPiece
    setBoard(newBoard)
    setTurn(tempTurn)
    return
  }

  const res = await moveUpdate(
    getLocation(selectedPiece.x, selectedPiece.y),
    getLocation(x, y),
  )
  if (!res) {
    newBoard[`${selectedPiece?.x}`][selectedPiece?.y] = piece
    newBoard[`${x}`][y] = killedPiece
    timerMessage('Need One More PLayer')
    setBoard(newBoard)
    setTurn(tempTurn)
    return
  } else {
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
    // Check(turn, newBoard, setActive, setKillSuggestion)
  }
}
