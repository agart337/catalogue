// window.addEventListener('mousemove', function (event) {
//     console.log(event);
// });


// PAGE INFORMATION ON CLICK
// const textBox = document.getElementById('textBox');

// textBox.addEventListener('click', function (event) {

//     console.log('clientX', event.clientX);
//     console.log('pageX', event.pageX);
//     console.log('screenX', event.screenX);
//     console.log('offsetX', event.offsetX);

// });


// BG COLOUR CHANGE ON HOVER
// document.addEventListener('mousemove', function (event) {
//     const hue = (event.clientX / window.innerWidth) * 360;
//     const lightness = (event.clientY / window.innerHeight) * 100;

//     document.body.style.backgroundColor = `hsl(${hue}, 100%, ${lightness}%)`;
// }
// )


// @ts-check

function addBox(event) {
    const mouseX = event.clientX;
    const mouseY = event.clientY;

    const randomColor = `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255})`

    const box = document.createElement('div');
    box.style.width = '100px';
    box.style.height = '100px';
    box.style.borderRadius = '50%';
    box.style.backgroundColor = randomColor;
    box.style.position = 'absolute';
    box.style.left = `${mouseX - 50}px`;
    box.style.top = `${mouseY - 50}px`;

    document.body.append(box);
};

document.addEventListener('mousemove', addBox);
