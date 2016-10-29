import utilities from './utilities';

class Circle {
    constructor(radius, fill) {
        this.radius = radius;
        this.fill = fill;
    }

    draw(ctx) {
        ctx.beginPath();
        ctx.arc(0, 0, this.radius, 0, utilities.toRads(360));
        if (this.fill) {
            ctx.fillStyle = this.fill;
            ctx.fill();
        }
        if (this.stroke) {
            ctx.strokeStyle = this.stroke;
        }
        if (this.lineWidth) {
            ctx.lineWidth = this.lineWidth;
        }
        ctx.stroke();
        ctx.closePath();
    }

    detectCollision(mouseX, mouseY, canvasWidth, canvasHeight) {
        let centerX = canvasWidth / 2;
        let centerY = canvasHeight / 2;
        let dx = Math.abs(mouseX - centerX);
        let dy = Math.abs(mouseY - centerY);
        return Math.pow(dx, 2) + Math.pow(dy, 2) <= Math.pow(this.radius, 2);
    }
}

export default Circle;