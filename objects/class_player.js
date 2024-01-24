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
        this.hasWeapon = true;
        this.shot = false;
        this.inChamber = 0;
        
        this.collisionBlocks = collisionBlocks;
        this.go = false;
        this.gameOver = false;
        
        this.mana = 100;
        this.manaRegenDelay = 0;
        this.health = 100;
        this.healthRegenDelay = 0;
        this.elapsedTimer = 0;

        this.start = false;

        this.walkingLeft = '../src/walkingLeft.png';
        this.walkingRight = '../src/walkingRight.png';
        this.jumpingLeft = '../src/jumpLeft.png';
        this.jumpingRight = '../src/jumpRight.png';
        this.frame = 0;
        this.jumpFrame = 0;
        this.image = new Image();

        this.image.src = this.walkingLeft
        this.prevX = this.position.x;
        this.face = 'left';
    }

    draw(){
        c.beginPath();
        if(this.prevX+10 < this.position.x && this.onGround){
            this.prevX = this.position.x;
            this.frame += 1;
            if(this.frame >8){
                this.frame = 0;
            }
        }
        if(this.prevX-10 > this.position.x && this.onGround){
            this.prevX = this.position.x;
            this.frame += 1;
            if(this.frame >8){
                this.frame = 0;
            }
        }
        if(this.onGround){
            this.image.onload = ()=>{
                this.width = this.image.width/9
                // this.height = this.image.height
            }
            if(this.face == 'left'){
                this.image.src = this.walkingLeft
            }
            else if(this.face == 'right'){
                this.image.src = this.walkingRight
            }
            c.drawImage(this.image,this.frame*this.image.width/9,0,this.width, this.height,this.position.x, this.position.y, this.width, this.height+25);
        }
        else if(!this.onGround || this.velocity.y > 1){
            this.image.onload = ()=>{
                this.width = this.image.width/6
                // this.height = this.image.height
            }
            if(this.face == 'left'){            
                this.image.src = this.jumpingLeft
            }
            else if(this.face == 'right'){            
                this.image.src = this.jumpingRight
            }
            c.drawImage(this.image,this.jumpFrame*this.image.width/6,0,this.width, this.height,this.position.x, this.position.y, this.width, this.height+25);
        }
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
        c.beginPath();
        c.rect(10, canvas.height - 60, 100*2, 20);
        c.fillStyle = 'black';
        c.fill();
        c.closePath();
        c.beginPath();
        c.rect(10, canvas.height - 60, this.mana*2, 20);
        c.fillStyle = 'blue';
        c.fill();
        c.closePath();
    }

    update(){
        // console.log(this.velocity.y);
        // c.fillStyle = 'rgba(0,255,0,0.5)';
        // c.fillRect(this.position.x, this.position.y, this.width, this.height)
        // c.fillStyle = 'rgba(0,255,100,1)';
        // c.fillRect(this.left, this.top, 5, this.height)
        // c.fillRect(this.right, this.top, 5, this.height)
        // c.fillRect(this.left, this.top, 30, 5)
        // c.fillRect(this.left, this.bottom, 30, 5)
        this.draw();
        this.drawHealth();

        this.center.x = this.position.x + (this.width/2);
        this.center.y = this.position.y + (this.height/2);
        
        this.position.x += this.velocity.x;
        
        this.fall();
        this.cVertCol();
        //sets the sides coordinate per frame
        if(this.face == 'left'){
            this.left = this.center.x-15;
            this.right = this.center.x+15;
        }
        else if(this.face == 'right'){
            this.left = this.center.x-22;
            this.right = this.center.x+9;
        }
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
        if(this.mana < 100 && this.manaRegenDelay+1000 < this.elapsedTimer){
            this.mana +=5;
            if(this.mana >=100){
                this.mana = 100;
            }
            this.manaRegenDelay = this.elapsedTimer;
        }

        if(this.health <= 0){
            this.gameOver = true;
        }
    }
    fall(){
        this.position.y += this.velocity.y;
        this.velocity.y += gravity;
        // if(this.velocity.y >= 0){
        //     this.onAir = false;
        // }

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