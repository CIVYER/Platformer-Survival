const canvas = document.querySelector('canvas');
const canvas_container = document.getElementById('canvas_container');
const c = canvas.getContext('2d');

const manaNum = document.getElementById('mana');
const healthNum = document.getElementById('health');
const manaBar = document.getElementById('mbar');
const healthBar = document.getElementById('hbar');
const expNum = document.getElementById('exp');
const expBar = document.getElementById('expbar');

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
var collisionBlocks3 = [];

// weapon spawning
const weapon = new Weapon({
    position:{
        x:-100,
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
var plats = [collisionBlocks, collisionBlocks2, collisionBlocks3];
var followPlat;
var followPlat2;
function game_loop(timeStamp){
    if(!player.start){

        if (start === undefined) {
            start = timeStamp;
            bulletDelay = timeStamp;
        }
        const elapsed = timeStamp - start;
        requestAnimationFrame(game_loop);
        c.clearRect(0,0,canvas.width,canvas.height);
        if(weapon.spawnW == false){
            var selectPlats = getRandomInt(0,3);
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
    
        //vars for classes
        player.collisionBlocks = {
            first:collisionBlocks,
            sec:collisionBlocks2,
            tres:collisionBlocks3
        };
        enemy[0].collisionBlocks = {
            first:collisionBlocks,
            sec:collisionBlocks2,
            tres:collisionBlocks3
        };
    
        for(let i = 0; i < collisionBlocks.length; i++){
            // collisionBlocks[i].platforms = collisionBlocks 
            // collisionBlocks2[i].platforms = collisionBlocks2 
            // collisionBlocks3[i].platforms = collisionBlocks3 
            collisionBlocks[i].update();
            collisionBlocks2[i].update();
            collisionBlocks3[i].update();
        }
        if(player.hasWeapon){
            for (let i = 0; i < bullet.length; i++) {
                bullet[i].update();
            }
        }
        player.update();
        player.elapsedTimer = elapsed;
        for (let i = 0; i < enemy.length; i++) {  
            enemy[i].elapsedTime = elapsed;      
            enemy[i].update();
        }

        // weapon.update();
        if(!player.onGround || player.velocity.y > 1){
            player.jumpFrame = 5
            // if(player.jumpFrame >= 5){
            // }
            // else{

            //     player.jumpFrame+=1;
            // }
        }
        if (player.onGround) {
            player.jumpFrame = 0;
        }
        if(key_pressed.w && player.onGround){
            player.velocity.y = -18;
            player.onGround = false;
        }
        else if(key_pressed.s && player.onGround == true){
            player.position.y += 11;
            player.bottom += 11;
            player.velocity.y = 3;
            player.onGround = false;
        }
        player.velocity.x = 0;
        if(key_pressed.a){
            player.velocity.x = -5;
            player.face = 'left';
        }
        else if(key_pressed.d){
            player.velocity.x = 5;
            player.face = 'right';
        }
        // if((key_pressed.r) && player.inChamber >= bullet.length){
        //     weapon.color = 'green';
        //     setTimeout(() => {
        //         player.inChamber = 0;
        //         key_pressed.r = false;
        //         weapon.color = 'black';
        //     }, 1000);
        // }
        // else if(player.inChamber >= bullet.length){
        //     weapon.color = 'red';
        // }
    
        //weapon x bullet 
        if(key_pressed.mouseLeftClick && player.shot == false && player.hasWeapon && player.mana >= 10){
            player.mana -= 10;
            if(player.inChamber > bullet.length-1){
                player.inChamber = 0;
            }
            bullet[player.inChamber].shoot();
            player.inChamber++;
            bulletDelay = elapsed;
            player.shot = true;
        }
        
        if(bulletDelay+500 < elapsed){
            player.shot = false;
        }
    
    
    // resets the game//////////////////////////////////////////
        if(player.gameOver){
            player.exp = 0;
            player.level = 1;
            player.health = 100;
            player.healthRegen = 1;
            player.max_health = 100;
            player.max_mana = 100;
            player.mana = 100;
            player.manaRegen = 5;
            player.inChamber = 0;
            followPlat = undefined
            followPlat2 = undefined
            player.go = false;
            collisionBlocks = [];
            collisionBlocks2 = [];
            collisionBlocks3 = [];
            player.position.x = canvas.width/2,
            player.position.y = canvas.height-100
            // player.hasWeapon = false;
            weapon.spawnW = false;
            create_platforms();
            plats = [collisionBlocks, collisionBlocks2, collisionBlocks3];
            enemy = [];
            create_enemy();
            // weapon.position.x = collisionBlocks[9].position.x + collisionBlocks[9].width/2 - 20;
            // weapon.position.y = collisionBlocks[9].top - 50;
            player.gameOver = false;
        }
    }

    manaNum.innerText = 'Mana:' + player.mana + '/' + player.max_mana;
    healthNum.innerText = 'Health:' + player.health + '/' + player.max_health;
    expNum.innerText = 'Level ' + player.level + ' Exp:' + player.expBar + '%';
    healthBar.style.width = String(player.healthBar) + '%';
    manaBar.style.width = String(player.manaBar) + '%';
    expBar.style.width = String(player.expBar) + '%';
}
game_loop();

// event listeners && functions
window.addEventListener('keydown', (e)=>{
    if((String(e.key).toLowerCase() == 'arrowup' || e.keyCode == 32 || String(e.key).toLowerCase() == 'w') && player.onGround){
        key_pressed.w = true;
    }
    if(String(e.key).toLowerCase() == 'a' || String(e.key).toLowerCase() == 'arrowleft'){
        key_pressed.a = true;
    }
    if(String(e.key).toLowerCase() == 's' || String(e.key).toLowerCase() == 'arrowdown'){
        key_pressed.s = true;
    }
    if(String(e.key).toLowerCase() == 'd' || String(e.key).toLowerCase() == 'arrowright'){
        key_pressed.d = true;
    }
    if(String(e.key).toLowerCase() == 'r'){
        key_pressed.r = true;
    }
});
window.addEventListener('keyup', (e)=>{
    if((String(e.key).toLowerCase() == 'arrowup' || e.keyCode == 32 || String(e.key).toLowerCase() == 'w')){
        key_pressed.w = false;
    }
    if(String(e.key).toLowerCase() == 'a' || String(e.key).toLowerCase() == 'arrowleft'){
        key_pressed.a = false;
    }
    if(String(e.key).toLowerCase() == 's' || String(e.key).toLowerCase() == 'arrowdown'){
        key_pressed.s = false;
    }
    if(String(e.key).toLowerCase() == 'd' || String(e.key).toLowerCase() == 'arrowright'){
        key_pressed.d = false;
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
