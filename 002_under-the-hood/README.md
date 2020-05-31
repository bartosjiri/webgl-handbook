# Under the hood

## Description

Discovering how WebGL data are transformed into an image.

## Preview
![preview](https://i.imgur.com/zZQNaqE.png)

## Demo
- [Codepen](https://codepen.io/bartosjiri/pen/KKdOLdP)

## Notes
- There are 2 parts in the process of displaying graphics with WebGL and GPU:
  - Verticies processing: data streaming into clip space vertices
  - Pixel drawing
- Vertex shader is a function written in GLSL which is called for each vertex
  - It will calculate pixel positions of the vertices and then draw (rasterize) anything inbetween them
- Each drawn pixel will then call the fragment shader to ask for its color 
- There can be much more than just color information provided through varyings
  - Varyings are defined for each value we want to pass from the vertex shader to the fragment shader
- [Demo](#demo)
  - Colors here are computed from the clip space and therefore don't move with the triangle
  - Only 3 vertices are computed, in other words vertex shader gets called only 3 times
  - The fragment shader is however called for every pixel of the triangle and returns an interpolated value
    - *How does this work for textures?*
- Vertex data are transfered onto GPU through buffers:
  - `gl.createBuffer` creates a buffer
  - `gl.bindBuffer` sets that buffer as the buffer to be worked on 
  - `gl.bufferData` copies data into the current bufffer
- Instructions how to get data out of the buffer are then required by vertex shader's attributes:
  - WebGL needs to get notified to supply data from a buffer with `gl.enableVertexAtrribArray(location)`
  - WebGL then gets data from the buffer with `gl.vertexAtrribPointer(location, numComponents, typeOfData, normalizeFlag, stride, offset)` which includes instructions on buffer location, how many components per vertex (1-4), what type of data, stride and offset 
    - If only 1 buffer per data type is used, both stride and offset can always be 0
      - 0 for stride means using a stride that matches the data type and size
      - 0 for offset means start at the beginning of the buffer
    - Setting stride and/or offset to values other than 0 is more complicated
      - It can bring performance benefits, however it need deeper knowledge of the subject


## Resources
| Title | Author | Link |
| :---   | :---  | :---  |
| WebGL How It Works | [Greggman](https://github.com/greggman) | [Post](https://webgl2fundamentals.org/webgl/lessons/webgl-how-it-works.html) |
