let gridFull = false;
let prevSquaresEachSide = 0;

/*working on rerendering grid with each new slider input*/
function populateGrid(grid, numSquaresEachSide) {
    if (gridFull == true) {
        for (let i = 0; i < prevSquaresEachSide**2; i++){
            grid.removeChild(gridItem);
        };
    }
    else {
        for (let i = 0; i < numSquaresEachSide**2; i++){
            const gridItem = document.createElement('div');
            gridItem.className = "grid-item";
            gridItem.style.width = "calc(60vw / "+numSquaresEachSide+")";
            gridItem.style.height = "calc(60vw / "+numSquaresEachSide+")";
            grid.appendChild(gridItem);
        };
        let gridFull = true;
        prevSquaresEachSide = numSquaresEachSide;
    }
};

function changeColorOnHover(newColor) {
    const squares = document.querySelectorAll(".grid-item");
    squares.forEach((square) => {
        square.addEventListener('mouseenter', () => {
            square.style.backgroundColor = newColor;
        });

        square.addEventListener('mouseleave', () => {
            square.style.backgroundColor = "black";
        });
    });
};

const header = document.querySelector('.header');
header.textContent = "Etch-a-Sketch";

const container = document.querySelector('.container');

/*create grid element and append to container*/
const grid = document.createElement('div');
grid.className = "grid";
populateGrid(grid, 20);
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
slider.max = "100";
slider.value = "55";
slideContainer.appendChild(slider);
inputPanel.appendChild(slideContainer);

const input = document.querySelector('input');
input.addEventListener("input", function () {
    populateGrid(grid, input.value);
});

changeColorOnHover("aqua");