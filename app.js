var board = document.getElementById("gameboard");
var alertdiv = document.createElement("div");
alertdiv.classList.add("alertdiv");
var flags = 15;

window.addEventListener("load", (event) => {
	var div, b;
	var mines = 0, id = 0;
	var mines_set = new Set();
	for(let i = 0; i < 8; i++) {
		for(let j = 0; j < 8; j++) {
			div = document.createElement("div");
			board.append(div);
			div.classList.add("tile");
			b = document.createElement("button");
			div.append(b);
			b.classList.add("tilebtn");
			b.innerText = "Tile";
			b.setAttribute("game-tile-row", i.toString());
			b.setAttribute("game-tile-col", j.toString());
			b.setAttribute("game-nearby-mines", "0");
			b.addEventListener("mouseup", (e) => {
				if(e.button != 0) return 1;
				if(mines_set.has(e.currentTarget)) {
					alertdiv.innerText = "Game Over. You hit a mine.";
					mines_set.forEach((elem) => {
						elem.setAttribute("game-is-searched", "1");
						if(elem.children.length > 0) {
							if(elem.firstChild.getAttribute("src") !== "flag.png") return 1;
							elem.firstChild.src = "flagged-mine.png";
						} else {
							elem.innerText = "";
							var img = document.createElement("img");
							img.src = "mine.svg";
							elem.append(img);
						}
					});
					return 1;
				}
				if(e.currentTarget.innerText !== "Tile") return 1;
				e.currentTarget.setAttribute("game-is-searched", "1");
				e.currentTarget.innerText = e.currentTarget.getAttribute("game-nearby-mines");
				return 1;
			});
			b.addEventListener("contextmenu", (e) => {
				e.preventDefault();
				if(e.currentTarget.children.length > 0) {
					if(e.currentTarget.firstChild.getAttribute("src") !== "flag.png") return 1;
					e.currentTarget.firstChild.remove();
					e.currentTarget.innerText = "Tile";
				} else {
					if(e.currentTarget.innerText !== "Tile") return 1;
					if(flags == 0) {
						alertdiv.innerText = "No more remaining flags. Unflag some other tile.";
						return 1;
					}
					e.currentTarget.innerText = "";
					var img = document.createElement("img");
					img.src = "flag.png";
					e.currentTarget.append(img);
				}
				return false;
			});
		}
	}
	while(mines != 15) {
		id = Math.floor(Math.random() * 64);
		if(mines_set.has(board.children[id].firstChild))
			continue;
		mines_set.add(board.children[id].firstChild);
		// board.children[id].firstChild.innerText = "Mine";
		addNearbyMinesCount(board.children[id].firstChild);
		mines++;
	}
});

function addNearbyMinesCount(mine_elem) {
	var r = new Number(mine_elem.getAttribute("game-tile-row"));
	var c = new Number(mine_elem.getAttribute("game-tile-col"));
	if(getElement(r-1, c-1)) {
		getElement(r-1, c-1).setAttribute("game-nearby-mines",
			(Math.floor(getElement(r-1, c-1).getAttribute("game-nearby-mines")) + 1).toString());
	}
	if(getElement(r-1, c)) {
		getElement(r-1, c).setAttribute("game-nearby-mines",
			(Math.floor(getElement(r-1, c).getAttribute("game-nearby-mines")) + 1).toString());
	}
	if(getElement(r-1, c+1)) {
		getElement(r-1, c+1).setAttribute("game-nearby-mines",
			(Math.floor(getElement(r-1, c+1).getAttribute("game-nearby-mines")) + 1).toString());
	}
	if(getElement(r, c-1)) {
		getElement(r, c-1).setAttribute("game-nearby-mines",
			(Math.floor(getElement(r, c-1).getAttribute("game-nearby-mines")) + 1).toString());
	}
	if(getElement(r, c+1)) {
		getElement(r, c+1).setAttribute("game-nearby-mines",
			(Math.floor(getElement(r, c+1).getAttribute("game-nearby-mines")) + 1).toString());
	}
	if(getElement(r+1, c-1)) {
		getElement(r+1, c-1).setAttribute("game-nearby-mines",
			(Math.floor(getElement(r+1, c-1).getAttribute("game-nearby-mines")) + 1).toString());
	}
	if(getElement(r+1, c)) {
		getElement(r+1, c).setAttribute("game-nearby-mines",
			(Math.floor(getElement(r+1, c).getAttribute("game-nearby-mines")) + 1).toString());
	}
	if(getElement(r+1, c+1)) {
		getElement(r+1, c+1).setAttribute("game-nearby-mines",
			(Math.floor(getElement(r+1, c+1).getAttribute("game-nearby-mines")) + 1).toString());
	}
}

function getElement(r, c) {
	return board.querySelector("button[game-tile-row=\""+r+"\"][game-tile-col=\""+c.toString()+"\"]");
}
