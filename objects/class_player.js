class Player{
    constructor({position, collisionBlocks, weapon}){
        this.height = 70;
        this.width = 70;
        this.color = 'blue';
        this.position = {
            x:position.x,
            y:position.y
        };
        this.center = {
            x:this.position.x + (this.width/2),
            y:this.position.y + (this.height/2)
        }
        this.velocity = {
            x:0,
            y:1
        }

        this.top = this.position.y;
        this.bottom = this.position.y + this.height;
        this.left = this.position.x;
        this.right = this.position.x + this.width;

        this.weapon = weapon;
        this.onGround = false;
        this.hasWeapon = false;
        this.shot = false;
        this.inChamber = 0;

        this.collisionBlocks = collisionBlocks;
        this.go = false;
        this.gameOver = false;

        this.health = 100;
        this.healthRegenDelay = 0;
        this.elapsedTimer = 0;

        this.start = false;

        this.walkingLeft = [
            '../src/walking/left/walking1.png',
            '../src/walking/left/walking2.png',
            '../src/walking/left/walking3.png',
            '../src/walking/left/walking4.png',
            '../src/walking/left/walking5.png',
            '../src/walking/left/walking6.png',
            '../src/walking/left/walking7.png',
            '../src/walking/left/walking8.png',
            '../src/walking/left/walking9.png',
        ];
        this.walkingRight = [
            '../src/walking/right/walking1.png',
            '../src/walking/right/walking2.png',
            '../src/walking/right/walking3.png',
            '../src/walking/right/walking4.png',
            '../src/walking/right/walking5.png',
            '../src/walking/right/walking6.png',
            '../src/walking/right/walking7.png',
            '../src/walking/right/walking8.png',
            '../src/walking/right/walking9.png',
        ];
        this.frame = 0;
        this.image = new Image();
        this.prevX = this.position.x;
        this.face = 'left';
    }

    draw(){
        c.beginPath();
        if(this.face == 'left'){
        this.image.src = this.walkingLeft[this.frame]
        }
        else if(this.face == 'right'){
        this.image.src = this.walkingRight[this.frame]
        }
        c.drawImage(this.image,this.position.x, this.position.y, this.width, this.height);
        // c.fillStyle = this.color;
        c.fill();
        c.closePath();
    }
    
    drawHealth(){
        c.beginPath();
        c.rect(10, canvas.height - 30, 100*2, 20);
        c.fillStyle = 'red';
        c.fill();
        c.closePath();
        c.beginPath();
        c.rect(10, canvas.height - 30, this.health*2, 20);
        c.fillStyle = 'green';
        c.fill();
        c.closePath();
    }

    update(){
        c.fillStyle = 'rgba(0,255,0,1)';
        c.fillRect(this.position.x + this.width-25, this.position.y, 5, this.height)
        c.fillRect(this.position.x + 20, this.position.y, 5, this.height)
        this.draw();
        this.drawHealth();

        this.center.x = this.position.x + (this.width/2);
        this.center.y = this.position.y + (this.height/2);
        
        this.position.x += this.velocity.x;
        
        this.fall();
        this.cVertCol();
        //sets the sides coordinate per frame
        this.left = this.position.x+20;
        this.right = this.position.x + this.width-25;
        this.bottom = this.position.y + this.height;
        this.top = this.position.y;

        if (this.bottom + this.velocity.y + 1 > canvas.height && this.go == false) {
            this.velocity.y = 0;
            this.onGround = true;
        }
        if (this.top + this.velocity.y - 1 < -50) {
            this.velocity.y = 3
            this.onGround = false;
        }
        if(!(this.hasWeapon) && collision_all_solid({
            object1:this,
            object2:this.weapon
        })){
            this.weapon.color = 'black';
            this.hasWeapon = true;
        }

        if(this.top >= canvas.height + 150){
            this.gameOver = true;
        }

        if(this.health < 100 && this.healthRegenDelay+1000 < this.elapsedTimer){
            this.health +=1;
            this.healthRegenDelay = this.elapsedTimer;
        }

        if(this.health <= 0){
            this.gameOver = true;
        }
    }
    fall(){
        this.position.y += this.velocity.y;
        this.velocity.y += gravity;
        if(this.velocity.y >= 0){
            // this.onGround = false;
        }

    }

    cVertCol(){
        for (let i = 0; i < this.collisionBlocks.first.length; i++) {
            const colBlock = this.collisionBlocks.first[i];
            const colBlock2 = this.collisionBlocks.sec[i];
            const colBlock3 = this.collisionBlocks.tres[i];
            if(collision_bottom_hollow({
                object1:this,
                object2:colBlock
            })){
                if(this.velocity.y > 0){
                    this.onGround = true; 
                    this.velocity.y = 3;
                    this.position.y = colBlock.top - this.height - 0.01
                }
            }
            if(collision_bottom_hollow({
                object1:this,
                object2:colBlock2
            })){
                if(this.velocity.y > 0){
                    this.onGround = true; 
                    this.velocity.y = 3;
                    this.position.y = colBlock2.top - this.height - 0.01
                }
            }
            if(collision_bottom_hollow({
                object1:this,
                object2:colBlock3
            })){
                if(this.velocity.y > 0){
                    this.onGround = true; 
                    this.velocity.y = 3;
                    this.position.y = colBlock3.top - this.height - 0.01
                }
            }


        }
    }
}