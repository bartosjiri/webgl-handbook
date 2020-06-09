# GLSL

Being derived from OpenGL ES 3.0, WebGL uses the OpenGL shading language (GLSL) for vertex and fragment manipulation in the graphics pipeline. As stated in previous materials, WebGL requires a shader program (consisting of a vertex shader and a fragment shader) every time it is asked to draw something. The GLSL is different from WebGL's JavaScript API, in both its purpose and syntax, and therefore a separate section dedicated to it is appropriate.

It is also worth mentioning that there are different versions of OpenGL, WebGL and GLSL. In fact, WebGL uses OpenGL ES, which is a subset of OpenGL. The two languages are related but not directly compatible. Attention should also be paid to the version of WebGL, since 2.0 is [still being implemented](https://caniuse.com/#feat=webgl2) into some  browsers while 1.0 is already [widely supported](https://caniuse.com/#feat=webgl). The good news is that WebGL2 is nearly 100% backwards compatible with WebGL1. Therefore some older solutions to a problem can still be viable nowadays, eventhough it may not be the most efficient option at this point.

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