//  A class that display a image with horizontal Parallax scrolling effect. 
function HorizontalParallaxScrollingObject() {
    this.scrollFactor = 1; 	//quanto menor o fator de rolagem, mas lentamenta o elemento irá rolar dando a sensação de estar mais ao fundo

    this.draw = function(context, xScroll, yScroll) {
		var xContext = 0; //percorrer o context desenhando cada ladrilho da imagem deste objeto.
		while (xContext < Game.canvas.width) { //Repetir a imagem horizontalmente até cobrir toda a área visível da tela
			var xImage = 0; // posição em que começa a copiar a imagem
			if (xContext==0) {// é a primeira imagem a ser desenhada na tela
				//identificar a primeira imagem a ser apresentada na tela
				var posInicialDaImagem = Math.floor( (this.x - xScroll) * this.scrollFactor);  //o primeiro ladrilho deve ser cortado na posição do scroll. Os ladrilhos subsequentes são desenhados na íntegrada, exceto o último
				var posInicialPrimeiroLadrilhoVisivel = Math.abs(posInicialDaImagem) % this.image.width;
		        //se a posição do primeiro ladrilho estiver à esquerda da tela, então a distância até a primeira imagem deve considerar o canto direito da imagem. Se estiver à direita, então considerar o canto inicial esquerdo.
		        xImage = (posInicialDaImagem) <= 0 ? posInicialPrimeiroLadrilhoVisivel : this.image.width -posInicialPrimeiroLadrilhoVisivel; // Testo se está rolando no sentido positivo ou negativo e obtenho a posição inicial da imagem de acordo com o sentido da rolagem.
			}
	        var widthContextToFill = Game.canvas.width - xContext;
			//a largura da imagem deve ser: ou a largura da imagem inteira (caso o ladrilho caiba na tela, ou o que sobra do ladrinho (caso seja a primeira imagem do ladrilhamento), ou o que ainda cabe do ladrilho na tela (caso do último ladrilho)
			var widthImage = (widthContextToFill < this.image.width -xImage) ? widthContextToFill : this.image.width -xImage; 
			context.drawImage(this.image, xImage, 0, widthImage, this.image.height, xContext, this.y, widthImage, this.image.height);
			xContext += widthImage;
        }
    }
}
HorizontalParallaxScrollingObject.prototype = new VisualObject();


function AnimatedHorizontalParallaxScrollingObject() {
	this.speed = -1;
	this.update = function(dt) {
		this.x += this.speed;
    }
}
AnimatedHorizontalParallaxScrollingObject.prototype = new HorizontalParallaxScrollingObject();
