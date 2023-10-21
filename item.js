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

const createItem = (item, items, STAGE) => {
    do {
        item.x = Math.floor(Math.random() * STAGE);
        item.y = Math.floor(Math.random() * STAGE);
    } while (items[item.y][item.x] === 1)
    
    items[item.y][item.x] = 1;
}

export const createApple = (apple, items, STAGE) => {
    createItem(apple, items, STAGE);
};

export const createGoldApple = (goldApple, items, STAGE) => {
    createItem(goldApple, items, STAGE);
};

// export const createWall = (walls, items, STAGE, wall) => {
//     // const wall = new Item(wallImage);
//     createItem(wall, items, STAGE);
//     // wall.x = Math.floor(Math.random() * STAGE);
//     // wall.y = Math.floor(Math.random() * STAGE);
//     walls.push(wall);
// }