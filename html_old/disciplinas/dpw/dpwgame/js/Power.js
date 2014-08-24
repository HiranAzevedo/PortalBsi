//objeto que calcula uma curva senóide
function Sine(nPoints, height) {
	this.wave = Array();
	this.nPoints = nPoints;
	for (var i = 0; i<nPoints; i++)	{
		var angle = i*(2*Math.PI / this.nPoints);
		this.wave.push(height * Math.sin(angle));
	}
}

function Power() {
	this.followingObject = null;
	//o poder acompanha um objeto a uma determinada distância: distanceX, distanceY
	this.distanceX = 0;
	this.distanceY = 0;
	this.type = "HTML"; //tipo de poder
	this.message = ''; //mensagem a ser apresentada quando o jogador obter o poder
	this.action = "";//quando o jogador obtém um poder, algo pode acontecer
	
	this.setup = function (type, msg, action) {
		this.type = type;
		this.message = "+ " + this.type + ": " + msg; 
		this.action = action;
		switch (this.type) {
			case "HTML": Power.prototype.setup.call(this, imgPowerHTML, 3, 3, 0, 0, 0);	break;
			case "CSS": Power.prototype.setup.call(this, imgPowerCSS, 3, 3, 0, 0, 0); 	break;
			case "Javascript": Power.prototype.setup.call(this, imgPowerJavascript, 3, 3, 0, 0, 0);	break;
			case "WebDesign": Power.prototype.setup.call(this, imgPowerWebdesign, 3, 3, 0, 0, 0); break;
		}
	}

	this.follow = function(visualObject) {
		this.followingObject = visualObject;
	}

	this.update = function (dt) {
		this.x = this.followingObject.x - this.distanceX;
		this.y = this.followingObject.y - this.distanceY;
	}
}
Power.prototype = new AnimatedObject;



function OscillationObject() {
	this.previousFrame = 0; //guardo o frame anterior
	this.sine = null; //descreve o arco seno a ser percorrido pelo conteúdo
	this.sineHeight = 10;

	this.shuttingDown = false; //estado em que o objeto está se desligando
	this.shuttingDownTime = 0; //ciclos passados desde que o objeto começou a se desligar
	this.activated = false; //esse objeto foi ativado... só agir 1 vez e desconsiderar os vários toques que o jogador fica dando durante o encostar com esse objeto

    this.setup = function(image, imgCenterX, imgCenterY, x, y, z) {
		x = x*20 - 10; //largura dos tijolos
		y = Game.floor - y*20 -10; //altura em função da quantidade de tijolos
		z = 10000000000; //este objeto tem sempre que ficar sobre qualquer outro. A camada deve ser a mais alta possível
		OscillationObject.prototype.setup.call(this, image, imgCenterX, imgCenterY, x, y, z);

		this.sine = new Sine(24 + Math.floor(48 *Math.random()), this.sineHeight); //velocidade será sorteada e terá no mínimo 24 frames = 1segundo e no máximo 3s.
        this.setFrames(this.sine.nPoints, 1);

		//para iniciar uma posição aleatória, sorteio um dos quadros como o inicial
		this.currentFrame = Math.floor(24 *Math.random());
		this.previousFrame = 0;
		this.update(0); //força o posicionamento para a posição atual sorteada para currentFrame
	}

	this.update = function (dt) {
		OscillationObject.prototype.update.call(this, dt);
		if (this.previousFrame!=this.currentFrame) { //o objeto se moveu
			this.y += (this.sine.wave[this.currentFrame] - this.sine.wave[this.previousFrame]);
			this.previousFrame = this.currentFrame;		
		}
		if (this.shuttingDown) {
			this.shuttingDownTime +=1;
			if (this.shuttingDownTime>25) {
				Game.removeObject(this);
			}
		}
		//jogador pegou o objeto oscilante
        if (!this.activated && !this.shuttingDown && this.collisionArea().intersects(Game.player.collisionArea()))  {
            this.shutDown(); 
			this.activate();
			this.activated = true;
        }
	}

	this.activate = function() {
	}

	this.shutDown = function() {
		//ir esmaecendo até sumir
		this.shuttingDownTime =10;
		this.shuttingDown = true;
	}

	this.draw = function(context, xScroll, yScroll)  {
		if (this.shuttingDown) context.globalAlpha =  (25 - this.shuttingDownTime) / 25;
		OscillationObject.prototype.draw.call(this, context, xScroll, yScroll);
		if (this.shuttingDown) context.globalAlpha = 1.0;
    }
}
OscillationObject.prototype = new AnimatedObject;




// Represents a PowerContainerup in the game
function PowerContainer() {
	this.type = "study"; //tipo de poder
	this.power = null;

	this.setup = function(type, x,y) {
		this.type = type;
		switch (this.type) {
			case "study": PowerContainer.prototype.setup.call(this, imgStudy, 8, 14, x, y, 0); break;
			case "interaction": PowerContainer.prototype.setup.call(this, imgInteraction, 12, 15, x, y, 0); break;
			case "practice": PowerContainer.prototype.setup.call(this, imgPractice, 5, 12, x, y, 0); break;
		}
	}

	this.addPower = function(power) {
		this.power = power;
		this.power.follow(this);
		this.power.z = this.z + 1;
	}

	this.activate = function() {
		Game.soundEffects.knowledge();
		this.z = 0;
		Game.notifyEvent(this.power.message, this.power.x, this.power.y, "normal 7pt sans-serif");
		Game.reportActivity(this.power.message);
		eval(this.power.action);
		Game.player.addPower(this.power);
	}
}
PowerContainer.prototype = new OscillationObject;




