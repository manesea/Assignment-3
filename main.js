function init() {
	canvas = document.getElementById("canvas");
	gl = canvas.getContext("webgl2");
	
	gl.clearColor(0.1, 0.0, 0.0, 0.5);
	gl.clearDepth(1.0)
	gl.enable(gl.DEPTH_TEST);
	square = new Square(gl);
	
	render();
	}

function render() {
	gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
	square.render();
	requestAnimationFrame(render);
	}

window.onload = init;