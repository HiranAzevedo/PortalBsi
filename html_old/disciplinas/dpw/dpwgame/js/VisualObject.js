// Classe-base de todos os elementos gr�ficos que aparecem no jogo
function VisualObject() {
    this.image = null; //imagem do objeto

	//imgCenter � a posi��o central da figura considerando a dist�ncia do topo � esquerda. � necess�rio para que o centro da imagem seja desenhada no ponto (x, y) do objeto
	this.imgCenterX = 0;
	this.imgCenterY = 0;

	this.x = 0; // posi��o x horizontal do objeto
    this.y = 0; // posi��o y vertical do objeto
	this.z = 0;  // posi��o z da profundidade. Quanto menor o z, mais ao fundo o elemento se encontra. O eixo z define camadas sobrepostas para a imagem.

	
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