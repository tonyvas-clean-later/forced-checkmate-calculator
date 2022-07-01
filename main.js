const CANVAS_SIZE = 1000;

let canvas = document.getElementById('board');
let context = canvas.getContext('2d');

canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

context.fillRect(0, 0, canvas.width, canvas.height);

function start(){
    alert('start!')
}

function reset(){
    alert('reset!')
}