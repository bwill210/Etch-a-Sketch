let gridFull = false;
let prevSquaresEachSide = 0;
let gridStartSize = 30;
let hoverColor = "aqua";
let rootColor = "black";

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
        changeColorOnHover(hoverColor);
    }
};

function changeColorOnHover(newColor) {
    const squares = document.querySelectorAll(".grid-item");
    squares.forEach((square) => {
        square.addEventListener('mouseenter', () => {
            square.style.backgroundColor = newColor;
        });
    });
};

function eraseGrid(rootColor) {
    const squares = document.querySelectorAll(".grid-item");
    squares.forEach((square) => {
            square.style.backgroundColor = "black";
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
slideContainer.appendChild(slider);
inputPanel.appendChild(slideContainer);

/*clear button*/
const clearBtn = document.createElement('button');
clearBtn.textContent = "Clear";
inputPanel.appendChild(clearBtn);


/*Event Listeners*/
const input = document.querySelector('input');
input.addEventListener("input", function () {
    populateGrid(grid, input.value);
});

clearBtn.addEventListener("click", function () {
    eraseGrid(rootColor);
});

changeColorOnHover(hoverColor);