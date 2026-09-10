// OPERATORS
// console.log('Hello World!');

// alert('Hello World!');

// console.log(document);

// document.body.style.backgroundColor = "red";

// const temperature = 50;
// if (temperature < 60) {
//     document.body.style.backgroundColor = "lightBlue";
//     console.log('it is cool');
// } else {
//     document.body.style.backgroundColor = "yellow";
//     console.log('it is warm');
// }

// const temperature = 50;
// if (temperature >= 85) {
//     document.body.style.backgroundColor = "red";
//     console.log('it is hot');
// } else if (temperature <= 32) {
//     document.body.style.backgroundColor = "blue";
//     console.log('it is cold');
// } else {
//     document.body.style.backgroundColor = "orange";
//     console.log('it is okay');
// }

// const temperature = 95;
// const isSunny = true;
// if (temperature <= 85 && isSunny) {
//     document.body.style.backgroundColor = "yellow";
//     console.log('love the weather');
// } else {
//     document.body.style.backgroundColor = "red";
//     console.log('ugh it is too hot');
// }

// const isSunny = true;
// const isSnowy = true;
// const paragraph = document.getElementById('myParagraph');
// if (isSunny || isSnowy) {
//     paragraph.textContent = "I love the weather!";
//     console.log('the weather is great');
// }

// const isLoggedIn = false;
// const paragraph = document.getElementById('myParagraph');
// if (!isLoggedIn) {
//     paragraph.textContent = "you are now logged in";
//     console.log("please log in to continue");
// }




// LOOPS
// let count = 1;
// while (count < 10) {
//     console.log(count);
//     count = count + 1;
// }

// for (let i = 1;
//     i <= 100;
//     i++) {
//     console.log(i);
// }
// // i++ is a shorthand way of writing i = i + 1 or i += 1

// for (let i = 10; i > 0; i--) {
//     console.log(i);
// }

// let username = '';
// while (username === '') {
//     username = window.prompt('Enter your name:');
// }

// console.log('Hello ' + username);

// function greet() {
//     console.log('Hello World');
// }
// greet();

// function greetuser(username) {
//     console.log('Hello ' + username);
// }
// greetuser('Tanvi');

// function addPrices(a, b) {
//     return a + b;
// }
// const result = addPrices(5, 10);
// console.log('Total: $' + result);

// const fruit = ['apple', 'banana', 'orange'];
// console.log(fruit[1]);

// const basket = ['apple', 'banana', 'orange'];
// function addFruit(fruit) {
//     basket.push(fruit);
// }
// addFruit('grape');
// addFruit('cherry')
// console.log(basket);

// const user = { name: 'Toasty', age: '5', isStudent: true };
// console.log(user.name);
// console.log(user.age);
// console.log(user.isStudent);

// const pencilCase = ['red', 'blue', 'green', 'yellow'];
// for (let i = 0; i < pencilCase.length; i++) {
//     pickColor(pencilCase[i]);
// }
// function pickColor(color) {
//     console.log('I pick ' + color);
// }

// const paragraph = document.getElementById('myParagraph');
// function changeParagraph() {
//     paragraph.textContent = 'this is our updated paragraph';
// }
// changeParagraph();
// function changeText() {
//     paragraph.style.color = 'pink';
//     paragraph.style.fontSize = '10rem';
//     paragraph.style.lineHeight = '0.5';
// }
// changeText();

// const background = document.body;
// function changeBody() {
//     background.style.backgroundColor = 'yellow';
// }
// changeBody();

// const background = document.body;
// function changeBackgroundColor() {
//     background.style.backgroundColor = 'Blue';
// }
// document.addEventListener('click', changeBackgroundColor);

const colors = ['red', 'orange', 'yellow', 'green', 'blue', 'pink', 'purple'];
for (let i = 0; i < colors.length; i = i + 1) {
    setTimeout(function () {
        document.body.style.backgroundColor = colors[i];
    }, i * 1000);
}