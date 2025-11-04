// Wait for the HTML document to finish loading
document.addEventListener('DOMContentLoaded', () => {

    // Get the main game containers
    const gameBoard = document.getElementById('game-board');
    const pieceTray = document.getElementById('piece-tray');
    const levelSelector = document.getElementById('level-selector');
    const puzzleTitle = document.getElementById('puzzle-title');
    const resetButton = document.getElementById('reset-button');
    const winModal = document.getElementById('win-modal');
    const nextPuzzleButton = document.getElementById('next-puzzle-button');

    const ROWS = 7;
    const COLS = 7;
    let currentLevel = null;
    let currentlyDraggedPiece = null; // Store the piece element being dragged

    /**
     * Initializes the entire game
     */
    function initGame() {
        createLevelSelector();
        // Load the first puzzle by default
        loadPuzzle(PUZZLES[0].level); 
        
        resetButton.addEventListener('click', () => {
            if (currentLevel) {
                loadPuzzle(currentLevel.level);
            }
        });

        nextPuzzleButton.addEventListener('click', () => {
            const currentIndex = PUZZLES.findIndex(p => p.level === currentLevel.level);
            const nextIndex = (currentIndex + 1) % PUZZLES.length; // Loop back to start
            loadPuzzle(PUZZLES[nextIndex].level);
            winModal.style.display = 'none';
        });

        // Add keyboard listeners for rotation and flipping
        document.addEventListener('keydown', handleKeyPress);
        
        // Add click listener to the board to REMOVE pieces
        gameBoard.addEventListener('click', handleBoardClick);
        // --- NEW: Add dragstart listener to the board to MOVE pieces ---
        gameBoard.addEventListener('dragstart', handleBoardDragStart);
    }

    /**
     * Creates all the level selection buttons
     */
    function createLevelSelector() {
        levelSelector.innerHTML = ''; // Clear old buttons
        for (const puzzle of PUZZLES) {
            const button = document.createElement('button');
            button.classList.add('level-button');
            button.innerText = puzzle.level;
            button.dataset.level = puzzle.level;

            button.addEventListener('click', () => {
                loadPuzzle(puzzle.level);
            });

            levelSelector.appendChild(button);
        }
    }

    /**
     * Loads a specific puzzle by its level ID
     * @param {number} levelId - The ID of the puzzle to load
     */
    function loadPuzzle(levelId) {
        const puzzle = PUZZLES.find(p => p.level === levelId);
        if (!puzzle) {
            console.error(`Puzzle with level ${levelId} not found!`);
            return;
        }

        currentLevel = puzzle;
        puzzleTitle.innerText = `Puzzle #${puzzle.level}`;
        
        // Update active button state
        document.querySelectorAll('.level-button').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.level == levelId);
        });

        createBoard(puzzle);
        renderPieces(puzzle.piecesLeft);
        
        // Ensure win modal is hidden when a new puzzle loads
        winModal.style.display = 'none';
    }

    /**
     * Creates the 7x7 game board grid and places puzzle pieces
     * @param {object} puzzle - The puzzle object from PUZZLES
     */
    function createBoard(puzzle) {
        gameBoard.innerHTML = ''; // Clear board first
        for (let r = 0; r < ROWS; r++) {
            for (let c = 0; c < COLS; c++) {
                const cell = document.createElement('div');
                cell.classList.add('board-cell');
                cell.dataset.row = r;
                cell.dataset.col = c;
                
                // Check if this cell is a "blocked" cell
                if (puzzle.blockedCells.some(coord => coord[0] === r && coord[1] === c)) {
                    cell.classList.add('blocked', 'filled');
                }

                gameBoard.appendChild(cell);
            }
        }
        
        // Now, "paint" the starting pieces onto the new board
        for (const pieceInfo of puzzle.startPieces) {
            const pieceData = PIECES[pieceInfo.id];
            const shape = pieceData.allShapes[pieceInfo.shapeIndex % pieceData.allShapes.length];
            // Pass 'null' for pieceId to mark it as a non-removable start piece
            paintPiece(shape, pieceData.color, pieceInfo.row, pieceInfo.col, null, null, true);
        }
    }

    /**
     * Renders a specific list of pieces into the piece tray
     * @param {string[]} pieceIds - An array of piece IDs to render
     */
    function renderPieces(pieceIds) {
        pieceTray.innerHTML = ''; // Clear tray first
        for (const id of pieceIds) {
            const piece = PIECES[id];
            if (piece) {
                // Reset currentShapeIndex to 0 every time it's rendered
                piece.currentShapeIndex = 0; 
                const pieceEl = createPieceElement(piece);
                pieceTray.appendChild(pieceEl);
            }
        }
    }
    
    /**
     * "Paints" a piece's shape onto the main game board
     * @param {Array<Array<number>>} shape - The 2D matrix of the piece
     * @param {string} color - The CSS color class
     * @param {number} startRow - The top-left row to start painting
     * @param {number} startCol - The top-left col to start painting
     * @param {string | null} pieceId - The ID of the piece, or null if it's a start piece
     * @param {number | null} shapeIndex - The shape index, or null if it's a start piece
     * @param {boolean} isStartPiece - Flag to mark as non-removable
     */
    function paintPiece(shape, color, startRow, startCol, pieceId = null, shapeIndex = null, isStartPiece = false) {
        // Create a unique ID for this specific placement instance
        const instanceId = isStartPiece ? null : crypto.randomUUID(); 

        for (let r = 0; r < shape.length; r++) {
            for (let c = 0; c < shape[0].length; c++) {
                if (shape[r][c] === 1) {
                    const boardRow = startRow + r;
                    const boardCol = startCol + c;
                    
                    const cellToColor = getBoardCell(boardRow, boardCol);
                    
                    if (cellToColor) {
                        // 'filled' class is crucial for collision detection
                        cellToColor.classList.add(color, 'filled');
                        
                        if (isStartPiece) {
                            cellToColor.classList.add('start-piece');
                        } else {
                            // Add data so we can remove it later
                            cellToColor.dataset.instanceId = instanceId;
                            cellToColor.dataset.pieceId = pieceId;
                            // --- NEW: Store shapeIndex and make draggable ---
                            cellToColor.dataset.shapeIndex = shapeIndex;
                            cellToColor.draggable = true;
                        }
                    }
                }
            }
        }
    }

    /**
     * Helper to get a specific cell element by row/col
     */
    function getBoardCell(row, col) {
        return document.querySelector(
            `.board-cell[data-row="${row}"][data-col="${col}"]`
        );
    }

    /**
     * Creates a single draggable HTML element for a piece
     * @param {object} piece - A piece object from the PIECES constant
     * @returns {HTMLElement} A draggable <div> for the piece
     */
    function createPieceElement(piece) {
        const pieceEl = document.createElement('div');
        const { id, color, allShapes, currentShapeIndex } = piece;
        const shape = allShapes[currentShapeIndex];
        const numRows = shape.length;
        const numCols = shape[0].length;

        pieceEl.classList.add('piece');
        pieceEl.draggable = true;
        pieceEl.dataset.pieceId = id; // Store the ID for drag/drop
        pieceEl.dataset.shapeIndex = currentShapeIndex;

        pieceEl.style.gridTemplateRows = `repeat(${numRows}, 25px)`;
        pieceEl.style.gridTemplateColumns = `repeat(${numCols}, 25px)`;

        pieceEl.innerHTML = ''; // Clear old cells
        for (let r = 0; r < numRows; r++) {
            for (let c = 0; c < numCols; c++) {
                if (shape[r][c] === 1) {
                    const cellEl = document.createElement('div');
                    cellEl.classList.add('piece-cell', color);
                    cellEl.style.gridRowStart = r + 1;
                    cellEl.style.gridColumnStart = c + 1;
                    pieceEl.appendChild(cellEl);
                }
            }
        }

        pieceEl.addEventListener('dragstart', handleDragStart);
        pieceEl.addEventListener('dragend', handleDragEnd);
        
        // --- NEW: Add click listeners for rotation/flip in tray ---
        pieceEl.addEventListener('click', rotatePieceInTray);
        pieceEl.addEventListener('contextmenu', flipPieceInTray); // contextmenu = right-click

        return pieceEl;
    }

    /**
     * Re-renders a piece element with a new shape (for rotation/flip)
     * @param {HTMLElement} pieceEl - The piece element to update
     */
    function updatePieceElement(pieceEl) {
        const pieceId = pieceEl.dataset.pieceId;
        const piece = PIECES[pieceId];
        const newShapeIndex = parseInt(pieceEl.dataset.shapeIndex);
        
        // Update the master piece object in memory
        piece.currentShapeIndex = newShapeIndex; 

        const newShape = piece.allShapes[newShapeIndex];
        const numRows = newShape.length;
        const numCols = newShape[0].length;

        pieceEl.style.gridTemplateRows = `repeat(${numRows}, 25px)`;
        pieceEl.style.gridTemplateColumns = `repeat(${numCols}, 25px)`;

        pieceEl.innerHTML = ''; // Clear old cells
        for (let r = 0; r < numRows; r++) {
            for (let c = 0; c < numCols; c++) {
                if (newShape[r][c] === 1) {
                    const cellEl = document.createElement('div');
                    cellEl.classList.add('piece-cell', piece.color);
                    cellEl.style.gridRowStart = r + 1;
                    cellEl.style.gridColumnStart = c + 1;
                    pieceEl.appendChild(cellEl);
                }
            }
        }
    }


    // --- Drag and Drop Event Handlers ---

    function handleDragStart(e) {
        // e.target is the piece element
        e.dataTransfer.setData('text/plain', e.target.dataset.pieceId);
        e.dataTransfer.setData('text/shape-index', e.target.dataset.shapeIndex);
        e.dataTransfer.effectAllowed = 'move';
        
        currentlyDraggedPiece = e.target; // Store reference
        
        // Use setTimeout to allow the browser to render the drag image
        setTimeout(() => e.target.classList.add('dragging'), 0);
    }

    function handleDragEnd(e) {
        // --- UPDATED: Make sure to remove 'dragging' class from the piece ---
        if (currentlyDraggedPiece) {
            currentlyDraggedPiece.classList.remove('dragging');
        }
        currentlyDraggedPiece = null; // Clear reference
    }

    function handleDragOver(e) {
        e.preventDefault(); 
        e.dataTransfer.dropEffect = 'move';
    }

    function handleDrop(e) {
        e.preventDefault();
        
        const pieceId = e.dataTransfer.getData('text/plain');
        const shapeIndex = parseInt(e.dataTransfer.getData('text/shape-index'));
        if (!pieceId || isNaN(shapeIndex)) return;

        const piece = PIECES[pieceId];
        const shape = piece.allShapes[shapeIndex];
        const pieceEl = document.querySelector(`.piece[data-piece-id="${pieceId}"]`);
        const targetCell = e.target.closest('.board-cell');

        if (piece && pieceEl && targetCell) {
            const startRow = parseInt(targetCell.dataset.row);
            const startCol = parseInt(targetCell.dataset.col);
            
            // --- Collision Detection ---
            if (isValidMove(shape, startRow, startCol)) {
                // All checks passed, place the piece!
                // --- UPDATED: Pass pieceId and shapeIndex to paintPiece ---
                paintPiece(shape, piece.color, startRow, startCol, piece.id, shapeIndex, false);
                
                // Remove the piece from the tray
                pieceEl.remove();

                // Check for win
                checkWinCondition();
            } else {
                // Invalid move, do nothing
                console.log("Invalid move!");
            }
        }
    }

    /**
     * Checks if placing a piece is a valid move.
     * @param {Array<Array<number>>} shape - The piece's 2D shape matrix
     * @param {number} startRow - The target top-left row
     * @param {number} startCol - The target top-left col
     * @returns {boolean} - True if the move is valid, false otherwise
     */
    function isValidMove(shape, startRow, startCol) {
        for (let r = 0; r < shape.length; r++) {
            for (let c = 0; c < shape[0].length; c++) {
                if (shape[r][c] === 1) { // Only check filled parts of the piece
                    const boardRow = startRow + r;
                    const boardCol = startCol + c;
                    
                    // 1. Check if it's off the board
                    if (boardRow >= ROWS || boardCol >= COLS) {
                        return false;
                    }
                    
                    const cell = getBoardCell(boardRow, boardCol);
                    
                    // 2. Check if cell exists or is already filled
                    if (!cell || cell.classList.contains('filled')) {
                        return false;
                    }
                }
            }
        }
        return true; // All cells are valid!
    }

    /**
     * Handles keyboard events for rotation and flipping
     */
    function handleKeyPress(e) {
        if (!currentlyDraggedPiece) return; // Only work if dragging

        e.preventDefault();

        const pieceId = currentlyDraggedPiece.dataset.pieceId;
        const piece = PIECES[pieceId];
        let currentShapeIndex = parseInt(currentlyDraggedPiece.dataset.shapeIndex);
        const maxShapes = piece.allShapes.length;

        if (e.key === 'r' || e.key === 'R') {
            // Rotate: cycle through indices
            currentShapeIndex = (currentShapeIndex + 1) % maxShapes;
        } else if (e.key === 'f' || e.key === 'F') {
            // Flip: jump to the flipped half (or back)
            if (maxShapes > 4) { // Assumes 8 shapes (4 rotations, 4 flips)
                 currentShapeIndex = (currentShapeIndex + (maxShapes / 2)) % maxShapes;
            }
        }

        currentlyDraggedPiece.dataset.shapeIndex = currentShapeIndex;
        // Update the visual representation of the piece element
        updatePieceElement(currentlyDraggedPiece);
    }
    
    /**
     * Checks if the piece tray is empty, showing the win modal if true.
     */
    function checkWinCondition() {
        if (pieceTray.children.length === 0) {
            winModal.style.display = 'flex';
        }
    }

    // --- NEW: Functions for in-tray rotation/flip and board removal ---

    /**
     * Rotates a piece when it's clicked IN THE TRAY
     */
    function rotatePieceInTray(e) {
        const pieceEl = e.currentTarget;
        if (pieceEl.classList.contains('dragging')) return; // Don't rotate while dragging
        
        const pieceId = pieceEl.dataset.pieceId;
        const piece = PIECES[pieceId];
        let currentShapeIndex = parseInt(pieceEl.dataset.shapeIndex);
        
        currentShapeIndex = (currentShapeIndex + 1) % piece.allShapes.length;
        
        pieceEl.dataset.shapeIndex = currentShapeIndex;
        updatePieceElement(pieceEl);
    }

