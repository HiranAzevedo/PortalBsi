/* Gerencia todos os objetos do jogo */

//as imagens do jogo devem ser carregadas antes do jogo come�ar
imgPlayerRunningRight = new Image(); imgPlayerRunningRight.src = "img/playerrunningright.gif";
imgPlayerRunningLeft = new Image(); imgPlayerRunningLeft.src = "img/playerrunningleft.gif";
imgPlayerJumpingRight = new Image(); imgPlayerJumpingRight.src = "img/playerjumpingright.gif";
imgPlayerJumpingLeft = new Image(); imgPlayerJumpingLeft.src = "img/playerjumpingleft.gif";
imgPlayerIdleRight = new Image(); imgPlayerIdleRight.src = "img/playeridleright.gif";
imgPlayerIdleLeft = new Image(); imgPlayerIdleLeft.src = "img/playeridleleft.gif";
imgPlayerBlocked = new Image(); imgPlayerBlocked.src = "img/playerblocked.gif";
imgPlayerBlockedFree = new Image(); imgPlayerBlockedFree.src = "img/playerblockedfree.gif";

imgEnemy = new Image(); imgEnemy.src = "img/thread.gif";

//carregar as imagens dos poderes
imgPowerHTML = new Image(); imgPowerHTML.src = "img/powerhtml.gif";
imgPowerCSS = new Image(); imgPowerCSS.src = "img/powercss.gif";
imgPowerJavascript = new Image(); imgPowerJavascript.src = "img/powerjavascript.gif";
imgPowerWebdesign = new Image(); imgPowerWebdesign.src = "img/powerwebdesign.gif";
imgPowerPractice = new Image(); imgPowerPractice.src = "img/powerpractice.gif";
imgStudy = new Image(); imgStudy.src = "img/containerstudy.gif";
imgInteraction = new Image(); imgInteraction.src = "img/containerinteraction.gif";
imgPractice = new Image(); imgPractice.src = "img/containerpractice.gif";
imgContainerHTML = new Image(); imgContainerHTML.src = "img/containerhtml.gif";
imgContainerCSS = new Image(); imgContainerCSS.src = "img/containercss.gif";
imgContainerJavascript = new Image(); imgContainerJavascript.src = "img/containerjavascript.gif";
imgContainerWebDesign = new Image(); imgContainerWebDesign.src = "img/containerwebdesign.gif";



//carregar as imagens das tarefas
imgTask01 = new Image(); imgTask01.src = "img/task01.gif";
imgTask02 = new Image(); imgTask02.src = "img/task02.gif";
imgTask03 = new Image(); imgTask03.src = "img/task03.gif";
imgTask04 = new Image(); imgTask04.src = "img/task04.gif";
imgTask05 = new Image(); imgTask05.src = "img/task05.gif";
imgTask06 = new Image(); imgTask06.src = "img/task06.gif";
imgTask07 = new Image(); imgTask07.src = "img/task07.gif";
imgTask08 = new Image(); imgTask08.src = "img/task08.gif";
imgTask09 = new Image(); imgTask09.src = "img/task09.gif";
imgTask10 = new Image(); imgTask10.src = "img/task10.gif";

//carregar as imagens do cen�rio
imgStageSun = new Image(); imgStageSun.src = "img/stagesun.gif";
imgStageCloudsForeground = new Image(); imgStageCloudsForeground.src = "img/stagecloudsforeground.gif";
imgStageCloudsBackground = new Image(); imgStageCloudsBackground.src = "img/stagecloudsbackground.gif";
imgStageGround = new Image(); imgStageGround.src = "img/stageground.gif";
imgStageBrickRoad = new Image(); imgStageBrickRoad.src = "img/stagebrickroad.gif";
imgBrick = new Image(); imgBrick.src = "img/brick.gif";

imgStart = new Image(); imgStart.src = "img/start.jpg";
imgEnd = new Image(); imgEnd.src = "img/end.gif";


