// Itemクラス(apple, wall)
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


export const createApple = () => {
    apple.x = Math.floor(Math.random() * STAGE);
    apple.y = Math.floor(Math.random() * STAGE);
};

export const createGoldApple = () => {
    goldApple.x = Math.floor(Math.random() * STAGE);
    goldApple.y = Math.floor(Math.random() * STAGE);
};

export const createWall = (walls) => {
    const wall = new Item(wallImage);
    wall.x = Math.floor(Math.random() * STAGE);
    wall.y = Math.floor(Math.random() * STAGE);
    walls.push(wall);
}