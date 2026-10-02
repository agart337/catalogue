function changeColor(box) {
    const randomColor = `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255})`;
    box.style.backgroundColor = randomColor;
}

const clickBox = document.getElementById('clickBox');
clickBox.addEventListener('click', function () {
    changeColor(clickBox);
});

const dblclickBox = document.getElementById('dblclickBox');
dblclickBox.addEventListener('dblclick', function () {
    changeColor(dblclickBox);
});

const mousedownBox = document.getElementById('mousedownBox');
mousedownBox.addEventListener('mousedown', function () {
    changeColor(mousedownBox);
});

const mouseoverBox = document.getElementById('mouseoverBox');
mouseoverBox.addEventListener('mouseover', function () {
    changeColor(mouseoverBox);
});

const mousemoveBox = document.getElementById('mousemoveBox');
mousemoveBox.addEventListener('mousemove', function () {
    changeColor(mousemoveBox);
});

const keydownBox = document.getElementById('keydownBox');
document.addEventListener('keydown', function () {
    changeColor(keydownBox);
});

const inputBox = document.getElementById('inputBox');
const inputField = document.getElementById('inputField');
inputField.addEventListener('input', function () {
    changeColor(inputBox);
});

const scrollBox = document.getElementById('scrollBox');
window.addEventListener('scroll', function () {
    changeColor(scrollBox);
});

const resizeBox = document.getElementById('resizeBox');
window.addEventListener('resize', function () {
    changeColor(resizeBox);
});

const loadBox = document.getElementById('loadBox');
window.addEventListener('load', function () {
    changeColor(loadBox);
});