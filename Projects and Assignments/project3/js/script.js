//number of columns and rows
let numCols = 0;
let numRows = 0;

//variable whether to have gridlines
let gridToggle = false;

//width of pixel
const cellWidth = 25;

//space between each pixel
let cellSpacing = 1;

//variable to either erase or draw
let drawMode = true;

//size of brush
let brushSize = 1;

let click = new Audio('media/click.wav');
let grid;
let mouseIsDown = false;

//keys for local storage
const prefix = "jkt1886-";
const rowKey = prefix + "rows";
const colKey = prefix + "cols";
const brushKey = prefix + "brush";

//values from local storage
const storedRow = localStorage.getItem(rowKey);
const storedCol = localStorage.getItem(colKey);
const storedBrush = localStorage.getItem(brushKey);

//set values of elements from local storage
if (storedRow) { document.querySelector("#numRow").value = storedRow };
if (storedCol) { document.querySelector("#numCol").value = storedCol };
if (storedBrush) { document.querySelector("#brushSize").value = storedBrush; brushSize = storedBrush };

//cell array
let cells = [];

//color to change to
let color = "black";

//holds all cells
const container = document.querySelector("#gridContainer");

//add methods to run when buttons clicked
document.querySelector("#makeGrid").onclick = makeGrid;
document.querySelector("#drawMode").onclick = enableDraw;
document.querySelector("#eraseMode").onclick = enableErase;
document.querySelector("#drawMode").disabled = true;

//enable drawing and disable erasing
function enableDraw() {
    click.play();
    drawMode = true;
    document.querySelector("#drawMode").disabled = true;
    document.querySelector("#eraseMode").disabled = false;
}

//enable erasing and disable drawing
function enableErase() {
    click.play();
    drawMode = false;
    document.querySelector("#eraseMode").disabled = true;
    document.querySelector("#drawMode").disabled = false;
}

//makes grid based off of chosen row amount
function makeGrid() {

    //play click noise
    click.play();

    //clears container
    document.querySelector("#gridContainer").innerHTML = "";

    //clears cell array
    cells = [];

    //get row and column amount
    numRows = document.querySelector("#numRow").value;
    numCols = document.querySelector("#numCol").value;
    let gridCheck = document.querySelector("#gridCheck").checked;

    //create a new grid object and make a grid of cells with the information given
    grid = new Grid(numRows, numCols, gridCheck, cells, cellSpacing, container);
    grid.createGrid();
}

//run function when you click on the container
container.onclick = fillCell;

//find the positition of mouse and change color of cell
function fillCell(e) {
    grid.fillCell(brushSize, drawMode, e, color);
}

//stops dragging from highlighting cells and runs fill command when dragged
container.onmousemove = (e) => {
    e.preventDefault();
    if (mouseIsDown) fillCell(e);
};

//set mouseIsDown to true when the mouse is pressed
container.onmousedown = (e) => {
    e.preventDefault();
    mouseIsDown = true;
};

//set mouseIsDown to false when the mouse is not pressed
window.onmouseup = (e) => {
    e.preventDefault();
    mouseIsDown = false;
}

//change color variable when interacting with color chooser
document.querySelector("#colorChooser").onchange = (e) => {
    color = e.target.value;
}

//change size variable when interacting with brush size option, set local storage value
document.querySelector("#brushSize").onchange = (e) => {
    brushSize = e.target.value;
    localStorage.setItem(brushKey, e.target.value);
}

//set local storage value of rows and columns when they are changed
document.querySelector("#numRow").onchange = (e) => { localStorage.setItem(rowKey, e.target.value) };
document.querySelector("#numCol").onchange = (e) => { localStorage.setItem(colKey, e.target.value) };
