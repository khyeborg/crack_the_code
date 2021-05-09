let mapImage;
let imgWidth = 950, imgHeight = 694;
let logo1Image, logo2Image, logo3Image;
let logo1NumImage, logo2NumImage, logo3NumImage;
let logo1, logo2, logo3, logo4;

let logosArray = [];

let smokeImageArray = [];
let smokeCounter = 0;
let smokeDelayCounter = 0;
let smokeZoom = 1;

let birdImageArray = [];
let birdsArray = [];
let birdX, birdY, xRand;
let birdSpeed = 1;

let music;

function preload() {
	mapImage = loadImage("images/map.png");
	logo1Image = loadImage("images/asc_logo.png");
	logo2Image = loadImage("images/gwc_logo.png");
	logo3Image = loadImage("images/csforall_logo.png");
	logo4Image = loadImage("images/final_island.png");
	logo1NumImage = loadImage("images/1.png");
	logo2NumImage = loadImage("images/2.png");
	logo3NumImage = loadImage("images/3.png");

	music = loadSound("nature_sound.mp3");

	for (let i = 1; i <= 26; i++) {
		smokeImageArray.push(loadImage("images/smoke_only/" + i + ".png"));
	}

	for (let i = 1; i <= 17; i++) {
		birdImageArray.push(loadImage("images/bird/bird" + i + ".png"));
	}
}

function setup() {
	createCanvas(imgWidth, imgHeight);

	imageMode(CENTER);
	rectMode(CENTER);

	// instantiate logos
	logo1 = new Logo("All Star Code", [logo1Image, 190, 400, 150, 136], [logo1NumImage, 270, 445, 60, 42], "challenge1", 1.3);
	logo2 = new Logo("Girls Who Code", [logo2Image, 480, 180, 240, 105], [logo2NumImage, 610, 130, 70, 41], "challenge2", 1.2);
	logo3 = new Logo("CS For All", [logo3Image, 800, 210, 170, 147], [logo3NumImage, 850, 305, 65, 38], "challenge3", 1.2);
	logo4 = new Logo("Final Island", [logo4Image, 530, 455, 210, 195], [logo3NumImage, 850, 305, 65, 38], "final", 1.15);

	logosArray.push(logo1);
	logosArray.push(logo2);
	logosArray.push(logo3);
	logosArray.push(logo4);

	generateBirds()
}

function draw() {
	smokeZoom = 1;

	image(mapImage, width / 2, height / 2, imgWidth, imgHeight);

	for (let i = 0; i < logosArray.length; i++) {
		logosArray[i].display();
		// logosArray[i].drawLogoBox();
	}

	// noFill();
	// strokeWeight(5);
	// rect(width / 2, height / 2, 200, 100);

	// smoke animation
	image(smokeImageArray[smokeCounter], 455, 410, 175 * smokeZoom, 139 * smokeZoom);

	if (smokeDelayCounter % 3 == 0) {
		smokeCounter++;

		if (smokeCounter == smokeImageArray.length) {
			smokeCounter = 0;
		}
	}

	smokeDelayCounter++

	for (let i = 0; i < birdsArray.length; i++) {
		birdsArray[i].display();
	}

	if (music.isPlaying() == false) {
		music.play();
	}
}

class Bird {
	constructor(birdImageArr, index, deltaX, deltaY, xRand) {
		this.birdImageArr = birdImageArr;
		this.index = index;
		this.deltaX = deltaX;
		this.deltaY = deltaY;
		this.xPos = birdX + deltaX;
		this.yPos = birdY + deltaY;
		this.xRand = xRand;
		this.delayCounter = 0;
	}

	display() {
		image(this.birdImageArr[this.index], this.xPos, this.yPos, 10, 15);
		
		this.delayCounter++

		if (this.delayCounter % 3 == 0) {
			this.index++;
			this.move();

			if (this.index == this.birdImageArr.length) {
				this.index = 0;
			}
		}
	}

	move() { 
		if (this.xRand == 0) {
			this.xPos += birdSpeed;
			this.yPos += birdSpeed;

			if (birdsArray[0].yPos > height + Math.floor(random(80, 180))) {
				generateBirds()
			}
		}

		else {
			this.xPos -= birdSpeed;
			this.yPos -= birdSpeed;

			if (birdsArray[0].yPos < Math.floor(random(-180, -80))) {
				generateBirds()
			}
		}
	}
}

