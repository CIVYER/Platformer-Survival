function create_platforms(){
    
    var plat_num = 20;

    for (let i = 0; i < plat_num; i++) {
        var yFormula = canvas.height - (10+(130*(i)));
        collisionBlocks.push(    new Platform({
            position:{
                x:getRandomInt(0, (canvas.width/2)+25),
                y:yFormula,
                pos:'left'
            },
            height:7,
            width:250,
            num:i,
            elements:{
                platforms:collisionBlocks,
                player:player,
                weapon:weapon
            }
        }));

        collisionBlocks2.push(    new Platform({
            position:{
                x:getRandomInt((canvas.width/2)-25, canvas.width-200),
                y:yFormula,
                pos:'right'
            },
            height:7,
            width:250,
            num:i,
            elements:{
                platforms:collisionBlocks,
                player:player,
                weapon:weapon
            }
        }));
    }
}