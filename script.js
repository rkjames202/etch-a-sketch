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
    boxes = document.querySelectorAll('.box');
    boxes.forEach((box) => box.addEventListener('mouseover', 
                                                () => box.style.backgroundColor = 'black'));

    //Clear button
    clearButton = document.querySelector('.clear-button');
    clearButton.addEventListener('click', clearGrid);

    //Erase button
    eraseButton = document.querySelector('.erase-button');
    eraseButton.addEventListener('click', eraseGrid)

}

/**
 * Callback function for clear button
 */
function clearGrid(){
    //Changes all boxes' background back to original color
    boxes = document.querySelectorAll('.box');
    boxes.forEach((box) => box.style.backgroundColor = 'white');
}

/*
* TODO: add slider to choose grid size
        do 'extra credit' portion
        add more css to website
        **commit along the way
*/

function eraseGrid(){
    
    //Reference to box elements in grid
    boxes = document.querySelectorAll('.box');
    
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


main();