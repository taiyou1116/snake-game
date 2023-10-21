
// 背景設定
const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');

const bgCanvas = document.createElement('canvas');
const bgCtx = bgCanvas.getContext('2d');

canvas.width = 400;
canvas.height = 400;

bgCanvas.width = 400;
bgCanvas.height = 400;

bgCanvas.setAttribute('style', 'position: absolute; z-index: -1');
canvas.setAttribute('style', 'position: absolute; z-index: 1');

document.body.appendChild(bgCanvas);
document.body.appendChild(canvas);

// img
const appleImage = document.getElementById('appleImage');
const goldAppleImage = document.getElementById('goldAppleImage');
const wallImage = document.getElementById('wallImage');

// ゲームロジック

const GRID = 20;
const STAGE = canvas.width / GRID;

const snake = {
    x: null,
    y: null,
    dx: 1,
    dy: 0,
    tail: null,
    body: null,

    update: function() {
        this.body.push({ x: this.x, y: this.y })
        this.x += this.dx;
        this.y += this.dy;

        this.body.forEach((obj, index) => {
            if (index === this.body.length - 1) {
                ctx.fillStyle = 'blue'; 
            } else {
                ctx.fillStyle = 'green';
            }
            ctx.fillRect(obj.x * GRID, obj.y * GRID, GRID - 2, GRID - 2);

            if (this.x === obj.x && this.y === obj.y) init();
        })
        // shiftメソッドで古いbodyを消去
        if (this.body.length > this.tail) this.body.shift();
    }
}

// Itemクラス(apple, wall)
class Item {
    constructor(type, img, x = null, y = null) {
        this.type = type;
        this.x = x;
        this.y = y;
        this.img = img;
    }

    update() {
        ctx.drawImage(this.img, this.x * GRID, this.y * GRID, GRID, GRID);
    }
}

const apple = new Item('apple', appleImage);

let walls = [];
const createWall = () => {
    const wall = new Item('wall', wallImage);
    wall.x = Math.floor(Math.random() * STAGE);
    wall.y = Math.floor(Math.random() * STAGE);
    walls.push(wall);
}

const init = () => {
    // マス目がわかりやすいように
    for (let x = 0; x < STAGE; x++) {
        for (let y = 0; y < STAGE; y++) {
            bgCtx.fillStyle = '#aaa'; // 灰色
            bgCtx.fillRect(x * GRID, y * GRID, GRID - 1, GRID - 1);
        }
    }

    // snake初期化
    snake.x = STAGE / 2;
    snake.y = STAGE / 2;
    snake.tail = 4;
    snake.body = [];
    snake.dx = 1;
    snake.dy = 0;

    apple.x = Math.floor(Math.random() * STAGE);
    apple.y = Math.floor(Math.random() * STAGE);

    // 壁の初期化
    walls = [];
}

const loop = () => {
    // 描画をリセット
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    snake.update();
    apple.update();

    walls.forEach(wall => wall.update());

    if(snake.x < 0) snake.x = STAGE - 1;
    if(snake.y < 0) snake.y = STAGE - 1;
    if(snake.x > STAGE - 1) snake.x = 0;
    if(snake.y > STAGE - 1) snake.y = 0;

    if (snake.x === apple.x && snake.y === apple.y) {
        snake.tail++;

        apple.x = Math.floor(Math.random() * STAGE);
        apple.y = Math.floor(Math.random() * STAGE);
    }

    walls.some(wall => {
        if (snake.x === wall.x && snake.y === wall.y) {
            init();
            return true;
        }
        return false;
    });
}

init();
setInterval(loop, 1000/5);

// 5秒ごとに壁を作成
setInterval(createWall, 5000);

document.addEventListener('keydown', e => {
    switch (e.key) {
        case 'ArrowLeft':
            snake.dx = -1; snake.dy = 0;
            break;
        case 'ArrowRight':
            snake.dx = 1; snake.dy = 0;
            break;
        case 'ArrowUp':
            snake.dx = 0; snake.dy = -1;
            break;
        case 'ArrowDown':
            snake.dx = 0; snake.dy = 1;
            break;
    }
});