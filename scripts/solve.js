import { sleep, setGreen } from "./utils.js";

async function toh(n, source, target, aux, ds, discsCount) {
	if (n == 0) {
		return;
	}
	await toh(n - 1, source, aux, target, ds, discsCount);

	await sleep(100);
	move(source, target, ds, discsCount, n);
	ds[source-1] -= 1;
	ds[target-1] += 1;
	await sleep(600);
	await toh(n - 1, aux, target, source, ds, discsCount);
}

function move(col1, col2, ds, discsCount, n) {

	const disc1 = document.querySelector(`.column-1 .row-${n}`);
	const disc2 = document.querySelector(`.column-${col2} .row-${discsCount - ds[col2-1]}`);
	const pos1 = disc1.getBoundingClientRect();
	const pos2 = disc2.getBoundingClientRect();
	console.log(pos1);
	console.log(pos2);
	
	document.querySelector(`.column-1 .row-${n}`).firstChild.style.transform = `translateX(${pos2.left - pos1.left}px) translateY(${pos2.top - pos1.top}px)`;
}

export async function solve(event) {
	event.preventDefault();
	const n = document.querySelectorAll(".column-1 .row").length;
	const ds = [n, 0, 0];
	await toh(n, 1, 3, 2, ds, n);
	setGreen(1);
}