function GameManager() {
    this.canvasSupported = false; //verifica se o navegador tem suporte a canvas, que � onde o jogo ser� renderizado
    this.canvas = null; // canvas no documento HTML para obter o context em que o jogo ser� renderizado
    this.context = null; //context do canvas, onde o jogo ser� renderizado
	this.backBuffer = null; // A reference to the in-memory canvas used as a back buffer. Usado para otimizar os gr�ficos: primeiro desenha a cena no backbuffer e depois copia tudo para o canvas que � vis�vel ao usu�rio. Assim o usu�rio n�o acompanha o processo de ficar desenhando aos poucos, s� v� a cena toda pronta de uma vez s�.
    this.backBufferContext = null;
	this.reportDiv = null; //div do documento HTML em que ser� apresentado o relat�rio final do jogo
	this.reportUL = null; //lista para a publica��o dos itens
	this.reportScrollingDiv = null; //guarda o objeto visual para a anima��o da div com rolagem suave

	this.objects = new Array(); //objetos do jogo
	this.score = 0;
	//�ndices para o c�lculo da pontua��o do jogador
	this.tasksDone = 0;
	this.finalProject = 0;
	this.playing = false; //indica se est� jogando ou n�o (pode ter pausado ou ter terminado)
	this.gameStarted = false; // indica se o jogo j� come�ou
	this.soundEffects = new SoundEffects();

	this.previousMessage = null; //guarda a mensagem anterior emitida na tela para que seja retirada antes de apresentar a seguinte
	this.enemys = ["Voc� se ENROLOU: foi estudar outra disciplina e deixou DPW de lado!", "Voc� se ENROLOU: deixou de ir � aula para se dedicar ao trabalho (ou est�gio)", "Voc� se ENROLOU: planejou pouco tempo para os estudos dos conte�dos da disciplina", "Voc� se ENROLOU: faltou e n�o se informou sobre o conte�do trabalhado em aula", "Voc� se ENROLOU: come�ou um novo namoro e se esqueceu de todo o resto!", "Voc� se ENROLOU: ficou jogando at� tarde e deixou de estudar a disciplina :-(", "Voc� se ENROLOU: um problema familiar n�o o deixou estudar direito", "Voc� se ENROLOU: aconteceu um imprevisto, precisa contornar a situa��o..."];	
	this.enemysCount = 0;
	this.enemysTimeout = null; //tempo at� a cria��o do pr�ximo inimigo

	this.lastFrame = null; //obt�m hora em que a cena mais atual foi renderizada
    this.xScroll = 0; //scroll no eixo X. No canvas � apresentado apenas parte da cena
    this.yScroll = 0; //scroll no eixo Y. No canvas � apresentado apenas parte da cena
	this.screenBorder = 150; //afastamento do jogador at� o canto da tela para come�ar a rolagem da tela acompanhando o jogador. N�o deixa o jogador encostar essa dist�ncia nas laterais da tela.
	this.fps = 25; // quantos quadros por segundo
	this.time = 0; //conta quantos quadros j� foram renderizados desde o in�cio do jogo

	this.floor = 354;

    this.setup = function(canvas) {
		this.canvas = canvas;

        // if the this.canvas.getContext function does not exist it is a safe bet that the current browser does not support the canvas element. in this case we don't go any further, which will save some debuggers (like the IE8 debugger) from throwing up a lot of errors.
        if (this.canvas.getContext) {
            this.canvasSupported = true;
            this.context = this.canvas.getContext('2d');
            this.backBuffer = document.createElement('canvas');
            this.backBuffer.width = this.canvas.width;
            this.backBuffer.height = this.canvas.height;
            this.backBufferContext = this.backBuffer.getContext('2d');

		    this.context.drawImage(imgStart, 0, 0);
        }


		//textos sobre o jogo
		this.clock = new Clock();
		this.clock.setFrames(2688, 3); //"2688" representa 16semanas*7dias*24horas de frames
		this.clock.alpha = 0.25;
		this.addObject(this.clock);

		this.scoreText = new TextFixed();
		this.scoreText.setup("", 10, 380, "bold 10pt sans-serif");
		this.scoreText.color = "#FFFFFF";
		this.scoreText.alpha = 0.75;
		this.addScore(0);
		this.addObject(this.scoreText);

		// criar o jogador
		this.player = new Player();
		this.player.setup(imgPlayerIdleRight, 31,93, 150, Game.floor, 0);
		this.player.changeImage(); //colocar a imagem correta em fun��o do estado atual
		this.addObject(this.player); 

		this.createEnemy();


		//criar o cen�rio
		var sun = new HorizontalParallaxScrollingObject();
		sun.setup(imgStageSun, 0, 0, 0, 0, -10);
		sun.scrollFactor = 0;
		this.addObject(sun);

		var cloudsBackground = new AnimatedHorizontalParallaxScrollingObject();
		cloudsBackground.setup(imgStageCloudsBackground, 0, 0,  0, 0, -9);
		cloudsBackground.scrollFactor = 1/4;
		this.addObject(cloudsBackground);

		var cloudsForeground = new AnimatedHorizontalParallaxScrollingObject();
		cloudsForeground.setup(imgStageCloudsForeground, 0, 0,  0, 50, -8);
		cloudsForeground.scrollFactor = 1/3;
		cloudsForeground.speed = -1.5;
		this.addObject(cloudsForeground);

		var ground = new HorizontalParallaxScrollingObject();
		ground.setup(imgStageGround, 0, 0, 0, 68, -7);
		ground.scrollFactor = 2/3;
		this.addObject(ground);

		var brickroad = new HorizontalParallaxScrollingObject();
		brickroad .setup(imgStageBrickRoad, 0, 0,  -12, 347, -1);
		brickroad.scrollFactor = 1;
		this.addObject(brickroad);

		//criar a estrada de tijolos amarelos
		this.bricks = new Bricks();
		this.bricks.createImages(354);

		//criar os poderes
		this.createPower("study", "HTML", "Estudou a LINGUAGEM de MARCA��O e aprendeu mais sobre HTML", 21, 6, "Game.createPowers(\"HTMLEstudouMarcacao\");   ");
		this.createPower("study", "CSS", "Estudou a SINTAXE da linguagem de ESTILOS", 57, 8, "Game.createPowers(\"CSSEstudouSintaxe\");   ");
		this.createPower("study", "Javascript", "Estudou como fazer um \"Ol� Mundo\" em Javascript", 91, 7, "");
		this.createPower("practice", "Javascript", "Implementou o \"Ol� Mundo\" em Javascript", 92, 9, "Game.createPowers(\"JSImplementou\");   ");
		this.createPower("study", "WebDesign", "Estudou USABILIDADE", 137, 7, "Game.createPower(\"practice\", \"WebDesign\", \"Definiu os CRIT�RIOS de qualidade para o site final\", 139, 10, \"\"); Game.createPower(\"interaction\", \"WebDesign\", \"Discutiu com a turma o conceito de ACESSIBILIDADE\", 142, 10, \"\"); ");
		this.createPower("study", "WebDesign", "Estudou ARQUITETURA da INFORMA��O", 145, 8, "Game.createPower(\"interaction\", \"WebDesign\", \"Discutiu em grupo a ESTRUTURA��O do ESPA�O INFORMACIONAL\", 148, 11, \"\"); ");
		this.createPower("interaction", "WebDesign", "Participou do debate sobre MECANISMOS DE NAVEGA��O", 153, 9, "Game.createPower(\"practice\", \"WebDesign\", \"Projetou a NAVEGA��O do seu site\", 156, 11, \"\"); ");
		this.createPower("study", "WebDesign", "Estudou PADR�ES VISUAIS e DIAGRAMA��O", 161, 10, "Game.createPower(\"practice\", \"WebDesign\", \"Implementou o TEMPLATE do seu site\", 154, 11, \"\"); ");
		this.createPower("study", "WebDesign", "Estudou WEBWRITING", 168, 11, "Game.createPower(\"practice\", \"WebDesign\", \"Escreveu parte do CONTE�DO do seu site\", 172, 11, \"\"); ");

		//poderes no projeto final
		this.createFinalPower("HT");
		this.createFinalPower("CS");

		this.createFinalContainer("HTML");
		this.createFinalContainer("CSS");
		this.createFinalContainer("Javascript");
		this.createFinalContainer("WebDesign");


		//criar as tarefas
		this.createTask(imgTask01, 26, 10, 6,0,0,0, "P�gina v�lida em HTML5");
		this.createTask(imgTask02, 36, 11, 11,0,0,0, "Site naveg�vel (com p�ginas interligadas)");
		this.createTask(imgTask03, 52, 13, 16,0,0,0, "P�gina completa (com logomarca, menu, rodap� etc.)");
		this.createTask(imgTask04, 59, 12, 6,3,0,0, "Textos formatados (cores, fonte, tamanho)");
		this.createTask(imgTask05, 73, 12, 3,8,0,0, "P�gina com diagrama��o (cabe�alho, colunas e rodap�)");
		this.createTask(imgTask06, 92.5, 14, 3,0,5,0, "Troca de imagens em fun��o de eventos do mouse");
		this.createTask(imgTask07, 109, 3, 4,3,12,0, "Interface rica (com slideshow ou menu etc)");
		this.createTask(imgTask08, 129, 1, 0,0,18,0, "Programa de um jogador que se movimentando na tela");
		this.createTask(imgTask09, 137, 10, 0,0,0,6, "Documento do projeto do seu site final");
		this.createTask(imgTask10, 169, 1, 6,3,0,8, "Template com o conte�do de uma p�gina do site final");


		this.reorderObjects();
    }

	this.createTask = function(imgTask, x, y, powerHTML, powerCSS, powerJavascript, powerWebDesign, message) {
		var task = new Task();
		task.setup(imgTask, x, y, message);
		task.setPowersRequired(powerHTML, powerCSS, powerJavascript, powerWebDesign);
		this.addObject(task);
	}

	this.createPower = function(containerType, powerType, msg, xBricks, yBricks, action) {
		var power = new Power;
		power.setup(powerType, msg, action);

		var powerContainer = new PowerContainer();
		powerContainer.setup(containerType, xBricks, yBricks);
		powerContainer.addPower(power);

		this.addObject(power);
		this.addObject(powerContainer);
	}

	//fun��o auxiliar
	this.createPowers = function(knowHow) { //fun��o auxiliar para facilitar a cria��o de poderes ao longo das tarefas
		switch (knowHow) {
			case "HTMLEstudouMarcacao": 
				this.createPower("practice", "HTML", "Criou uma P�GINA e aprendeu mais sobre HTML", 24, 10, "");
				this.createPower("interaction", "HTML", "Tirou sua d�vida com os colegas e aprendeu mais sobre HTML", 28, 10, ""); 
				this.createPower("study", "HTML", "Estudou VALIDA��O e aprendeu mais sobre HTML", 30, 9,  "Game.createPowers(\"HTMLEstudouValidacao\"); ");
			break;
			case "HTMLEstudouValidacao":
				this.createPower("interaction", "HTML", "Tirou uma d�vida sobre ERROS de valida��o", 22, 9, "");
				this.createPower("practice", "HTML", "Conseguiu VALIDAR uma p�gina", 32, 9.5, "Game.createPowers( \"HTMLTornouValido\"); ");
			break;
			case "HTMLTornouValido": 
				this.createPower("study", "HTML", "Estudou TEXTOS", 34, 9, "Game.createPower(\"practice\", \"HTML\", \"Criou v�rias p�ginas com TEXTOS\", 32, 10.5, \"\");");
				this.createPower("study", "HTML", "Estudou LISTAS", 38, 9, "");
				this.createPower("study", "HTML", "Estudou LINKS", 40, 9, "Game.createPowers(\"HTMLEstudouLinks\");" );
			break;
			case "HTMLEstudouLinks": 
				this.createPower("practice", "HTML", "Criou um site com v�rias P�GINAS INTERLIGADAS", 42, 10, "Game.createPowers( \"HTMLInterligouPaginas\"); ");
			break;
			case "HTMLInterligouPaginas": 
				this.createPower("practice", "HTML", "Criou um MENU de LINKS por meio de LISTAS", 37, 10, "");
				this.createPower("interaction", "HTML", "Tirou uma d�vida sobre URL relativo", 39, 10, "");
				this.createPower("study", "HTML", "Estudou SE��ES", 45, 11, "");
				this.createPower("study", "HTML", "Estudou IMAGENS", 47, 11, "");
				this.createPower("study", "HTML", "Estudou FORMUL�RIOS", 50, 12, "Game.createPower(\"interaction\", \"HTML\", \"Tirou uma d�vida com os colegas sobre FORMUL�RIOS\", 41, 10, \"\"); Game.createPower(\"practice\", \"HTML\", \"Criou um FORMUL�RIO para o usu�rio entrar em contato\", 42, 10, \"\");");
			break;
			case "CSSEstudouSintaxe": 
				this.createPower("interaction", "CSS", "Discutiu com os colegas o conceito de ESTILOS", 62, 12, "");
				this.createPower("practice", "CSS", "FORMATOU os textos de uma p�gina do seu site", 64, 11, "");
				this.createPower("study", "CSS", "Estudou a codifica��o hexadecimal de CORES", 66, 11, "");
				this.createPower("study", "CSS", "Estudou as UNIDADES de medida (px, %, em, pt)", 68, 11, "");
				this.createPower("study", "CSS", "Estudou o conceito DISPLAY (block x inline)", 71, 11, "Game.createPowers(\"CSSEstudouDisplay\");");
				this.createPower("study", "CSS", "Estudou CSS3", 84, 12, "");
			break;
			case "CSSEstudouDisplay": 
				this.createPower("study", "CSS", "Estudou formata��o de lista INLINE", 79, 12, "");
				this.createPower("study", "CSS", "Estudou formata��o de DIVIS�ES (DIVs)", 76, 10, "");
				this.createPower("practice", "CSS", "Praticou criando um MENU de abas", 67, 11, "");
				this.createPower("interaction", "CSS", "Tirou uma d�vida sobre diagrama��o com DIVs", 84, 3, "");
			break;
			case "JSImplementou": 
				this.createPower("study", "Javascript", "Estudou FUN��O", 95, 13, "Game.createPower(\"practice\", \"Javascript\", \"Implementou uma ANIMA��O com troca de imagens\", 96.5, 12.5, \"\");  Game.createPower(\"interaction\", \"Javascript\", \"Discutiu FUN��ES com os colegas\", 98, 13, \"\"); ");
				this.createPower("study", "Javascript", "Estudou como obter ELEMENTOS do documento pelo ID", 96, 3, "");
				this.createPower("study", "Javascript", "Estudou a SINTAXE dessa linguagem de programa��o", 101, 13, "");
				this.createPower("study", "Javascript", "Estudou os objetos NATIVOS (Integer, String, Array etc.)", 103, 12, "Game.createPowers(\"JSEstudouObjetosNativos\");");
				this.createPower("study", "Javascript", "Estudou o DOM (Modelo de Objetos do Documento)", 106, 13, "");
				this.createPower("study", "Javascript", "Estudou os EVENTOS captur�veis", 113, 13, "");
				this.createPower("study", "Javascript", "Estudou CANVAS (para desenhar imagens)", 118, 14, "Game.createPower(\"practice\", \"Javascript\", \"Implementou uma ANIMA��O usando canvas\", 126, 14, \"  Game.createPowers(\'JSAnimacao\');  \");  ");
				this.createPower("interaction", "Javascript", "Discutiu com colegas a captura de EVENTOS", 121.5, 4, "");
			break;
			case "JSEstudouObjetosNativos": 
				this.createPower("study", "Javascript", "Estudou Orienta��o a Objetos", 116, 14, "Game.createPower(\"practice\", \"Javascript\", \"Implementou uma CLASSE\", 102, 14, \"  Game.createPower(\'interaction\', \'Javascript\', \'Discutiu o conceito de Objetos com os colegas\', 116, 14, \'\' );  \");  ");
				this.createPower("practice", "Javascript", "Aprendeu a usar jQuery", 108, 13, "");
				this.createPower("practice", "Javascript", "Aprendeu a usar APIs com CALLBACK e JSON", 111, 13, "");
			break;
			case "JSAnimacao" :
				this.createPower("practice", "Javascript", "Implementou MOVER jogador na tela", 118, 14, "");
				this.createPower("practice", "Javascript", "Implementou PULAR jogador na tela", 120, 13.5, "");
				this.createPower("practice", "Javascript", "Implementou COLIDIR jogador com algo", 123, 13, "");
				this.createPower("practice", "Javascript", "Implementou ROLAR cen�rio do jogo", 121.5, 13.5, "");
			break;
		}
	}

	this.createFinalPower = function(powerToCreate) { //cria poderes em loop, quando um � consumido um outro � imediatamente criado
		switch (powerToCreate) {
			case "HT": this.createPower("study", "HTML", "Estudou", 183.5, 1, "Game.createFinalPower('WD')"); break;
			case "CS": this.createPower("study", "CSS", "Estudou", 191.5, 1, "Game.createFinalPower('JS')"); break;
			case "WD": this.createPower("study", "WebDesign", "Estudou", 199.5, 1, "Game.createFinalPower('HT')"); break;
			case "JS": this.createPower("study", "Javascript", "Estudou", 207.5, 1, "Game.createFinalPower('CS')"); break;
		}
	}

	this.createFinalContainer = function(type) { //cria poderes em loop, quando um � consumido um outro � imediatamente criado
		var finalContainer = new FinalContainer();
		switch (type) {
			case "HTML": finalContainer.setup(type, 180, 17, 0); break;
			case "CSS": finalContainer.setup(type, 188, 17, 0); break;
			case "Javascript": finalContainer.setup(type, 196, 17, 0); break;
			case "WebDesign": finalContainer.setup(type, 204, 17, 0); break;
		}
		this.addObject(finalContainer);
	}


	//desenha a cena do jogo. Esta � a fun��o que fica sendo chamada de tempos em tempos, o que garante a anima��o do jogo
	this.draw = function () {
		// update all the game objects
		this.player.update(1);
		for (x in this.objects) {
			if (this.objects[x]!=this.player)
				if (this.objects[x].update) {
					this.objects[x].update(1); //porque passar backbuffer e scroll como par�metros se deseja atualizar a intera��o mas n�o preciso visualizar!11111
				}
		}
		this.reorderObjects();

        // desenha o novo quadro
        if (this.canvasSupported) {
            this.backBufferContext.clearRect(0, 0, this.backBuffer.width, this.backBuffer.height);
        
            // then draw the game objects
			for (x in this.objects) {
				if (this.objects[x].draw) { //se todos os objetos do jogo s�o desenh�veis, ent�o n�o � preciso testar... teste apenas por precau��o
                    this.objects[x].draw(this.backBufferContext, this.xScroll, this.yScroll);
                }
            }

            // copy the back buffer to the displayed canvas
			if (!this.playing) return false;
	        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height); 
		    this.context.drawImage(this.backBuffer, 0, 0);
        }        
    };
    
    this.addObject = function(obj) {
        this.objects.push(obj);
    };

	this.reorderObjects = function() {
        this.objects.sort(function(a,b){return a.z - b.z;})
	}

    this.removeObject = function(obj) {
		var index = this.objects.indexOf(obj); // Find the index
		if(index!=-1) this.objects.splice(index, 1); // Remove it if really found!
	}

	this.notifyEvent = function(msg, x, y, fontType) {
		if (this.previousMessage != null) {
			this.previousMessage.fadeOut();
		}
		var event = new EventMessage();
		x = Math.max(x, 150); //Garante que toda mensagem estar� ao menos a uma dist�ncia de 150 pixels do topo
		event.setMessage(msg, x, y, fontType);
		this.addObject(event);
		this.previousMessage = event;
	}

	this.addScore = function(scoreValue) {
		this.score += scoreValue;
		this.scoreText.message = "PONTOS: " + this.score.toFixed(1);
	}

	this.createEnemy = function() {
		if (this.playing) {
			var enemy = new Enemy();
			enemy.setup(imgEnemy, 18, 26, this.player.x + 650, 355, 10000000000); //configuro a posi��o
			enemy.setFrames(8, 2);
			this.addObject(enemy);
			clearTimeout(this.enemysTimeout);
			this.enemysTimeout = setTimeout("Game.createEnemy()", 13000*Math.random() );
		}
	}




	this.setupReport = function(div) {
		this.reportDiv = div;
		this.reportScrollingDiv = new ScrollingDiv(this.reportDiv);
	}

	this.reportActivity = function(msg) {
		var reportItem = document.createElement('li');
		reportItem.innerHTML = msg;
		this.reportUL.appendChild(reportItem);
		this.reportScrollingDiv.scroll();
	}





	this.play = function(action) { //toca o jogo. Para iniciar ou ap�s uma pause
		this.playing=action;
		if (this.playing) {
			Animate(); //fun��o global
			clearTimeout(this.enemysTimeout);
			this.enemysTimeout = setTimeout("Game.createEnemy()", 13000*Math.random() );
			if (!this.gameStarted) this.gameStart(); 
		} else {
			clearTimeout(this.enemysTimeout);
		}
	}

	this.gameStart = function() {
		this.gameStarted = true;

		var h2 = document.createElement('h2');
		h2.innerHTML = "...e o jogo come�ou!<br>Relat�rio de atividades:";
		this.reportDiv.appendChild(h2);

		this.reportUL = document.createElement('ul');
		this.reportDiv.appendChild(this.reportUL);
		this.reportScrollingDiv.scroll();
		this.soundEffects.start();
	}

	this.gameOver = function() {
		if (this.playing) {
			this.playing=false;
			this.context.globalAlpha = 0.5;
			this.context.fillStyle = "#000000";
			this.context.fillRect(0, 0, this.canvas.width, this.canvas.height); 
			this.context.globalAlpha = 1;
			this.context.drawImage(imgEnd, 0, 0);

			var tagH2 = document.createElement('h2');
			tagH2.innerHTML = "Fim do semestre letivo. RESULTADO:";
			this.reportDiv.appendChild(tagH2);

			var resultado = 	"Voc� resolveu " + this.tasksDone + " dentre 10 tarefas, ent�o nota <b>N1 = " + this.tasksDone + "</b><br>" +
				"Voc� desenvolveu " + this.finalProject*10 + "% do seu projeto final da disciplina, ent�o nota <b>N2 = " + Math.min(10, this.finalProject) + "</b><br>" +
				"Nota na disciplina = <b>( N1 + N2 ) / 2 = " + this.score + "</b><br>";
			if (this.score>=6) resultado += "A nota m�nima para passar direto � 6.0, ent�o voc� est� <b>APROVADO</b><br>PARAB�NS !!!";
			else
			if (this.score>=4) resultado += "A nota m�nima para passar direto � 6.0, mas j� que voc� obteve nota acima de 4.0, ent�o poder� fazer a <b>PROVA-FINAL</b>";
			else resultado += "Como a nota m�nima para passar direto � 6.0, ent�o voc� foi <b>REPROVADO</b><br>(se ao menos tivesse nota acima de 4.0 poderia fazer a prova-final)";

			var tagP = document.createElement('p');
			tagP.innerHTML =resultado;
			this.reportDiv.appendChild(tagP);
			this.reportScrollingDiv.scroll();
		}
	}
}


