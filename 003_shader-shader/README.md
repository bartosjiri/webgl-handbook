# Shader, shader

## Description

Scratching the surface of GLSL, shaders and shader components.

## Notes
- WebGL requires 2 shaders every time it has to draw something, a vertex shader and a fragment shader
  - Each shader is a function, and these two are linked together into a shader program
  - A typical WebGL app will have many shader programs
- Vertex shader generates clip space coordinates
  - It is called once per vertex, each time it requires to set global variable `gl_Position` to some coordinates
  - It can get data in 3 ways:
    - Attributes: data pulled from buffers
    - Uniforms: values that stay the same for all vertices of a single draw call
    - Textures: data from pixels or texels
  - Attributes and buffers are the most common way for a vertex shader to get data
    - Buffer is created (`gl.createBuffer()`), populated with data (`gl.bindBuffer(...)`, `gl.bufferData(...)`), attribute location is then looked up (`gl.getAttribLocation(...)`), and finally instructions how to pull out data are provided (`gl.enableVertexAttribArray(...)`, `gl.vertexAtrribPointer(...)`)
    - Attributes can use various types, such as `float`, `vec2`, `vec3`, `vec4`, `mat2`, `mat3`, `mat4`, `int`, `ivec2`, `ivec3`, `ivec4`, `uint`, `uvec2`, `uvec3`, `uvec4`
  - As uniforms are values passed to the vertex shader that stay the same for all vertices in a draw call, an example can be setting an offset to the shader
    - Again, the location of the uniform needs to be looked up (`gl.getUniformLocation(...)`) and then the uniform must be set (`gl.uniform4fv(...)`) before drawing
    - Uniforms have many types and each type has its own function to be called, `gl.uniform4fv()` is just one of them
- Fragment shaders provide a color for the current pixel being rasterized
  - It is called once per pixel and a color is required in return
  - It can get data in 3 ways:
    - Uniforms: same as vertex attributes - values that stay the same for every pixel of a single draw call
    - Textures: also same - data from pixel or texels
    - Varyings: data passed from the vertex shader and interpolated
  - Texture values can be extracted with GLSL's `texture` function from a uniform
    - Data coming out of the texture is dependent on many settings, some of these are `level`, `internalFormat`, `width`, `height`, `border`, `format` and `type`
    - Yet again, uniform location needs to be looked up, activated, bound to a texture unit and provided to shader
  - To use a varying, there needs to be declared a matching varying in both a vertex and fragment shader
    - A `out` varying is set in the vertex shader with some value per vertex, WebGL will then optionlly interpolate between these values and pass them to the corresponding `in` varying in the fragment shader
- GLSL (Graphics Library Shader Language) is tje langauge shaders are written in
  - It has some features that are somewhat unique and not common in JavaScript, designed to compute math needed for rasterizing graphics
    - Some of these special types are `vec2`, `vec3` and `vec4` representing 2, 3 or 4 values, or `mat2`, `mat3` and `mat4` representing matrices
    - This enables operations like multiplying a `vec` by scalar, matrix multiplication and vector to matrix multiplication
    - It can swizzle (swap or repeat) vec components, `v.yyyy` is the same as `vec4(v.y, v.y, v.y, v.y)` and `v.bgra` is the same as `vec4(v.b, v.g, v.r, v.a)`
  - GLSL is very type strict
- Eventhough GLSL and the creation of shaders can seem complicated, it is often the same in most WebGL programs and therefore a boilerplate code can be used

## Resources
| Title | Author | Link |
| :---   | :---  | :---  |
| WebGL Shaders and GLSL | [Greggman](https://github.com/greggman) | [Post](https://webgl2fundamentals.org/webgl/lessons/webgl-shaders-and-glsl.html) |
