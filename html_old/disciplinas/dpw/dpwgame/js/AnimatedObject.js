//um objeto animado, que se atualiza em função do tempo
function AnimatedObject() {
	this.nframes = 1; //quantidade de quadros na imagem
	this.currentFrame = 0; //quadro atual da imagem
    this.timeBetweenFrames = 0; //frames per second of the animation
	this.time = 0;

    /**
        @param nframes The number of animation frames in the image
        @param fps The frames per second to animate this object at
    */
    this.setFrames = function(nframes, timeBetweenFrames) {
        this.nframes = nframes;
        this.timeBetweenFrames = timeBetweenFrames;
        if (this.currentFrame>=this.nframes) this.currentFrame = 0;
    }

	this.update = function(dt) {
		this.time += dt;
        if (this.time >= this.timeBetweenFrames)  {
           this.currentFrame++;
           this.currentFrame %= this.nframes;
		   this.time = this.time - this.timeBetweenFrames;
        }
    }

}
AnimatedObject.prototype = new VisualObject;


function SpriteObject() {
    this.frameWidth = 0; //width of each individual frame. Todos os frames dessa imagem precisam ter a mesma largura

    this.setFrames = function(nframes, fps) {
		SpriteObject.prototype.setFrames.call(this, nframes, fps);
		this.frameWidth = this.image.width / this.nframes;
	}

	this.draw = function(context, xScroll, yScroll)   {
        var sourceX = this.frameWidth * this.currentFrame;
        context.drawImage(this.image, sourceX, 0, this.frameWidth, this.image.height, this.x - this.imgCenterX - xScroll, this.y - this.imgCenterY - yScroll, this.frameWidth, this.image.height);
	}

	this.collisionArea = function()  {
        var rec = new Rectangle();
		rec.setup(this.x - this.imgCenterX, this.y - this.imgCenterY, this.frameWidth, this.image.height);
		return rec;
    }

}
SpriteObject.prototype = new AnimatedObject;