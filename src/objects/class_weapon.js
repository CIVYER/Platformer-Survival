class Weapon{
    constructor({position,player}){
        this.position={
            x:position.x,
            y:position.y,
        }
        this.player = player;
        this.width = 20;
        this.height = 50;
        this.color = 'black';
        this.angle = 0;

        this.top = this.position.y;
        this.bottom = this.position.y + this.height;
        this.left = this.position.x;
        this.right = this.position.x + this.width;

        this.spawnW = false;
    }
    draw(){
        c.beginPath();
        c.rect(this.position.x, this.position.y, this.width, this.height);
        c.fillStyle = this.color;
        c.fill();
        c.closePath();
    }
    update(){
        if(this.player.hasWeapon){
            this.angle = Math.atan2(-((mouseX-20) - this.position.x+10), ((mouseY) - this.player.center.y));
            this.position.x = this.player.position.x+player.width/2-10,
            this.position.y = this.player.position.y+player.height/2,
            draw_rotated_rect_object(
                this.position.x+10, 
                this.player.center.y,
                -1*(this.width/2),
                0,
                this.width,
                this.height,
                this.angle,
                this.color);
        }
        else{
            this.draw();
            this.top = this.position.y;
            this.bottom = this.position.y + this.height;
            this.left = this.position.x;
            this.right = this.position.x + this.width;
        }
    }
}