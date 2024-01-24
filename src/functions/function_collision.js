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