# GLSL

Being derived from OpenGL ES 3.0, WebGL uses the OpenGL shading language (GLSL) for vertex and fragment manipulation in the graphics pipeline. As stated in previous materials, WebGL requires a shader program (consisting of a vertex shader and a fragment shader) every time it is asked to draw something. The GLSL is different from WebGL's JavaScript API, in both its purpose and syntax, and therefore a separate section dedicated to it is appropriate.

It is also worth mentioning that there are different versions of OpenGL, WebGL and GLSL. In fact, WebGL uses OpenGL ES, which is a subset of OpenGL. The two languages are related but not directly compatible. Attention should also be paid to the version of WebGL, since 2.0 is [still being implemented](https://caniuse.com/#feat=webgl2) into some  browsers while 1.0 is already [widely supported](https://caniuse.com/#feat=webgl). The good news is that WebGL2 is nearly 100% backwards compatible with WebGL1. Therefore some older solutions to a problem can still be viable nowadays, eventhough it may not be the most efficient option at this point.

### Data types

GLSL is designed to do math that is commonly needed to compute things for rasterizing graphics. It allows for three basic types of data:

  - `bool`: boolean values (true, false)
  - `int`: integer values, a whole number (0, 1, 10, -5, ...)
  - `float`: floating point values, a number with at least one decimal (0.0, 0.1, 1.0, -10.8, ...)

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

### Vector components

Similar to JavaScript array or objects, an individual element of a vector can be accessed using array `[0]` or dotted `.a` notation. The names of the vector components are usually `x, y, z, w` for geometric data, `r, g, b, a` for color data, and `s, t, p, q` for texture data. The array notation returns a single component while the dotted notation can return a single component or a new vector depending on the number of field names used:

  ```glsl
  vec3 alpha = vec3(1.0, 2.0, 3.0);
  vec4 a;
  vec3 b;
  vec2 c;
  float d;

  b = alpha.xyz; // b is now (1.0, 2.0, 3.0)
  d = alpha[2]; // d is now 3.0
  a = alpha.xxxx; // a is now (1.0, 1.0, 1.0, 1.0)
  c = alhpa.zx; // c is now (3.0, 1.0)
  b = alpha.rgb; // b is now (1.0, 2.0, 3.0)
  b = alpha.stp; // b is now (1.0, 2.0, 3.0)
  a = alpha.yy; // error - trying to assign a 2-component vector to a 4-component vector 
  ```

Using multiple property names to create a new vector is called swizzle notation. Swizzling can also be used on the left-hand side of an assigment, each field name can only be used once in this case though:

  ```glsl
  alpha.zxy = vec3(3.0, 4.0, 5.0); // alpha is now (4.0, 5.0, 3.0)
  alpha.zx = vec2(10.0, 20.0); // alpha is now (20.0, 5.0, 10.0)
  alpha.xx = vec2(10.0, 20.0); // error
  alpha.xyz = vec2(10.0, 20.0); // error
  ```

### Data type conversions

You can convert data from one type to another using a conversion a cast, which is a conversion function with the same name as the data type. Since GLSL does not support mixed data types, casting is essential feature:

  ```glsl
  int a = 123;
  float b = float(a) * 0.1; 
  ```

### Constructors

Same as casts, constructors also have the same name as their associated data types. A call to a constructor creates a value of the indicated data type and requires the correct number of initial values:

  ```glsl
  vec3 alpha = vec3(1.0, 2.0, 3.0);
  vec4 beta = vec4(4.0, 5.0, 6.0, 7.0);

  vec3 delta = vec3(alpha.xy, beta.w); // delta is now (1.0, 2.0, 7.0)
  vec4 gamma = vec4(alpha[2], beta.rrr); // gamma is now (3.0, 4.0, 4.0, 4.0)
  ```

### Execution

A shader program is composed of one or more functions. Its execution always begins with the `main` fucntion which receives no parameters and returns no value:

  ```glsl
  void main() {
    ...
  }
  ```

Custom functions must be defined first before they can be called. A function header defines its name, parameter list and data type of its return value:

  ```glsl
  vec3 customFunction(float x, bool beta) {
    ...
  }
  ```

All parameters are *pass by value* by default, but there are more parameter qualifiers available:

  - `in`: *pass by value* - if the parameter's value is changed in the function, the actual parameter from the calling statement is unchanged
  - `out`: *pass by reference* - the parameter is not initialized when the function is called, any changes in the parameter's value change the actual parameter from the calling statement
  - `inout`: the parameter's value is initialized by the calling statement and any changes made by the function change the actual parameter from the calling statement

  ```glsl
  vec3 customFunction(in float x, in bool beta, inout int gamma, out int theta) {
    ...
  } 

  vec3 phi = customFunction(3.5, true, delta, chi);
  // At call:         3.5 is copied into x,
  //                  true is copied into beta,
  //                  delta is copied into gamma,
  //                  chi is not copied into theta
  // After the call:  the value of delta might be changed,
  //                  the value of chi has changed,
  //                  phi contains the returned value
  ```

### Conditional statements

The classic conditional statements `if`, `else if`, `else` are available in GLSL. Its frequent usage is discouraged though, since it can reduce the ability to execute operations in parallel on 3D graphics processors. All of this is [dependent on hardware](https://stackoverflow.com/questions/37827216/do-conditional-statements-slow-down-shaders).

### Iteration

Repeating a group of statements can be done in multiple ways:

  ```glsl
  for (int j = 0; j < 5; j += 1) {
    ...
  }
  ```

  ```glsl
  int j = 0;
  while (j < 5) {
    ...
    j += 1;
  }
  ```

  ```glsl
  int j = 0;
  do {
    ...
    j += 1;
  } while (j < 5);
  ```

  If the loop control variable is declared in the loop, its scope is limited to the loop. There are many restrictions on the looping constructs:
    
  - There can be only one loop control variable of type int or float
  - The initialization of the `for` statement must be of the form of `type-specifier identifier = constant-expression`
  - The test for loop termination of the `for` statement must have the form of `loop_control_variable relational_operator constant_expression` where the operator is one of the following: `>`, `>=`, `<`, `<=`, `==`, `!=`
  - The update of the loop control variable in the `for` statement must have the one of the following forms: `loop_control_variable++`. `loop_control_variable--`, `loop_control_variable += constant_expression`, `loop_control_variable -= constant_exoression`

The flow of control inside a loop can be modified through:

  - `break`: immediately terminates a loop and jumps to the first statement after the loop
  - `continue`: skips any remaining statements in the loop and jumps to the next iteration in the loop
  - `return`: immediately exits the current function, terminating the active loop


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