// jogador aplica conhecimento neste container
function FinalContainer() {
	this.type = ""; //tipo de conteúdo a ser aplicado
	this.power = null;

	//passos a serem dados até chegar no painel;
	this.xStep = 1; 
	this.yStep = 1;
	this.scrollStep = 1;
	this.scrollFactor = 1;
	this.nFrames = 50; //tempo para levar o container até o painel;

	this.setup = function(type, x, y) {
		this.sineHeight = 25;
		this.type = type;
		switch (this.type) {
			case "HTML": FinalContainer.prototype.setup.call(this, imgContainerHTML, 20, 20, x, y, 0); break;
			case "CSS": FinalContainer.prototype.setup.call(this, imgContainerCSS, 20, 20, x, y, 0); break;
			case "Javascript": FinalContainer.prototype.setup.call(this, imgContainerJavascript, 20, 20, x, y, 0); break;
			case "WebDesign": FinalContainer.prototype.setup.call(this, imgContainerWebDesign, 20, 20, x, y, 0); break;
		}
	}

	this.addPower = function(power) {
		this.power = power;
		this.power.follow(this);
		this.power.z = this.z + 1;
	}

	this.activate = function() { 
	}

	this.update = function (dt) {
		if (!this.shuttingDown) FinalContainer.prototype.update.call(this, dt);
		else
		if (this.shuttingDownTime<this.nFrames)	{
			this.x = this.x + this.xStep;
			this.y += this.yStep;
			this.scrollFactor = this.scrollFactor + this.scrollStep;
			this.shuttingDownTime++;
		} 
	}

	this.draw = function(context, xScroll, yScroll)  {
        context.drawImage(this.image, ((this.x - this.imgCenterX) - xScroll) * this.scrollFactor, (this.y - this.imgCenterY - yScroll)  * this.scrollFactor);
	}

	this.shutDown = function() {	 //Animar até o painel ao fundo
		var hasPowers = Game.player.removePowersLine(this.type);
		if (hasPowers) {
			Game.soundEffects.task();
			this.shuttingDown = true;
			this.shuttingDownTime = 0;
			var xPos = 2665; 
			xPos = (xPos +  (Game.finalProject%5)*40)*3/2;
			yPos = ((Game.finalProject%10)<5) ? 218 : 158;
			this.xStep = (xPos - this.x) / this.nFrames;
			this.yStep = (yPos - this.y) / this.nFrames;
			this.scrollStep = (2/3 - 1) / this.nFrames;
			this.z = 0;
			var score = (Game.finalProject<10) ? 0.5 : 0;
			Game.addScore(score);
			Game.finalProject++;
			Game.notifyEvent("+ " + score + " pontos", this.x, 150, "bold 12pt sans-serif");
			var scoreMessage = "";
			if (score>0) { scoreMessage = "<br>&nbsp; <em><b>&lowast;</b> Ganhou 0.5 pontos!</em>"}
			Game.reportActivity("<b>&#8226; PROJETO FINAL</b>: Aplicou seus conhecimentos de " + this.type + scoreMessage);
			setTimeout("Game.createFinalContainer(\"" + this.type + "\")", 12000);
		} else { //não tem poder suficiente para coletar essa peça
			//não permitir a destruição deste objeto
			msg = "Você não tem conhecimento suficiente para montar esse pedaço em seu projeto final";
			Game.notifyEvent(msg, this.x, 150, "bold 10pt sans-serif");
			this.shuttingDown = false;
			var self = this;
			setTimeout(function() {self.activated=false;}, 750);
		}
	}
}
FinalContainer.prototype = new OscillationObject;






function Task() {
	this.nHTML = 0;
	this.nCSS = 0;
	this.nJavascript = 0;
	this.nWebDesign = 0;
	this.message = ""

    this.setup = function(img,x, y, msg) {
		Task.prototype.setup.call(this, img, 12, 23, x, y, 0);
		this.message = msg;
	}

	this.setPowersRequired = function(nHTML, nCSS, nJavascript, nWebDesign) {
		this.nHTML = nHTML;
		this.nCSS = nCSS;
		this.nJavascript = nJavascript;
		this.nWebDesign = nWebDesign;
	}

	this.activate = function() {
		if ( Game.player.hasPowers(this.nHTML, this.nCSS, this.nJavascript, this.nWebDesign) ) {
			Game.soundEffects.task();
			Game.tasksDone++;
			Game.addScore(0.5);
			Game.notifyEvent("+ 0.5 pontos", this.x, this.y, "bold 12pt sans-serif");
			Game.reportActivity("<b>&#8226; TAREFA resolvida</b>: \"" +  this.message + "\"<br>&nbsp; <em><b>&lowast;</b> Ganhou 0.5 pontos!</em>");
		} 
		else { //jogador não acumulou conhecimento suficiente para resolver esta tarefa
			Game.notifyEvent("Você não tem conhecimento suficiente para resolver esta tarefa", this.x, this.y, "bold 10pt sans-serif");
			//não permitir a destruição deste objeto
			this.shuttingDown = false;
			var self = this;
			setTimeout(function() {self.activated=false;}, 750); //evitar que o jogador fique em colisão por algumas iterações com aquele objeto
		}
	}
}
Task.prototype = new OscillationObject;