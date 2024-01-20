const canvas = document.querySelector('canvas');
const canvas_container = document.getElementById('canvas_container');
const c = canvas.getContext('2d');

const gravity = 0.5;
const scrollSpeed = 3;

canvas.height = canvas_container.getBoundingClientRect().height;
canvas.width = canvas_container.getBoundingClientRect().width;

let mouseX
let mouseY

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;;
}
let go = false;
class Player{
    constructor({position, collisionBlocks}){
        this.height = 50;
        this.width = 50;
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

        this.onGround = false;
        this.hasWeapon = false;

        this.collisionBlocks = collisionBlocks;
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

        this.center.x = this.position.x + (this.width/2);
        this.center.y = this.position.y + (this.height/2);
        
        this.position.x += this.velocity.x;
        
        this.fall();
        this.cVertCol();
        //sets the sides coordinate per frame
        this.left = this.position.x;
        this.right = this.position.x + this.width;
        this.bottom = this.position.y + this.height;
        this.top = this.position.y;

        if (this.bottom + this.velocity.y + 1 > canvas.height && go == false) {
            this.velocity.y = 0
            this.onGround = true;
        }
        if (this.top + this.velocity.y - 1 < 0) {
            this.velocity.y = 3
            this.onGround = false;
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
            if(collision({
                object1:this,
                object2:colBlock
            })){
                if(this.velocity.y > 0){
                    this.onGround = true; 
                    this.velocity.y = 3;
                    this.position.y = colBlock.top - this.height - 0.01
                }
            }
            if(collision({
                object1:this,
                object2:colBlock2
            })){
                if(this.velocity.y > 0){
                    this.onGround = true; 
                    this.velocity.y = 3;
                    this.position.y = colBlock2.top - this.height - 0.01
                }
            }


        }
    }
}
class Platform{
    constructor({position, height, width, num, plats}){
        this.height = height;
        this.width = width;
        this.color = 'black';
        this.position = position;
        this.num = num;
        this.plats = plats;
        this.top = this.position.y;
        this.bottom = this.position.y + this.height;
        this.left = this.position.x;
        this.right = this.position.x + this.width;
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
        //pos first
        
        //update later
        // this.plats = player.collisionBlocks;
        this.bottom = this.position.y + this.height;
        this.top = this.position.y;
        this.left = this.position.x;
        this.right = this.position.x + this.width;
        
        this.scrollDown()
    }

    scrollDown(){
        if(player.position.y < canvas.height/2 || go){
            var partner = this.plats[this.num - 1];
            if (this.num == 0) {
                partner = this.plats[this.plats.length - this.num-1];
            }
            this.position.y += scrollSpeed;
            if(this.top > canvas.height){
                this.position.y = partner.top - 200;
                this.width = 200
                if(this.position.pos == 'left'){
                    this.position.x = getRandomInt(0, (canvas.width/2)+50);
                }
                else if(this.position.pos == 'right'){
                    this.position.x = getRandomInt((canvas.width/2)-50, canvas.width-200)
                }
                this.height = 7
            }
            go = true
        }
    }
}

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
    }
    draw(){
        c.beginPath();
        c.rect(this.position.x, this.position.y, this.width, this.height);
        c.fillStyle = this.color;
        c.fill();
        c.closePath();
    }
    drawImageRot(){
        // Store the current context state (i.e. rotation, translation etc..)
        c.save()
        
        //Convert degrees to radian 
        this.angle = Math.atan2(-((mouseX-20) - this.position.x+10), ((mouseY) - this.player.center.y));
    
        //Set the origin to the center of the image
        c.translate(this.position.x+10, this.player.center.y);
        
        //Rotate the canvas around the origin
        c.rotate(this.angle);
        
        //draw the image    
        c.fillStyle = this.color;
        c.fillRect(-1*(this.width/2),0,this.width,this.height);
        this.position.x = this.player.position.x+this.player.width/2-10
        // Restore canvas state as saved from above
        c.restore();
    }
    update(){
        this.drawImageRot();
    }
}


class Bullet{
    constructor({position, angle, player}){
        this.player = player;
        this.position = {
            x:position.x,
            y:position.y,
            currX:0,
            currY:0
        }
        this.velocity ={
            x:0,
            y:0
        }
        this.angles = angle;
        this.radius = 0;
        this.color = 'green';
        this.shot = false;
    }

    draw(){
        c.beginPath();
        c.arc(this.position.x, this.position.y, this.radius, Math.PI * 2, false);
        c.fillStyle = this.color;
        c.fill();
        c.closePath();
    }

    drawImageRot(){
        // Store the current context state (i.e. rotation, translation etc..)
        c.save()
        
        //Convert degrees to radian 
        this.angle = Math.atan2(-((mouseX-20) - this.position.x+10), (mouseY - this.player.center.y));
        
        //Set the origin to the center of the image
        c.translate(this.position.x+10, this.player.center.y);
        
        //Rotate the canvas around the origin

        c.rotate(this.angle);
        
        //draw the image    
        c.beginPath();
        c.arc(this.radius/2-4,40, this.radius, Math.PI * 2, false);
        c.fillStyle = this.color;
        c.fill();
        c.closePath();
        this.position.x = this.player.position.x+this.player.width/2-10
        // Restore canvas state as saved from above
        c.restore();
    }
    
    update(){
        this.draw();
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
        this.shoot()
    }
    
