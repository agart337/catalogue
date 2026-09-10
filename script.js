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
  padding:0 1rem;
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

// week 2
const canvas = document.getElementById('bg-effect');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

function animate() {
    // your drawing/animation logic goes here
    requestAnimationFrame(animate);
}
animate();