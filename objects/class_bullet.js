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
        this.color = 'blue';

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
            this.radius = 5;
            var wepXL = [
                this.player.center.x - 7,
                this.player.center.x - 17,
                this.player.center.x - 18,
                this.player.center.x - 19,
                this.player.center.x - 16,
                this.player.center.x - 8,
                this.player.center.x - 15,
                this.player.center.x - 19,
                this.player.center.x - 18,
            ]
            var wepXR = [
                this.player.center.x + 7,
                this.player.center.x + 17,
                this.player.center.x + 18,
                this.player.center.x + 19,
                this.player.center.x + 16,
                this.player.center.x + 8,
                this.player.center.x + 15,
                this.player.center.x + 19,
                this.player.center.x + 18,
            ]
            var wepY = [
                this.player.center.y - 8,
                this.player.center.y + 16,
                this.player.center.y + 4,
                this.player.center.y - 1,
                this.player.center.y - 6,
                this.player.center.y - 8,
                this.player.center.y - 7,
                this.player.center.y - 1,
                this.player.center.y + 4,
            ]    
            if(this.player.face == 'right'){
                this.position.x = wepXR[this.player.frame];
            }
            else{
                this.position.x = wepXL[this.player.frame];
            }
            this.position.y = wepY[this.player.frame];

            var theAngle = Math.atan2(-((mouseX-10) - this.position.x+10), ((mouseY) - this.player.center.y))

            this.velocity.x = (Math.sin(-theAngle) * 30);
            this.velocity.y = (Math.cos(-theAngle) * 30);


            // this.position.x = this.player.center.x + Math.sin(-this.angle)*55
            // this.position.y = this.player.center.y + Math.cos(-this.angle)*55
        }
    }
}