Signature: `flipPieceInTray(e)`
    /**
     * Flips a piece when it's right-clicked IN THE TRAY
     */
    function flipPieceInTray(e) {
        e.preventDefault(); // Stop right-click menu
        const pieceEl = e.currentTarget;
        if (pieceEl.classList.contains('dragging')) return;

        const pieceId = pieceEl.dataset.pieceId;
        const piece = PIECES[pieceId];
        let currentShapeIndex = parseInt(pieceEl.dataset.shapeIndex);
        const maxShapes = piece.allShapes.length;

        if (maxShapes > 4) { // Assumes 8 shapes (4 rotations, 4 flips)
            currentShapeIndex = (currentShapeIndex + (maxShapes / 2)) % maxShapes;
        }
        // If it has 4 or fewer shapes, it will just flip to an identical-looking rotation
        
        pieceEl.dataset.shapeIndex = currentShapeIndex;
        updatePieceElement(pieceEl);
    }

    /**
     * Removes a user-placed piece from the board when clicked
     */
    function handleBoardClick(e) {
        const clickedCell = e.target.closest('.board-cell');
        
        // Only act if we click a filled cell that is NOT blocked and NOT a start piece
        if (!clickedCell || !clickedCell.classList.contains('filled') || 
            clickedCell.classList.contains('blocked') || 
            clickedCell.classList.contains('start-piece') ||
            !clickedCell.dataset.instanceId) { // Check for instanceId
            return; 
        }

        const instanceId = clickedCell.dataset.instanceId;
        const { pieceId } = removePieceFromBoard(instanceId);

        if (pieceId) {
            // Add the piece back to the tray with default rotation (index 0)
            addPieceToTray(pieceId, 0); 
            // If the win modal was showing, hide it
            winModal.style.display = 'none';
        }
    }

    // --- NEW: Function to handle starting a drag from the board ---
    /**
     * Handles starting a drag from a piece ALREADY ON THE BOARD
     */
    function handleBoardDragStart(e) {
        const targetCell = e.target.closest('.board-cell');
        
        // Check if it's a valid, user-placed piece
        if (!targetCell || !targetCell.dataset.instanceId || targetCell.classList.contains('start-piece')) {
            e.preventDefault();
            return;
        }
        
        const instanceId = targetCell.dataset.instanceId;
        
        // 1. Remove the piece from the board
        const { pieceId, shapeIndex } = removePieceFromBoard(instanceId);
        
        if (!pieceId) {
            e.preventDefault();
            return;
        }

        // 2. Add it back to the tray, preserving its rotation
        const pieceEl = addPieceToTray(pieceId, shapeIndex); 

        // 3. Set up the drag for this NEW tray piece
        currentlyDraggedPiece = pieceEl; // Set global
        e.dataTransfer.setData('text/plain', pieceId);
        e.dataTransfer.setData('text/shape-index', shapeIndex);
        e.dataTransfer.effectAllowed = 'move';
        
        // Set drag image to the piece, centered
        e.dataTransfer.setDragImage(pieceEl, 25, 25); 

        // Set dragging class immediately
        pieceEl.classList.add('dragging');
    }
    
    // --- NEW HELPER FUNCTIONS ---

    /**
     * Adds a piece to the tray with a specific rotation
     * @param {string} pieceId - The ID of the piece
     * @param {number} shapeIndex - The shape index to use
     * @returns {HTMLElement} The new piece element added to the tray
     */
    function addPieceToTray(pieceId, shapeIndex) {
        const piece = PIECES[pieceId];
        if (!piece) return null;
        
        piece.currentShapeIndex = shapeIndex;
        const pieceEl = createPieceElement(piece);
        pieceTray.appendChild(pieceEl);
        return pieceEl;
    }

    /**
     * Removes a piece from the board based on its instanceId
     * @param {string} instanceId - The unique ID of the piece instance
     * @returns {{pieceId: string | null, shapeIndex: number}}
     */
    function removePieceFromBoard(instanceId) {
        const allCellsOfPiece = document.querySelectorAll(`.board-cell[data-instance-id="${instanceId}"]`);
        if (allCellsOfPiece.length === 0) return { pieceId: null, shapeIndex: -1 };
        
        const pieceId = allCellsOfPiece[0].dataset.pieceId;
        const shapeIndex = parseInt(allCellsOfPiece[0].dataset.shapeIndex);
        const piece = PIECES[pieceId];

        if (!piece) return { pieceId: null, shapeIndex: -1 };

        allCellsOfPiece.forEach(cell => {
            cell.classList.remove('filled', piece.color);
            delete cell.dataset.instanceId;
            delete cell.dataset.pieceId;
            delete cell.dataset.shapeIndex;
            cell.draggable = false;
        });

        return { pieceId, shapeIndex };
    }


    // --- Setup ---

    // Add drop listeners to the entire game board
    gameBoard.addEventListener('dragover', handleDragOver);
    gameBoard.addEventListener('drop', handleDrop);

    // Initialize the game
    initGame();
});


