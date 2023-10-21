export const snake = {
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