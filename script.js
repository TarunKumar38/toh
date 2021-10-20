const discsInput = document.querySelector("#number-of-discs");
let discsCount = 3;
makeDiscs();
insertDiscs();
addDraggableEvent();
addEventListeners();

discsInput.addEventListener("input", function (event) {
	event.preventDefault();
	discsCount = event.target.value;
	makeDiscs();
	insertDiscs();
	addDraggableEvent();
	addEventListeners();
});

function addDraggableEventCol(col) {
	// const discs = document.querySelectorAll(`.column-${col} .row`);
	// let flag = true;
	// for (let i = 0; i < discs.length; i++) {
	// 	if (flag && discs[i].firstChild) {
	// 		discs[i].firstChild.setAttribute("draggable", "true");
	// 		flag = false;
	// 	} else if (discs[i].firstChild) {
	// 		discs[i].firstChild.setAttribute("draggable", "false");
	// 	}
	// }

	const disc = document.querySelectorAll(`.column-${col} .disc`);
	console.log(disc.length);
	if (disc.length > 0) {
		disc[0].setAttribute("draggable", "true");
	}
	if(disc.length > 1) {
		for (let i = 1; i < disc.length; i++) {
			disc[i].setAttribute("draggable", "false");
		}
	}
}

function addDraggableEvent() {
	for (let i = 1; i <= 3; i++) {
		addDraggableEventCol(i);
	}
}

function makeDiscs() {
	for (let i = 1; i <= 3; i++) {
		createColumn(i);
	}
}

function removeAllChildNodes(parent) {
	while (parent && parent.firstChild) {
		parent.removeChild(parent.firstChild);
	}
}

function addRod(col) {
	const column = document.querySelector(`.column-${col}`);
	const rod = document.createElement("div");
	rod.classList.add("rod");
	rod.classList.add(`rod-${col}`);
	rod.style.height = `${55 * discsCount + 50}px`;
	column.appendChild(rod);
}

function createColumn(col) {
	const column = document.querySelector(`.column-${col}`);
	removeAllChildNodes(column);
	for (let i = 0; i < discsCount; i++) {
		const element = document.createElement("div");
		element.classList.add(`row`);
		element.classList.add(`row-${i + 1}`);
		element.classList.add(`empty`);
		column.appendChild(element);
	}
	addRod(col);
}

function insertDiscs() {
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

// Fill listeners

function addEventListeners() {
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

// Loop through empty boxes and add listeners

// Drag Functions
let temp;
function dragStart() {
	temp = this;
	console.log(this.parentNode);
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
		if (places[i].firstChild) {
			continue;
		} else {
			break;
		}
	}
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
}
