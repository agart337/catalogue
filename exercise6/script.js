const image = document.getElementById('myImage');
image.addEventListener('click', changeImage);

function changeImage() {
    const body = document.body;

    if (image.getAttribute('src') === "https://github.com/severinbunse/Javascript-2026/blob/main/images/lightOn.png?raw=true") {
        image.src = "https://github.com/severinbunse/Javascript-2026/blob/main/images/lightOff.png?raw=true";
        body.style.backgroundColor = "black";
    } else {
        image.src = "https://github.com/severinbunse/Javascript-2026/blob/main/images/lightOn.png?raw=true";
        body.style.backgroundColor = "white";
    }
}