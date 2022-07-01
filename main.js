const CANVAS_SIZE = 1000;

let canvas = document.getElementById('board');
let context = canvas.getContext('2d');

canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

let board = new Board(context, CANVAS_SIZE * 0.1, CANVAS_SIZE * 0.9);

function onStartClick(){
    alert('start!')
}

function onResetClick(){
    alert('reset!')
}

function onRotateChange(){
    board.rotate();
}

function onRightClick(e){
    let windowX = e.x;
    let windowY = e.y;

    let rect = canvas.getBoundingClientRect()
    let rectX = e.x - rect.left;
    let rectY = e.y - rect.top;

    let canvasX = mapRanges(rectX, 0, e.target.clientWidth, 0, canvas.width);
    let canvasY = mapRanges(rectY, 0, e.target.clientHeight, 0, canvas.height);

    let menu = document.getElementById('menu');
    menu.style.display = 'block'
    menu.style.left = `${windowX}px`
    menu.style.top = `${windowY}px`

    for (let button of menu.getElementsByTagName('button')){
        button.onclick = () => {
            onLeftClick();
        };
    }
}

function onLeftClick(e){
    let menu = document.getElementById('menu');
    menu.style.display = 'none'

    for (let button of menu.getElementsByTagName('input')){
        button.onclick = undefined;
    }
}

function draw(){
    board.draw();
}

function mapRanges(x, inMin, inMax, outMin, outMax) {
    return (x - inMin) * (outMax - outMin) / (inMax - inMin) + outMin;
}

document.body.onload = draw;

canvas.onclick = (e) => {
    onLeftClick(e);
}

canvas.oncontextmenu = (e) => {
    onRightClick(e)
    return false;
}