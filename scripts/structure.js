import { removeAllChildNodes } from "./utils.js";

function makeDiscs(discsCount) {
	for (let i = 1; i <= 3; i++) {
		createColumn(i, discsCount);
	}
}

function createColumn(col, discsCount) {
	const column = document.querySelector(`.column-${col}`);
	removeAllChildNodes(column);
	for (let i = 0; i < discsCount; i++) {
		const element = document.createElement("div");
		element.classList.add(`row`);
		element.classList.add(`row-${i + 1}`);
		element.classList.add(`empty`);
		column.appendChild(element);
	}
	addRod(col, discsCount);
}

function addRod(col, discsCount) {
	const column = document.querySelector(`.column-${col}`);
	const rod = document.createElement("div");
	rod.classList.add("rod");
	rod.classList.add(`rod-${col}`);
	rod.style.height = `${55 * discsCount + 50}px`;
	column.parentElement.style.height = `${55 * discsCount + 100}px`;
	column.appendChild(rod);
}

function insertDiscs(discsCount) {
	const places = document.querySelectorAll(".column-1 .row");
	let discWidth = 70;
	let discWidthDiff = 150 / (discsCount - 1);
	for (let i = 0; i < places.length; i++) {
		places[i].classList.remove("empty");
		const disc = document.createElement("div");
		disc.classList.add("disc");
		disc.style.width = `${discWidth}px`;
		disc.setAttribute("draggable", "false");
		places[i].appendChild(disc);
		discWidth += discWidthDiff;
	}
}

export function createStructure(discsCount) {
	makeDiscs(discsCount);
	insertDiscs(discsCount);
}
