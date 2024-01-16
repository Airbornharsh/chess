type BoardPieceProps = {
  type: 'w' | 'b'
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

  return (
    <span
      className="flex h-10 w-10 items-center justify-center"
      style={{
        backgroundColor: killSuggestion
          ? 'red'
          : active
            ? 'green'
            : selectedPiece?.x === x && selectedPiece?.y === y
              ? 'gray'
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
