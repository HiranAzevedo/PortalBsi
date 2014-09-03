function ScrollingDiv(div) {
	this.scrollStep = 0;
	this.previousTop = 0;
	this.div = div;
	this.time = 0;
	
	this.scroll = function() {
		this.div.scrollTop = this.previousTop; //caso o usuário tenha rolado a div, rolar tudo até o final da animação anterior
		this.scrollStep = 1;
		this.time = setInterval(function() {Game.reportScrollingDiv.play();}, 50);
	}

	this.play = function() {
		if (this.scrollStep>0) {
			this.div.scrollTop += 1;
			if ( (this.div.scrollTop + this.div.offsetHeight) >= this.div.scrollHeight)	{ //fim da rolagem
				clearInterval(this.time);
				this.scrollStep = 0;
				this.previousTop = this.div.scrollTop;
			}
		}
	}

}