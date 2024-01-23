function create_enemy(){
    var emenemynum = 10
    for (let i = 0; i < emenemynum; i++) {
        enemy.push(new Enemy({
            position:{
                x:100,
                y:canvas.height+100
            },
            collisionBlocks:{
                first:collisionBlocks,
                sec:collisionBlocks2,
                tres:collisionBlocks3
            },
            player:player,
            weapon:null,
            bullet:bullet
        }));
    }
}
