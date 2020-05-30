# Hello World

## Description

Learning about what WebGL is, understanding basics of how it works and creating my first canvas.

## Preview
![preview](https://i.imgur.com/C0m8Eex.png)

## Demo
- [Codepen](https://codepen.io/bartosjiri/pen/ExVqowj)

## Notes
- WebGL is a rasterization engine, it draws points, lines and triangles
- It runs on the GPU and the input code consists of pairs of functions (called program):
    - Vertex shaders: Compute vertex positions
    - Fragment shaders: Compute color for each pixel
- Shaders can receive data in 4 ways:
    - Attributes, buffers and vertex arrays: 
        - Buffers: Arrays of binary data, usually contain positions, normals, texture coordinates, vertex colors or anything else
        - Attributes: Specification of how to pull data out of buffers and how to provide them to vertex shaders
        - Vertex array: State of attributes and their specification in buffers; also called a vertex array object (VAO)
    - Uniforms: global variables set before the execution of shader program
    - Textures: Colors, image, etc.
    - Varyings: A way for a vertex shader to pass data to a fragment shader
- WebGL accepts only clip space coordinates and colors:
  - Vertex shader provides coordinates, fragment shader provides colors:
      - Clip space coordinates range between -1 and +1 independently of canvas size
      - Colors are parsed from RGBA format, individual values however range from 0 to 1
- `HTMLCanvasElement.getContext()` returns a drawing context and supports various context types:
    - `2d`: creates `CanvasRenderingContext2D` object representing a two-dimensional rendering context
    - `webgl`: creates `WebGLRenderingContext` object representing a three-dimensional rendering context, available on browsers with an implementation of WebGL version 1 (OpenGL ES 2.0)
    - `webgl2`: creates `WebGL2RenderingContext`, available on browsers with WebGL version 2 (OpenGL ES 3.0)
    - `bitmaprenderer`: creates `ImageBitmapRenderingContext` which provides functionality to replace the content of the canvas with a given `ImageBitmap`
- OpenGL uses a C-style language called OpenGL Shading Language (GLSL) 
    - GLSL code can be passed to GPU through JavaScript strings
    - Most 3D engines generate GLSL shaders on the fly using various types of templates, concatenation, etc. 
- GLSL shader strings need to have declared properties and a main function:
    - Version must be the very first line of the shader with no comments or blanks lines before it
    - Fragment shaders don't have a default precision and therefore it needs to be set
- The majority of WebGL API is about setting up state to supply data to GLSL programs
- WebGL enables a manipulation of many resources on global bind points
    - Bind points are internal global variables inside WebGL
    - A resource needs to be bound to a bind point first, then all other functions can refer to the resource through the bind point
- Positions must be strongly typed data, which can be achieved for example by creating a JavaScript array and generating new `Float32Array` from it,
- For performace optimization, WebGL accepts hints such as `gl.STATIC_DRAW` which is self-explanatory
- An attribute needs to be instructed how to get data out of a buffer with various parameters:
    - `size`: how many components per iteration
    - `type`: type of data
    - `normalize`: boolean for normalization of the data
    - `stride`: how much to move each iteration
    - `offset`: starting position in the buffer
- The attribute also needs to be turned on, that way WebGL knows we want to get data out of a buffer
    - If the attribute isn't turned on it will have a constant value
- Canvase have 2 dimensions and it should be always set through CSS
- WebGL's clip space values can be converted into pixels by using `gl.viewport` method
    - This maps [-1,1] values to [0, canvas.width/height]

## Resources
| Title | Author | Link |
| :---   | :---  | :---  |
| WebGL2 Fundamentals | [Greggman](https://github.com/greggman) | [Post](https://webgl2fundamentals.org/webgl/lessons/webgl-fundamentals.html) |
