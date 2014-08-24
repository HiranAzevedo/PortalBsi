//  A class to represent the player on the screen
function Player() {
    this.jumping = false; //estado do jogador: pulando ou no chão
	this.walking = false; //estado do jogador: andando ou parado
	this.direction = 1; //direção para ondo o jogador está olhando. Direita = 1; Esquerda = 0.

	this.powersHTML = new Array();
	this.powersCSS = new Array();
	this.powersJavascript = new Array();
	this.powersWebDesign = new Array();

	this.blocked = false; //ao encostar no inimigo ficará paralisado impedido de se mover.
	this.blockedTime = 0;

	//calcula as alturas de um pulo
	this.jumpPositions = new Array();
	this.jumpPos = 0;
	var jumpHeight = 80; //4 blocos, pois cada bloco tem 20pixels de altura
	var jumpFrames = 18; //quantidade de quadros que irá durar o salto.
	var jumpFramesDiv2 = Math.ceil(this.jumpFrames/2);
	for (var i = 0; i<=jumpFrames; i++)	{ 
		var angle = i*(Math.PI / jumpFrames);
		this.jumpPositions.push(jumpHeight * Math.sin(angle));
	}
	
    //  Called when a key is pressed
    this.keyDown = function(event)   {
		event.preventDefault(); //evita que a div do relatório também role para cima ou para baixo em função do usuário usar as setas para fazer o jogador pular

		if (Game.clock.isTimeout()) return;
		if (event.keyCode == 37 || event.keyCode == 38 || event.keyCode == 39 || event.keyCode == 32 ) {
			if (!Game.playing) Game.play(true);

			var movementChanged = false;
			// left
			if (event.keyCode == 37 && !this.left)  {
				this.left = true;
				this.direction = 0; //direciona-se para a esquerda
				movementChanged = true;
			}
			// right
			if (event.keyCode == 39 && !this.right)   {
				this.right = true;
				this.direction = 1; //direciona-se para a esquerda
				movementChanged = true;
			}
			//up
			if ( (event.keyCode == 38 || event.keyCode == 32)  && !this.jumping)  {
				this.jumping = true;
				this.jumpPos = 0;
				movementChanged = true;
			}
			this.walking = (this.right || this.left);
			if (movementChanged) this.changeImage();
		}
		else if (event.keyCode==80) { // tecla "p" = pausar;
			Game.play(false);
		}
		return false;
    }


	// Called when a key is released
    this.keyUp = function(event)  {
		if (!Game.playing) return;

        // left
        if (event.keyCode == 37) {
            this.left = false;
			if (this.right) this.direction = 1; //a seta para direita continua apertada (o jogador apertou as duas setas juntas)
	        this.changeImage();
        }
        // right
        if (event.keyCode == 39)  {
            this.right = false;
			if (this.left) this.direction = 0; //a seta para esquerda continua apertada (o jogador apertou as duas setas juntas)
	        this.changeImage();
        }
		if (this.walking && !(this.right || this.left) ) {
			this.walking= false;
	        this.changeImage();
		}
    }

    this.changeImage = function()  {
		if (this.blocked) {
			this.image = imgPlayerBlocked;
			this.setFrames(1, 1);
		} else
		if (this.jumping) { 
			if (this.direction==1) this.image = imgPlayerJumpingRight;
			else this.image = imgPlayerJumpingLeft;
			this.setFrames(1, 1);
		} else
		if (this.walking) { //jogador andando
			if (this.direction==1) this.image = imgPlayerRunningRight;
			else this.image = imgPlayerRunningLeft;
			this.setFrames(16, 1);
		} else { //jogador parado
			if (this.direction==1) this.image = imgPlayerIdleRight;
			else this.image = imgPlayerIdleLeft;
			this.currentFrame=0;
			this.setFrames(60, 1);
		}
    }


	this.update = function(dt) {
		Player.prototype.update.call(this, dt);
		
		if (this.blocked) {
			this.blockedTime += 1;
			if (this.blockedTime == 125) { //5 segundos depois...
				this.blocked = false;
				this.blockedTime = 0;
				this.walking = false;
				this.jumping = false;
	            this.right = false;
	            this.left = false;
				this.changeImage();
			}
			return;
		}

		if (this.walking) {
			if (this.direction==1) { //para a direita
				this.x += 5;
				//verifica se esbarrou em algum bloco em sua frente
				if (this.y > Game.bricks.getHeightAtX(this.x + 5) ) { //se está num nível abaixo da pilha de blocos é porque o jogador parou sob um nível de bloco que está acima dele. O "+5" é porque o jogador não é um ponto, é preciso evitar que ele esbarre a perna no bloco.
					this.x -= 5; //caso tenha esbarrado em algum bloco, desfazer a andada. 
				}
			} else { //para a esquerda
				this.x -= 5;
				//verifica se esbarrou em algum bloco em sua frente
				if (this.y > Game.bricks.getHeightAtX(this.x - 5) ) { //se está num nível abaixo da pilha de blocos é porque o jogador avançou um nível de bloco e não deveria. O "+5" é porque o jogador não é um ponto, é preciso evitar que ele esbarre a perna no bloco.
					this.x +=5;	//caso tenha esbarrado em algum bloco, desfazer a andada e retornar até o início do bloco. 
				}
			}
		}

		//verificar se caiu num poço
		if (!this.jumping && this.y<Game.bricks.getHeightAtX(this.x) )	{
			this.y += 10; //cai numa velocidade constante;
			this.jumping = true;
			this.jumpPos = this.jumpPositions.length;
			this.changeImage();
		}

        // if the player is jumping or falling, move along the sine wave
        if (this.jumping) {
            this.jumpPos++;
            if (this.jumpPos < this.jumpPositions.length) {
                this.y -= this.jumpPositions[this.jumpPos] - this.jumpPositions[this.jumpPos-1];
			}
			else { //fim do salto
				this.y +=10; // a partir deste ponto, o jogador irá cair a uma velocidade constante
			}
			var bricksHeightAtX = Game.bricks.getHeightAtX(this.x);
			if ( (this.jumpPos > this.jumpFramesDiv2) && (this.y>bricksHeightAtX) ) { //verifica se, ao iniciar a queda se já entrou dentro de um tijolo, pois não pode, tem que parar na altura do tijogo!
				this.y = bricksHeightAtX;
				this.jumping = false;
				this.changeImage();
			}
        }

		//verifica se parou de cair no poço
		if ( this.jumping && this.y>Game.bricks.getHeightAtX(this.x) ) {
			this.y = Game.bricks.getHeightAtX(this.x);
			this.jumping=false;
			this.jumpPos = 0;
			this.changeImage();
		}

		//reposiciona o z do jogador. Tem que estar sobre o último tijolo na pilha sob seus pés.
		this.z = Game.bricks.getZAtX(this.x) - 0.5;
		//por causa da isometria, se estiver andando sobre uma plataforma de tijolos no mesmo nível, a fileira de tijolos do lado direito vai aparecer desenhada sobre o bico do pé do jogador. Então antever o tijolo à direita e, se estiver no mesmo nível, considerar que o jogador está acima de ambos.
		if (this.y == Game.bricks.getHeightAtX(this.x + 12) ) { //se está num nível abaixo da pilha de blocos é porque o jogador parou sob um nível de bloco que está acima dele. O "+5" é porque o jogador não é um ponto, é preciso evitar que ele esbarre a perna no bloco.
			this.z += 10; //fica acima da pilha de tijolos do lado direito. (cada pilha à direita aumenta em 10 camadas)
		}

		// modify the xScroll value to keep the player on the screen
        if (this.x < 20)  this.x = 20;
        if (this.x -  Game.screenBorder < Game.xScroll) Game.xScroll = this.x - Game.screenBorder;
		if (Game.xScroll<0) { Game.xScroll=0;}

        if (this.x > 4180)  this.x = 4180;
        if (this.x + Game.screenBorder > Game.xScroll + Game.canvas.width) Game.xScroll = this.x + Game.screenBorder - Game.canvas.width;
		if (Game.xScroll +  Game.canvas.width > 4200) {
			Game.xScroll = 4200 - Game.canvas.width;
		}
	}

	this.draw = function(context, xScroll, yScroll)  {
		Player.prototype.draw.call(this, context, xScroll, yScroll);
		//se estiver bloqueado, deve ir se recuperando do bloqueio lentamente
		if (this.blocked) {
			var alfa = this.blockedTime - 125+33 + 5; //esmaece nos últimos segundos (33 ciclos = 1,5s), deixa um tempinho sem emaranhado (10 ciclos)
			if (alfa>0) {
				context.globalAlpha =  (alfa<=33) ? alfa / 33 : 1;
		        context.drawImage(imgPlayerBlockedFree, this.x - this.imgCenterX - xScroll, this.y - this.imgCenterY - yScroll);
				context.globalAlpha = 1.0;
			}
		}
    }


	this.setBlocked = function() {
		if (!this.blocked)	{
			this.z += 10; //o gogador se esparrama sobre o tijolo ao lado também!
			this.blocked = true;
			this.y = Game.bricks.getHeightAtX(this.x);
			Game.player.changeImage();
		}
	}

	this.addPower = function(power) {
		switch (power.type) {
			case "HTML": this.powersHTML.push(power); break;
			case "CSS": this.powersCSS.push(power); break;
			case "Javascript": 	this.powersJavascript.push(power); break;
			case "WebDesign": this.powersWebDesign.push(power); break;
		}
		power.follow(this);
		power.z = 1; //passa a ficar atrás dos container
		//reposiciona os poderes sobre a cabeça do jogador
		this.updatePowers();
	}

	this.removePowersLine = function(powerType) {
		var powerList = null;
		switch (powerType) {
			case "HTML": powerList = this.powersHTML; break;
			case "CSS": powerList = this.powersCSS; break;
			case "Javascript": 	powerList = this.powersJavascript; break;
			case "WebDesign": powerList = this.powersWebDesign; break;
		}
		var hasPower = powerList.length>=4;
		if (hasPower)	{
			for (var i=0; i<4; i++) {
				var power = powerList.pop();
				Game.removeObject(power);
			}
			this.updatePowers();
		}
		return hasPower;
	}


	this.updatePowers = function() {
		var powersLines = 0; //linhas preenchidas com poderes
		for (var powerType = 0; powerType<4; powerType++)	{ //percorrer os 4 tipos de poderes
			var powers = null; //obter um dos conjuntos de poderes 
				switch (powerType) {
				case 0: powers = this.powersHTML; break;
				case 1: powers = this.powersCSS; break;
				case 2: powers = this.powersJavascript; break;
				case 3: powers = this.powersWebDesign; break;
			}
			for (powersCount in powers) {
				var power = powers[powersCount];
				switch (powersCount%4) {
					case 0: power.distanceX = 4; break;
					case 1: power.distanceX = -4; break;
					case 2: power.distanceX = 12; break;
					case 3: power.distanceX = -12; break;
				}
				power.distanceY = 100 + powersLines * 10;
				if ((powersCount % 4) == 3) powersLines++; //preencheu o último da linha, então fechou a linha e deve ir para a seguinte
			}
			if (powers.length%4 == 1) {//se na última linha tiver um único poder, então deve ficar centralizado
				var power = powers[powers.length-1];
				power.distanceX = 0;
			}
			if (powers.length%4 == 3) {//se na última linha tiver 3 poderes, então devem ficar centralizados
				var p1 = powers[powers.length-1];
				var p2 = powers[powers.length-2];
				var p3 = powers[powers.length-3];
				p1.distanceX = 0;
				p2.distanceX = 8;
				p3.distanceX = -8;
			}
			if (powers.length%4>0) powersLines++; //se nesse tipo de poder tiver ao menos 1 poder, e se a linha não tiver sido toda preenchida, então pulo linha para que o próximo tipo comece na linha superior
		}
	}


	this.collisionArea = function()  {
        var rec = new Rectangle();
		rec.setup(this.x - 11, this.y - this.imgCenterY +2, 22, this.image.height); //largura do jogador ao estar pulando. "+2" é para descontar a pequena área que não toca na mão do jogador durante o salto
		return rec;
    }

	this.hasPowers = function(nHTML, nCSS, nJavascript, nWebDesign) {
		return ( (this.powersHTML.length>=nHTML) && (this.powersCSS.length>=nCSS) && (this.powersJavascript.length>=nJavascript) && (this.powersWebDesign.length>=nWebDesign) );
	}

}

Player.prototype = new SpriteObject;