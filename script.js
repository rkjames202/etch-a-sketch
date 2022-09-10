/**
 * Calls necessary functions when webpage is loaded 
 */
function main(){
    createGrid(16);
    addEventListeners();
}

/**
 * Creates a 'size' x 'size' grid row by row
 * 
 * @param size - number of boxes inside of grid 
 */
function createGrid(size){
    //Reference to grid/pad 
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
    addBoxEventListeners();
    addButtonEventListeners();
    addSliderEventListener();
}


/**
 * Adds event listeners to each box inside of the grid
 * depending on what 'mode' is active
 * 
 * @param color = color of boxes inside grid 
 * @returns nothing
 */
function addBoxEventListeners(color){
    //Reference to boxes
    const boxes = document.querySelectorAll('.box');

    //The two following if statements check for erase and rainbow mode
    //Erase mode has higher precedence than rainbow
    if(checkEraseMode()){
        boxes.forEach((box) => box.addEventListener('mouseover', getEraseColor));
        return; //Will exit function once event listener is added
    } else {
        boxes.forEach((box) => box.removeEventListener('mouseover', getEraseColor));
    }

    if(checkRainbowMode()){
        boxes.forEach((box) => box.addEventListener('mouseover', getRainbowColors));
        return;
    }else{
        boxes.forEach((box) => box.removeEventListener('mouseover', getRainbowColors));
    }

    //If no mode is active, default to parameter or color picker value
    if(arguments[0]){
        boxes.forEach((box) => box.addEventListener('mouseover', () => box.style.backgroundColor = color));

    }else{
        boxes.forEach((box) => box.addEventListener('mouseover', getColorPickerValue));
        
    } 
}

/**
 * Adds event listeners to buttons
 */
function addButtonEventListeners(){
    //Clear button
    const clearButton = document.querySelector('.clear-button');
    clearButton.addEventListener('click', clearGrid);

    //Erase button
    const eraseButton = document.querySelector('.erase-button');
    eraseButton.addEventListener('click', eraseGrid);

    //Apply button
    const applyButton = document.querySelector('.apply-button');
    applyButton.addEventListener('click', changeGridSize);

    //Color Picker
    const colorPicker = document.querySelector('#color-picker');
    colorPicker.addEventListener('input', changeColor);

    //RainbowButton
    const rainbowButton = document.querySelector('.rainbow-button');
    rainbowButton.addEventListener('click', activateRainbow);
}

/**
 * Adds event listener to slider, 
 * displaying grid size on webpage 
 */
function addSliderEventListener(){
        //Slider and current value in slider
        const slider = document.querySelector('#grid-size');
        const sliderValue = document.querySelector('.slider-value');

        //Display current slider value on change
        slider.addEventListener('input', () => sliderValue.innerText = `${slider.value} x ${slider.value}`);
}

/**
 * **Callback function
 * Clears grid
 */
function clearGrid(){
    //Each box in grid
    const boxes = document.querySelectorAll('.box');

    //Changes all boxes' background back to original color
    boxes.forEach((box) => box.style.backgroundColor = 'white');

    //Turn erase mode off
    turnOffEraseMode();

    //Re-add box listeners
    addBoxEventListeners();
}


/**
 * **Callback function
 * Sets grid to 'erase' mode
 */
function eraseGrid(){  
    
    //Lets user alternate between drawing and erasing
    if(this.classList.contains('erasing')){  
        this.innerText = 'Erase'; 
        this.classList.remove('erasing');
    } else {
        this.innerText = 'Erasing'; 
        this.classList.add('erasing');   
    }

    //Re-add box listeners to detect erase mode
    addBoxEventListeners();

}

/**
 * Gets the color for applied to boxes in
 * erase mode
 */
function getEraseColor(){
    this.style.backgroundColor = 'white';
}

/**
 * Turns off erase mode 
 * Used in any function that isn't eraseGrid();
 */
function turnOffEraseMode(){
    const eraseButton = document.querySelector('.erase-button');
    eraseButton.innerText = 'Erase';
    eraseButton.classList.remove('erasing');
}

/**
 * Checks if erase mode is active
 * 
 * @returns if erase mode is active
 */
 function checkEraseMode(){
    const eraseButton = document.querySelector('.erase-button');

    if (eraseButton.innerText === 'Erasing') return true;

    return false;
}

/**
 * Changes the size of grid
 * 
 * @returns nothing
 */
function changeGridSize(){
    //Get slider value and grid reference
    let sliderValue = document.querySelector('#grid-size').value;
    const grid = document.querySelector('.grid'); 

    //Get current size of rows
    const row = document.querySelector('.row');
    let rowSize = row.querySelectorAll('.box').length;
    
    //Error message below apply button
    const errorMessage = document.querySelector('.grid-error-message');

    //If the slider hasn't moved, display error message and exit function 
    if(rowSize == sliderValue){
        errorMessage.style.visibility = 'visible';
        return;
    } else{
        errorMessage.style.visibility = 'hidden'; 
    }

    //Turn erase mode off
    turnOffEraseMode();

    //Remove all elements from grid
    while(grid.firstChild){
        grid.removeChild(grid.firstChild);
    }

    //Create new grid
    createGrid(sliderValue);

    //Re-add box listeners to new grid
    addBoxEventListeners();

}

/**
 * Change the drawing color of grid
 */
function changeColor(){
    //Re-add box listeners to get color in color picker
    addBoxEventListeners();
    //Changes background of input element to make the selected color
    this.style.backgroundColor = `${this.value}`;
}


/**
 * Gets value of color picker
 */
function getColorPickerValue(){
    let color = document.querySelector('#color-picker').value;
    this.style.backgroundColor = color;
}

/**
 * Activates/deactivates 'rainbow mode
 */
function activateRainbow(){  
    //If 'rainbow' mode is deactivate it, if not activate it
    if(this.classList.contains('rainbow-button-active')){       
        
        this.classList.remove('rainbow-button-active');           
        addBoxEventListeners(); 
    
    } else {
        
        this.classList.add('rainbow-button-active');
        addBoxEventListeners();
    
    }
}

/**
 * Get random rgb values each time event
 * is fired in 'rainbow' mode
 */
function getRainbowColors(){
            this.style.backgroundColor = `rgb(${Math.floor(Math.random()*255) +1},
                                            ${Math.floor(Math.random()*255) +1},
                                            ${Math.floor(Math.random()*255) +1})`
}

/**
 * Checks if rainbow mode is active
 * 
 * @returns if rainbow mode is active 
 */
function checkRainbowMode(){
    
    const rainbowButton = document.querySelector('.rainbow-button');

    if(rainbowButton.classList.contains('rainbow-button-active')) return true;

    //If not return false
    return false;

}




main();