/*
  This file is a "databank" for the game, based on the
  CORRECT 4-Tetromino / 6-Pentomino piece set (46 total blocks).
  
  We must find ONE master solution. This file contains a "Creative Mode"
  puzzle (Level 1) to help us find that solution.
  
  The goal is to solve this one puzzle. Once we have this "master key",
  we can use it to generate 30+ other solvable puzzles.
*/

// --- Piece IDs for reference ---
// Tetrominoes (4): 'z-tetra-y', 't-tetra-p', 'j-tetra-db', 'o-tetra-o'
// Pentominoes (6): 'z-pento-lb', 'x-pento-pk', 'f-pento-bo', 'u-pento-dg', 'z-pento-r', 't-pento-lg'


const PUZZLES = [

  // --- "Creative Mode" ---
  // The goal is to solve this one puzzle.
  // This will become our "Master Solution"
  {
    level: 1,
    // The 3 required blocked cells.
    blockedCells: [[0,0],[3,3],[6,6]], 
    
    // No starting pieces.
    startPieces: [], 
    
    // All 10 pieces are in the tray for you to place.
    piecesLeft: [
      'z-tetra-y', 't-tetra-p', 'j-tetra-db', 'o-tetra-o', 'z-pento-lb', 
      'x-pento-pk', 'f-pento-bo', 'u-pento-dg', 'z-pento-r', 't-pento-lg'
    ]
  },
  
  // (We will add the other 29 puzzles here *after* we solve Level 1)
  
];

