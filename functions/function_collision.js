function collision_bottom_hollow({object1, object2}){
    return(object1.bottom + object1.velocity.y >= object2.top
    && object1.bottom <= object2.bottom
    && object1.left <= object2.right
    && object1.right >= object2.left
    );
}
function collision_all_solid({object1, object2}){
    return(object1.bottom >= object2.top
    && object1.top <= object2.bottom
    && object1.left <= object2.right
    && object1.right >= object2.left
    );
}
function collision_bullet({object2,bullet}){
    let a = bullet.position.x - object2.center.x;
    let b = bullet.position.y - object2.center.y;
    let c = Math.hypot(a,b);
    let size = object2.width;

    console.log(size, c);

    return(size >= c);
}