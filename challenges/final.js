// define answers
let passcodesArray = ["1", "2", "3"];
let userPasscodesArray = [];
let numberOfPasscodes = passcodesArray.length;
let correctPasscodes;

// get references
let userPasscodeArrayRef = document.getElementsByClassName("user_passcode");
let submitButtonRef = document.getElementsByClassName("submit")[0];
let resultDivRef = document.getElementsByClassName("result_div")[0];
let userInfoDivRef = document.getElementById("user_info_div");
let bigDiv2Ref = document.getElementById("big_div_2");
let rewardsDivRef = document.getElementById("rewards_div");
let infoQuestionsArrayRef = [document.getElementsByClassName("first_info_questions"), document.getElementsByClassName("second_info_questions"), document.getElementsByClassName("third_info_questions")];

let userInfoInputArray = document.getElementsByClassName("user_info_input");
let confirmButtonArray = document.getElementsByClassName("confirm_button");
let infoQuestionsInputArray = [document.getElementsByClassName("first_info_question_inputs"), document.getElementsByClassName("second_info_question_inputs"), document.getElementsByClassName("third_info_question_inputs")];
let userResponsesArray = [];
let pleaseSelectDivRef = document.getElementById("please_select_div");


submitButtonRef.onclick = function() {
	correctPasscodes = 0

	for (let i = 0; i < userPasscodeArrayRef.length; i++) {
		userPasscodesArray.push(userPasscodeArrayRef[i].value);

		if (String(userPasscodeArrayRef[i].value) == passcodesArray[i]) {
			correctPasscodes++;
		} 

		else {
			userPasscodeArrayRef[i].value = "";
		}
	}

	if (correctPasscodes == numberOfPasscodes) {
		resultDivRef.innerHTML = 'CORRECT! ALL PASSCODES ARE VALID!';
		submitButtonRef.classList.add("hidden");

		let tempButton = document.createElement("button");
		tempButton.innerHTML = "Click here to proceed";
		resultDivRef.appendChild(tempButton);

		tempButton.onclick = function() {
			document.getElementsByClassName("big_div")[0].classList.add("hidden");
			bigDiv2Ref.classList.remove("hidden");
		}
	}

	else {
		resultDivRef.innerHTML = 'Sorry, try again!';
	}

	resultDivRef.style.padding = "20px";
}

for (let i = 0; i < infoQuestionsArrayRef.length; i++) {
	for (let j = 0; j < infoQuestionsArrayRef[i].length; j++) {
		infoQuestionsArrayRef[i][j].onmouseover = function() {
			infoQuestionsArrayRef[i][j].style.backgroundColor = "#D1E5FA";
		}

		infoQuestionsArrayRef[i][j].onmouseout = function() {
			infoQuestionsArrayRef[i][j].style.backgroundColor = "white";
		}

		infoQuestionsArrayRef[i][j].onclick = function() {
			infoQuestionsInputArray[i][j].checked = true;
		}
	}
}

// confirmButtonArray stuff
for (let i = 0; i < confirmButtonArray.length + 1; i++) {

	if (i < confirmButtonArray.length - 1) {

		confirmButtonArray[i].onclick = function() {
			let tempCounter = 0;

			for (let j = 0; j < infoQuestionsInputArray[i].length; j++) {
				
				if (infoQuestionsInputArray[i][j].checked) {
					userResponsesArray.push(infoQuestionsInputArray[i][j].value);
					console.log("userResponsesArray:", userResponsesArray);

					userInfoInputArray[i].classList.add("hidden");
					userInfoInputArray[i + 1].classList.remove("hidden");

					pleaseSelectDivRef.innerHTML = '';
					pleaseSelectDivRef.style.padding = "0px 0px";
				}

				else {
					tempCounter++;
				}
			}

			if (tempCounter == infoQuestionsInputArray[i].length) {
				pleaseSelectDivRef.innerHTML = 'Please select an option';
				pleaseSelectDivRef.style.padding = "10px 0px";
			}
		}

	}

	else if (i < confirmButtonArray.length) {
		confirmButtonArray[i].onclick = function() {
			let tempCounter = 0;

			for (let j = 0; j < infoQuestionsInputArray[i].length; j++) {
				
				if (infoQuestionsInputArray[i][j].checked) {
					userResponsesArray.push(infoQuestionsInputArray[i][j].value);
					console.log("userResponsesArray:", userResponsesArray);

					userInfoDivRef.classList.add("hidden");
					rewardsDivRef.classList.remove("hidden");

					pleaseSelectDivRef.innerHTML = '';
					pleaseSelectDivRef.style.padding = "0px 0px";
				}

				else {
					tempCounter++;
				}
			}

			if (tempCounter == infoQuestionsInputArray[i].length) {
				pleaseSelectDivRef.innerHTML = 'Please select an option';
				pleaseSelectDivRef.style.padding = "10px 0px";
			}
		}
	}
}





