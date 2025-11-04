/*
  This file defines the "blueprints" for all 10 of your game pieces.
  Based on the 10 individual photos, the set is:
  - 4 Tetrominoes (4 blocks)
  - 6 Pentominoes (5 blocks)
  - Total blocks: (4 * 4) + (6 * 5) = 16 + 30 = 46 blocks.
  
  This means every puzzle solution must leave exactly 3 empty/blocked cells (49 - 46 = 3).
*/

// --- Helper functions to generate all 8 orientations (4 rotations, 4 flips) ---
function rotate(matrix) {
  const M = matrix.length;
  const N = matrix[0].length;
  let newMatrix = Array(N).fill(0).map(() => Array(M).fill(0));
  for (let r = 0; r < M; r++) {
    for (let c = 0; c < N; c++) {
      newMatrix[c][M - 1 - r] = matrix[r][c];
    }
  }
  return newMatrix;
}

function flip(matrix) {
  return matrix.map(row => row.slice().reverse());
}

function generateOrientations(baseShape) {
  let shapes = [];
  let currentShape = baseShape;
  for (let i = 0; i < 4; i++) {
    shapes.push(currentShape);
    currentShape = rotate(currentShape);
  }
  currentShape = flip(baseShape);
  for (let i = 0; i < 4; i++) {
    shapes.push(currentShape);
    currentShape = rotate(currentShape);
  }
  const uniqueShapes = [];
  const shapeStrings = new Set();
  for (const shape of shapes) {
    const str = JSON.stringify(shape);
    if (!shapeStrings.has(str)) {
      shapeStrings.add(str);
      uniqueShapes.push(shape);
    }
  }
  return uniqueShapes;
}

// --- The 10 *Correct* Pieces in Your Set ---

const PIECE_DEFINITIONS = {
  // --- 4 Tetrominoes (4 blocks) ---
  'z-tetra-y': { 
    id: 'z-tetra-y', 
    color: 'color-yellow', 
    baseShape: [[1,1,0],[0,1,1]] // PXL_20251104_112522757.MP.jpg
  },
  't-tetra-p': { 
    id: 't-tetra-p', 
    color: 'color-purple', 
    baseShape: [[1,1,1],[0,1,0]] // PXL_20251104_112511311.MP.jpg
  },
  'j-tetra-db': { 
    id: 'j-tetra-db', 
    color: 'color-d-blue', 
    baseShape: [[0,1],[0,1],[1,1]] // PXL_20251104_112526300.MP.jpg
  },
  'o-tetra-o': { 
    id: 'o-tetra-o', 
    color: 'color-orange', 
    baseShape: [[1,1],[1,1]] // PXL_20251104_112514609.MP.jpg
  },
  
  // --- 6 Pentominoes (5 blocks) ---
  'z-pento-lb': {
    id: 'z-pento-lb',
    color: 'color-l-blue',
    baseShape: [[1,1,0],[0,1,0],[0,1,1]] // PXL_20251104_112537037.MP.jpg
  },
  'x-pento-pk': { 
    id: 'x-pento-pk', 
    color: 'color-pink', 
    baseShape: [[0,1,0],[1,1,1],[0,1,0]] // PXL_20251104_112508499.MP.jpg
  },
  'f-pento-bo': { 
    id: 'f-pento-bo', 
    color: 'color-b-orange', 
    baseShape: [[0,1,1],[1,1,0],[0,1,0]] // PXL_20251104_112534377.MP.jpg
  },
  'u-pento-dg': {
    id: 'u-pento-dg',
    color: 'color-d-green',
    baseShape: [[1,0,1],[1,1,1]] // PXL_20251104_112505346.MP.jpg
  },
  'z-pento-r': { 
    id: 'z-pento-r', 
    color: 'color-red', 
    baseShape: [[1,1,0],[0,1,0],[0,1,1]] // PXL_20251104_112531146.MP.jpg
  },
  't-pento-lg': {
    id: 't-pento-lg',
    color: 'color-l-green',
    baseShape: [[1,1,1],[0,1,0],[0,1,0]] // PXL_20251104_112519070.MP.jpg
  }
};

// --- Processed PIECES object ---
// This is what our main.js file will actually use
const PIECES = {};
for (const id in PIECE_DEFINITIONS) {
  const piece = PIECE_DEFINITIONS[id];
  PIECES[id] = {
    id: piece.id,
    color: piece.color,
    allShapes: generateOrientations(piece.baseShape),
    currentShapeIndex: 0 // We'll track the current rotation
  };
}

console.log('Corrected PIECES object ready:', PIECES);