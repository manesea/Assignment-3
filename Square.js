/////////////////////////////////////////////////////////////////////////////
//
//  Square.js
//

function Square(gl, vertexShader, fragmentShader) {

    vertexShader ||= "Square-vertex-shader";
    fragmentShader ||= "Square-fragment-shader";

    let program = initShaders(gl, vertexShader, fragmentShader);

    // Set up our data:
    //   - positions contains our vertex positions
    //   - indices contains how to organize the vertices
    //       into primitives
    //
    let positions = [
        0.0, 0.0, 0.0,  // Vertex 0
        1.0, 0.0, 0.0,  // Vertex 1
        1.0, 1.0, 0.0,  // Vertex 2
        0.0, 1.0, 0.0,  // Vertex 3
		0.0, 1.0, 1.0,  // Vertex 4
		0.0, 0.0, 1.0,  // Vertex 5
		1.0, 0.0, 1.0,  // Vertex 6
		1.0, 1.0, 1.0,  // Vertex 7
    ];

    let indices = [
        // Back face
        0, 1, 2,
        2, 3, 0,
        // Top face
        4, 7, 3,
		2, 3, 7,
		// Front face
		5, 6, 4,
		7, 4, 6,
		// Right face
		6, 1, 7,
		2, 7, 1,
		// Left face
		0, 5, 3,
		3, 4, 5,
		// Bottom face
		0, 1, 6,
		5, 6, 0
    ];

    // Initialize all of our WebGL "plumbing" variables
    //
    let aPosition = new Attribute(gl, program, positions,
	    "aPosition", 3, gl.FLOAT);

    indices = new Indices(gl, indices);

    let MV = new Uniform(gl, program, "MV");
    let P  = new Uniform(gl, program, "P");

    this.render = () => {
        gl.useProgram(program);

        aPosition.enable();
        indices.enable();

        MV.update(this.MV);
        P.update(this.P);

        gl.drawElements(gl.TRIANGLES, indices.count, indices.type, 0);

        indices.disable();
        aPosition.disable();
    
    };
};
