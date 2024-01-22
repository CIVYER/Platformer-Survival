const canvas = document.querySelector('canvas');
const canvas_container = document.getElementById('canvas_container');
const c = canvas.getContext('2d');

const gravity = 1;
const scrollSpeed = 3;

canvas.height = canvas_container.getBoundingClientRect().height;
canvas.width = canvas_container.getBoundingClientRect().width;

let mouseX
let mouseY

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;;
}
// player spawning
const player = new Player({
    position:{
        x:canvas.width/2,
        y:canvas.height-100
    }
});

// platforms spawning must always be even
var collisionBlocks = [];
var collisionBlocks2 = [];

// weapon spawning
const weapon = new Weapon({
    position:{
        x:0,
        y:0
    },
});

create_platforms();

let bullet = [];
for (let i = 0; i < 5; i++) {
    bullet.push(new Bullet({
        position:{
            x:weapon.position.x,
            y:weapon.position.y
        },
        weapon:weapon,
        player:player
    }));
}

var enemy = [];
create_enemy();

player.weapon = weapon;
weapon.player = player;
//player and vars
var key_pressed = {
    w:false,
    a:false,
    s:false,
    d:false,
    r:false,
    mouseLeftClick:false,
};

let start, bulletDelay;
// The game Loop 
var plats = [collisionBlocks, collisionBlocks2];
var followPlat;
var followPlat2;
function game_loop(timeStamp){
    if (start === undefined) {
        start = timeStamp;
        bulletDelay = timeStamp;
    }
    const elapsed = timeStamp - start;

    if(weapon.spawnW == false){
        var selectPlats = getRandomInt(0,2);
        var selectPlats2 = getRandomInt(0,20);
        if(plats[selectPlats][selectPlats2].inNegative){
            followPlat = selectPlats;
            followPlat2 = selectPlats2;
            weapon.position.x = plats[selectPlats][selectPlats2].position.x + plats[selectPlats][selectPlats2].width/2 - 20;
            weapon.position.y = plats[selectPlats][selectPlats2].top - 50;
            weapon.spawnW = true;
        }
    }
    if(!(player.hasWeapon) && weapon.spawnW){
        weapon.position.x = plats[followPlat][followPlat2].position.x + plats[followPlat][followPlat2].width/2 - 20;
        weapon.position.y = plats[followPlat][followPlat2].top - 50;
        weapon.color = 'yellow';
    }

    requestAnimationFrame(game_loop);
    c.clearRect(0,0,canvas.width,canvas.height);

    //vars for classes
    player.collisionBlocks = {
        first:collisionBlocks,
        sec:collisionBlocks2
    };
    enemy[0].collisionBlocks = {
        first:collisionBlocks,
        sec:collisionBlocks2
    };

    for(let i = 0; i < collisionBlocks.length; i++){
        collisionBlocks[i].update();
        collisionBlocks2[i].update();
    }
    player.update();
    for (let i = 0; i < enemy.length; i++) {        
        enemy[i].update();
    }
    weapon.update();
    if(player.hasWeapon){
        for (let i = 0; i < bullet.length; i++) {
            bullet[i].update();
        }
    }

    if(key_pressed.w && player.onGround){
        player.velocity.y = -18;
        player.onGround = false;
    }
    else if(key_pressed.s && player.onGround == false){
        player.velocity.y += player.velocity.y;
    }
    player.velocity.x = 0;
    if(key_pressed.a){
        player.velocity.x = -5;
    }
    else if(key_pressed.d){
        player.velocity.x = 5;
    }
    if(key_pressed.r && player.inChamber >= bullet.length){
        player.inChamber = 0;
        weapon.color = 'green';
        setTimeout(() => {
            weapon.color = 'black';
        }, 500);
    }

    //weapon x bullet 
    if(key_pressed.mouseLeftClick && player.shot == false && player.inChamber < bullet.length && player.hasWeapon){
        bullet[player.inChamber].shoot();
        player.inChamber++;
        bulletDelay = elapsed;
        player.shot = true;
    }
    if(player.inChamber >= bullet.length){
        weapon.color = 'red';
    }
    
    if(bulletDelay+500 < elapsed){
        player.shot = false;
    }


// resets the game//////////////////////////////////////////
    if(player.gameOver){
        player.inChamber = 0;
        followPlat = undefined
        followPlat2 = undefined
        player.go = false;
        collisionBlocks = [];
        collisionBlocks2 = [];
        player.position.x = canvas.width/2,
        player.position.y = canvas.height-100
        player.hasWeapon = false;
        weapon.spawnW = false;
        create_platforms();
        plats = [collisionBlocks, collisionBlocks2];
        enemy = [];
        create_enemy();
        // weapon.position.x = collisionBlocks[9].position.x + collisionBlocks[9].width/2 - 20;
        // weapon.position.y = collisionBlocks[9].top - 50;
        player.gameOver = false;
    }
}
game_loop();

// event listeners && functions
window.addEventListener('keypress', (e)=>{
    if((e.keyCode == 32 || String(e.key).toLowerCase() == 'w') && player.onGround){
        key_pressed.w = true;
    }
    if(String(e.key).toLowerCase() == 'a'){
        key_pressed.a = true;
    }
    if(String(e.key).toLowerCase() == 's'){
        key_pressed.s = true;
    }
    if(String(e.key).toLowerCase() == 'd'){
        key_pressed.d = true;
    }
    if(String(e.key).toLowerCase() == 'r'){
        key_pressed.r = true;
    }
});
window.addEventListener('keyup', (e)=>{
    if((e.keyCode == 32 || String(e.key).toLowerCase() == 'w')){
        key_pressed.w = false;
    }
    if(String(e.key).toLowerCase() == 'a'){
        key_pressed.a = false;
    }
    if(String(e.key).toLowerCase() == 's'){
        key_pressed.s = false;
    }
    if(String(e.key).toLowerCase() == 'd'){
        key_pressed.d = false;
    }
    if(String(e.key).toLowerCase() == 'r'){
        key_pressed.r = false;
    }
});


window.addEventListener('mousemove',(e)=>{
    mouseX = e.clientX-Math.abs((window.innerWidth-canvas.width)/2);
    mouseY = e.clientY-Math.abs((window.innerHeight-canvas.height)/2);
});
window.addEventListener('mousedown',(e)=>{
    if(e.button == 0){
        key_pressed.mouseLeftClick = true;
    }
});
window.addEventListener('mouseup',(e)=>{
    if(e.buttons == 0){
        key_pressed.mouseLeftClick = false;
    }
});
