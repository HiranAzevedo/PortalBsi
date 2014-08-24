function TextObject() {
	this.x = 0;
	this.y=0;
	this.z = 10000000000; //infinito. O texto tem que ficar sobre qualquer elemento na tela
	this.fontType = "bold 12pt sans-serif";
	this.color = "#000000";
	this.alpha = 0.5;
	this.message = "";

	this.setup = function(msg, x, y, type) {
		this.message = msg;
		this.x = x;
		this.y=y;
		this.fontType = type;
	}

	this.draw = function(context, xScroll, yScroll)  {
		context.globalAlpha =  this.alpha;
		context.fillStyle = this.color;
		context.font = this.fontType;
		context.fillText(this.message, this.x - xScroll, this.y - yScroll);
		context.globalAlpha =  1.0;
    }
}
TextObject.prototype = new VisualObject;


function TextFixed() {
	this.draw = function(context, xScroll, yScroll)  {
		context.globalAlpha =  this.alpha;
		context.fillStyle = this.color;
		context.font = this.fontType;
		context.fillText(this.message, this.x, this.y);
		context.globalAlpha =  1.0;
    }
}
TextFixed.prototype = new TextObject;



function EventMessage() {
	this.time = 0;

	this.setMessage = function(msg, x, y, fontType) {
		//calcular onde a mensagem tem que ser apresentada para que fique visível na tela
		Game.backBufferContext.font = fontType;
		var msgWidth = Game.backBufferContext.measureText(msg).width;
		var xCentered = x - Game.xScroll - Math.floor(msgWidth/2);
		//não deixar o texto sair da tela
		if (xCentered < 10) xCentered = 10;
		if ( (xCentered + msgWidth) > (Game.canvas.width - 10) )	
			xCentered = Game.canvas.width - 10 - msgWidth;
		//voltar a obter a posição no espaço do jogo para que o jogador possa deixar as mensagens "para trás".
		this.setup(msg, xCentered + Game.xScroll, y - 30, fontType); //o "-30" é para não colar na posição ativada
		this.alpha = 1.0;
	}

	this.update = function() {
		this.time++;
		this.y = this.y - 1;
		if (this.y<100) {
			this.alpha = 1 - (70-this.y)/(100); //some confore chega no topo da tela 
		}
		if (this.alpha <= 0) Game.removeObject(this);
	}

	this.fadeOut = function() {
		Game.removeObject(this);
	}
}
EventMessage.prototype = new TextObject;