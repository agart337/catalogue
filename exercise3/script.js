// This is a function declaration named "addBox". "rotation" and "color" are its parameters - placeholders I came up with,that get filled in with real values every time the function is called, further down.
function addBox(rotation, color) {

    // document.createElement() is a DOM method.It builds a brand new <div> element, but it only exists in memory so far; it is not on the page yet.
    const box = document.createElement('div');

    // .style lets us set inline CSS properties directly from JavaScript, the same way we did with paragraph.style.color in class.
    box.style.width = '250px';
    box.style.height = '250px';
    box.style.backgroundColor = color;

    // string concatenation (joining strings with +) 'rotate(' + rotation + 'deg)'
    box.style.transform = `rotate(${rotation}deg)`;

    // appendChild() is the DOM method that actually inserts our new element into the page, as a child of document.body. Until this line runs, "box" is invisible - this is the step that makes it show up.
    document.body.appendChild(box);
}

// An array literal: a list of values stored in one variable.
const colors = [
    'red', 'orange', 'yellow', 'green', 'blue', 'purple',
    'pink', 'brown', 'teal', 'navy', 'maroon', 'olive',
    'lime', 'cyan', 'magenta', 'gold', 'coral', 'turquoise',
    'indigo', 'violet'
];

// colorIndex keeps track of which position in the colors array we're currently reading from. An array's index is its position, starting at 0
let colorIndex = 0;


for (let boxIndex = 0; boxIndex < 300; boxIndex++) {
    while (colorIndex >= colors.length) {
        colorIndex = 0;
    }

    const currentColor = colors[colorIndex];

    setTimeout(function () {
        addBox(boxIndex * 22.5, currentColor);
    }, 1000 * boxIndex);
    colorIndex++;
}





// // A for loop with 300 iterations - it runs its code block once for every value of i from 0 up to 299. i is the loop counter.
// for (let i = 0; i < 300; i = i + 1) {

//     // An if statement (conditional logic): once colorIndex reaches the
//     // end of the array (colors.length, which is 20), there is no
//     // colors[20] to read - so we reset colorIndex back to 0. This is
//     // what makes our 20 colors repeat over and over across 300 boxes.
//     if (colorIndex >= colors.length) {
//         colorIndex = 0;
//     }

//     // Calling our addBox function and passing it two arguments:
//     // 1. i * 22.5 - the rotation, in degrees, for this box. Since i grows by 1 every iteration, every new box is rotated 22.5deg further than the one before it.
//     // 2. colors[colorIndex] - reads whichever color the array is currently pointing at.
//     addBox(i * 22.5, colors[colorIndex]);

//     // move our pointer to the next color, ready for the next iteration
//     colorIndex = colorIndex + 1;
// }
