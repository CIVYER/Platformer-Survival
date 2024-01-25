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

btn_start.addEventListener('click',startGame);