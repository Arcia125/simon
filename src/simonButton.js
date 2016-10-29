import utilities from './utilities';

class SimonButton {
    constructor(name, color, x, y, startAngle1, endAngle1, startAngle2, endAngle2, rect, sound) {
        this.name = name;
        this.color = color;
        this.origColor = color;
        let [h, s, l] = this.color.split(',');
        l = l.split('%')[0] * 1.7;
        this.altColor = `${[h, s, l].join(', ')}%)`;
        this.x = x;
        this.y = y;
        this.startAngle1 = startAngle1;
        this.endAngle1 = endAngle1;
        this.startAngle2 = startAngle2;
        this.endAngle2 = endAngle2;
        this.rect = rect;
        this.sound = sound;
    }

    draw(ctx, innerR, outerR) {
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.moveTo(this.x, this.y);
        ctx.arc(0, 0, innerR, utilities.toRads(this.startAngle1), utilities.toRads(this.endAngle1));
        ctx.arc(0, 0, outerR, utilities.toRads(this.startAngle2), utilities.toRads(this.endAngle2), true);
        ctx.stroke();
        ctx.fill();
        ctx.closePath();
    }

    detectCollision(mouseX, mouseY) {
        return ((mouseX > this.rect.x && mouseX < this.rect.x2) && (mouseY > this.rect.y && mouseY < this.rect.y2)) && (mouseX);
    }

    press() {
        this.lightUp();
    }

    lightUp() {
        this.sound.currentTime = 0;
        this.sound.play();
        this.color = this.altColor;
        if (this.timeOut) {
            clearTimeout(this.timeOut);
        }
        this.timeOut = setTimeout(() => {
            this.color = this.origColor;
        }, 150);
    }

    warningFlash() {
        this.color = 'rgba(225, 0, 0, 1)';
        setTimeout(() => {
            this.color = this.origColor;
        }, 300);
    }


}


export default SimonButton;