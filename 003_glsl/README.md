# GLSL

Being derived from OpenGL ES 3.0, WebGL uses the OpenGL shading language (GLSL) for vertex and fragment manipulation in the graphics pipeline. As stated in previous materials, WebGL requires a shader program (consisting of a vertex shader and a fragment shader) every time it is asked to draw something. The GLSL is different from WebGL's JavaScript API, in both its purpose and syntax, and therefore a separate section dedicated to it is appropriate.

It is also worth mentioning that there are different versions of OpenGL, WebGL and GLSL. In fact, WebGL uses OpenGL ES, which is a subset of OpenGL. The two languages are related but not directly compatible. Attention should also be paid to the version of WebGL, since 2.0 is [still being implemented](https://caniuse.com/#feat=webgl2) into some  browsers while 1.0 is already [widely supported](https://caniuse.com/#feat=webgl). The good news is that WebGL2 is nearly 100% backwards compatible with WebGL1. Therefore some older solutions to a problem can still be viable nowadays, eventhough it may not be the most efficient option at this point.

### Data types

GLSL is designed to do math that is commonly needed to compute things for rasterizing graphics. It allows for three basic types of data:

  - `bool`: boolean values
  - `int`: integer values
  - `float`: floating point values

GLSL facilitates the manipulation of vectors and matrices. Those are always composed of values of the same basic data type. If the type name starts with `b`, it contains boolean values, if it starts with `i` it contains integer values, if it starts with anything else it contains floating point values. The vector and matrix data types are:

  - `bvec2`, `bvec3`, `bvec4`: 2, 3, and 4-component boolean vectors
  - `ivec2`, `ivec3`, `ivec4`: 2, 3, and 4-component integer vectors
  - `vec2`, `vec3`, `vec4`: 2, 3, and 4-component floating point vectors
  - `mat2`, `mat3`, `mat4`: 2x2, 3x3, and 4x4 floating point matrices

There are three other specialized data types:

  - `sampler2D`: a reference to a `TEXTURE_2D` texture unit
  - `samplerCube`: a reference to a `SAMPLER_CUBE` texture unit
  - `void`: used to identify functions that do not return a value or parameter lists to a function that are empty

### Precision

Compared to some other programming languages which define the range of values that can be stored in a specific data type, GLSL allows the user to select from three different precisions levels for the basic data types:
  - For integers:
    - `lowp`: range of values (-2<sup>8</sup>, 2<sup>8</sup>), specific range -+256
    - `mediump`: range of values (-2<sup>10</sup>, 2<sup>10</sup>), specific range -+1024
    - `highp`: range of values (-2<sup>16</sup>, 2<sup>16</sup>), specific range -+65536
  - For floats:
    - `lowp`: range of values (-2, 2), fractional accuracy 2<sup>-8</sup>
    - `mediump`: range of values (-2<sup>14</sup>, 2<sup>14</sup>), fractional accuracy 2<sup>-10</sup>
    - `highp`: range of values (-2<sup>62</sup>, 2<sup>62</sup>), fractional accuracy 2<sup>-16</sup>

Individual variables can have different precisions as well as all variables of particular type can have set the same precision:

  ```glsl
  precision highp int;
  precision mediump float;
  ```

### Constant values

Integers can be specified in decimal, octal or hexidecimal base on their leading character:

  ```glsl
  int alpha = 176; // base 10, starts with a non-zero digit
  int beta = 0176; // base 8, starts with 0
  int gamma = 0x176; // base 16, starts with 0x
  ```

Floats are always in base 10, specified using a series of digits that include a decimal point, an exponent or both:

  ```glsl
  float delta = 1.;
  float epsilon = 0.3421;
  float phi = 2e4;
  float theta = 2.45e-2;
  ```

If declared as constant using the `const` identifier, the compilar guarantees that the value will not be changed during shader execution:

  ```glsl
  const float pi = 3.141592653589793;
  const int number_lights = 5;
  ```

### Variables

Variable names must start with a letter or underscore, and it can contain letters, digits and underscores. User defined variable names are not allowed to start with `gl_`. Variables can be declared with or without an initialization value:

  ```glsl
  float alpha;
  float beta = 5.0;
  ```

### Storage qualifiers

Variables that are used to pass data between browser and a shader program or between a shader program and object buffers must be designated with a storage qualifier:

  - `uniform`: the variable is assigned a value from the JavaScript code before a `gl.drawArrays()` is called. The value is accessible in both the vertex and fragment shader
  - `attribute`: the variable is assigned a value from a object buffer as a series of graphics primitives are rendered. It is accessible only in the vertex shader
  - `varying`: the variable is assigned a value by a vertex shader and automatically interpolated across the surface of a graphics primitive before a fragment shader receives it. The value can be read in a fragment shader

### Aggregate data types

A user can create new data types that contain a combination of values:

  - `struct` can contain values of different data types:

    ```glsl
    struct my_light {
      float intensity;
      vec3 position;
      vec4 color;
    };
    ```

  - `array` requires that all values in it are the same data type. It's size must be a constant and individual elements of an array must be assigned individually:

    ```glsl
    float frequencies[3];
    const int numLights = 2;
    my_light lights[numLights];

    frequencies[0] = 0.23;
    frequencies[1] = 0.67;
    frequencies[2] = 0.82;
    ```

---

## Resources
| Title | Author | Link |
| :---   | :---  | :---  |
| WebGL2 from WebGL1 | [Greggman][A001] | [Link][L001] |
| WebGL Shader Language | [Dr. Wayne Brown][A006] | [Link][L006] |


<!-- Resource links -->
[L001]: https://webgl2fundamentals.org/webgl/lessons/webgl1-to-webgl2.html (WebGL2 from WebGL1)
[A001]: https://github.com/greggman (Greggman)
[L006]: http://learnwebgl.brown37.net/12_shader_language/glsl_introduction.html (WebGL Shader Language)
[A006]: http://learnwebgl.brown37.net/acknowledgements/author.html (Dr. Wayne Brown)