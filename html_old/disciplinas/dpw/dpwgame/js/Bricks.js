function Bricks() {
	//tijolos que o jogador tem que saltar
	this.bricks = [
	0,0,0,0,0,0,0,0,0,0,
	0,0,0,0,0,0,0,0,0,0, 

	1,1,1,2,2,3,2,2,1,1,
	1,1,1,2,2,3,2,2,1,1,
	1,2,2,2,3,3,3,4,4,4,

	5,5,1,0,0,0,4,4,4,4,	
	4,3,3,2,2,1,1,1,2,2,
	2,3,3,3,2,2,2,1,1,1,
	4,5,6, 2,0,0,0,0,0,0,

	3,6,6,4,4,1,1,3,3,5,
	5,1,6,5,4,3,2,1,0,0,
	1,2,3,4,5,6,1,5,5,3,
	3,1,1,4,4,6,6,3,0,0,

	0,0,0,0,0,0,1,1,
	1,1,1,1,1,1,2,2,2,2,
	2,2,2,2,3,3,3,3,3,3,
	3,3,4,4,4,4,4,4,4,4,

	0,0,0,0,0,0,0,0,0,4,4,
	8,8,4,4, 0,0,4,4,8,8,
	4,4,0,0,4,4,8,8,4,4,
	0,0,4,4,8,8,4,4,0,0,
	0,0,0,0,0,0,0,0,0,0]; 

	this.brickWidth = 20; //largura do brick em pixels
	this.brickHeight = 19; //altura do brick em pixels

	this.floorYPosition = 0;

	this.createImages = function(floorYPosition) {
		this.floorYPosition = floorYPosition; //posição da estrada;
		for (var x = 0; x < this.bricks.length; x++) {
			for (var y = 0; y<this.bricks[x]; y++) {
				var aBrick = new VisualObject();
				var z = x*10 + y; //dada a perspectiva em isometria, os elementos mais à direita devem estar numa camada superior ao da esquerda. Tijolos empilhados, quanto mais alto o y, a camada z é também superior.
				aBrick.setup(imgBrick, 23, 26, x*this.brickWidth, floorYPosition - (y * this.brickHeight), z);
				Game.objects.push(aBrick);
			}
		}
	}

	this.getHeightAtX = function(x) {
		if (x<0) return this.floorYPosition;
		var nBrick = Math.floor(x / this.brickWidth);
		if (nBrick<this.bricks.length) return this.floorYPosition - this.bricks[nBrick]*this.brickHeight;
		return this.floorYPosition;
	}

	this.getZAtX = function(x) {
		if (x<0) return 0;
		var nBrick = Math.floor(x / this.brickWidth);
		if (nBrick < this.bricks.length) return nBrick*10 + this.bricks[nBrick];
		else return 1000000; //está acima do último tijolo
	}

}