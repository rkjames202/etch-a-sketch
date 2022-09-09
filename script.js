/**
 * Calls necessary functions
 */
function main(){
    createGrid(16);
    addEventListeners();
}

function createGrid(size){
    //Reference to container element
    const grid = document.querySelector(".grid");

    //Create 'size' amount of rows
    for(let i = 0; i < size; i++){
        const row = document.createElement('div');
        row.classList.add('row')
        grid.appendChild(row);
        
        //Fill each row with with 'size amount of boxes
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
    const boxes = document.querySelectorAll('.box');
    boxes.forEach((box) => box.addEventListener('mouseover', 
                                                () => box.style.backgroundColor = 'black'));

    //Clear button
    const clearButton = document.querySelector('.clear-button');
    clearButton.addEventListener('click', clearGrid);

    //Erase button
    const eraseButton = document.querySelector('.erase-button');
    eraseButton.addEventListener('click', eraseGrid);

    //Slider
    const slider = document.querySelector('#grid-size');
    const sliderValue = document.querySelector('.slider-value');

    slider.addEventListener('input', () => sliderValue.innerText = `${slider.value} x ${slider.value}`);

    //Apply button
    const applyButton = document.querySelector('.apply-button');

    applyButton.addEventListener('click', changeGridSize);

}

/**
 * Callback function for clear button
 */
function clearGrid(){
    const boxes = document.querySelectorAll('.box');

    //Changes all boxes' background back to original color
    boxes.forEach((box) => box.style.backgroundColor = 'white');
}

/*
* TODO: let user know they are in erase mode
        separate each event listener into its own function
        have addEventListeners call each function
        add color picker button
        do 'extra credit' portion, rainbow mode button
        add more css to website
        **commit along the way
*/

function eraseGrid(){
    
    //Reference to box elements in grid
    const boxes = document.querySelectorAll('.box');
    
    //Lets user alternate between drawing and erasing
    if(this.innerText === 'Erase'){    
        this.innerText = 'Draw'; 
        boxes.forEach((box) => box.addEventListener('mouseover', 
                                                    () => box.style.backgroundColor = 'white'));
    } else if(this.innerText === 'Draw'){
        this.innerText = 'Erase';
        boxes.forEach((box) => box.addEventListener('mouseover', 
                                                    () => box.style.backgroundColor = 'black'));
    }

}

function changeGridSize(){
    //Get slider value and rows reference
    const sliderValue = document.querySelector('#grid-size').value;
    const grid = document.querySelector('.grid');

    //Set erase button back to original text 
    //Draw mode will be on by default after changing grid size
    const eraseButton = document.querySelector('.erase-button');
    eraseButton.innerText = 'Erase';

    //Remove all elements from grid
    while(grid.firstChild){
        console.log(grid.firstChild);
        grid.removeChild(grid.firstChild);
    }

    //Create new grid
    createGrid(sliderValue);


    //TODO: just add grid even listener
    addEventListeners();
}

    


main();