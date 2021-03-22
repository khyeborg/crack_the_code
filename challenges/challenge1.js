// define answers
let answersArray = ["a", "b", "c", "d", "e"];
let userAnswersArray = [];
let numberOfQuestions = answersArray.length;
let correctAnswers;
let passcode = "GROWTH";

// get references
let userAnswerArrayRef = document.getElementsByClassName("user_answer");
let submitButtonRef = document.getElementsByClassName("submit")[0];
let questionsDivRef = document.getElementsByClassName("questions_div")[0];
let resultDivRef = document.getElementsByClassName("result_div")[0];

submitButtonRef.onclick = function() {
	correctAnswers = 0

	for (let i = 0; i < userAnswerArrayRef.length; i++) {
		userAnswersArray.push(userAnswerArrayRef[i].value);

		if (String(userAnswerArrayRef[i].value) == answersArray[i]) {
			correctAnswers++;
		} 

		else {
			userAnswerArrayRef[i].value = "";
		}
	}

	if (correctAnswers == numberOfQuestions) {
		resultDivRef.innerHTML = 'CORRECT! <br> The passcode for this challenge is "' + passcode + '"<br>Write this down! You will need it for TBD.<br><a href="../map.html">Click here to go back to the map</a>';
		submitButtonRef.classList.add("hidden");
	}

	else {
		resultDivRef.innerHTML = 'Sorry, try again!';
	}

	resultDivRef.style.padding = "20px";
}





