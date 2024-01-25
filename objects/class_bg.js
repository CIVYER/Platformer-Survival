class bg{
    constructor(){
        this.position = {
            x:0,
            y:0
        }
        this.width = canvas.width;
        this.height = 0;
        this.image = new Image();
        this.image.src = './src/bg/bg.png';
        this.image.onload = ()=>{
            this.height = this.image.height
        }
        this.shown = {
            x:0,
            y:this.height/22
        }
        this.scroll = 0;
    }

    draw(){
        c.save();
        c.beginPath();
        c.scale(2,1)
        c.drawImage(
            this.image,
            this.shown.x,
            this.shown.y-this.scroll,
            canvas.width,
            canvas.height,
            0, 0,
            canvas.width*2,
            canvas.height*2
            )
        c.closePath();
        c.restore();
    }

    update(){
        this.image.onload = ()=>{
            this.height = this.image.height
        }
        this.shown = {
            x:0,
            y:this.height/2
        }
        this.draw();
    }
}