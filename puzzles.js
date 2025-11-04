/*
  This file is a "databank" of 30 puzzles for the game, based on the
  CORRECT 4-Tetromino / 6-Pentomino piece set (46 total blocks).
  
  This means every solution MUST have exactly 3 blocked/empty cells (49 - 46 = 3).

  - 'level': The unique ID for the puzzle.
  - 'blockedCells': An array of [row, col] coordinates for blocked squares (MUST be 3).
  - 'startPieces': Pieces already on the board.
  - 'piecesLeft': The pieces the user must place.
*/

// --- Piece IDs for reference ---
// Tetrominoes (4): 'z-tetra-y', 't-tetra-p', 'j-tetra-db', 'o-tetra-o'
// Pentominoes (6): 'z-pento-lb', 'x-pento-pk', 'f-pento-bo', 'u-pento-dg', 'z-pento-r', 't-pento-lg'


const PUZZLES = [

  // --- 10 Easy Puzzles (Place 3-5 pieces) ---
  {
    level: 1,
    blockedCells: [[0,0],[0,1],[0,2]], // 3 blocked
    startPieces: [
      { id: 'o-tetra-o', shapeIndex: 0, row: 0, col: 3 },
      { id: 'x-pento-pk', shapeIndex: 0, row: 0, col: 5 },
      { id: 't-pento-lg', shapeIndex: 0, row: 2, col: 0 },
      { id: 'f-pento-bo', shapeIndex: 0, row: 2, col: 2 },
      { id: 'u-pento-dg', shapeIndex: 0, row: 2, col: 5 },
      { id: 'z-pento-r', shapeIndex: 0, row: 4, col: 1 },
      { id: 'z-pento-lb', shapeIndex: 0, row: 4, col: 4 },
    ],
    piecesLeft: ['z-tetra-y', 't-tetra-p', 'j-tetra-db'] // 3 pieces
  },
  {
    level: 2,
    blockedCells: [[3,3],[4,3],[5,3]], // 3 blocked
    startPieces: [
      { id: 'o-tetra-o', shapeIndex: 0, row: 0, col: 0 },
      { id: 't-tetra-p', shapeIndex: 0, row: 0, col: 2 },
      { id: 'j-tetra-db', shapeIndex: 0, row: 0, col: 5 },
      { id: 'z-tetra-y', shapeIndex: 0, row: 2, col: 0 },
      { id: 'u-pento-dg', shapeIndex: 0, row: 2, col: 3 },
      { id: 't-pento-lg', shapeIndex: 1, row: 2, col: 5 },
      { id: 'x-pento-pk', shapeIndex: 0, row: 4, col: 0 },
    ],
    piecesLeft: ['z-pento-lb', 'f-pento-bo', 'z-pento-r'] // 3 pieces
  },
  {
    level: 3,
    blockedCells: [[6,0],[6,1],[6,2]], // 3 blocked
    startPieces: [
      { id: 'o-tetra-o', shapeIndex: 0, row: 0, col: 0 },
      { id: 'z-tetra-y', shapeIndex: 0, row: 0, col: 2 },
      { id: 't-tetra-p', shapeIndex: 0, row: 0, col: 5 },
      { id: 'j-tetra-db', shapeIndex: 0, row: 2, col: 0 },
      { id: 'z-pento-r', shapeIndex: 0, row: 2, col: 2 },
      { id: 'x-pento-pk', shapeIndex: 0, row: 4, col: 0 },
    ],
    piecesLeft: ['z-pento-lb', 'f-pento-bo', 'u-pento-dg', 't-pento-lg'] // 4 pieces
  },
  {
    level: 4,
    blockedCells: [[0,6],[1,6],[2,6]], // 3 blocked
    startPieces: [
      { id: 'f-pento-bo', shapeIndex: 0, row: 0, col: 0 },
      { id: 'u-pento-dg', shapeIndex: 0, row: 0, col: 3 },
      { id: 't-pento-lg', shapeIndex: 0, row: 2, col: 0 },
      { id: 'x-pento-pk', shapeIndex: 0, row: 2, col: 3 },
      { id: 'z-pento-lb', shapeIndex: 0, row: 4, col: 1 },
    ],
    piecesLeft: ['z-tetra-y', 't-tetra-p', 'j-tetra-db', 'o-tetra-o', 'z-pento-r'] // 5 pieces
  },
  {
    level: 5,
    blockedCells: [[0,0],[3,3],[6,6]], // 3 blocked
    startPieces: [
      { id: 'o-tetra-o', shapeIndex: 0, row: 0, col: 1 },
      { id: 't-tetra-p', shapeIndex: 0, row: 0, col: 3 },
      { id: 'j-tetra-db', shapeIndex: 0, row: 0, col: 5 },
      { id: 'z-tetra-y', shapeIndex: 0, row: 2, col: 0 },
      { id: 'z-pento-r', shapeIndex: 0, row: 4, col: 0 },
    ],
    piecesLeft: ['z-pento-lb', 'x-pento-pk', 'f-pento-bo', 'u-pento-dg', 't-pento-lg'] // 5 pieces
  },
  {
    level: 6,
    blockedCells: [[0,3],[1,3],[2,3]], // 3 blocked
    startPieces: [
        { id: 'o-tetra-o', shapeIndex: 0, row: 0, col: 0 },
        { id: 'z-tetra-y', shapeIndex: 1, row: 0, col: 4 },
        { id: 't-tetra-p', shapeIndex: 2, row: 1, col: 0 },
        { id: 'j-tetra-db', shapeIndex: 3, row: 3, col: 0 },
        { id: 'x-pento-pk', shapeIndex: 0, row: 3, col: 4 },
    ],
    piecesLeft: ['z-pento-lb', 'f-pento-bo', 'u-pento-dg', 'z-pento-r', 't-pento-lg'] // 5 pieces
  },
  {
    level: 7,
    blockedCells: [[3,0],[4,0],[5,0]], // 3 blocked
    startPieces: [
        { id: 'o-tetra-o', shapeIndex: 0, row: 0, col: 0 },
        { id: 'z-pento-lb', shapeIndex: 1, row: 0, col: 2 },
        { id: 'f-pento-bo', shapeIndex: 2, row: 0, col: 5 },
        { id: 't-pento-lg', shapeIndex: 3, row: 2, col: 0 },
        { id: 'u-pento-dg', shapeIndex: 0, row: 3, col: 4 },
    ],
    piecesLeft: ['z-tetra-y', 't-tetra-p', 'j-tetra-db', 'x-pento-pk', 'z-pento-r'] // 5 pieces
  },
  {
    level: 8,
    blockedCells: [[6,4],[6,5],[6,6]], // 3 blocked
    startPieces: [
        { id: 'z-tetra-y', shapeIndex: 0, row: 0, col: 0 },
        { id: 't-tetra-p', shapeIndex: 1, row: 0, col: 2 },
        { id: 'j-tetra-db', shapeIndex: 2, row: 0, col: 5 },
        { id: 'o-tetra-o', shapeIndex: 0, row: 2, col: 0 },
        { id: 'z-pento-r', shapeIndex: 3, row: 2, col: 2 },
    ],
    piecesLeft: ['z-pento-lb', 'x-pento-pk', 'f-pento-bo', 'u-pento-dg', 't-pento-lg'] // 5 pieces
  },
  {
    level: 9,
    blockedCells: [[0,0],[1,1],[2,2]], // 3 blocked
    startPieces: [
        { id: 'z-pento-lb', shapeIndex: 0, row: 0, col: 1 },
        { id: 'x-pento-pk', shapeIndex: 0, row: 0, col: 4 },
        { id: 'f-pento-bo', shapeIndex: 1, row: 2, col: 0 },
        { id: 'u-pento-dg', shapeIndex: 2, row: 2, col: 4 },
        { id: 't-pento-lg', shapeIndex: 3, row: 4, col: 0 },
    ],
    piecesLeft: ['z-tetra-y', 't-tetra-p', 'j-tetra-db', 'o-tetra-o', 'z-pento-r'] // 5 pieces
  },
  {
    level: 10,
    blockedCells: [[4,4],[5,5],[6,6]], // 3 blocked
    startPieces: [
        { id: 'z-pento-r', shapeIndex: 0, row: 0, col: 0 },
        { id: 't-pento-lg', shapeIndex: 1, row: 0, col: 3 },
        { id: 'u-pento-dg', shapeIndex: 2, row: 2, col: 0 },
        { id: 'f-pento-bo', shapeIndex: 3, row: 2, col: 3 },
        { id: 'x-pento-pk', shapeIndex: 0, row: 4, col: 0 },
    ],
    piecesLeft: ['z-tetra-y', 't-tetra-p', 'j-tetra-db', 'o-tetra-o', 'z-pento-lb'] // 5 pieces
  },

  // --- 10 Medium Puzzles (Place 6-8 pieces) ---
  {
    level: 11,
    blockedCells: [[0,0],[1,0],[2,0]], // 3 blocked
    startPieces: [
      { id: 'o-tetra-o', shapeIndex: 0, row: 0, col: 1 },
      { id: 't-pento-lg', shapeIndex: 0, row: 0, col: 3 },
      { id: 'x-pento-pk', shapeIndex: 0, row: 3, col: 0 },
      { id: 'f-pento-bo', shapeIndex: 2, row: 4, col: 3 },
    ],
    piecesLeft: [
      'z-tetra-y', 't-tetra-p', 'j-tetra-db', 'z-pento-lb', 
      'u-pento-dg', 'z-pento-r' // 6 pieces
    ]
  },
  {
    level: 12,
    blockedCells: [[3,0],[3,1],[3,2]], // 3 blocked
    startPieces: [
      { id: 'o-tetra-o', shapeIndex: 0, row: 0, col: 0 },
      { id: 'z-tetra-y', shapeIndex: 0, row: 0, col: 2 },
      { id: 't-tetra-p', shapeIndex: 0, row: 0, col: 5 },
      { id: 'z-pento-r', shapeIndex: 1, row: 3, col: 4 },
    ],
    piecesLeft: [
      'j-tetra-db', 'z-pento-lb', 'x-pento-pk', 
      'f-pento-bo', 'u-pento-dg', 't-pento-lg' // 6 pieces
    ]
  },
  {
    level: 13,
    blockedCells: [[0,0],[3,3],[6,6]], // 3 blocked
    startPieces: [
      { id: 'o-tetra-o', shapeIndex: 0, row: 0, col: 1 },
      { id: 'x-pento-pk', shapeIndex: 0, row: 2, col: 1 },
      { id: 't-pento-lg', shapeIndex: 2, row: 4, col: 4 },
    ],
    piecesLeft: [
      'z-tetra-y', 't-tetra-p', 'j-tetra-db', 'z-pento-lb', 
      'f-pento-bo', 'u-pento-dg', 'z-pento-r' // 7 pieces
    ]
  },
  {
    level: 14,
    blockedCells: [[0,0],[0,6],[6,0]], // 3 blocked
    startPieces: [
      { id: 'o-tetra-o', shapeIndex: 0, row: 6, col: 1 },
      { id: 'j-tetra-db', shapeIndex: 1, row: 0, col: 1 },
      { id: 'z-tetra-y', shapeIndex: 0, row: 3, col: 3 },
    ],
    piecesLeft: [
      't-tetra-p', 'z-pento-lb', 'x-pento-pk', 
      'f-pento-bo', 'u-pento-dg', 'z-pento-r', 't-pento-lg' // 7 pieces
    ]
  },
  {
    level: 15,
    blockedCells: [[0,0],[1,1],[2,2]], // 3 blocked
    startPieces: [
      { id: 'o-tetra-o', shapeIndex: 0, row: 3, col: 0 },
      { id: 't-tetra-p', shapeIndex: 1, row: 0, col: 1 },
      { id: 'z-pento-lb', shapeIndex: 0, row: 4, col: 3 },
    ],
    piecesLeft: [
      'z-tetra-y', 'j-tetra-db', 'x-pento-pk', 
      'f-pento-bo', 'u-pento-dg', 'z-pento-r', 't-pento-lg' // 7 pieces
    ]
  },
  {
    level: 16,
    blockedCells: [[6,0],[6,1],[5,0]], // 3 blocked
    startPieces: [
        { id: 'o-tetra-o', shapeIndex: 0, row: 0, col: 0 },
        { id: 'x-pento-pk', shapeIndex: 0, row: 0, col: 2 },
        { id: 't-pento-lg', shapeIndex: 1, row: 0, col: 5 },
    ],
    piecesLeft: [
      'z-tetra-y', 't-tetra-p', 'j-tetra-db', 'z-pento-lb', 
      'f-pento-bo', 'u-pento-dg', 'z-pento-r' // 7 pieces
    ]
  },
  {
    level: 17,
    blockedCells: [[0,5],[0,6],[1,6]], // 3 blocked
    startPieces: [
        { id: 'z-pento-r', shapeIndex: 0, row: 0, col: 0 },
        { id: 'u-pento-dg', shapeIndex: 1, row: 0, col: 2 },
        { id: 'f-pento-bo', shapeIndex: 2, row: 2, col: 0 },
    ],
    piecesLeft: [
      'z-tetra-y', 't-tetra-p', 'j-tetra-db', 'o-tetra-o', 
      'z-pento-lb', 'x-pento-pk', 't-pento-lg' // 7 pieces
    ]
  },
  {
    level: 18,
    blockedCells: [[3,3],[3,4],[4,3]], // 3 blocked
    startPieces: [
        { id: 'z-tetra-y', shapeIndex: 0, row: 0, col: 0 },
        { id: 't-tetra-p', shapeIndex: 1, row: 0, col: 2 },
    ],
    piecesLeft: [
      'j-tetra-db', 'o-tetra-o', 'z-pento-lb', 'x-pento-pk', 
      'f-pento-bo', 'u-pento-dg', 'z-pento-r', 't-pento-lg' // 8 pieces
    ]
  },
  {
    level: 19,
    blockedCells: [[0,0],[6,0],[0,6]], // 3 blocked
    startPieces: [
        { id: 'o-tetra-o', shapeIndex: 0, row: 1, col: 0 },
        { id: 'z-pento-lb', shapeIndex: 1, row: 3, col: 3 },
    ],
    piecesLeft: [
      'z-tetra-y', 't-tetra-p', 'j-tetra-db', 'x-pento-pk', 
      'f-pento-bo', 'u-pento-dg', 'z-pento-r', 't-pento-lg' // 8 pieces
    ]
  },
  {
    level: 20,
    blockedCells: [[2,2],[3,3],[4,4]], // 3 blocked
    startPieces: [
        { id: 'x-pento-pk', shapeIndex: 0, row: 0, col: 0 },
        { id: 't-pento-lg', shapeIndex: 0, row: 3, col: 0 },
    ],
    piecesLeft: [
      'z-tetra-y', 't-tetra-p', 'j-tetra-db', 'o-tetra-o', 
      'z-pento-lb', 'f-pento-bo', 'u-pento-dg', 'z-pento-r' // 8 pieces
    ]
  },
  
  // --- 10 Hard Puzzles (Place 9-10 pieces) ---
  {
    level: 21,
    blockedCells: [[0,0],[0,1],[0,2]], // 3 blocked
    startPieces: [
      { id: 'o-tetra-o', shapeIndex: 0, row: 0, col: 3 },
    ],
    piecesLeft: [
      'z-tetra-y', 't-tetra-p', 'j-tetra-db', 'z-pento-lb', 'x-pento-pk', 
      'f-pento-bo', 'u-pento-dg', 'z-pento-r', 't-pento-lg' // 9 pieces
    ]
  },
  {
    level: 22,
    blockedCells: [[3,3],[4,4],[5,5]], // 3 blocked
    startPieces: [
      { id: 'o-tetra-o', shapeIndex: 0, row: 0, col: 0 },
    ],
    piecesLeft: [
      'z-tetra-y', 't-tetra-p', 'j-tetra-db', 'z-pento-lb', 'x-pento-pk', 
      'f-pento-bo', 'u-pento-dg', 'z-pento-r', 't-pento-lg' // 9 pieces
    ]
  },
  {
    level: 23,
    blockedCells: [[0,3],[1,3],[2,3]], // 3 blocked
    startPieces: [
      { id: 'x-pento-pk', shapeIndex: 0, row: 0, col: 0 },
    ],
    piecesLeft: [
      'z-tetra-y', 't-tetra-p', 'j-tetra-db', 'o-tetra-o', 'z-pento-lb',
      'f-pento-bo', 'u-pento-dg', 'z-pento-r', 't-pento-lg' // 9 pieces
    ]
  },
  {
    level: 24,
    blockedCells: [[3,4],[4,3],[4,4]], // 3 blocked
    startPieces: [
        { id: 'z-tetra-y', shapeIndex: 0, row: 0, col: 0 },
    ],
    piecesLeft: [
      't-tetra-p', 'j-tetra-db', 'o-tetra-o', 'z-pento-lb', 'x-pento-pk', 
      'f-pento-bo', 'u-pento-dg', 'z-pento-r', 't-pento-lg' // 9 pieces
    ]
  },
  {
    level: 25,
    blockedCells: [[0,0],[6,0],[6,6]], // 3 blocked
    startPieces: [
        { id: 't-tetra-p', shapeIndex: 0, row: 0, col: 1 },
    ],
    piecesLeft: [
      'z-tetra-y', 'j-tetra-db', 'o-tetra-o', 'z-pento-lb', 'x-pento-pk', 
      'f-pento-bo', 'u-pento-dg', 'z-pento-r', 't-pento-lg' // 9 pieces
    ]
  },
  {
    level: 26,
    blockedCells: [[0,0],[3,3],[6,6]], // 3 blocked
    startPieces: [], // Place all 10 pieces
    piecesLeft: [
      'z-tetra-y', 't-tetra-p', 'j-tetra-db', 'o-tetra-o', 'z-pento-lb', 
      'x-pento-pk', 'f-pento-bo', 'u-pento-dg', 'z-pento-r', 't-pento-lg'
    ]
  },
  {
    level: 27,
    blockedCells: [[0,3],[3,0],[6,3]], // 3 blocked
    startPieces: [], // Place all 10 pieces
    piecesLeft: [
      'z-tetra-y', 't-tetra-p', 'j-tetra-db', 'o-tetra-o', 'z-pento-lb', 
      'x-pento-pk', 'f-pento-bo', 'u-pento-dg', 'z-pento-r', 't-pento-lg'
    ]
  },
  {
    level: 28,
    blockedCells: [[1,1],[3,3],[5,5]], // 3 blocked
    startPieces: [], // Place all 10 pieces
    piecesLeft: [
      'z-tetra-y', 't-tetra-p', 'j-tetra-db', 'o-tetra-o', 'z-pento-lb', 
      'x-pento-pk', 'f-pento-bo', 'u-pento-dg', 'z-pento-r', 't-pento-lg'
    ]
  },
  {
    level: 29,
    blockedCells: [[0,6],[3,3],[6,0]], // 3 blocked
    startPieces: [], // Place all 10 pieces
    piecesLeft: [
      'z-tetra-y', 't-tetra-p', 'j-tetra-db', 'o-tetra-o', 'z-pento-lb', 
      'x-pento-pk', 'f-pento-bo', 'u-pento-dg', 'z-pento-r', 't-pento-lg'
    ]
  },
  {
    level: 30,
    blockedCells: [[2,2],[3,3],[4,4]], // 3 blocked
    startPieces: [], // Place all 10 pieces
    piecesLeft: [
      'z-tetra-y', 't-tetra-p', 'j-tetra-db', 'o-tetra-o', 'z-pento-lb', 
      'x-pento-pk', 'f-pento-bo', 'u-pento-dg', 'z-pento-r', 't-pento-lg'
    ]
  },
];