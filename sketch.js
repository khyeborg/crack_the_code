let mapImage;
let imgWidth = 950, imgHeight = 694;
let logo1Image, logo2Image, logo3Image;
let logo1NumImage, logo2NumImage, logo3NumImage;
let logo1, logo2, logo3;

let logosArray = [];

function preload() {
	mapImage = loadImage("images/map.png");
	logo1Image = loadImage("images/asc_logo.png");
	logo2Image = loadImage("images/gwc_logo.png");
	logo3Image = loadImage("images/csforall_logo.png");
	logo1NumImage = loadImage("images/1.png");
	logo2NumImage = loadImage("images/2.png");
	logo3NumImage = loadImage("images/3.png");
}

function setup() {
	createCanvas(imgWidth, imgHeight);

	imageMode(CENTER);
	rectMode(CENTER);

	// instantiate logos
	logo1 = new Logo("All Star Code", [logo1Image, 190, 400, 150, 136], [logo1NumImage, 270, 445, 60, 42], "challenge1", 1.3);
	logo2 = new Logo("Girls Who Code", [logo2Image, 480, 180, 240, 105], [logo2NumImage, 610, 130, 70, 41], "challenge2", 1.2);
	logo3 = new Logo("CS For All", [logo3Image, 800, 210, 170, 147], [logo3NumImage, 850, 300, 65, 38], "challenge3", 1.3);

	logosArray.push(logo1);
	logosArray.push(logo2);
	logosArray.push(logo3);
}

function draw() {
	image(mapImage, width / 2, height / 2, imgWidth, imgHeight);

	for (let i = 0; i < logosArray.length; i++) {
		logosArray[i].display();
		// logosArray[i].drawLogoBox();
	}

	// noFill();
	// strokeWeight(5);
	// rect(width / 2, height / 2, 200, 100);
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





