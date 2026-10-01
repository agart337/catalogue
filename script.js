const ballCanvas = document.querySelector("#ballCanvas");
const bctx = ballCanvas.getContext("2d");

function resizeBallCanvas() {
    ballCanvas.width = window.innerWidth;
    ballCanvas.height = window.innerHeight;
    ballCanvas.style.width = window.innerWidth + "px";
    ballCanvas.style.height = window.innerHeight + "px";
}
resizeBallCanvas();
window.addEventListener("resize", resizeBallCanvas);

const BLUE = "rgb(0, 200, 255)";
const PINK = "rgb(255, 39, 122)";

const ball = {
    x: window.innerWidth / 2,
    y: window.innerHeight / 2,
    radius: 55,
    dx: 2.5,
    dy: 2.5,
    moving: true
};

function drawBall() {
    bctx.clearRect(0, 0, ballCanvas.width, ballCanvas.height);
    bctx.beginPath();
    bctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    bctx.fillStyle = ball.moving ? BLUE : PINK;
    bctx.fill();
    bctx.closePath();
}

function updateBall() {
    if (ball.moving) {
        ball.x += ball.dx;
        ball.y += ball.dy;

        if (ball.x + ball.radius > ballCanvas.width || ball.x - ball.radius < 0) {
            ball.dx *= -1;
            ball.x = Math.max(ball.radius, Math.min(ball.x, ballCanvas.width - ball.radius));
        }
        if (ball.y + ball.radius > ballCanvas.height || ball.y - ball.radius < 0) {
            ball.dy *= -1;
            ball.y = Math.max(ball.radius, Math.min(ball.y, ballCanvas.height - ball.radius));
        }
    }

    drawBall();
    requestAnimationFrame(updateBall);
}
updateBall();

document.addEventListener("click", (event) => {
    const distance = Math.hypot(event.clientX - ball.x, event.clientY - ball.y);

    if (distance <= ball.radius) {
        ball.moving = !ball.moving;
    }
});

// week 1
let details = document.querySelector(".faqs")
details.addEventListener("toggle", (event) => {
    let mirrorDetails = document.querySelector("#mirror .faqs")

    if (details.open) {
        mirrorDetails.open = true
    } else {
        mirrorDetails.open = false
    }
});

let main = document.querySelector("#main")
let mirror = main.cloneNode(true);
mirror.inert = true
mirror.style.cssText = `
  position: absolute;
  max-width: 500px;
  margin: 0 auto;
  top: 0;
  right: 0;
  left: 0;
  transform: scaleX(-1);
  overflow: hidden;
  z-index: -10;
  opacity: 8%;
  pointer-events: none;
`;
mirror.ariaHidden = true
mirror.id = "mirror"
main.after(mirror)

let mirrorItems = document.querySelectorAll("#mirror > .pitch p, #mirror > .services, #mirror > h1, #mirror > header, #mirror > .addendum, #mirror > .addendum2")
mirrorItems.forEach((mirrored) => {
    let skew = Math.random() * (1 - 0) + 0;
    mirrored.style.transform = `skew(${skew}deg, -${skew}deg)`
});