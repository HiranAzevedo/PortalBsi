//  A class that display a image with horizontal Parallax scrolling effect. 
function HorizontalParallaxScrollingObject() {
    this.scrollFactor = 1; 	//quanto menor o fator de rolagem, mas lentamenta o elemento ir� rolar dando a sensa��o de estar mais ao fundo

    this.draw = function(context, xScroll, yScroll) {
        //context.drawImage(this.image, this.x - xScroll, this.y - yScroll);
		var xContext = 0; //percorrer o context desenhando cada ladrilho da imagem deste objeto.
		while (xContext < Game.canvas.width) { //Repetir a imagem horizontalmente at� cobrir toda a �rea vis�vel da tela
			var xImageInicial = 0; // posi��o inicial da imagem
			if (xContext==0) {// � a primeira imagem a ser desenhada na tela
				xImageInicial = Math.floor( (this.x - xScroll) * this.scrollFactor);  //o primeiro ladrilho deve ser cortado na posi��o do scroll. Os ladrilhos subsequentes s�o desenhados na �ntegrada, exceto o �ltimo
			}
	        var xOffset = Math.abs(xImageInicial) % this.image.width; //pode estar rolando no sentido negativo, por isso preciso do valor absoluto da posi��o.
	        var xImage = ((this.x - xScroll) >= 0) ? xOffset : this.image.width -xOffset; // Testo se est� rolando no sentido positivo ou negativo e obtenho a posi��o inicial da imagem de acordo com o sentido da rolagem.
	        var areaToFill = Game.canvas.width - xContext;
			var widthImage = (areaToFill < this.image.width -xImage) ? areaToFill : this.image.width -xImage; //a largura da imagem deve ser: ou a largura da imagem inteira (caso o ladrilho caiba na tela, ou o que sobra do ladrinho (caso seja a primeira imagem do ladrilhamento), ou o que ainda cabe do ladrilho na tela (caso do �ltimo ladrilho)
			context.drawImage(this.image, xImage, 0, widthImage, this.image.height, xContext, this.y, widthImage, this.image.height);
			xContext += widthImage;
        }
    }
}
HorizontalParallaxScrollingObject.prototype = new VisualObject();