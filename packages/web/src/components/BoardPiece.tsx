import { BoardPieceProps, PiecesIcons } from '../types/type'

const BoardPiece: React.FC<BoardPieceProps> = ({
  type,
  turn,
  x,
  y,
  piece,
  selectedPiece,
  setSelectedPieceFn,
  active,
  killSuggestion,
  movePiece,
}) => {
  const getPiece = (piece: string) => {
    if (piece.length !== 3) return
    return PiecesIcons[piece[0]][piece[1]]
  }

  return (
    <span
      className="flex h-10 w-10 items-center justify-center text-3xl"
      style={{
        backgroundColor: killSuggestion
          ? turn === type
            ? 'red'
            : (y + x) % 2 === 0
              ? 'black'
              : 'white'
          : active
            ? turn === type
              ? 'green'
              : (y + x) % 2 === 0
                ? 'black'
                : 'white'
            : selectedPiece?.x === x && selectedPiece?.y === y
              ? turn === type
                ? 'gray'
                : (y + x) % 2 === 0
                  ? 'black'
                  : 'white'
              : (y + x) % 2 === 0
                ? 'black'
                : 'white',
        color: (y + x) % 2 === 0 ? 'white' : 'black',
        transform: type === 'w' ? 'rotate(90deg)' : 'rotate(-90deg)',
        cursor: piece ? 'pointer' : 'default',
      }}
      onClick={
        !selectedPiece ? () => setSelectedPieceFn(x, y) : () => movePiece(x, y)
      }
    >
      {getPiece(piece)}
    </span>
  )
}

export default BoardPiece
