// Classe-base de todos os elementos gráficos que aparecem no jogo
function VisualObject() {
    this.image = null; //imagem do objeto

	//imgCenter é a posição central da figura considerando a distância do topo à esquerda. É necessário para que o centro da imagem seja desenhada no ponto (x, y) do objeto
	this.imgCenterX = 0;
	this.imgCenterY = 0;

	this.x = 0; // posição x horizontal do objeto
    this.y = 0; // posição y vertical do objeto
	this.z = 0;  // posição z da profundidade. Quanto menor o z, mais ao fundo o elemento se encontra. O eixo z define camadas sobrepostas para a imagem.

	
    this.setup = function(image, imgCenterX, imgCenterY, x, y, z) {
        this.image = image;
		this.imgCenterX = imgCenterX;
		this.imgCenterY = imgCenterY;
        this.x = x;
		this.y = y;
		this.z = z;
    }

	
	this.draw = function(context, xScroll, yScroll)  {
        context.drawImage(this.image, this.x - this.imgCenterX - xScroll, this.y - this.imgCenterY - yScroll);
    }
  
    this.collisionArea = function() {
        var rec = new Rectangle();
		rec.setup(this.x - this.imgCenterX, this.y - this.imgCenterY, this.image.width, this.image.height);
		return rec;
    }

}