class Logo {
	constructor(logoName, logoImageArr, logoNumArr, challengeNum, logoZoom) {
		this.logoName = logoName;
		this.challengeNum = challengeNum;
		this.logoZoom = logoZoom;

		this.logoImage = logoImageArr[0];
		this.logoXPos = logoImageArr[1];
		this.logoYPos = logoImageArr[2];
		this.logoWidth = logoImageArr[3];
		this.logoHeight = logoImageArr[4];

		this.logoNumImage = logoNumArr[0];
		this.logoNumXPos = logoNumArr[1];
		this.logoNumYPos = logoNumArr[2];
		this.logoNumWidth = logoNumArr[3];
		this.logoNumHeight = logoNumArr[4];

		this.leftPoint = this.logoXPos - this.logoWidth / 2;
		this.rightPoint = this.logoXPos + this.logoWidth / 2;
		this.topPoint = this.logoYPos - this.logoHeight / 2;
		this.bottomPoint = this.logoYPos + this.logoHeight / 2;
	}

	display() {
		// hover 
		if (mouseX > this.leftPoint && mouseX < this.rightPoint && mouseY > this.topPoint && mouseY < this.bottomPoint) {
			// tint(255, 200);

			// draw logo
			image(this.logoImage, this.logoXPos, this.logoYPos, this.logoWidth * this.logoZoom, this.logoHeight * this.logoZoom);

			if (this.logoName == "Final Island") {
				smokeZoom = 1.12;
			}
		}

		else {
			// draw logo
			image(this.logoImage, this.logoXPos, this.logoYPos, this.logoWidth, this.logoHeight);
		}

		// draw logo num
		image(this.logoNumImage, this.logoNumXPos, this.logoNumYPos, this.logoNumWidth, this.logoNumHeight);
	}

	drawLogoBox() {
		noFill();
		stroke(0, 255, 0);
		strokeWeight(5);
		rect(this.logoXPos, this.logoYPos, this.logoWidth, this.logoHeight);
	}
}

function mouseClicked() {
	for (let i = 0; i < logosArray.length; i++) {
		if (mouseX > logosArray[i].leftPoint && mouseX < logosArray[i].rightPoint && mouseY > logosArray[i].topPoint && mouseY < logosArray[i].bottomPoint) {
			// console.log("clicked " + logosArray[i].logoName + " logo");
			window.location.replace("https://khyeborg.github.io/crack_the_code/challenges/" + logosArray[i].challengeNum + ".html");
		}
	}
}

function generateBirds() {
	birdsArray = [];
	xRand = Math.floor(random(2));

	if (xRand == 0) {
		birdX = -20;
		birdY = Math.floor(random(0, height * 0.6));

		// instantiate birds
		bird1 = new Bird(birdImageArray, Math.floor(random(birdImageArray.length)), 0, 0, xRand);
		bird2 = new Bird(birdImageArray, Math.floor(random(birdImageArray.length)), 15, 15, xRand);
		bird3 = new Bird(birdImageArray, Math.floor(random(birdImageArray.length)), -15, -15, xRand);
		bird4 = new Bird(birdImageArray, Math.floor(random(birdImageArray.length)), -5, 15, xRand);
		bird5 = new Bird(birdImageArray, Math.floor(random(birdImageArray.length)), -25, 15, xRand);

		birdsArray.push(bird1);
		birdsArray.push(bird2);
		birdsArray.push(bird3);
		birdsArray.push(bird4);
		birdsArray.push(bird5);
	}

	else {
		birdX = width + 20;
		birdY = Math.floor(random(height * 0.4, height));

		// instantiate birds
		bird1 = new Bird(birdImageArray, Math.floor(random(birdImageArray.length)), 0, 0, xRand);
		bird2 = new Bird(birdImageArray, Math.floor(random(birdImageArray.length)), 15, 15, xRand);
		bird3 = new Bird(birdImageArray, Math.floor(random(birdImageArray.length)), 30, 30, xRand);
		bird4 = new Bird(birdImageArray, Math.floor(random(birdImageArray.length)), 20, 0, xRand);
		bird5 = new Bird(birdImageArray, Math.floor(random(birdImageArray.length)), 40, 0, xRand);

		birdsArray.push(bird1);
		birdsArray.push(bird2);
		birdsArray.push(bird3);
		birdsArray.push(bird4);
		birdsArray.push(bird5);
	}
}





