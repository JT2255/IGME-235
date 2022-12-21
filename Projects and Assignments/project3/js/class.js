//grid class that holds methods for creating grid and drawing on it
class Grid {
    constructor(numRows, numCols, gridCheck, cells, cellSpacing, container) {
        this.numRows = numRows;
        this.numCols = numCols;
        this.gridCheck = gridCheck;
        this.cells = cells;
        this.cellSpacing = cellSpacing;
        this.container = container;
    }

    //creates a grid and fills it with cells
    createGrid() {
        if (this.gridCheck) {
            cellSpacing = 1;
        }
        else { cellSpacing = 0; }

        //make span to hold cells in
        const span = document.createElement('span');
        span.className = 'cell';

        //create grid of cells
        for (let row = 0; row < numRows; row++) {

            cells.push([]);

            for (let col = 0; col < numCols; col++) {
                let cell = span.cloneNode();
                cell.style.left = `${col * (cellWidth + cellSpacing)}px`;
                cell.style.top = `${row * (cellWidth + cellSpacing)}px`;
                container.appendChild(cell);
                cells[row][col] = cell;
            }
        }
    }

    //fills cells clicked on with selected color and changes with size option
    fillCell(pixels, drawMode, e, color) {
        let rect = container.getBoundingClientRect();
        let mouseX = e.clientX - rect.left;
        let mouseY = e.clientY - rect.top;
        let columnWidth = cellWidth + cellSpacing;
        let col = Math.floor(mouseX / columnWidth);
        let row = Math.floor(mouseY / columnWidth);
        let selectedCell = cells[row][col];


        if (pixels == 1) {
            if (drawMode) {
                e.target.style.backgroundColor = color;
            }
            else {
                e.target.style.backgroundColor = "#FFFFFF";
            }
        }
        //if pixel size is 4, loop through 4 cells and change all of their colors
        else if (pixels == 4) {
            try {
                for (let i = 0; i < 2; i++) {
                    for (let j = 0; j < 2; j++) {
                        if (drawMode) {
                            selectedCell = cells[row + i][col + j];
                            selectedCell.className = 'cellSelected';
                            selectedCell.style.backgroundColor = color;
                        }
                        else {
                            selectedCell = cells[row + i][col + j];
                            selectedCell.className = 'cellSelected';
                            selectedCell.style.backgroundColor = "#FFFFFF";
                        }
                    }
                }
            }
            catch { console.log("Tile doesn't exist, not filling.") }
        }
        //if pixel size is 9, loop through 4 cells and change all of their colors
        else if (pixels == 9) {
            try {
                for (let i = 0; i < 3; i++) {
                    for (let j = 0; j < 3; j++) {
                        if (drawMode) {
                            selectedCell = cells[row + i][col + j];
                            selectedCell.className = 'cellSelected';
                            selectedCell.style.backgroundColor = color;
                        }
                        else {
                            selectedCell = cells[row + i][col + j];
                            selectedCell.className = 'cellSelected';
                            selectedCell.style.backgroundColor = "#FFFFFF";
                        }
                    }
                }
            }
            catch { console.log("Tile doesn't exist, not filling,") }
        }
    }
}