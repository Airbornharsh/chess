type BoardPieceProps = {
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
  if (selectedPiece) console.log(selectedPiece.x, selectedPiece.y)

  console.log(turn, type)

  return (
    <span
      className="flex h-10 w-10 items-center justify-center"
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
      {piece}
    </span>
  )
}

export default BoardPiece
