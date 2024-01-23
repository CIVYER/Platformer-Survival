function create_platforms(){
    
    var plat_num = 20;
    var plat_width = 100;

    for (let i = 0; i < plat_num; i++) {
        var yFormula = canvas.height - (10+(130*(i)));
        collisionBlocks.push(    new Platform({
            position:{
                x:getRandomInt(0, (canvas.width/2)),
                y:yFormula,
                pos:'left'
            },
            height:7,
            width:plat_width,
            num:i,
            elements:{
                platforms:collisionBlocks,
                player:player,
                weapon:weapon
            }
        }));

        collisionBlocks2.push(    new Platform({
            position:{
                x:getRandomInt((canvas.width/2)-200, canvas.width/2+200),
                y:yFormula,
                pos:'center'
            },
            height:7,
            width:plat_width,
            num:i,
            elements:{
                platforms:collisionBlocks,
                player:player,
                weapon:weapon
            }
        }));

        collisionBlocks3.push(    new Platform({
            position:{
                x:getRandomInt((canvas.width/2), canvas.width-200),
                y:yFormula,
                pos:'right'
            },
            height:7,
            width:plat_width,
            num:i,
            elements:{
                platforms:collisionBlocks,
                player:player,
                weapon:weapon
            }
        }));
    }
}