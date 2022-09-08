/**
 * Calls necessary functions
 */
function main(){
    createGrid();
    addEventListeners();
}

function createGrid(size){
    //Reference to container element
    const grid = document.querySelector(".grid");

    //For each row...
    for(let i = 0; i < size; i++){
        const row = document.createElement('div');
        row.classList.add('row')
        grid.appendChild(row);
        
        //Make 'size' amount of boxes
        for(let n = 0; n < size; n++){     
            let box = document.createElement('div');
            box.classList.add('box');
            row.appendChild(box);
        }
    }

}

/**
 * Adds event listeners to elements 
 */
function addEventListeners(){
    //For each box in grid
    boxes = document.querySelectorAll('.box');
    boxes.forEach((box) => box.addEventListener('mouseover', changeBoxColor));

    //Clear button
    clearButton = document.querySelector('.clear-button');
    clearButton.addEventListener('click', clearGrid);

    //Erase button
    eraseButton = document.querySelector('.erase-button');
    eraseButton.addEventListener

}

/**
 * Callback function for all of the boxes in
 * grid
 */
function changeBoxColor(){
    //Change each boxes background to black
    this.style.backgroundColor = 'black';
}

/**
 * Callback function for clear button
 */
function clearGrid(){
    //Changes all boxes' background back to original color
    boxes = document.querySelectorAll('.box');
    boxes.forEach((box) => box.style.backgroundColor = 'white');
}


function eraseGrid(){
/**
 * Let user know they are in erase mode, change button text to 'Draw'
 */
}


main();