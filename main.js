
import { snake, createSnake } from "./snake.js";
import { Item, createApple, createGoldApple, createWall } from "./item.js";

// キャンバス設定
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

// item初期化
const apple = new Item(appleImage);
const goldApple = new Item(goldAppleImage);
let walls = [];

// 全体のアイテムがどこにあるか管理
let items = Array.from({ length: 20 }, () => Array(20).fill(0));

const init = () => {
    // マス目作成
    for (let x = 0; x < STAGE; x++) {
        for (let y = 0; y < STAGE; y++) {
            bgCtx.fillStyle = '#aaa'; // 灰色
            bgCtx.fillRect(x * GRID, y * GRID, GRID - 1, GRID - 1);
        }
    }

    // snake
    createSnake(STAGE);
    // apple
    createApple(apple, items, STAGE, snake);
    // 金りんご
    goldApple.x = null;
    goldApple.y = null;
    // 壁
    walls = [];
    items = Array.from({ length: 20 }, () => Array(20).fill(0));
}

const loop = () => {
    // 描画をリセット
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // 蛇、りんご、壁、金りんごのupdate処理(描画)
    snake.update(ctx, GRID, init);
    apple.update(ctx, GRID);
    walls.forEach(wall => wall.update(ctx, GRID));
    if (goldApple.x !== null && goldApple.y !== null) {
        goldApple.update(ctx, GRID);
    }

    // はみ出た時
    if(snake.x < 0) snake.x = STAGE - 1;
    if(snake.y < 0) snake.y = STAGE - 1;
    if(snake.x > STAGE - 1) snake.x = 0;
    if(snake.y > STAGE - 1) snake.y = 0;

    // りんごとった時
    if (snake.x === apple.x && snake.y === apple.y) {
        snake.tail++;
        document.getElementById('snake-length').innerText = "蛇の長さ: " + snake.tail;
        createApple(apple, items, STAGE, snake);
    }
    // 金りんごとった時
    if (snake.x === goldApple.x && snake.y === goldApple.y) {
        snake.tail += 2;
        document.getElementById('snake-length').innerText = "蛇の長さ: " + snake.tail;
        goldApple.x = null;
        goldApple.y = null;
    }
    // wallあたったか
    walls.some(wall => {
        if (snake.x === wall.x && snake.y === wall.y) {
            init();
            return true;
        }
        return false;
    });
}

// 初期化とインターバル
init();
setInterval(loop, 1000/8);

// 5秒ごとに壁を作成
setInterval(() => createWall(walls, items, STAGE, wallImage, snake), 5000);

// 15秒ごとに金りんご
setInterval(() => createGoldApple(goldApple, items, STAGE, snake), 15000);

// キー入力
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