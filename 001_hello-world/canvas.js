// Setup shaders
const vertexShaderSource = `#version 300 es
in vec4 a_position;
void main() {
  gl_Position = a_position;
}
`;
const fragmentShaderSource = `#version 300 es
precision highp float;
out vec4 outColor;
void main() {
  outColor = vec4(1, 0, 0.5, 1);
}
`;

// Function for creating shaders
const createShader = (gl, type, source) => {
  const shader = gl.createShader(type);
  gl.shaderSource(shader, source);
  gl.compileShader(shader);

  const success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
  if (success) {
    return shader;
  }

  console.log(gl.getShaderInfoLog(shader));
  gl.deleteShader(shader)
};

// Function to link pair shaders into a program
const createProgram = (gl, vertexShader, fragmentShader) => {
  const program = gl.createProgram();
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);

  const success = gl.getProgramParameter(program, gl.LINK_STATUS);
  if (success) {
    return program;
  }

  console.log(gl.getProgramInfoLog(program));
  gl.deleteProgram(program);
};

const main = () => {
  // Get WebGL context
  const canvas = document.querySelector("canvas");
  const gl = canvas.getContext("webgl2");
  if (!gl) {
    return;
  }

  // Create and compile two required shaders
  const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
  const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);

  // Create a program
  const program = createProgram(gl, vertexShader, fragmentShader);

  // Lookup the location of the attribute for the created program
  // -> Looking up attribute (and uniform) locations should be done during initialization, not in the render loop!
  const positionAttributeLocation = gl.getAttribLocation(program, "a_position");

  // Create buffer for attributes to get their data
  const positionBuffer = gl.createBuffer();

  // Bind the position buffer
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

  // Put data in the position buffer through the bind point
  // -> Create three 2D points
  const positions = [
    0, 0,
    0, 0.5,
    0.7, 0
  ];
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);

  // Tell the attribute how to get data out of the buffer
  const vao = gl.createVertexArray();

  // Set VAO as current vertex array
  gl.bindVertexArray(vao);

  // Turn the attribute on
  // -> Tell WebGL to get data out of a buffer
  // -> Otherwise the attribute will have constant value
  gl.enableVertexAttribArray(positionAttributeLocation);

  // Specify how to pull the data out
  const size = 2; // -> 2 components per iteration
  const type = gl.FLOAT; // -> data in 32bit floats
  const normalize = false; // -> don't normalize data
  const stride = 0; // -> 0 = move forward size * sizeof(type) each iteration
  const offset = 0; // -> start at the beginning of the buffer
  gl.vertexAttribPointer(positionAttributeLocation, size, type, normalize, stride, offset);

  // Resize canvas using a 3rd party utility
  webglUtils.resizeCanvasToDisplaySize(gl.canvas);

  // Convert clip values to pixels
  // -> Map [-1,1] to [0,canvas.width/height]
  gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

  // Make canvas transparent
  gl.clearColor(0, 0, 0, 0);
  gl.clear(gl.COLOR_BUFFER_BIT);

  // Select our program
  gl.useProgram(program);

  // Bind the set attribute/buffer
  gl.bindVertexArray(vao);

  // Execute our program
  // -> Vertex shader will be executed three times (as set in count):
  // --> 1) set "a_position.x" and "a_position.y" to first 2 values from the positionBuffer
  // --> 2) set both to second 2 values
  // --> 3) set both to last 2 values
  const primitiveType = gl.TRIANGLES;
  const execOffset = 0;
  const count = 3;
  gl.drawArrays(primitiveType, execOffset, count);
};

main();
