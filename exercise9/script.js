const button = document.getElementById('button');

document.addEventListener('mousemove', function (event) {
    const rect = button.getBoundingClientRect();
    const buttonX = rect.left + rect.width / 2;
    const buttonY = rect.top + rect.height / 2;

    const distance = Math.hypot(event.clientX - buttonX, event.clientY - buttonY);

    if (distance < 100) {
        button.style.left = `${Math.random() * (window.innerWidth - rect.width)}px`;
        button.style.top = `${Math.random() * (window.innerHeight - rect.height)}px`;
    }
});

button.addEventListener('click', function () {
    alert('You got me');
})