document.addEventListener('DOMContentLoaded', function() {

    const letters = ['a', 'w', 'e', 'e', 'k', 'e', 'n', 'd', 'a', 'w', 'a', 'y', 'i', 'n', 'd', 'e', 's', 't', 'i', 'n', 'f', 'l', 'o', 'r', 'i', 'd', 'a', 'w', 'i', 't', 'h', 't', 'h', 'e', 'a', 'm', 'o', 'h', 's'];
    const divRiddle = document.querySelector('.riddle');

    // randomize the letters array
    letters.sort(() => Math.random() - 0.5);

    //create a 4x10 grid in the div with class riddle and place the letters from the array in the grid randomly
    for (let i = 0; i < 39; i++) {
        const div = document.createElement('div');
        div.classList.add('letter');
        div.textContent = letters[i];
        divRiddle.appendChild(div);
    }
    
    //when a letter is clicked, it will be highlighted and appended to the input field with class selected
    const letterDivs = document.querySelectorAll('.letter');
    letterDivs.forEach(letter => {
        letter.addEventListener('click', function() {
            const selectedInput = document.querySelector('.selected');
            //add the selected letter to the value of the input field if the length of the value is less than the maxsize of the input field
            if (selectedInput.value.length < selectedInput.maxLength) {
                selectedInput.value = selectedInput.value + letter.textContent.toUpperCase();
                letter.classList.add('found');
            }            
        });
    });

    //when an input field is selected, add the class selected to it and remove it from the other input fields
    const inputFields = document.querySelectorAll('input');
    inputFields.forEach(input => {
        input.addEventListener('click', function() {
            inputFields.forEach(input => {
                input.classList.remove('selected');
            });
            input.classList.add('selected');
        });
    });

    //if the value of an input field matches the attribute data-answer, add the class correct to it
    inputFields.forEach(input => {
        input.addEventListener('input', function() {
            if (input.value.toLowerCase() == input.dataset.answer) {
                input.classList.add('correct');
            }else {
                input.classList.remove('correct');
            }
        });
    });

    // check all input fields every 2 seconds to see if their value matches the attribute data-answer and add the class correct to it if they do
    setInterval(function() {
        inputFields.forEach(input => {
            if (input.value.toLowerCase() == input.dataset.answer) {
                input.classList.add('correct');
            }
        });
    }, 2000);

    //on double click, clear the value of the input field
    inputFields.forEach(input => {
        input.addEventListener('dblclick', function() {
            input.value = '';
        });
    });

    //on click of Reset button, clear the value of all input fields and remove the found and correct classes from all letters
    const resetButton = document.querySelector('.reset');
    resetButton.addEventListener('click', function() {
        inputFields.forEach(input => {
            input.value = '';
        });
        letterDivs.forEach(letter => {
            letter.classList.remove('found');
        });
        inputFields.forEach(input => {
            input.classList.remove('correct');
        });
    });

    //on click of the Solve button, remove the class clue from the div with class clue
    const solveButton = document.querySelector('.solve');
    solveButton.addEventListener('click', function() {
        const clueDiv = document.querySelector('.clue');
        clueDiv.classList.remove('clue');
        //hide the Solve button
        solveButton.classList.add('clue');
    });

});