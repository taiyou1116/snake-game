
import { snake, createSnake } from "./snake.js";
import { Item, createApple, createGoldApple, createWall } from "./item.js";
import { fetchRanking, postnewRecordData, confirmDatabaseUser } from "./ranking.js";
import { userAuth } from "./user.js";

// キャンバス設定
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const bgCanvas = document.getElementById('bgCanvas');
const bgCtx = bgCanvas.getContext('2d');

const startButton = document.getElementById('start-button');
const nameText = document.getElementById('name-text');

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

const gameState = {
    gameStop: false,

    gameStopFunc: function() {
        this.gameStop = true;
        sendRecord();
    }
};

let directionQueue = [];

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
    gameState.gameStop = false;
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
    directionQueue = [];
}

const loop = () => {
    if (gameState.gameStop) return;

    // キューから新しい方向を取得
    if (directionQueue.length > 0) {
        const newDirection = directionQueue.shift();
        snake.dx = newDirection.dx;
        snake.dy = newDirection.dy;
    }

    // 描画をリセット
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // 蛇、りんご、壁、金りんごのupdate処理(描画)
    snake.update(ctx, GRID, gameState);
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
            gameState.gameStopFunc();
            return true;
        }
        return false;
    });
}

// 前回のインターバルを管理
let gameInterval;
let itemInterval;
let appleInterval;

// ゲームスタートの関数
const startGame = () => {
    clearInterval(gameInterval);
    clearInterval(itemInterval);
    clearInterval(appleInterval);
    init();  // ゲームの初期化
    gameInterval = setInterval(loop, 1000/8);  // ゲームループ開始
    itemInterval = setInterval(() => createWall(walls, items, STAGE, wallImage, snake), 5000);
    appleInterval = setInterval(() => createGoldApple(goldApple, items, STAGE, snake), 15000);
};

// GUI

startButton.addEventListener('click', startGame);

// キー入力
document.addEventListener('keydown', e => {
    let newDirection;
    switch (e.key) {
        case 'ArrowLeft':
            newDirection = {dx: -1, dy: 0};
            break;
        case 'ArrowRight':
            newDirection = {dx: 1, dy: 0};
            break;
        case 'ArrowUp':
            newDirection = {dx: 0, dy: -1};
            break;
        case 'ArrowDown':
            newDirection = {dx: 0, dy: 1};
            break;
    }
    if (newDirection) {
        directionQueue.push(newDirection);
    }
});

// ユーザー

const uid = userAuth();

// バックエンドとの対話

// 取得したランキングを表示
fetchRanking().then(data => {
    const extractedData = data.map((item) => {
        return {
            name: item.name,
            record: item.record,
            uid: item.uid,
        }
    })

    // sort
    extractedData.sort((a, b) => b.record - a.record);

    const outputElement = document.getElementById('output');
    extractedData.forEach((item, index) => {
        if (index === 10) return;
        const div = document.createElement('div');
        // 自分の記録は太文字
        if (item.uid === uid) div.classList.add('bold');
        
        div.textContent = `${index + 1}位: ${item.name} 記録: ${item.record}`;
        outputElement.appendChild(div);
    })
})

// 自動的に記録転送
const sendRecord = () => {
    const name = nameText.value;
    const record = snake.tail;

    // ranking.jsで処理
    confirmDatabaseUser(name, record, uid);
}