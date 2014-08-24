function Enemy() {
	this.blocking = false; //indica que est� bloqueando o jogador
	this.tBlocking = 0; //tempo acumulado desde o in�cio do bloqueio

	this.update = function(dt) {
		Enemy.prototype.update.call(this, dt);

		if (this.blocking) {
			this.tBlocking += 1;
			return 0;
		}

		this.direction = 0; //dire��o:  0 est� rolando para esquerda, 5 est� descendo, -5 est� subindo

		//verifica se deve rolar para esquerda, escalar ou cair
		var heightNextStep = Game.bricks.getHeightAtX(this.x - 2);
		//verifica se pode rolar (se est� no mesmo n�vel)
		if (this.y == heightNextStep ) { 
			this.x = this.x - 2;
			//this.z = Game.bricks.getZAtX(this.x) - 0.5;
		} else 
		//verifica se tem que escalar
		if (this.y > heightNextStep ) { //se descendo e deve continuar descendo at� afundar
			this.y -= 5; //sobe o bloco
			//this.z = Game.bricks.getZAtX(this.x) - 0.5;
			if (this.y < heightNextStep) this.y = heightNextStep; //j� chegou no topo
		} else //verifica se est� caindo
		if (this.y <  heightNextStep) { //est� caindo
			this.z = Game.bricks.getZAtX(this.x - 20) + 0.5;
			this.y += 5; //cai um pouco
			if (this.y > heightNextStep)  this.y = heightNextStep; //j� chegou na base
		}

        if (this.collisionArea().intersects(Game.player.collisionArea()))  {//inimigo esbarrou com o jogador
			Game.player.setBlocked();
			Game.soundEffects.blocked();
			Game.notifyEvent(Game.enemys[Game.enemysCount%Game.enemys.length], this.x, this.y - 50, "bold 10pt sans-serif");
			Game.enemysCount++;
			Game.removeObject(this);
        }
	}

	this.collisionArea = function()  {
        var rec = new Rectangle();
		rec.setup(this.x - 5, this.y - 20, 10, 20);
		return rec;
    }

}
Enemy.prototype = new SpriteObject;