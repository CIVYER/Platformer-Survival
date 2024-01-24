class Enemy{
    constructor({position, collisionBlocks, weapon, player, bullet, id}){
        this.position = {
            x:position.x,
            y:position.y
        };
        this.height = 50;
        this.width = 30;
        this.color = 'brown';
        
        this.platforms = collisionBlocks;
        this.weapon = weapon;
        this.player = player;

        this.center = {
            x:this.position.x + this.width/2,
            y:this.position.y + this.height/2
        };
        this.top = this.position.y;
        this.left = this.position.x;
        this.bottom = this.position.y + this.height;
        this.right = this.position.x + this.width;

        this.velocity = {
            x:1,
            y:0
        }
        this.speed = 1;

        this.spawned = false;
        this.bullet = bullet;
        this.hitDelay = 0;
        this.elapsedTime = 0;
        this.playerCollide = false;

        this.id = id;
    }

    draw(){
        c.beginPath();
        c.rect(this.position.x, this.position.y, this.width, this.height)
        c.fillStyle = this.color;
        c.fill();
        c.closePath();
    }

    fall(){
        this.position.y += this.velocity.y;
        this.velocity.y += gravity;              
    }

    platforms_collision_check(){
        for(let i = 0; i < this.platforms.first.length; i++){
            const colBlock = this.platforms.first[i];
            const colBlock2 = this.platforms.sec[i];
            const colBlock3 = this.platforms.tres[i];
            if(collision_bottom_hollow({
                object1:this,
                object2:colBlock
            })){
                if(colBlock.occupant != this.id){
                    this.position.y = canvas.height + 100;
                }
                if(this.velocity.y > 0){
                    this.velocity.y = scrollSpeed; 
                    this.position.y = colBlock.top - this.height - 0.01;
                }
                if(this.left + this.velocity.x <= colBlock.left && this.bottom <= colBlock.top){
                    this.velocity.x = this.speed;
                }
                else if(this.right + this.velocity.x >= colBlock.right && this.bottom <= colBlock.top){
                    this.velocity.x = this.speed * (-1);
                }
            }
            if(collision_bottom_hollow({
                object1:this,
                object2:colBlock2
            })){
                if(colBlock2.occupant != this.id){
                    this.position.y = canvas.height + 100;
                }
                if(this.velocity.y > 0){
                    this.velocity.y = scrollSpeed; 
                    this.position.y = colBlock2.top - this.height - 0.01;
                }
                if(this.left + this.velocity.x <= colBlock2.left && this.bottom <= colBlock2.top){
                    this.velocity.x = this.speed;
                }
                else if(this.right +this.velocity.x >= colBlock2.right && this.bottom <= colBlock2.top){
                    this.velocity.x = this.speed * (-1);
                }
            }

            if(collision_bottom_hollow({
                object1:this,
                object2:colBlock3
            })){
                if(colBlock3.occupant != this.id){
                    this.position.y = canvas.height + 100;
                }
                if(this.velocity.y > 0){
                    this.velocity.y = scrollSpeed; 
                    this.position.y = colBlock3.top - this.height - 0.01;
                }
                if(this.left + this.velocity.x <= colBlock3.left && this.bottom <= colBlock3.top){
                    this.velocity.x = this.speed;
                }
                else if(this.right +this.velocity.x >= colBlock3.right && this.bottom <= colBlock3.top){
                    this.velocity.x = this.speed * (-1);
                }
            }
        }
    }

    bullet_hit(){
        for (let i = 0; i < this.bullet.length; i++){
            if(collision_all_solid({
                object1:this,
                object2:this.bullet[i]
            })){
                this.spawned = false;
                this.position.y = canvas.height + 100;
                this.bullet[i].velocity.y = 0
                this.bullet[i].velocity.x = 0;
                this.bullet[i].position.y = 0
                this.bullet[i].position.x = 0;
                this.bullet[i].radius = 0;
                this.player.mana +=1
            }
        }
    }

    collide_with_player(){
        if(collision_all_solid({
            object1:this,
            object2:this.player
        })
        && this.hitDelay+100 < this.elapsedTime
        ){
            this.hitDelay = this.elapsedTime;
            this.player.health -= 3;
            this.player.color = 'red';
            setTimeout(() => {
                this.player.color = 'blue';
            }, 500);
        }
    }

    randSpawn(){
        this.spawned = false;
        const colBlocks = [this.platforms.first, this.platforms.sec, this.platforms.tres];
        const firstnum = getRandomInt(0,3);
        const secondnum = getRandomInt(0,20);
        if (colBlocks[firstnum][secondnum].inNegative && this.spawned == false && colBlocks[firstnum][secondnum].occupant == null) {
            this.velocity.x = 0
            this.position.y = colBlocks[firstnum][secondnum].top - 10; 
            this.position.x = colBlocks[firstnum][secondnum].position.x + colBlocks[firstnum][secondnum].width/2; 
            setTimeout(() => {
                this.velocity.x = this.speed;
            }, 1000);
            this.spawned = true;
            colBlocks[firstnum][secondnum].occupant = this.id;
        }
        else{
            this.position.y = canvas.height+100;
        }
    }

    update(){
        this.draw();
        this.fall();
        this.platforms_collision_check();

        this.position.x += this.velocity.x;
        this.bullet_hit();


        if(this.top >= canvas.height){
            this.randSpawn();
        }
        this.center = {
            x:this.position.x + this.width/2,
            y:this.position.y + this.height/2
        };
        this.top = this.position.y;
        this.left = this.position.x;
        this.bottom = this.position.y + this.height;
        this.right = this.position.x + this.width;


        this.collide_with_player();

    }
}