class Platform{
    constructor({position, height, width, num, elements}){
        this.height = height;
        this.width = width;
        this.color = 'black';
        this.position = position;
        this.num = num;
        this.elements = elements;
        this.top = this.position.y;
        this.bottom = this.position.y + this.height;
        this.left = this.position.x;
        this.right = this.position.x + this.width;

        this.inNegative = false;
    }
    draw(){
        c.beginPath();
        c.rect(this.position.x, this.position.y, this.width, this.height);
        c.fillStyle = this.color;
        c.fill();
        c.closePath();
    }
    update(){
        this.draw();

        this.bottom = this.position.y + this.height;
        this.top = this.position.y;
        this.left = this.position.x;
        this.right = this.position.x + this.width;
        
        this.scrollDown()

        // if(this.elements.player.hasWeapon == false && weapon.spawnW){
        //     this.elements.weapon.position.x = this.elements.platforms[0].position.x + this.elements.platforms[0].width/2 - this.elements.weapon.width;
        //     this.elements.weapon.position.y =  this.elements.platforms[0].top-50;
        // }

        if(this.bottom <= canvas.height - 1000){
            this.inNegative = true;
        }
        else{
            this.inNegative = false;
        }
    }

    scrollDown(){
        if(this.elements.player.bottom < (canvas.height/2) || this.elements.player.go){
            var partner = this.elements.platforms[this.num - 1];
            if (this.num == 0) {
                partner = this.elements.platforms[this.elements.platforms.length - this.num-1];
            }
            this.position.y += scrollSpeed;
            if(this.elements.player.top - this.elements.player.velocity.y <= Math.abs(this.elements.player.velocity.y)+35){
                this.position.y += Math.abs(this.elements.player.velocity.y);
            }
            if(this.top > canvas.height+50){
                this.position.y = partner.top - 150;
                this.width = 100
                if(this.position.pos == 'left'){
                    this.position.x = getRandomInt(0, (canvas.width/2));
                }
                else if(this.position.pos == 'right'){
                    this.position.x = getRandomInt((canvas.width/2), canvas.width-200)
                }
                else if(this.position.pos == 'center'){
                    this.position.x = getRandomInt((canvas.width/2)-200, canvas.width/2-200)
                }
                this.height = 7

                // if(this.num  == 0 && this.elements.player.hasWeapon == false){
                //     this.elements.weapon.position.x = this.elements.platforms[0].position.x + this.elements.platforms[0].width/2 - this.elements.weapon.width;
                //     this.elements.weapon.position.y =  this.elements.platforms[0].top-50;
                //     this.elements.weapon.spawnW = true;
                // }
            }
            this.elements.player.go = true
        }
    }
}