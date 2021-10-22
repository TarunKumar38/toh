import { addDraggableEvent, isGameWon, setGreen, setDraggableFalse } from "./utils.js";

let temp;
function dragStart() {
	temp = this;
	this.classList.add("hold");
	setTimeout(() => (this.className = "invisible"), 0);
}

function dragEnd(e) {
	e.preventDefault();
	this.classList.remove("hold");
	this.classList.remove("invisible");
	this.classList.add("disc");
}

function dragOver(e) {
	e.preventDefault();
	const rod = this.lastChild;
	rod.classList.add("hovered");
}

function dragEnter(e) {
	e.preventDefault();
}

function dragLeave() {
	const rod = this.lastChild;
	rod.classList.remove("hovered");
}

function dragDrop(event) {
	event.preventDefault();
	const rod = this.lastChild;
	rod.classList.remove("hovered");
	const places = this.childNodes;
	let i = places.length - 2;
	for (; i >= 0; i--) {
		console.log(places[i])
		if (places[i].firstChild) {
			continue;
		} else {
			break;
		}
	}
	let discsCount = document.querySelectorAll(".column-1 .row").length;
	console.log(discsCount)
	if (i == discsCount - 1) {
		places[i].appendChild(temp);
	} else if (i >= 0) {
		let a = getComputedStyle(places[i + 1].firstChild).width;
		a = parseInt(a.substr(0, a.length - 2));
		let b = getComputedStyle(temp).width;
		b = parseInt(b.substr(0, b.length - 2));
		if (a !== b && a > b) {
			places[i].appendChild(temp);
		}
	}
	addDraggableEvent();
	if (isGameWon()) {
		setGreen();
		setDraggableFalse();
	}
}

export function addEventListeners() {

	addDraggableEvent();
	const discs = document.querySelectorAll(".disc");
	const columns = document.querySelectorAll(".column");
	for (const disc of discs) {
		disc.addEventListener("dragstart", dragStart);
		disc.addEventListener("dragend", dragEnd);
	}
	for (const column of columns) {
		column.addEventListener("dragover", dragOver);
		column.addEventListener("dragenter", dragEnter);
		column.addEventListener("dragleave", dragLeave);
		column.addEventListener("drop", dragDrop);
	}
}
