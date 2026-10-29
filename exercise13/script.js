const time = document.querySelector('#time');
const place = document.querySelector('#place');
const image = document.querySelector('#image');

let cameraList;
let camera;

function nextCamera() {
    camera = cameraList[Math.floor(Math.random() * cameraList.length)];
}

function updatePage() {
    time.textContent = new Date().toLocaleTimeString('en-US', { timeZone: 'America/New_York' });
    place.textContent = camera.name;
    image.src = `${camera.imageUrl}?nocache=${Math.random()}`;
}

async function start() {

    const response = await fetch('cameras.json');
    cameraList = await response.json();

    nextCamera();
    updatePage();
    setInterval(updatePage, 1000);
    setInterval(nextCamera, 5000);
}

start();