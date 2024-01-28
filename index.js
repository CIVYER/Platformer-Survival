const canvas = document.querySelector('canvas');
const canvas_container = document.getElementById('canvas_container');
const c = canvas.getContext('2d');

const body = document.getElementById('body');

const manac = document.getElementById('manac');
const manaNum = document.getElementById('mana');
const manaBar = document.getElementById('mbar');

const healthc = document.getElementById('healthc');
const healthNum = document.getElementById('health');
const healthBar = document.getElementById('hbar');

const expc = document.getElementById('expc');
const expNum = document.getElementById('exp');
const expBar = document.getElementById('expbar');


const btn_start = document.getElementById('start');
const btn_instruction = document.getElementById('instructions');
const mainMenuContainer = document.getElementById('mainMenuContainer');

const gravity = 1;
const scrollSpeed = 3;

canvas.height = canvas_container.getBoundingClientRect().height;
canvas.width = canvas_container.getBoundingClientRect().width;

let mouseX;
let mouseY;

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
const Tweapon = new Weapon({
    position:{
        x:-100,
        y:0
    },
});

create_platforms();

let bullet = [];
for (let i = 0; i < 100; i++) {
    bullet.push(new Bullet({
        position:{
            x:-100,
            y:canvas.height + 1000
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

let enemy_test = new Enemy({
    position:{
        x:100,
        y:canvas.height -300
    },
    collisionBlocks:{
        first:collisionBlocks,
        sec:collisionBlocks2,
        tres:collisionBlocks3
    },
    player:player,
    weapon:null,
    bullet:bullet,
    id:100
});

const background = new bg();

let start, bulletDelay, gameStart = false;

// The game Loop 
var plats = [collisionBlocks, collisionBlocks2, collisionBlocks3];
var followPlat;
var followPlat2;
function game_loop(timeStamp){
    var btop = body.getBoundingClientRect().top;
    var bleft = body.getBoundingClientRect().left;
    manac.style.top = String(btop+35) + 'px';
    manac.style.left = String(bleft+10) + 'px';
    healthc.style.top = String(btop+10) + 'px';
    healthc.style.left = String(bleft +10) + 'px';
    expc.style.top = String(btop+10) + 'px';
    expc.style.left = String(bleft + 230) + 'px';
    manac.style.visibility = 'hidden';
    healthc.style.visibility = 'hidden';
    expc.style.visibility = 'hidden';

    if (start === undefined) {
        start = timeStamp;
        bulletDelay = timeStamp;
    }
    const elapsed = timeStamp - start;
    requestAnimationFrame(game_loop);
    c.clearRect(0,0,canvas.width,canvas.height);
    background.update();
    if(player.start){
        if(background.scroll < 324 && player.go){
            background.scroll++;
        }
        // if(weapon.spawnW == false){
        //     var selectPlats = getRandomInt(0,3);
        //     var selectPlats2 = getRandomInt(0,20);
        //     if(plats[selectPlats][selectPlats2].inNegative){
        //         followPlat = selectPlats;
        //         followPlat2 = selectPlats2;
        //         weapon.position.x = plats[selectPlats][selectPlats2].position.x + plats[selectPlats][selectPlats2].width/2 - 20;
        //         weapon.position.y = plats[selectPlats][selectPlats2].top - 50;
        //         weapon.spawnW = true;
        //     }
        // }
        // if(!(player.hasWeapon) && weapon.spawnW){
        //     weapon.position.x = plats[followPlat][followPlat2].position.x + plats[followPlat][followPlat2].width/2 - 20;
        //     weapon.position.y = plats[followPlat][followPlat2].top - 50;
        //     weapon.color = 'yellow';
        // }
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
        // weapon.update();

        //////////vars for classes//////////////////////////////////////////////////////////////////////////
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
            collisionBlocks[i].update();
            collisionBlocks2[i].update();
            collisionBlocks3[i].update();
        }
        for (let i = 0; i < enemy.length; i++) {  
            enemy[i].elapsedTime = elapsed;      
            enemy[i].update();
        }

        if(gameStart){
            manac.style.visibility = 'visible';
            healthc.style.visibility = 'visible';
            expc.style.visibility = 'visible';
        
            if(player.hasWeapon){
                for (let i = 0; i < bullet.length; i++) {
                    bullet[i].update();
                }
            }
       
            player.update();
            player.elapsedTimer = elapsed;
       
            if(!player.onGround || player.velocity.y > 1){
                player.jumpFrame = 5;
            }
            else if(player.onGround) {
                player.jumpFrame = 0;
            }
            if(key_pressed.w && player.onGround){
                player.velocity.y = -18;
                player.onGround = false;
            }
            else if(key_pressed.s && player.onGround == true && player.onPlat){
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


            //bullet 
            if(key_pressed.mouseLeftClick && player.shot == false && player.hasWeapon && player.mana >= 10){
                bullet[player.inChamber].shoot();
                bulletDelay = elapsed;
            }
            
            if(bulletDelay+250 < elapsed){
                player.shot = false;
            }
        
        
            //////resets the game//////////////////////////////////////////
            if(player.gameOver){
                // c.clearRect(0,0,canvas.width, canvas.height);
                // player.start = false;
                gameStart = false;
                mainMenuContainer.style.visibility = 'visible';
            }
        }
        
        manaNum.innerText = 'Mana:' + player.mana + '+' + player.manaRegen + '/' + player.max_mana;
        healthNum.innerText = 'Health:' + player.health + '+' + player.healthRegen + '/' + player.max_health;
        expNum.innerText = 'Level ' + player.level + ' Exp:' + player.expBar + '%';
        healthBar.style.width = String(player.healthBar) + '%';
        manaBar.style.width = String(player.manaBar) + '%';
        expBar.style.width = String(player.expBar) + '%';
    }

    // How to play
    if(tutorial){
        Tplayer.collisionBlocks = {
            first:Tplatform,
            sec:Tplatform,
            tres:Tplatform
        };
        Tenemy.collisionBlocks = {
            first:Tplatform,
            sec:Tplatform,
            tres:Tplatform
        };
        Tplayer.go = false;
        if(Tmove){
            for (let i = 0; i < 3; i++) {
                Tplatform[i].update();
                Tplatform[i].inNegative = true;
            }
        }
        Tenemy.elapsedTime = elapsed;
        if(Tjump && Tdown){
            Tenemy.update();
        }
        manac.style.visibility = 'visible';
        healthc.style.visibility = 'visible';
        expc.style.visibility = 'visible';
    
        if(Tplayer.hasWeapon){
            for (let i = 0; i < Tbullet.length; i++) {
                Tbullet[i].update();
            }
        }
        Tplayer.update();
        Tplayer.elapsedTimer = elapsed;
   
        if(!Tplayer.onGround || Tplayer.velocity.y > 1){
            Tplayer.jumpFrame = 5;
        }
        else if(Tplayer.onGround) {
            Tplayer.jumpFrame = 0;
        }
        if(key_pressed.w && Tplayer.onGround && Tmove){
            Tplayer.velocity.y = -18;
            Tplayer.onGround = false;
            Tjump = true;
            if(!Tdown){
                jumpUp.style.visibility = 'hidden';
                dropDown.style.visibility = 'visible'
            }
        }
        else if(key_pressed.s && Tplayer.onGround && Tplayer.onPlat && Tjump){
            Tplayer.position.y += 11;
            Tplayer.bottom += 11;
            Tplayer.velocity.y = 3;
            Tplayer.onGround = false;
            Tdown = true;
            if(!Tshoot){
                dropDown.style.visibility = 'hidden'
                shootEnem.style.visibility = 'visible'
            }
        }
        Tplayer.velocity.x = 0;
        if(key_pressed.a){
            Tplayer.velocity.x = -5;
            Tplayer.face = 'left';
            Tmove = true;

            if(!Tjump){
                movement1.style.visibility = 'hidden';
                movement2.style.visibility = 'hidden';
                jumpUp.style.visibility = 'visible';
            }
        }
        else if(key_pressed.d){
            Tplayer.velocity.x = 5;
            Tplayer.face = 'right';
            Tmove = true;

            if(!Tjump){
                movement1.style.visibility = 'hidden';
                movement2.style.visibility = 'hidden';
                jumpUp.style.visibility = 'visible';
            }
        }


        //bullet 
        if(key_pressed.mouseLeftClick  && Tplayer.hasWeapon && Tplayer.mana >= 10 && Tdown && !Tplayer.shot){
            if(Tplayer.inChamber > Tbullet.length-1){
                Tplayer.inChamber = 0;
            }
            Tbullet[Tplayer.inChamber].shoot();
            // Tplayer.inChamber++;
            bulletDelay = elapsed;
            tDone.style.visibility = 'visible';
            shootEnem.style.visibility = 'hidden';
        }
        if(bulletDelay+250 < elapsed){ 
            Tplayer.shot = false;
        }

        manaNum.innerText = 'Mana:' + Tplayer.mana + '+' + Tplayer.manaRegen + '/' + Tplayer.max_mana;
        healthNum.innerText = 'Health:' + Tplayer.health + '+' + Tplayer.healthRegen + '/' + Tplayer.max_health;
        expNum.innerText = 'Level ' + Tplayer.level + ' Exp:' + Tplayer.expBar + '%';
        healthBar.style.width = String(Tplayer.healthBar) + '%';
        manaBar.style.width = String(Tplayer.manaBar) + '%';
        expBar.style.width = String(Tplayer.expBar) + '%';

        if(Tplayer.health <= 0){
            btn_instruction.click();
        }
    }


    
}
// window.onload = ()=>{
//     btn_instruction.click();
// }
const movement1 = document.getElementById('movement1');
const movement2 = document.getElementById('movement2');
const jumpUp = document.getElementById('jumpUp');
const dropDown = document.getElementById('dropDown');
const shootEnem = document.getElementById('shootEnem');
const mainM = document.getElementById('mainM');
const tDone = document.getElementById('tDone');

var tutorial = false
var Tplayer, Tplatform = [], Tenemy, Tbullet = [];
var Tmove = false, Tjump = false, Tdown = false, Tshoot = false;
game_loop();