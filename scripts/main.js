import { createStructure } from "./structure.js";
import { addEventListeners } from "./dragEventFunctions.js";
// import { solve } from './solve.js'
import { sleep, setGreen } from "./utils.js";

const discsInput = document.querySelector("#number-of-discs");
const speedEl = document.querySelector(".speed");
let discsCount = 3;
let speed = 500;

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

speedEl.addEventListener("input", function (event) {
	// console.log(event.target.value);
	speed = event.target.value;
	console.log(1000 - speed);
	const discs = document.querySelectorAll(".column-1 .disc");
	discs.forEach((disc) => {
		disc.style.transition = `all ${(1000 - speed) / 1000}s`;
	});
});

const solveBtn = document.querySelector(".solve-btn");

solveBtn.addEventListener("click", solve);

async function toh(n, source, target, aux, ds, discsCount) {
	if (n == 0) {
		return;
	}
	await toh(n - 1, source, aux, target, ds, discsCount);
	move(source, target, ds, discsCount, n);
	ds[source - 1] -= 1;
	ds[target - 1] += 1;
	await sleep(1000 - speed);
	await toh(n - 1, aux, target, source, ds, discsCount);
}

function move(col1, col2, ds, discsCount, n) {
	const disc1 = document.querySelector(`.column-1 .row-${n}`);
	const disc2 = document.querySelector(
		`.column-${col2} .row-${discsCount - ds[col2 - 1]}`
	);
	const pos1 = disc1.getBoundingClientRect();
	const pos2 = disc2.getBoundingClientRect();

	const row = document.querySelector(`.column-1 .row-${n}`);
	row.firstChild.style.transform = `translateX(${
		pos2.left - pos1.left
	}px) translateY(${pos2.top - pos1.top}px)`;
}

export async function solve(event) {
	event.preventDefault();
	const n = document.querySelectorAll(".column-1 .row").length;
	const ds = [n, 0, 0];
	await toh(n, 1, 3, 2, ds, n);
	setGreen(1);
}
