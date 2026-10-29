
let flowers = [];

function setup() {
    createCanvas(1600, 800);

    // Generate 20 flowers at random locations.
    flowerPower();
}

function draw() {
    // Slowly fade previous frames to create a trail.
    background(255, 50);

    updateAndDrawFlowers();
}

// Generate 20 initial flowers.
function flowerPower() {
    for (let i = 0; i < 20; i++) {
        flowers.push(createFlower());
    }
}

// Create a flower.
function createFlower() {
    return {
        x: random(20, width - 20),
        y: random(20, height - 20),
        size: random(40, 150),
        lifespan: 90,
        color: color(
            random(255),
            random(255),
            random(255),
            64
        )
    };
}

// Draw a flower at 50% opacity.
function drawFlower(flower) {
    noStroke();
    fill(flower.color);

    // Draw petals.
    ellipse(flower.x, flower.y, flower.size / 2, flower.size);
    ellipse(flower.x, flower.y, flower.size, flower.size / 2);

    // Draw the yellow centre at 50% opacity.
    fill(255, 204, 0, 200);
    circle(flower.x, flower.y, flower.size / 2);
}

// Update flower size and lifespan.
function updateAndDrawFlowers() {
    for (let i = flowers.length - 1; i >= 0; i--) {
        let flower = flowers[i];

        drawFlower(flower);

        // Gradually shrink the flower.
        flower.size *= 0.97;

        // Reduce lifespan.
        flower.lifespan -= 1;

        // Remove flowers when they expire.
        if (flower.lifespan <= 0) {
            flowers.splice(i, 1);
        }
    }
}

// Create flowers as the mouse moves.
function mouseMoved() {
    addFlowerAtMouse();
}

// Also create flowers when dragging.
function mouseDragged() {
    addFlowerAtMouse();
}

function addFlowerAtMouse() {
    // Space flowers out along the cursor path.
    if (dist(mouseX, mouseY, pmouseX, pmouseY) > 12) {
        let flower = createFlower();

        flower.x = mouseX;
        flower.y = mouseY;
        flower.size = random(25, 70);

        flowers.push(flower);
    }
}