    shoot(){
        if(key_pressed.mouseLeftClick && !(this.shot)){
            this.radius = 8;
            this.velocity.x = (Math.sin(-weapon.angle) * 10);
            this.velocity.y = (Math.cos(-weapon.angle) * 10);
            if(go){
                // this.velocity.x+=scrollSpeed;
                // this.velocity.y+=scrollSpeed;
            }
            this.position.x = this.player.center.x + Math.sin(-weapon.angle)*40
            this.position.y = this.player.center.y + Math.cos(-weapon.angle)*40
            // this.shot = true;
        }
        if(this.position.x <= 0
            || this.position.x >= canvas.width
            || this.position.y <= 0
            || this.position.y >= canvas.height){
            this.radius = 0;
            this.velocity.x = 0;
            this.velocity.y = 0;
            // this.shot = false;
        }
    }
}

// platforms spawning must always be even
var collisionBlocks = [];
var collisionBlocks2 = [];

for (let i = 0; i < 10; i++) {
    collisionBlocks.push(    new Platform({
        position:{
            x:((canvas.width/2)-200)/2,
            y:canvas.height - (10+(100*(i))),
            pos:'left'
        },
        height:7,
        width:200,
        num:i,
        plats:collisionBlocks
    }))
}
for (let i = 0; i < 10; i++) {
    collisionBlocks2.push(    new Platform({
        position:{
            x:(canvas.width/1.2)-200,
            y:canvas.height - (10+(100*(i))),
            pos:'right'
        },
        height:7,
        width:200,
        num:i,
        plats:collisionBlocks
    }))
}

// player spawning
const player = new Player({
    position:{
        x:canvas.width/2,
        y:canvas.height-100
    },
    collisionBlocks:{
        first:collisionBlocks,
        sec:collisionBlocks2
    }
});

//player and vars
var key_pressed = {
    w:false,
    a:false,
    s:false,
    d:false,
    mouseLeftClick:false,
};
var weapon;
let targetX;
let targetY;
let bullet;
let start, testTime;
// The game Loop 
function game_loop(timeStamp){
    if (start === undefined) {
        start = timeStamp;
        testTime = timeStamp;
    }
    const elapsed = timeStamp - start;
    // console.log(testTime+5000, elapsed);


    requestAnimationFrame(game_loop);
    c.clearRect(0,0,canvas.width,canvas.height);
    player.collisionBlocks = {
        first:collisionBlocks,
        sec:collisionBlocks2
    };
    for(let i = 0; i < collisionBlocks.length; i++){
        collisionBlocks[i].update();
        collisionBlocks2[i].update();
    }
    player.update();
    if(player.hasWeapon){
        bullet.update();
        weapon.update();
    }
    else{
        weapon = new Weapon({
            position:{
                x:player.position.x+player.width/2-10,
                y:player.position.y+player.height/2,
            },
            player:player
        });
        bullet = new Bullet({
            position:{
                x:weapon.position.x,
                y:weapon.position.y
            },
            angle:weapon.angle,
            player:player
        });

        player.hasWeapon = true;
    }
    if(key_pressed.w && player.onGround){
        player.velocity.y = -13;
        player.onGround = false;
    }
    player.velocity.x = 0;
    if(key_pressed.a){
        player.velocity.x = -5;
    }
    else if(key_pressed.d){
        player.velocity.x = 5;
    }
    if(key_pressed.mouseLeftClick && bullet.shot == false){
        testTime = elapsed;
        bullet.shot = true;
    }

    if(testTime+500 < elapsed){
        bullet.shot = false;
    }
}
game_loop();

// event listeners && functions
window.addEventListener('keypress', (e)=>{
    if(String(e.key).toLowerCase() == 'w' && player.onGround){
        key_pressed.w = true;
    }
    if(String(e.key).toLowerCase() == 'a'){
        key_pressed.a = true;
    }
    if(String(e.key).toLowerCase() == 'd'){
        key_pressed.d = true;
    }
});
window.addEventListener('keyup', (e)=>{
    if(String(e.key).toLowerCase() == 'w'){
        key_pressed.w = false;
    }
    if(String(e.key).toLowerCase() == 'a'){
        key_pressed.a = false;
    }
    if(String(e.key).toLowerCase() == 'd'){
        key_pressed.d = false;
    }
});

function collision({object1, object2}){
    return(object1.bottom + object1.velocity.y >= object2.top
    && object1.bottom <= object2.bottom
    && object1.left <= object2.right
    && object1.right >= object2.left
    );
}
window.addEventListener('mousemove',(e)=>{
    mouseX = e.clientX-Math.abs((window.innerWidth-canvas.width)/2);
    mouseY = e.clientY-Math.abs((window.innerHeight-canvas.height)/2);
});
window.addEventListener('mousedown',(e)=>{
    key_pressed.mouseLeftClick = true;
    targetX = e.clientX-Math.abs((window.innerWidth-canvas.width)/2);
    targetY = e.clientY-Math.abs((window.innerHeight-canvas.height)/2);
});
window.addEventListener('mouseup',(e)=>{
    key_pressed.mouseLeftClick = false;
});

function drawImageRot(x,y,width,height){
    // Store the current context state (i.e. rotation, translation etc..)
    c.save()

    //Convert degrees to radian 
    // var rad = deg * Math.PI / 180;
    var rad = Math.atan2(-(mouseX - x), (mouseY - y));


    //Set the origin to the center of the image
    c.translate(x + width / 2, y + height);

    //Rotate the canvas around the origin
    c.rotate(rad);

    //draw the image    
    // c.clearRect(x,y,width,height)
    c.fillRect(width / 2 * (-1),0,width,height);

    // Restore canvas state as saved from above
    c.restore();
}