
export class Item {
    constructor(img, x = null, y = null) {
        this.x = x;
        this.y = y;
        this.img = img;
    }

    update(ctx, GRID) {
        ctx.drawImage(this.img, this.x * GRID, this.y * GRID, GRID, GRID);
    }
}

// プレイヤー近くにitem生成しないように
const isFarEnough = (x, y, snakeX, snakeY, minDistance) => {
    const dx = Math.abs(x - snakeX);
    const dy = Math.abs(y - snakeY);
    const distance = Math.sqrt(dx * dx + dy * dy);
    return distance >= minDistance;
}

// itemを作成
const createItem = (item, items, STAGE, snake) => {
    let x, y;
    const minDistance = 5;

    do {
        x = Math.floor(Math.random() * STAGE);
        y = Math.floor(Math.random() * STAGE);
    } while (items[y][x] === 1 || !isFarEnough(x, y, snake.x, snake.y, minDistance))

    item.x = x;
    item.y = y;
    items[y][x] = 1;
}

export const createApple = (apple, items, STAGE, snake) => {
    createItem(apple, items, STAGE, snake);
};

export const createGoldApple = (goldApple, items, STAGE, snake) => {
    createItem(goldApple, items, STAGE, snake);
};

export const createWall = (walls, items, STAGE, wallImage, snake) => {
    
    const wall = new Item(wallImage);
    createItem(wall, items, STAGE, snake);
    walls.push(wall);
}