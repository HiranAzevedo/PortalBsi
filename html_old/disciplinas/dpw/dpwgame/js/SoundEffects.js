function SoundEffects() {
	//múltiplas unidades de som para agilizar e possibilitar sons paralelos
	this.soundKnowledge = document.getElementById('soundKnowledge');
	this.soundBlocked = document.getElementById('soundBlocked');
	this.soundTask = document.getElementById('soundTask');

	this.soundKnowledge.addEventListener('ended', function(){
		Game.soundEffects.soundKnowledge.currentTime = 0;
		Game.soundEffects.soundKnowledge.pause();
		},
	false);

	this.soundBlocked.addEventListener('ended', function(){
		Game.soundEffects.soundBlocked.currentTime = 0;
		Game.soundEffects.soundBlocked.pause();
		},
	false);

	this.soundTask.addEventListener('ended', function(){
		Game.soundEffects.soundTask.currentTime = 0;
		Game.soundEffects.soundTask.pause();
		},
	false);

	this.start = function() {
		Game.soundEffects.soundKnowledge.volume=0;
		Game.soundEffects.soundKnowledge.play();

		Game.soundEffects.soundBlocked.volume=0;
		Game.soundEffects.soundBlocked.play();

		Game.soundEffects.soundTask.volume=0;
		Game.soundEffects.soundTask.play();
	}

	this.knowledge = function () {
		Game.soundEffects.soundKnowledge.volume=1;
		if (this.soundKnowledge.paused) this.soundKnowledge.play();
		else Game.soundEffects.soundKnowledge.currentTime = 0;
	}

	this.blocked = function () {
		Game.soundEffects.soundBlocked.volume=1;
		if (this.soundBlocked.paused) this.soundBlocked.play();
		else Game.soundEffects.soundBlocked.currentTime = 0;
	}


	this.task = function () {
		Game.soundEffects.soundTask.volume=1;
		if (this.soundTask.paused) this.soundTask.play();
		else Game.soundEffects.soundTask.currentTime = 0;
	}

}