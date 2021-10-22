import { createStructure } from "./structure.js";
import { addEventListeners } from "./dragEventFunctions.js";

const discsInput = document.querySelector("#number-of-discs");
let discsCount = 3;

//initial configuration
createStructure(discsCount);
addEventListeners();

//event listeners
discsInput.addEventListener("input", function (event) {
	event.preventDefault();
	discsCount = event.target.value;
	createStructure(discsCount);
	addEventListeners();
});
