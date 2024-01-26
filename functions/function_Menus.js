function startGame(){
    mainMenuContainer.style.visibility = 'hidden';
    background.scroll = 0;

    player.exp = 0;
    player.level = 1;

    player.max_health = 100;
    player.health = player.max_health;
    player.healthRegen = 1;

    player.max_mana = 100;
    player.mana = player.max_mana;
    player.manaRegen = 5;
    player.inChamber = 0;
    // player.hasWeapon = false;
    // weapon.spawnW = false;

    player.position.x = canvas.width/2,
    player.position.y = canvas.height-100
    
    player.go = false;

    followPlat = undefined
    followPlat2 = undefined
    collisionBlocks = [];
    collisionBlocks2 = [];
    collisionBlocks3 = [];
    create_platforms();
    plats = [collisionBlocks, collisionBlocks2, collisionBlocks3];
    
    enemy = [];
    create_enemy();
    
    player.gameOver = false;
    gameStart = true;

    // testing features
    enemy_test.position.x = 300;
    enemy_test.position.y = 300;
}

function start_tutorial(){
    //reset game
    tutorial = true;
    collisionBlocks = [], collisionBlocks2 = [], collisionBlocks3 = [];
    enemy = [];
    background.scroll = 0;
    player.go = false;

    player.start = false;
    //starts tutorial
    mainMenuContainer.style.visibility = 'hidden';
    Tplayer = '', Tplatform = [], Tenemy = '', Tbullet = [];
    Tmove = false, Tjump = false, Tdown = false, Tshoot = false;
    tDone.style.visibility = 'hidden';

    //initialize tutorial elements
    movement1.style.visibility = 'visible';
    movement2.style.visibility = 'visible';
    Tplayer = new Player({
        position:{
            x:canvas.width/2,
            y:canvas.height/2
        },
        collisionBlocks:Tplatform,
        weapon:Tweapon
    });
    for (let i = 0; i < 3; i++) {
        Tplatform.push(new Platform({
            position:{
                x:100*(i*2),
                y:canvas.height - 100,
                pos:'left'
            },
            height:7,
            width:7,
            num:100,
            elements:{
                platforms:Tplatform,
                player:Tplayer,
                weapon:Tweapon
            }
        }));
    }
    Tenemy = new Enemy({
        position:{
            x:100,
            y:canvas.height-400
        },
        collisionBlocks:{
            first:Tplatform,
            sec:Tplatform,
            tres:Tplatform
        },
        player:Tplayer,
        weapon:null,
        bullet:Tbullet,
        id:100
    });

    for (let i = 0; i < 5; i++) {
        Tbullet.push(new Bullet({
            position:{
                x:0,
                y:0
            },
            weapon:Tweapon,
            player:Tplayer
        }));
    }
}    

btn_start.addEventListener('click', startGame);

btn_instruction.addEventListener('click', start_tutorial);

// event listeners && functions
window.addEventListener('keydown', (e)=>{
    if((String(e.key).toLowerCase() == 'arrowup' || e.keyCode == 32 || String(e.key).toLowerCase() == 'w')){
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

mainM.addEventListener('click',()=>{
    tutorial = false;
    Tplayer = '', Tplatform = [], Tenemy = '', Tbullet = [];
    Tmove = false, Tjump = false, Tdown = false, Tshoot = false;
    tDone.style.visibility = 'hidden';
    player.start = true;
    btn_start.click();
});