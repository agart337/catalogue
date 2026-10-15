const eyes = document.querySelectorAll('.eye');

document.addEventListener('mousemove', (event) => {
    eyes.forEach((eye) => {

        const pupil = eye.querySelector('.pupil');

        const rect = eye.getBoundingClientRect();
        const eyeX = rect.left + rect.width / 2;
        const eyeY = rect.top + rect.height / 2;

        const distanceX = event.clientX - eyeX;
        const distanceY = event.clientY - eyeY;

        const distance = Math.hypot(distanceX, distanceY);

        const pupilX = distanceX / distance * 50;
        const pupilY = distanceY / distance * 50;

        pupil.style.transform = `translate(${pupilX}px, ${pupilY}px)`;
    });
});