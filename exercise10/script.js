const pad = document.getElementById('pad');
let isDrawing = false;

pad.addEventListener('mousedown', function (event) {
    isDrawing = true;
});

pad.addEventListener('mouseup', function (event) {
    isDrawing = false;
});

pad.addEventListener('mousemove', function (event) {
    if (!isDrawing) return;

    const x = event.offsetX;
    const y = event.offsetY;

    const dot = document.createElement('div');
    dot.style.width = '6px';
    dot.style.height = '6px';
    dot.style.borderRadius = '50%';
    dot.style.backgroundColor = 'black';
    dot.style.position = 'absolute';

    dot.style.left = `${x - 3}px`;
    dot.style.top = `${y - 3}px`;

    dot.style.pointerEvents = 'none';

    pad.append(dot);
});