let gridFull = false;
let prevSquaresEachSide = 0;
let gridStartSize = 30;
let drawingColor = "aqua";
let rootColor = "black";
let isErasing = false;

/*create grid or change grid resolution*/
function populateGrid(grid, numSquaresEachSide) {
    if (gridFull == true) {
        while (grid.firstChild) {
            grid.removeChild(grid.firstChild);
        }
        gridFull = false;
        populateGrid(grid, numSquaresEachSide);
    }
    else {
        for (let i = 0; i < numSquaresEachSide**2; i++){
            let gridItem = document.createElement('div');
            gridItem.className = "grid-item";
            gridItem.style.width = "calc(60vw / "+numSquaresEachSide+")";
            gridItem.style.height = "calc(60vw / "+numSquaresEachSide+")";
            grid.appendChild(gridItem);
        };
        gridFull = true;
        draw(drawingColor);
    }
};

function draw(newColor) {
    const squares = document.querySelectorAll(".grid-item");
    squares.forEach((square) => {
        square.addEventListener('mouseover', evt => {
            if (evt.buttons === 1) {
                if (isErasing==false){
                    square.style.backgroundColor = newColor;
                }
                else {square.style.backgroundColor = rootColor};
            }
        });
    });
};

function clearGrid(rootColor) {
    const squares = document.querySelectorAll(".grid-item");
    squares.forEach((square) => {
            square.style.backgroundColor = rootColor;
        });
    };


/*Header content*/
const header = document.querySelector('.header');
header.textContent = "Etch-a-Sketch";

/*create grid element and append to container*/
const container = document.querySelector('.container');
const grid = document.createElement('div');
grid.className = "grid";
populateGrid(grid, gridStartSize);
container.appendChild(grid);

/*create inputPanel element and append to container*/
const inputPanel = document.createElement('div');
inputPanel.className = "inputPanel";
container.prepend(inputPanel);

/*create range slider for grid resolution (gridItem size)*/
const slideContainer = document.createElement('div');
slideContainer.className = "slidecontainer";
const slider = document.createElement('input');
slider.className = "slider";
slider.type = "range";
slider.min = "10";
slider.max = "50";
slider.value = gridStartSize;
slideContainer.textContent = slider.value + " x " + slider.value;
slideContainer.appendChild(slider);
inputPanel.appendChild(slideContainer);

/*draw button*/
const drawBtn = document.createElement('button');
drawBtn.textContent = "Draw";
drawBtn.classList.add("buttonInUse");
inputPanel.appendChild(drawBtn);

/*erase button*/
const eraseBtn = document.createElement('button');
eraseBtn.textContent = "Erase";
inputPanel.appendChild(eraseBtn);

/*clear button*/
const clearBtn = document.createElement('button');
clearBtn.textContent = "Clear";
inputPanel.appendChild(clearBtn);

/*Event Listeners*/
const input = document.querySelector('input');
input.addEventListener("input", function () {
    populateGrid(grid, input.value);
});
input.addEventListener("mouseup", () => {
    slideContainer.textContent = slider.value + " x " + slider.value;
    slideContainer.appendChild(slider);
})

drawBtn.addEventListener("click", () => {
    isErasing = false;
    drawBtn.classList.add('buttonInUse');
    eraseBtn.classList.remove("buttonInUse");
});

eraseBtn.addEventListener("click", () => {
    isErasing = true;
    drawBtn.classList.remove('buttonInUse');
    eraseBtn.classList.add("buttonInUse");
});

clearBtn.addEventListener("click", function () {
    clearGrid(rootColor);
});

draw(drawingColor);