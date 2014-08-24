//  A class that display a image with horizontal Parallax scrolling effect. 
function HorizontalParallaxScrollingObject() {
    this.scrollFactor = 1; 	//quanto menor o fator de rolagem, mas lentamenta o elemento ir� rolar dando a sensa��o de estar mais ao fundo

    this.draw = function(context, xScroll, yScroll) {
		var xContext = 0; //percorrer o context desenhando cada ladrilho da imagem deste objeto.
		while (xContext < Game.canvas.width) { //Repetir a imagem horizontalmente at� cobrir toda a �rea vis�vel da tela
			var xImage = 0; // posi��o em que come�a a copiar a imagem
			if (xContext==0) {// � a primeira imagem a ser desenhada na tela
				//identificar a primeira imagem a ser apresentada na tela
				var posInicialDaImagem = Math.floor( (this.x - xScroll) * this.scrollFactor);  //o primeiro ladrilho deve ser cortado na posi��o do scroll. Os ladrilhos subsequentes s�o desenhados na �ntegrada, exceto o �ltimo
				var posInicialPrimeiroLadrilhoVisivel = Math.abs(posInicialDaImagem) % this.image.width;
		        //se a posi��o do primeiro ladrilho estiver � esquerda da tela, ent�o a dist�ncia at� a primeira imagem deve considerar o canto direito da imagem. Se estiver � direita, ent�o considerar o canto inicial esquerdo.
		        xImage = (posInicialDaImagem) <= 0 ? posInicialPrimeiroLadrilhoVisivel : this.image.width -posInicialPrimeiroLadrilhoVisivel; // Testo se est� rolando no sentido positivo ou negativo e obtenho a posi��o inicial da imagem de acordo com o sentido da rolagem.
			}
	        var widthContextToFill = Game.canvas.width - xContext;
			//a largura da imagem deve ser: ou a largura da imagem inteira (caso o ladrilho caiba na tela, ou o que sobra do ladrinho (caso seja a primeira imagem do ladrilhamento), ou o que ainda cabe do ladrilho na tela (caso do �ltimo ladrilho)
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
