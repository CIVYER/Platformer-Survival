class Bullet{
    constructor({position, weapon, player}){
        this.player = player;
        this.position = {
            x:position.x,
            y:position.y,
        }
        this.velocity ={
            x:0,
            y:0
        }
        this.angle = 0;
        this.radius = 0;
        this.color = 'green';

        this.top = this.position.y - this.radius;
        this.bottom = this.position.y + this.radius;
        this.left = this.position.x - this.radius;
        this.right = this.position.x + this.radius;
    }

    draw(){
        c.beginPath();
        c.arc(this.position.x, this.position.y, this.radius, Math.PI * 2, false);
        c.fillStyle = this.color;
        c.fill();
        c.closePath();
    }
    
    update(){
        this.draw();
        this.angle = weapon.angle;

        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;

        this.top = this.position.y - this.radius;
        this.bottom = this.position.y + this.radius;
        this.left = this.position.x - this.radius;
        this.right = this.position.x + this.radius;
    }
    
    shoot(){
        if(key_pressed.mouseLeftClick && !(this.player.shot)){
            this.radius = 8;
            this.velocity.x = (Math.sin(-this.angle) * 30);
            this.velocity.y = (Math.cos(-this.angle) * 30);
            this.position.x = this.player.center.x + Math.sin(-this.angle)*55
            this.position.y = this.player.center.y + Math.cos(-this.angle)*55
        }
    }
}