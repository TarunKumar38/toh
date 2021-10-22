export function sleep(ms) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

export function removeAllChildNodes(parent) {
	while (parent && parent.firstChild) {
		parent.removeChild(parent.firstChild);
	}
}

export function isGameWon() {
	const discs = document.querySelector(".column-3 .row");
	if (discs && discs.firstChild) {
		return true;
	}
	return false;
}

export function setGreen(col) {
	const discs = document.querySelectorAll(`.column-${col} .row`);
	discs.forEach((disc) => {
		disc.firstChild.classList.add("won");
	});
}

export function setDraggableFalse() {
	const discs = document.querySelectorAll(`.column-3 .row`);
	for (let i = 0; i < discs.length; i++) {
		discs[i].firstChild.setAttribute("draggable", "false");
	}
}

function addDraggableEventCol(col) {
	const discs = document.querySelectorAll(`.column-${col} .row`);
	let flag = true;
	for (let i = 0; i < discs.length; i++) {
		if (flag && discs[i].firstChild) {
			discs[i].firstChild.setAttribute("draggable", "true");
			flag = false;
		} else if (discs[i].firstChild) {
			discs[i].firstChild.setAttribute("draggable", "false");
		}
	}
}

export function addDraggableEvent() {
	for (let i = 1; i <= 3; i++) {
		addDraggableEventCol(i);
	}
}
