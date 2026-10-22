// Array of flowers.
let flowers = [];

function setup() {
    createCanvas(1600, 800);

    // Generate 20 flowers.
    flowerPower();
}
function draw() {
    background("white");
    updateAndDrawFlowers()
}

// Function to create 20 flowers.
function flowerPower() {
    for (let i = 0; i < 20; i += 1) {
        // Create a flower in a random location.
        let flower = createFlower();

        // Add the flower to the flowers array.
        flowers.push(flower);
    }
}

// ... createFlower() and drawFlower()
function createFlower() {
    let flower = {
        x: random(20, 1900),
        y: random(20, 700),
        size: random(40, 150),
        lifespan: random(255, 300),
        color: color(random(255), random(255), random(255))
    };
    return flower;
}
function drawFlower(flower) {
    noStroke();
    fill(flower.color);

    // Draw petals.
    ellipse(flower.x, flower.y, flower.size / 2, flower.size);
    ellipse(flower.x, flower.y, flower.size, flower.size / 2);

    // Draw a yellow center.
    fill(255, 204, 0);
    circle(flower.x, flower.y, flower.size / 2);
}

function updateAndDrawFlowers() {
    for (let i = flowers.length - 1; i >= 0; i--) {
        let flower = flowers[i];

        drawFlower(flower);

        // Wilting effect
        flower.size *= 0.99;

        // Reduce lifespan
        flower.lifespan -= 1;

        // Remove wilted flower
        if (flower.lifespan <= 0) {
            flowers.splice(i, 1);
        }
    }
}

function mousePressed() {
    let flower = createFlower();

    // reassign x to be mouseX
    flower.x = mouseX;

    // reassign y to be mouseY
    flower.y = mouseY;

    // add the flower to the flowers array
    flowers.push(flower);
}