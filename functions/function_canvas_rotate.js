function draw_rotated_rect_object(center_x, center_y,draw_pos_x, draw_pos_y, width, height, angle, color){
    // Store the current context state (i.e. rotation, translation etc..)
    c.save()

    //Set the origin to the center of the object
    c.translate(center_x, center_y);
    
    //Rotate the canvas around the origin
    c.rotate(angle);
    
    //draw the image    
    c.fillStyle = color;
    c.fillRect(draw_pos_x, draw_pos_y, width, height);
    // Restore canvas state as saved from above
    c.restore();
}

function draw_rotated_arc_object(center_x, center_y,draw_pos_x, draw_pos_y, radius, angle, color){
    // Store the current context state (i.e. rotation, translation etc..)
    c.save()

    //Set the origin to the center of the object
    c.translate(center_x, center_y);
    
    //Rotate the canvas around the origin
    c.rotate(angle);
    
    //draw the image    
    c.beginPath();
    c.fillStyle = color;
    c.arc(draw_pos_x, draw_pos_y, radius, Math.PI * 2, false);
    c.fill();
    c.closePath();
    // Restore canvas state as saved from above
    c.restore();
}