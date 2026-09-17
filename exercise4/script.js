const images =
    ['images/154785067c16917dfafeed30dba5a5f8.jpg',
        'images/a8fc6346c6d70e70e72de8f15e50aac1.jpg',
        'images/f16d0238b15af15682d7886902b7cf48.jpg',
        'images/images-1.jpeg',
        'images/images.jpeg',
        'images/lTZeYGu.jpg',
        'images/s-l1200-1.jpg',
        'images/s-l1200.jpg',
        'images/SL24ADS_VINTAGE_Brut2.jpg',
        'images/SL24ADS_VINTAGE_CENTAUR-762x1024.jpg',
        'images/SL24ADS_VINTAGE_Denim-1024x665.jpg',
        'images/SL24ADS_VINTAGE_-Tabac-398x1024.jpg',
        'images/SL24ADS_STORYTELLING_Eau_Sauvage-722x1024.jpg',
        'images/SL24ADS_STORYTELLING_Guerlain_Habit_Rouge.jpg'
    ];

function addImage(ourSource, rotation) {
    const image = document.createElement('img');
    image.src = ourSource;
    image.style.transform = `rotate(${rotation}deg)`;
    document.body.appendChild(image);
    return image;
};

let imageIndex = 0;

for (let imageCount = 0; imageCount < 14; imageCount++) {
    while (imageIndex >= images.length) {
        imageIndex = 0;
    }

    const currentImage = images[imageIndex];

    // ROTATION IN FIXED INCREMENTS
    // setTimeout(function () {
    //     addImage(currentImage, imageCount * 22.5);
    // }, imageCount * 1000);
    // imageIndex++;


    // ROTATION IN RANDOM INCREMENTS
    //     setTimeout(function () {
    //         addImage(currentImage, Math.random() * 90 - 45);
    //     }, imageCount * 1000);
    //     imageIndex++;

    setTimeout(function () {
        const image = addImage(currentImage, Math.random() * 45 - 22.5)
        addImage(currentImage, Math.random() * 90 - 45);

        image.style.transition = 'filter 30s';

        setTimeout(function () {
            image.style.filter = `grayscale(150) sepia(150) hue-rotate(180deg)`;
        }, 50);
    }, imageCount * 1000);
    imageIndex++;
}