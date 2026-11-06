const pad = document.querySelector('#pad');
let isDrawing = false;
let dotsArray = [];

function drawDot(dotX, dotY) {
    const dot = document.createElement('div');
    dot.style.width = '6px';
    dot.style.height = '6px';
    dot.style.borderRadius = '50%';
    dot.style.backgroundColor = 'black';
    dot.style.position = 'absolute';
    dot.style.left = `${dotX - 3}px`;
    dot.style.top = `${dotY - 3}px`;

    dot.style.pointerEvents = 'none';

    pad.append(dot);
}

pad.addEventListener('mousedown', function () {
    isDrawing = true;
});

pad.addEventListener('mousemove', function (event) {
    if (isDrawing) {
        const mouseX = event.offsetX;
        const mouseY = event.offsetY;
        drawDot(mouseX, mouseY);
        dotsArray.push({ x: mouseX, y: mouseY });
    }
});

document.addEventListener('mouseup', function () {
    isDrawing = false;
    localStorage.setItem('drawing-pad', JSON.stringify(dotsArray));
});

const savedJSON = localStorage.getItem('drawing-pad');

if (savedJSON) {
    dotsArray = JSON.parse(savedJSON);
    dotsArray.forEach(function (savedDot) {
        drawDot(savedDot.x, savedDot.y);
    });
}

const clearButton = document.querySelector('#clearButton');

clearButton.addEventListener('click', function () {
    localStorage.removeItem('drawing-pad');
    dotsArray = [];
    pad.innerHTML = '';
});